"use client";


export function MatchesSec (){
     const matches = [
    {
      name: "Marcus Chen",
      role: "UX Designer • Early Bird • Clean Freak",
      match: "98%",
      tags: ["Yoga", "Tech", "Vegan"],
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
    },
    {
      name: "Elena Rodriguez",
      role: "Data Analyst • Night Owl • Social",
      match: "94%",
      tags: ["Music", "Hiking", "Coffee"],
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    },
    {
      name: "Sam Peterson",
      role: "Architect • Minimalist • Quiet",
      match: "89%",
      tags: ["Design", "Books", "Travel"],
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400",
    },
  ];

  return (
    <>
    <section className="px-10 py-16">
     <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div>
            <p className="text-emerald-400 text-sm font-semibold uppercase tracking-widest">
              Intelligent Discovery
            </p>
            <h2 className="text-5xl font-bold text-gray-600">
              AI-Powered Matches
            </h2>
          </div>
          <p className="text-gray-400 max-w-lg text-right">
            Our proprietary algorithm analyzes 42 unique personality facets to
            find your ideal living companion.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {matches.map((item, index) => (
            <div
              key={index}
              className="bg-white text-black rounded-[30px] p-6 shadow-xl"
            >
              <div className="flex justify-between items-start">
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-emerald-400"
                  />
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-emerald-300 text-xs px-3 py-1 rounded-full">
                    Verified
                  </span>
                </div>
                <div className="text-right">
                  <h3 className="text-4xl font-bold text-emerald-700">
                    {item.match}
                  </h3>
                   <p className="text-sm text-gray-500">MATCH</p>
                </div>
              </div>

              <h3 className="text-2xl font-semibold mt-8">{item.name}</h3>
              <p className="text-gray-500 mt-2">{item.role}</p>

              <div className="flex flex-wrap gap-2 mt-5">
                {item.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-gray-200 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <button className="w-full mt-8 border border-gray-300 rounded-full py-4 font-semibold text-emerald-700 hover:bg-gray-50">
                Send Message
              </button>
            </div>
          ))}
        </div>
      </div>
      </section>
    </>
  )
}