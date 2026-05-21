"use client";

import DynamicInput from "@/components/DynamicInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LoginInputFields } from "@/services/json/auth.input";
import { loginSchema } from "@/services/validation/auth.validation";
import { useAuthStorte } from "@/store/useAuthStore";
import { LoginFormValues } from "@/typescript/type/auth.type";
import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const Login = () => {
  const router = useRouter();
  const { isLoading, error, loginUser } = useAuthStorte();

  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    console.log("FORM DATA:", data);
    try {
      const response = await loginUser(data);

      if (response.success === true) {
        toast.success(response.message);

        if (response.user.role === "admin") {
          router.push("/admin/dashboard");
        }if (response.user.role === "owner") {
          router.push("/owner/dashboard");
        } else {
          router.push("/");
        }

        reset();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
      bg-gradient-to-br from-green-600 via-green-400 to-green-500 px-4">

      <Card className="w-full max-w-md 
        bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl border border-white/20">
    <Link href="/" className="text-black flex"><ArrowLeft size={18} />Back</Link>
        <CardContent className="p-8 space-y-6">

          {/* Heading */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome Back
            </h1>
            <p className="text-gray-500 text-sm">
              Login to find your perfect PG & roommates
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {LoginInputFields?.map((field) => (
              <DynamicInput
                key={field.name}
                label={field.label}
                name={field.name}
                type={field.type}
                register={register}
                error={errors[field.name as keyof LoginFormValues]?.message}
              />
            ))}

            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-center text-sm">{error}</p>
          )}

          {/* Footer */}
          <div className="text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link
              href="/register"
              className="text-green-600 font-semibold hover:underline"
            >
              Register
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;