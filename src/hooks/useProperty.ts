"use client";

import { supabase } from "@/lib/supabaseclient";
import {
  deleteProperty,
  fetchPropertyList,
} from "@/services/helper/property.function";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

export const usePropertyList = () => {
  return useQuery({
    queryKey: ["propertyList"],
    queryFn: fetchPropertyList,
  });
};

export const usePropertyAdd = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["addProperty"],

    mutationFn: async (data: any) => {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) throw authError;
      if (!user) throw new Error("User not logged in");

      let imageUrl = "";

      if (data.image) {
        const fileName = `${crypto.randomUUID()}-${data.image.name}`;

        const { error: uploadError } = await supabase.storage
          .from("property_image")
          .upload(fileName, data.image);

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from("property_image")
          .getPublicUrl(fileName);

        imageUrl = publicUrlData.publicUrl;
      }

      const { data: profileData, error: profileError } = await supabase
        .from("registration")
        .select("name,email,phone")
        .eq("auth_user_id", user.id)
        .single();

      if (profileError) throw profileError;

      const { data: insertedData, error } = await supabase
        .from("property")
        .insert({
          title: data.title,
          image: imageUrl,
          amenities: Array.isArray(data.amenities)
            ? data.amenities.join(", ")
            : data.amenities,
          price: data.price,
          location: data.location,

          name: profileData?.name || user.email,
          email: profileData?.email || user.email,
          phone: profileData?.phone || "",

          tag: data.type,
          action: "Available",
          badge: "Pending",
          danger: false,
          type: data.type,
          status: "Pending",
        })
        .select();

      if (error) throw error;

      return insertedData;
    },

    onSuccess: () => {
      toast.success("Property added successfully");
      queryClient.invalidateQueries({
        queryKey: ["propertyList"],
      });
    },

    onError: (err: any) => {
      toast.error(err.message);
    },
  });
};

export const usePropertyUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      const { id, image, ...rest } = data;

      let imageUrl = image;

      if (image instanceof File) {
        const fileName = `${crypto.randomUUID()}-${image.name}`;

        const { error: uploadError } = await supabase.storage
          .from("property_image")
          .upload(fileName, image);

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from("property_image")
          .getPublicUrl(fileName);

        imageUrl = publicUrlData.publicUrl;
      }

      const { data: updatedData, error } = await supabase
        .from("property")
        .update({
          ...rest,
          image: imageUrl,
        })
        .eq("id", id)
        .select();

      if (error) throw error;

      if (!updatedData || updatedData.length === 0) {
        throw new Error("No property updated. ID not matched.");
      }

      return updatedData;
    },

    onSuccess: () => {
      toast.success("Property updated successfully");
      queryClient.invalidateQueries({ queryKey: ["propertyList"] });
    },

    onError: (err: any) => {
      console.log("UPDATE ERROR", err);
      toast.error(err.message);
    },
  });
};

export const usePropertyDelete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteProperty"],

    mutationFn: (id: string) => deleteProperty(id),

    onSuccess: (res) => {
      toast.success(res.message);
      queryClient.invalidateQueries({
        queryKey: ["propertyList"],
      });
    },

    onError: (err: any) => {
      toast.error(err.message);
    },
  });
};