// import { supabase } from "@/lib/supabaseclient";
// import { deleteProperty, fetchPropertyList } from "@/services/helper/property.function";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { toast } from "sonner";



// export const usePropertyList = () => {
//   return useQuery({
//     queryKey: ["propertyList"],

//     queryFn: fetchPropertyList,
//   });
// };

// export const usePropertyAdd = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationKey: ["addProperty"],

//     // mutationFn: (data: PropertyPayload) => addProperty(data),
//     mutationFn: async (data: any) => {
//       console.log("data coming in query", data);
//       const { data: authData, error: authError } =
//         await supabase.auth.getUser();
//       if (authError) throw authError;
//       console.log("authData", authData);

//       let imageUrl = null;
//       if (data.image) {
//         const fileName = `${crypto.randomUUID()}-${data.image.name}`;

//         const { data: imageUploadData, error: imageUploadError } =
//           await supabase.storage
//             .from("property_image")
//             .upload(fileName, data.image);

//         if (imageUploadError) throw imageUploadError;

//         const { data: publicUrlData } = supabase.storage
//           .from("property_image")
//           .getPublicUrl(fileName);

//         imageUrl = publicUrlData.publicUrl;
//       }

//       // GET LOGGED IN USER
//       const {
//         data: { user },
//       } = await supabase.auth.getUser();
//       console.log("user", user);

//       // INSERT PROPERTY
//       const { data: insertedData, error } = await supabase
//         .from("property")
//         .insert({
//           title: data.title,
//           image: imageUrl,
//           amenities: data.amenities,
//           price: data.price,
//           location: data.location,
//           name: user?.user_metadata?.name || user?.email,
//           tag: data.tag,
//           action: data.action,
//           badge: data.badge,
//           danger: data.danger,
//           type:data.type,
//           status:data.status
//         })
//         .select();

//       if (error) throw error;
//       console.log("data response", insertedData);
//     },

//     onSuccess: (res) => {
//       toast.success("property added successfully");

//       queryClient.invalidateQueries({
//         queryKey: ["propertyList"],
//       });
//     },

//     onError: (err: any) => {
//       toast.error(err.message);
//     },
//   });
// };


// export const usePropertyUpdate = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (data:any) => {
//       const { id, ...payload } = data;

//       const { error } =
//         await supabase
//           .from("property")
//           .update(payload)
//           .eq("id", id);

//       if (error) throw error;
//     },

//     onSuccess: () => {
//   toast.success(
//     "Property updated successfully"
//   );

//   queryClient.invalidateQueries({
//     queryKey: ["propertyList"],
//   });
// },
//   });
// };


// export const usePropertyDelete = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationKey: ["deleteProperty"],

//     mutationFn: (id: string) => deleteProperty(id),

//     onSuccess: (res) => {
//       toast.success(res.message);

//       queryClient.invalidateQueries({
//         queryKey: ["propertyList"],
//       });
//     },

//     onError: (err: any) => {
//       toast.error(err.message);
//     },
//   });
// };



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
      const { id, ...payload } = data;

      const { error } = await supabase
        .from("property")
        .update(payload)
        .eq("id", id);

      if (error) throw error;
    },

    onSuccess: () => {
      toast.success("Property updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["propertyList"],
      });
    },

    onError: (err: any) => {
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