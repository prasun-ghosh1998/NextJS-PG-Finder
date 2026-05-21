"use client";

export default function JourneySteps() {
  const steps = [
    {
      title: "Quality Verified",
      desc: "Every listing is physically verified by our team to ensure it meets our Oasis Standards.",
    },
    {
      title: "AI Compatibility",
      desc: "Our matching engine analyzes lifestyle habits to find you the perfect roommate.",
    },
    {
      title: "Zero Brokerage",
      desc: "Direct communication with owners and flatmates. No hidden fees or middle-men.",
    },
    {
      title: "Instant Chat",
      desc: "Secure, encrypted in-app messaging to coordinate visits and discuss house rules.",
    },
  ];

  return (
    <section className=" py-16 px-10 bg-[#E5E9EB]">
        <div className="text-center">
      <h2 className="text-2xl font-bold text-gray-800">Built for the modern urbanite.</h2>
      <p className="mb-10 text-gray-700">We've removed the friction from the hunt so you can focus on the living.</p>
</div>
      <div className="grid md:grid-cols-4 gap-6">
        {steps.map((step, i) => (
          <div key={i} className="bg-white p-8 rounded-xl shadow">
            <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center mb-4">
              {i + 1}
            </div>
            <h3 className="font-semibold text-gray-700">{step.title}</h3>
            <p className="text-gray-400 text-sm">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
