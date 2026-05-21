import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/inputs";
import Image from "next/image";
import DynamicInput from "../DynamicInput";
import { PropertyPayload } from "@/typescript/type/property.type";
import { PropertyInputFields } from "@/services/json/property.input";
import { useState } from "react";
import { usePropertyAdd } from "@/hooks/useProperty";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { productSchema } from "@/services/validation/property.validation";
import { X } from "lucide-react";

const ProperyDialog = ({ open, onClose }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const { isError, isPending, mutate } = usePropertyAdd();

  const {
    register,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productSchema),
    defaultValues: {
      title: "",
      location: "",
      price: "",
      type: "",
      amenities: "",
      tag: "",
      action: "Avalable",
      status:"pending",
    },
  });

  const onSubmit = async (data: PropertyPayload) => {
    console.log("data", data);
   mutate(data, {
    onSuccess: (response)=>{
      console.log("response in dialog", response);
      reset();
      onClose();
      setPreview(null);
    }
   });
  };

  return (
   <Dialog open={open} onOpenChange={onClose}>
<DialogContent className="!w-[50%] !max-w-[1200px] overflow-hidden rounded-[32px] border-0 bg-white p-0 shadow-2xl">
    {/* Header */}
    <div className="relative h-40 bg-gradient-to-b from-green-800 via-green-600 to-green-400">

      <DialogClose >
        <button className="absolute top-6 right-6 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/20 text-white transition hover:bg-white/30">
          <X size={22} />
        </button>
      </DialogClose>

      <div className="absolute bottom-8 left-8">
        <DialogTitle className="text-3xl font-bold text-white">
          Add Product
        </DialogTitle>

        <p className="mt-2 text-md text-green-100">
          Manage your product details
        </p>
      </div>
    </div>

    {/* Form */}
    <form
      className="space-y-8 p-8 md:p-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Inputs */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {PropertyInputFields?.map((field) => {

    // Property Type Dropdown
    if (field.name === "type") {
      return (
        <div key={field.name} className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">
            Property Type
          </label>

          <select
            {...register("type")}
            className="h-14 w-full rounded-2xl border border-gray-200 bg-white px-4 text-sm font-medium outline-none transition focus:border-green-500"
          >
            <option value="" className="text-gray-700">Select Property Type</option>
            <option value="PG" className="text-gray-500">PG</option>
            <option value="Flat" className="text-gray-500">Flat</option>
          </select>

          {errors.type?.message && (
            <p className="text-sm text-red-500">
              {errors.type.message}
            </p>
          )}
        </div>
      );
    }

    // Amenities Dropdown
    if (field.name === "amenities") {
      return (
        <div key={field.name} className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">
            Amenities
          </label>

          <select
            {...register("amenities")}
            className="h-14 w-full rounded-2xl border border-gray-200 bg-white px-4 text-sm font-medium outline-none transition focus:border-green-500"
          >
            <option value="" className="text-gray-700">Select Amenities</option>
            <option value="WiFi" className="text-gray-500">WiFi</option>
            <option value="AC" className="text-gray-500">AC</option>
            <option value="Parking" className="text-gray-500">Parking</option>
            <option value="Food" className="text-gray-500">Food</option>
            <option value="Laundry" className="text-gray-500">Laundry</option>
            <option value="Gym" className="text-gray-500">Gym</option>
          </select>

          {errors.amenities?.message && (
            <p className="text-sm text-red-500">
              {errors.amenities.message}
            </p>
          )}
        </div>
      );
    }

    return (
      <DynamicInput
        key={field.name}
        label={field.label}
        name={field.name}
        type={field.type}
        register={register}
        error={
          errors[field.name as keyof PropertyPayload]
            ?.message
        }
      />
    );
  })}
      </div>

      {/* Upload Section */}
      <div>
        <label className="mb-3 block text-sm font-semibold text-gray-700">
          Upload Product Image
        </label>

        <label className="flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-green-200 bg-green-50/50 p-6 transition hover:bg-green-50">

          {preview ? (
            <Image
              src={preview}
              alt="Preview"
              width={180}
              height={180}
              className="h-44 w-[60%] rounded-2xl object-cover shadow-md"
            />
          ) : (
            <>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-green-700 text-3xl text-white">
                +
              </div>

              <h3 className="text-sm font-bold text-gray-700">
                Click to Upload Image
              </h3>
            </>
          )}

          <Input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file =
                e.target.files?.[0] || null;

              setValue("image", file, {
                shouldValidate: true,
              });

              if (file) {
                setPreview(
                  URL.createObjectURL(file)
                );
              }
            }}
          />
        </label>
      </div>

      {/* Error */}
      {isError && (
        <p className="rounded-2xl bg-red-100 p-3 text-sm font-medium text-red-500">
          {isError}
        </p>
      )}

      {/* Footer */}
      <DialogFooter className="flex gap-4">
        <DialogClose >
          <Button
            type="button"
            className="h-14 rounded-2xl border border-gray-200 bg-white px-8 font-semibold text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </Button>
        </DialogClose>

        <Button
          type="submit"
          disabled={isPending}
          className="h-14 rounded-2xl bg-gradient-to-r from-green-700 to-green-500 px-10 font-bold text-white shadow-lg"
        >
          {isPending
            ? "Adding..."
            : "Add Product"}
        </Button>
      </DialogFooter>
    </form>
  </DialogContent>
</Dialog>
  );
};

export default ProperyDialog;


