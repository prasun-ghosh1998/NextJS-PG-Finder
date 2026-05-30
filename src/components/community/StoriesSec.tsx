"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";

import { supabase } from "@/lib/supabaseclient";
import StoryModal from "./StoryModal";

type Story = {
  id: string;
  user_id: string;
  name: string;
  image: string;
  place: string;
  quote: string;
};

type StoryFormValues = {
  place: string;
  quote: string;
};

export function StoriesSec() {
  const [stories, setStories] = useState<Story[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const latestStory = stories[0];

  const fetchStories = async () => {
  const { data, error } = await supabase
    .from("stories")
    .select("id, user_id, name, image, place, quote, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.log("Stories fetch error:", error.message);
    return;
  }

  console.log("Stories data:", data);
  setStories(data || []);
};

  useEffect(() => {
    fetchStories();
  }, []);

  const addStory = async (values: any) => {
  setLoading(true);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    setLoading(false);
    return;
  }

  const { data: profile } = await supabase
    .from("registration")
    .select("name, image")
    .eq("auth_user_id", user.id)
    .single();

  let storyImage = profile?.image || "";

  if (values.image?.[0]) {
    const file = values.image[0];
    const fileName = `${crypto.randomUUID()}-${file.name}`;

    const { error: uploadError } = await supabase.storage
      .from("story_image")
      .upload(fileName, file);

    if (uploadError) {
      console.log(uploadError.message);
      setLoading(false);
      return;
    }

    const { data: publicUrlData } = supabase.storage
      .from("story_image")
      .getPublicUrl(fileName);

    storyImage = publicUrlData.publicUrl;
  }

  const { error } = await supabase.from("stories").insert([
    {
      user_id: user.id,
      name: profile?.name || "User",
      image: storyImage,
      place: values.place,
      quote: values.quote,
    },
  ]);

  setLoading(false);

  if (error) {
    console.log(error.message);
    return;
  }

  setOpen(false);
  fetchStories();
};

  return (
    <section className="px-10 py-16">
      <div className="space-y-8">
        <h2 className="text-center text-5xl font-bold text-gray-600">
          Real Stories from the Oasis
        </h2>

        <div className="grid gap-6 md:grid-cols-[1.2fr_1fr]">
          <div className="relative min-h-[600px] overflow-hidden rounded-[34px]">
            {stories.length > 0 ? (
              <Swiper
                modules={[Autoplay, EffectFade]}
                effect="fade"
                loop
                speed={1000}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                className="h-full w-full"
              >
                {stories.map((story) => (
                  <SwiperSlide key={story.id}>
                    <StorySlide story={story} />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className="flex h-[600px] items-center justify-center bg-emerald-900 text-white">
                No stories found
              </div>
            )}
          </div>

          <div className="grid grid-rows-[1fr_auto] gap-6">
            <div className="flex min-h-[290px] flex-col justify-between rounded-[34px] bg-[#CDEFD7] p-8 text-[#173B2E]">
              <p className="text-6xl font-bold leading-none">❞</p>

              <p className="mt-4 text-2xl italic leading-relaxed">
                {latestStory?.quote || "No story added yet."}
              </p>

              <div className="mt-8 flex items-center gap-4">
                <img
                  src={
                    latestStory?.image ||
                    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300"
                  }
                  alt={latestStory?.name || "User"}
                  className="h-14 w-14 rounded-full object-cover"
                />

                <div>
                  <h4 className="text-xl font-semibold">
                    {latestStory?.name || "User"}
                  </h4>
                  <p className="text-sm opacity-70">
                    {latestStory?.place || "Place"}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex min-h-[280px] flex-col justify-between rounded-[30px] bg-[#E8E8E8] p-8 text-black">
                <h3 className="text-6xl font-bold text-emerald-700">
                  {stories.length}+
                </h3>

                <div>
                  <h4 className="text-2xl font-semibold">Happy Matches</h4>
                  <p className="mt-2 text-gray-500">
                    Created this month across the city.
                  </p>
                </div>
              </div>

              <button
                type="button"
                
                onClick={() => setOpen(true)}
                className="flex min-h-[280px] cursor-pointer flex-col justify-between rounded-[30px] bg-emerald-800 p-8 text-left text-white transition hover:scale-[1.02]"
              >
                <Plus size={34} />

                <div>
                  <h4 className="text-2xl font-semibold">Share Your Story</h4>
                  <p className="mt-2 text-emerald-100">
                    Tell us how you found your home.
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <StoryModal
        open={open}
        setOpen={setOpen}
        loading={loading}
        onSubmit={addStory}
      />
    </section>
  );
}

function StorySlide({ story }: { story: Story }) {
  return (
    <div
      className="relative h-[600px] w-full bg-cover bg-center"
      style={{
        backgroundImage: `
          linear-gradient(
            to right,
            rgba(6,78,59,0.9),
            rgba(6,78,59,0.1)
          ),
          url(${story.image})
        `,
      }}
    >
      <div className="absolute bottom-8 left-8 right-8 rounded-[28px] bg-emerald-900/20 p-8 text-white backdrop-blur">
        <p className="text-2xl italic leading-relaxed">“{story.quote}”</p>

        <div className="mt-6">
          <h3 className="text-3xl font-semibold">{story.name}</h3>
          <p className="mt-1 text-gray-200">{story.place}</p>
        </div>
      </div>
    </div>
  );
}