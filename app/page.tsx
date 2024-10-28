'use client'
import Header from "@/components/Header";
import Typography from "@/components/Typography";
import Button from "@/components/Button";
import ToolCard from "@/components/ToolCard";
import {videoTools} from "@/lib/constants";
import Footer from "@/components/Footer";
import AuthModal from "@/components/modals/Auth";
import {useState} from "react";
import {FaChevronRight} from "react-icons/fa";

export default function Home() {
  const [showAuthModal, setAuthModal] = useState(false);
  const [type, setType] = useState("");

  return (
    <div className="bg-neutral-50 min-h-screen">
      <Header type={type} setType={setType} setAuthModal={setAuthModal}/>
      <div className="p-20">
        <h1 className="text-5xl font-extrabold text-black text-center">
          Your <span
          className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-400 to-blue-500">All-in-One</span> Media
        </h1>
        <Typography
          variant="h1"
          className="text-5xl font-black text-black text-center"
          label="Processing Kit"
          center
        />
        <div className="2xl:px-[37%] xl:px-[26%] lg:px-[20%] py-10">
          <Typography
            label="Empower your creativity with a suit of powerful but easy to use toolkits for video, image and audio editing"
            center
            variant="p"
          />
        </div>
        <div className="flex justify-center">
          <div className="flex justify-center 2xl:w-[9%] xl:w-[16%] lg:w-[20%]">
            <Button label="Explore All Tools" variant="secondary" filled width={40}/>
          </div>
        </div>
      </div>
      <div className="bg-white py-4 2xl:px-[20%]">
        <div className="pb-3">
          <Typography label="Quick Access" variant="h3" center/>
        </div>
        <Typography label="Video Tools" center/>
        <div className="place-items-center ">
          <div className="grid grid-cols-5 gap-y-10 py-10 gap-x-10 ">
            {videoTools.slice(0, 5).map((tool) => (
              <ToolCard
                key={tool.name}
                name={tool.name}
                icon={tool?.icon}
              />
            ))}
          </div>

          <div className="grid grid-cols-4 col-span-full 2xl:min-w-[60%] xl:min-w-[65%] lg:min-w-[70%] 2xl:gap-x-8 lg:gap-x-8">
            {videoTools.slice(5).map((tool) => (
              <ToolCard
                key={tool.name}
                name={tool.name}
                icon={tool?.icon}
              />
            ))}
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex justify-center justify-between space-between py-10 sm:w-[12%] xl:w-[20%] 2xl:w-72 lg:w-[21%]">
            <Button
              label="Show All Video Tools"
              variant="secondary"
              width={60}
              rightIcon={<FaChevronRight size={15}/>}
            />
          </div>
        </div>
      </div>
      <Footer />
      <AuthModal type={type} setType={setType} showAuthModal={showAuthModal} setAuthModal={setAuthModal}/>
    </div>
  );
}
