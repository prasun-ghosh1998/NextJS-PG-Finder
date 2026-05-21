"use client";

import { Edit, MapPin, Plus, Trash2 } from "lucide-react";
import ProperyDialog from "./Modal";
import { usePropertyDelete, usePropertyList } from "@/hooks/useProperty";
import { useState } from "react";

const ListingTable = () => {
  const { data: list } = usePropertyList();

  const deleteMutation = usePropertyDelete();
  const [open, setOpen] = useState(false);

  const [selectedProperty, setSelectedProperty] = useState<any>(null);

  const handleEdit = (item: any) => {
    setSelectedProperty(item);

    setOpen(true);
  };

  const handleAdd = () => {
    setSelectedProperty(null);

    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Delete this property?");

    if (!confirmDelete) return;

    await deleteMutation.mutateAsync(id);
  };
  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-[32px] p-8 shadow-xl border border-white/50">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">
        <div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-950 to-gray-600 bg-clip-text text-transparent">
            Listing Management
          </h2>

          <p className="text-gray-500 mt-2 text-lg">
            Manage your premium property listings
          </p>
        </div>

        <button
          onClick={() => {
            setOpen(true);
          }}
          className="bg-gradient-to-r from-green-800 to-green-500 hover:bg-green-950 text-white px-6 py-3 rounded-2xl flex items-center gap-3 transition"
        >
          <Plus size={20} />
          Add Listing
        </button>
        <ProperyDialog
          open={open}
          property={selectedProperty}
          onClose={() => {
            setOpen(false);

            setSelectedProperty(null);
          }}
        />
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-3xl border border-gray-100">
        <table className="w-full min-w-[950px]">
          <thead className="bg-gradient-to-r from-indigo-50 to-purple-50">
            <tr className="text-left text-gray-600">
              <th className="px-6 py-5 font-semibold">Property</th>

              <th className="px-6 py-5 font-semibold">Location</th>

              <th className="px-6 py-5 font-semibold">Type</th>

              <th className="px-6 py-5 font-semibold">Price</th>

              <th className="px-6 py-5 font-semibold">Amenities</th>

              {/* <th className="px-6 py-5 font-semibold">Status</th> */}

              <th className="px-6 py-5 font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {list?.map((item: any) => (
              <tr
                key={item.id}
                className="border-b hover:bg-indigo-50/40 transition"
              >
                <td className="px-6 py-6">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-20 h-20 rounded-2xl object-cover"
                    />

                    <div>
                      <h4 className="font-bold text-lg text-black">
                        {item.title}
                      </h4>

                      <p className="text-sm text-gray-500">
                        ID #{String(item.id).slice(0, 6)}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-6">
                  <div className="flex items-center gap-2 text-black">
                    <MapPin size={18} className="text-indigo-500" />

                    {item.location}
                  </div>
                </td>

                <td className="px-6 py-6">
                  <span className="bg-indigo-100 text-black px-4 py-2 rounded-full text-sm">
                    {item.type}
                  </span>
                </td>

                <td className="px-6 py-6 font-bold text-black">
                  ₹ {item.price}
                </td>

                <td className="px-6 py-6 text-black">{item.amenities}</td>

                <td className="px-6 py-6">
                  <span
                    className={`px-4 py-2 rounded-full text-sm ${
                      item.danger
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {item.badge}
                  </span>
                </td>

                <td className="px-6 py-6">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleEdit(item)}
                      className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center"
                    >
                      <Edit size={18} />
                    </button>

                    <button
                      onClick={() => handleDelete(item.id)}
                      className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListingTable;
