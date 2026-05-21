"use client";
export default function TrustBar() {
  const items = [
    "VerifyPro",
    "UrbanPortals",
    "SafeRent",
    "PropNexus",
  ];

  return (
    <section className="bg-[#EFEFFF] py-[48px]">
        <h3 className="text-center mb-4 text-sm tracking-wide text-gray-500">SECURING YOUR JOURNEY WITH TRUSTED PARTNERS</h3>
    <div className="flex justify-center items-center gap-8 py-6  flex-wrap">
      {items.map((item, i) => (
        <p key={i} className="text-sm text-[#2C2F31] text-center">{item}</p>
      ))}
    </div>
    </section>
  );
}