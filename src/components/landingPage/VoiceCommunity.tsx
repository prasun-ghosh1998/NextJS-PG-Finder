"use client";

export default function VoiceCommunity() {
  const sliderStyle = `
    @keyframes scroll {
      from {
        transform: translateX(0);
      }
      to {
        transform: translateX(-50%);
      }
    }
  `;
  const testimonials = [
    {
      text:
        '"I found a room that matches my aesthetic perfectly, but more importantly, I found a roommate who shares my love for Sunday brunches and late-night jazz."',
      name: 'David Chen',
      role: 'Product Designer, SF',
      image:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
      stars: 5,
    },
    {
      text:
        '"As a property owner, PGFinder+ has simplified my screening process immensely. The verification layer gives me peace of mind every single time."',
      name: 'Sarah Williams',
      role: 'Real Estate Owner',
      image:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
      stars: 5,
    },
    {
      text:
        '"Moving to a new city felt overwhelming, but PGFinder+ helped me find not just a room. The support is a lifesaver."',
      name: 'Aaliyah Khan',
      role: 'Postgrad Student',
      image:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&auto=format&fit=crop&q=80',
      stars: 5,
    },
  ];

  return (
    <>
      <style>{sliderStyle}</style>
    <section className="w-full bg-black py-24 px-6 md:px-12 lg:px-20 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-[44px] md:text-[52px] font-bold text-[#1d1d1d] tracking-tight leading-tight">
            Voices of the Community.
          </h2>
          <p className="mt-3 text-[20px] text-[#6f6f6f] font-medium">
            Real stories from our Urban Oasis residents.
          </p>
        </div>

        <div className="flex gap-8 overflow-hidden pb-4">
          <div className="flex animate-[scroll_20s_linear_infinite] gap-8 w-max">
                    {[...testimonials, ...testimonials].map((item, index) => (
            <div
              key={index}
              className="min-w-[420px] md:min-w-[450px] bg-[#d9d9d9] rounded-[44px] p-8 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-1 mb-8">
                  {[...Array(item.stars)].map((_, i) => (
                    <span key={i} className="text-[#007a5a] text-[24px] leading-none">
                      ★
                    </span>
                  ))}
                </div>

                <p className="text-[20px] leading-[1.65] text-[#2a2a2a] font-medium max-w-[360px]">
                  {item.text}
                </p>
              </div>

              <div className="flex items-center gap-4 mt-10">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 rounded-full object-cover"
                />

                <div>
                  <h4 className="text-[18px] font-semibold text-[#222] leading-tight">
                    {item.name}
                  </h4>
                  <p className="text-[15px] text-[#666] mt-1">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
