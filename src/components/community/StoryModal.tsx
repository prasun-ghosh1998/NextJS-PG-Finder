"use client";

import { memo } from "react";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import DynamicInput from "@/components/DynamicInput";

type StoryFormValues = {
  place: string;
  quote: string;
  image: FileList;
};

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  loading: boolean;
  onSubmit: (values: StoryFormValues) => Promise<void>;
};

function StoryModal({ open, setOpen, loading, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StoryFormValues>();

  if (!open) return null;

  const submitHandler = async (values: StoryFormValues) => {
    await onSubmit(values);
    reset();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-[30px] bg-white p-7 shadow-xl">
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="absolute right-5 top-5 rounded-full bg-gray-100 p-2 hover:bg-gray-200"
        >
          <X size={18} />
        </button>

        <h3 className="mb-6 text-3xl font-bold text-emerald-800">
          Share Your Story
        </h3>

        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
          <DynamicInput
            label="Place"
            name="place"
            type="text"
            register={register}
            error={errors.place?.message}
          />

          <div className="space-y-2 text-black">
            <label className="font-medium">Story Image</label>

            <input
              type="file"
              accept="image/*"
              {...register("image", {
                required: "Story image is required",
              })}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none file:mr-4 file:rounded-lg file:border-0 file:bg-green-800 file:px-4 file:py-2 file:text-white"
            />

            {errors.image && (
              <p className="text-sm text-red-500">
                {errors.image.message as string}
              </p>
            )}
          </div>

          <div className="space-y-2 text-black">
            <label className="font-medium">Your Story</label>

            <textarea
              {...register("quote", {
                required: "Story is required",
              })}
              placeholder="Tell us your experience..."
              className="h-36 w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-800 focus:ring-2 focus:ring-green-100"
            />

            {errors.quote && (
              <p className="text-sm text-red-500">
                {errors.quote.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-green-800 py-3 font-semibold text-white transition hover:bg-green-900 disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit Story"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default memo(StoryModal);