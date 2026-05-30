"use client";

import { Button } from "@/components/ui/button";
import { useAuthStorte } from "@/store/useAuthStore";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { registerSchema } from "@/services/validation/auth.validation";
import { RegisterFormValues } from "@/typescript/type/auth.type";
import { X } from "lucide-react";
import { toast } from "sonner";

interface RegisterModalProps {
  open: boolean;
  onClose: () => void;
  onLoginOpen?: () => void;
}

export default function RegisterModal({
  open,
  onClose,
  onLoginOpen,
}: RegisterModalProps) {
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

  if (!open) return null;

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const res = await registerUser(data);

      if (res) {
        toast.success("Account created successfully");
        reset();
        onClose();

        if (onLoginOpen) {
          onLoginOpen();
        }
      }
    } catch (err) {
      console.log(err);
      toast.error("Registration failed");
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
            Create Account
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Join PGFinder and find your perfect stay
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              {...register("name")}
              className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2.5 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-100"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2.5 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-100"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="text"
              {...register("phone")}
              className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2.5 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-100"
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-red-500">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2.5 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-100"
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="h-12 w-full rounded-full bg-gradient-to-r from-green-700 to-emerald-500 font-semibold text-white hover:from-green-800 hover:to-emerald-600"
          >
            {isLoading ? "Creating account..." : "Register"}
          </Button>
        </form>

        {error && (
          <p className="mt-3 text-center text-sm text-red-500">
            {error}
          </p>
        )}

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => {
              onClose();
              onLoginOpen?.();
            }}
            className="font-semibold text-green-700 hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}