"use client";

import StoryImg from "@/assets/images/community/story-img.png"
export function StoriesSec (){
  return (
    <>
    <section className="px-10 py-16">
     <div className="space-y-8">
        <h2 className="text-center text-5xl font-bold text-gray-600">
          Real Stories from the Oasis
        </h2>

        <div className="grid md:grid-cols-[1.2fr_1fr] gap-6">
          {/* Left Large Image Card */}
          <div className=" relative rounded-[34px] overflow-hidden min-h-[600px]"
          style={{
          backgroundImage: `
      linear-gradient(
        to right,
        rgba(6, 78, 59, 0.9),
        rgba(6, 78, 59, 0.1)
      ),
       url(${StoryImg.src})
    `,backgroundRepeat:"no-repeat",backgroundPosition:"100%"
        }}
        >
            

            <div className="absolute bottom-8 left-8 right-8 bg-emerald-900/20 backdrop-blur rounded-[28px] p-8 text-white">
              <p className="text-2xl leading-relaxed italic">
                “We were matched by the AI based on our love for early morning
                pilates and organic cooking. Six months later, we’re not just
                roommates, we’re best friends.”
              </p>

              <div className="mt-6">
                <h3 className="text-3xl font-semibold">Sarah & Jamie</h3>
                <p className="text-gray-200 mt-1">Oakwood Apartments</p>
              </div>
            </div>
          </div>
           {/* Right Side Cards */}
          <div className="grid grid-rows-[1fr_auto] gap-6">
            {/* Quote Card */}
            <div className="bg-[#CDEFD7] text-[#173B2E] rounded-[34px] p-8 flex flex-col justify-between min-h-[290px]">
              <div>
                <p className="text-6xl font-bold leading-none">❞</p>
                <p className="text-2xl leading-relaxed italic mt-4">
                  The verified profiles gave me peace of mind. I found a
                  roommate who shares my values and professional drive.
                </p>
              </div>

              <div className="flex items-center gap-4 mt-8">
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300"
                  alt="David"
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-xl">David L.</h4>
                  <p className="text-sm opacity-70">Software Engineer</p>
                </div>
              </div>
            </div>

            {/* Bottom Small Cards */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-[#E8E8E8] text-black rounded-[30px] p-8 min-h-[280px] flex flex-col justify-between">
                <h3 className="text-6xl font-bold text-emerald-700">1.2k+</h3>

                <div>
                  <h4 className="text-2xl font-semibold">Happy Matches</h4>
                  <p className="text-gray-500 mt-2">
                    Created this month across the city.
                  </p>
                </div>
              </div>
              <div className="bg-emerald-800 rounded-[30px] p-8 min-h-[280px] flex flex-col justify-between">
                <div className="text-5xl">♡</div>

                <div>
                  <h4 className="text-2xl font-semibold">Share Your Story</h4>
                  <p className="text-emerald-100 mt-2">
                    Tell us how you found your home.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </section>
    </>
  )
}