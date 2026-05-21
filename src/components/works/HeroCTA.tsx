"use client";


export function HeroCTA() {
  
  return (
    <section className="px-10 py-16">
      <div className="bg-[#58e2ae] py-20 rounded-[28px] min-h-[340px] flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight text-black">
          Your Journey to the
          <br />
          Perfect Oasis.
        </h1>

        <p className="mt-6 max-w-2xl text-[#2d2d2d] leading-7">
          Whether you’re hunting for a dream space or looking for the perfect resident,
          our AI-powered platform makes the transition seamless, secure, and personal.
        </p>

        <div className="flex gap-4 mt-8">
          <button className="bg-[#0c5a45] text-white px-8 py-3 rounded-full">
            For Seekers
          </button>
          <button className="bg-white px-8 py-3 rounded-full text-green-950 font-bold">
            For Owners
          </button>
        </div>
      </div>
    </section>
  );
}