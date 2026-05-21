"use client";

export default function CTA() {
  return (
    <section className="px-10 py-16">
      <div className="bg-green-700 text-white p-12 rounded-3xl text-center">
        <h2 className="text-3xl font-bold">
          Are you a property owner or a master tenant?
        </h2>
        <p>List your space and find high-quality tenants or roommates in minutes. Our platform
handles verification and leads, so you can focus on being a great host.</p>

        <div className="mt-6 flex justify-center gap-4">
          <button className="bg-green-800 text-blue-700 px-6 py-2 rounded-full">
            List Your Property
          </button>
          <button className="border px-6 py-2 rounded-full">
            How Hosting Works
          </button>
        </div>
      </div>
    </section>
  );
}