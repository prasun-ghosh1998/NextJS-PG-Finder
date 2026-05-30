"use client";

import DynamicInput from "@/components/DynamicInput";
import { Button } from "@/components/ui/button";
import { LoginInputFields } from "@/services/json/auth.input";
import { loginSchema } from "@/services/validation/auth.validation";
import { useAuthStorte } from "@/store/useAuthStore";
import { LoginFormValues } from "@/typescript/type/auth.type";
import { yupResolver } from "@hookform/resolvers/yup";
import { X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

export default function LoginModal({ open, onClose }: LoginModalProps) {
  const router = useRouter();
  const { isLoading, error, loginUser } = useAuthStorte();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  if (!open) return null;

  const onLoginSubmit = async (data: LoginFormValues) => {
    try {
      const response = await loginUser(data);

      if (response?.success === true) {
        toast.success(response.message || "Login successful");

        reset();
        onClose();

        if (response.user.role === "admin") {
          router.push("/admin/dashboard");
        } else if (response.user.role === "owner") {
          router.push("/owner/dashboard");
        } else {
          router.push("/");
        }
      }
    } catch (err) {
      console.log(err);
      toast.error("Login failed");
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-black/50 px-4 py-8 backdrop-blur-sm">
      <div className="relative my-auto w-full max-w-md rounded-[32px] bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
        >
          <X size={18} />
        </button>

        <div className="mb-6 pt-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Login to continue your PGFinder journey
          </p>
        </div>

        <form onSubmit={handleSubmit(onLoginSubmit)} className="space-y-4">
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
            disabled={isLoading}
            className="h-12 w-full rounded-full bg-gradient-to-r from-green-700 to-emerald-500 font-semibold text-white hover:from-green-800 hover:to-emerald-600"
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>

        {error && (
          <p className="mt-3 text-center text-sm text-red-500">{error}</p>
        )}

        <div className="mt-6 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            onClick={onClose}
            className="font-semibold text-green-700 hover:underline"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}