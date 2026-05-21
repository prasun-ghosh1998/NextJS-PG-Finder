"use client";

import { memo } from "react";
import { Input } from "./ui/inputs";
import { Label } from "./ui/label";

export interface DynamicInputProps {
  label: string;
  name: string;
  type?: string;
  register: any;
  error?: string;
}

const DynamicInput = ({
  label,
  name,
  type = "text",
  register,
  error,
}: DynamicInputProps) => {
  return (
    <div className="space-y-2 mb-3 text-black">
      <Label>{label}</Label>

      <Input
        type={type}
        {...register(name)}
        className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300
    focus:border-green-900 focus:ring-2 focus:ring-indigo-200 outline-none transition"
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default memo(DynamicInput);
