"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuthStorte } from "@/store/useAuthStore";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { registerSchema } from "@/services/validation/auth.validation";
import Link from "next/link";
import { RegisterFormValues } from "@/typescript/type/auth.type";
import { ArrowLeft } from "lucide-react";

const Register = () => {
  const router = useRouter();
  const { isLoading, error, registerUser } = useAuthStorte();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormValues>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      role: "user",
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const res = await registerUser(data);
      if (res) {
        router.push("/login");
      }
    } catch (err) {
      console.log(err);
    }
    reset();
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
      bg-gradient-to-br from-green-600 via-green-400 to-green-500 px-4">

      <Card
        className="
        w-full max-w-md
        bg-white/70
        backdrop-blur-xl
        border border-white/30
        shadow-[0_10px_40px_rgba(0,0,0,0.08)]
        rounded-2xl
      "
      >
        <Link href="/" className="text-black flex"><ArrowLeft size={18} />Back</Link>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-gray-800 tracking-tight text-center">
            Create Account
          </CardTitle>
          <p className="text-sm text-gray-500 text-center mt-1">
            Join PGFinder and find your perfect stay
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            {/* Name */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                {...register("name")}
                className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300
                focus:border-green-800 focus:ring-2 focus:ring-green-200 outline-none transition"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                {...register("email")}
                className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300
                focus:border-green-800 focus:ring-2 focus:ring-green-200 outline-none transition"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="text"
                {...register("phone")}
                className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300
                focus:border-green-800 focus:ring-2 focus:ring-green-200 outline-none transition"
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                {...register("password")}
                className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300
                focus:border-green-800 focus:ring-2 focus:ring-green-200 outline-none transition"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="
                w-full
                bg-green-600
                hover:bg-green-700
                text-white
                font-semibold
                rounded-lg
                transition-all duration-200
                shadow-md hover:shadow-lg
                hover:scale-[1.02] active:scale-[0.98]
              "
            >
              {isLoading ? "Creating account..." : "Register"}
            </Button>
          </form>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          {/* Redirect */}
          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-green-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;