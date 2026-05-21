import * as yup from "yup";
export const registerSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
    .required("Phone is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const loginSchema = yup.object({
   email: yup.string().email("Invalid email").required("Email is required"),
   password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),

})
