"use client";

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
import { PropertyInputFields } from "@/services/json/property.input";
import { useEffect, useState } from "react";
import { usePropertyAdd, usePropertyUpdate } from "@/hooks/useProperty";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { productSchema } from "@/services/validation/property.validation";

interface PropertyDialogProps {
  open: boolean;
  onClose: () => void;
  property?: any;
}

const ProperyDialog = ({ open, onClose, property }: PropertyDialogProps) => {
  const [preview, setPreview] = useState<string | null>(null);

  const addMutation = usePropertyAdd();
  const updateMutation = usePropertyUpdate();

  const isEdit = !!property?.id;
  const isPending = addMutation.isPending || updateMutation.isPending;

  const {
    register,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(productSchema),
    defaultValues: {
      title: "",
      location: "",
      price: "",
      type: "",
      amenities: [],
    },
  });

  useEffect(() => {
    if (property && open) {
      reset({
        title: property.title || "",
        location: property.location || "",
        price: property.price || "",
        type: property.type || "",
        amenities: property.amenities
          ? String(property.amenities)
              .split(",")
              .map((a) => a.trim())
          : [],
        image: undefined,
      });

      setPreview(property.image || null);
    }

    if (!property && open) {
      reset({
        title: "",
        location: "",
        price: "",
        type: "",
        amenities: [],
        image: undefined,
      });
      setPreview(null);
    }
  }, [property, open, reset]);

  const onSubmit = async (data: any) => {
    console.log("SUBMIT CLICKED");
    console.log("isEdit =", isEdit);
    console.log("property =", property);
    console.log("form data =", data);
    const payload = {
      ...data,
      amenities: Array.isArray(data.amenities)
        ? data.amenities.join(", ")
        : data.amenities,
    };

    if (isEdit) {
      updateMutation.mutate(
        {
          id: property.id,
          title: data.title,
          location: data.location,
          price: data.price,
          type: data.type,
          amenities: Array.isArray(data.amenities)
            ? data.amenities.join(", ")
            : data.amenities,
          image: data.image ? data.image : property.image,
        },
        {
          onSuccess: () => {
            reset();
            setPreview(null);
            onClose();
          },
        },
      );

      return;
    } else {
      addMutation.mutate(data, {
        onSuccess: () => {
          reset();
          setPreview(null);
          onClose();
        },
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className=" !w-[50%] !max-w-[1200px] overflow-hidden rounded-[32px] border-0 bg-white p-0 shadow-2xl">
        <div className="relative h-30 bg-gradient-to-b from-green-800 via-green-600 to-green-400">
          <div className="absolute bottom-5 left-8">
            <DialogTitle className="text-3xl font-bold text-white">
              {isEdit ? "Update Property" : "Add Property"}
            </DialogTitle>

            <p className="mt-2 text-md text-green-100">
              Manage your property details
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit, (err) => {
            console.log("FORM VALIDATION ERROR", err);
          })}
          className="p-5"
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {PropertyInputFields?.map((field) => {
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
                      <option value="">Select Property Type</option>
                      <option value="PG">PG</option>
                      <option value="Flat">Flat</option>
                    </select>

                    {errors.type?.message && (
                      <p className="text-sm text-red-500">
                        {String(errors.type.message)}
                      </p>
                    )}
                  </div>
                );
              }

              if (field.name === "amenities") {
                const amenitiesList = [
                  "WiFi",
                  "AC",
                  "Parking",
                  "Food",
                  "Laundry",
                  "Gym",
                ];

                return (
                  <div key={field.name} className="space-y-3 md:col-span-2">
                    <label className="text-sm font-semibold text-gray-700">
                      Amenities
                    </label>

                    <div className="grid grid-cols-2 gap-4 md:grid-cols-6">
                      {amenitiesList.map((item) => (
                        <label
                          key={item}
                          className="flex cursor-pointer items-center gap-2 rounded-xl border border-gray-200 p-3 hover:border-green-500"
                        >
                          <input
                            type="checkbox"
                            value={item}
                            {...register("amenities")}
                            className="h-4 w-4 accent-green-600"
                          />
                          <span className="text-sm font-medium text-gray-700">
                            {item}
                          </span>
                        </label>
                      ))}
                    </div>

                    {errors.amenities?.message && (
                      <p className="text-sm text-red-500">
                        {String(errors.amenities.message)}
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
                  error={String((errors as any)?.[field.name]?.message || "")}
                />
              );
            })}
          </div>

          <div>
            <label className="mb-3 block text-sm font-semibold text-gray-700">
              Upload Property Image
            </label>

            <label className="flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-green-200 bg-green-50/50 p-6 transition hover:bg-green-50">
              {preview ? (
                <Image
                  src={preview}
                  alt="Preview"
                  width={150}
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
                  const file = e.target.files?.[0];

                  if (file) {
                    setValue("image", file, { shouldValidate: true });
                    setPreview(URL.createObjectURL(file));
                  }
                }}
              />
            </label>
          </div>

          <DialogFooter className="flex gap-4">
            <DialogClose>
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
                ? isEdit
                  ? "Updating..."
                  : "Adding..."
                : isEdit
                  ? "Update Property"
                  : "Add Property"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProperyDialog;
