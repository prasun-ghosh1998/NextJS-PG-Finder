import * as yup from "yup";

export const productSchema = yup.object({
  title: yup.string().required("Property Name is required"),
  location: yup.string().required("Location is required"),
  price: yup.string().required("Price is required"),
  type: yup.string().required("Property type is required"),
  amenities: yup.string().required("Amenities is required"),
  image: yup.mixed<File>().required("Image is required"),
  tag: yup.string(),
  action: yup.string(),
  badge: yup.string(),
  status: yup.string(),
});
