import { supabase } from "@/lib/supabaseclient";


export const fetchPropertyList = async () => {
  const { data, error } = await supabase
    .from("property")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const addProperty = async (data:any) => {
     try {
    let imageUrl = "";

    if (data.image) {
      const fileName = `${Date.now()}-${data.image.name}`;

      const { error: uploadError } = await supabase.storage
        .from("property-image")
        .upload(fileName, data.image);

      if (uploadError) {
        throw new Error(uploadError.message);
      }

      const { data: publicUrlData } = supabase.storage
        .from("property-image")
        .getPublicUrl(fileName);

      imageUrl = publicUrlData.publicUrl;
    }
  const { data:propertyData, error } = await supabase
    .from("property")
    .insert([
        {
    title: data.title,
      location: data.location,
      price: data.price,
      type: data.type,
      amenities: data.amenities,
      image: imageUrl,
      tag: data.tag,
      action:data.action,
      badge:data.badge,
        }
    ])
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return propertyData;
 } catch (error: any) {
    throw new Error(error.message);
  }
};

export const updateProperty = async (
  id: string,
  payload: any
) => {
  const { data, error } = await supabase
    .from("property")
    .update(payload)
    .eq("id", id)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return {
    data,
    message: "Property updated successfully",
  };
};

export const deleteProperty = async (id: string) => {
  const { error } = await supabase
    .from("property")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  return {
    message: "Property deleted successfully",
  };
};