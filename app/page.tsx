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
    const [type, setType] = useState("Enter verification code");

    return (
        <div className="bg-neutral-50 min-h-screen font-[family-name:var(--font-geist-sans)]">
            <Header type={type} setType={setType} setAuthModal={setAuthModal} />
            <div className="p-20">
                <h1 className="text-5xl font-black text-black text-center">
                    Your <span
                    className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-400 to-blue-500">All-in-One</span> Media
                </h1>
                <Typography
                    variant="h1"
                    className="text-5xl font-black text-black text-center"
                    label="Processing Kit"
                    center
                />
                <div className="px-[37%] py-10">
                    <Typography
                        label="Empower your creativity with a suit of powerful but easy to use toolkits for video, image and audio editing"
                        variant="p"
                        center
                    />
                </div>
                <div className="flex justify-center">
                    <div className="flex justify-center w-[10%]">
                        <Button label="Explore All Tools" variant="secondary" filled width={40}/>
                    </div>
                </div>
            </div>
            <div className="bg-white p-4">
                <div className="pb-3">
                    <Typography label="Quick Access" variant="h3" center/>
                </div>
                <Typography label="Video Tools" center/>
                <div className="grid grid-cols-5 place-items-center gap-y-10 px-40 py-10">
                    {videoTools.slice(0, 5).map((tool) => (
                        <ToolCard
                            key={tool.name}
                            name={tool.name}
                            icon={tool?.icon}
                        />
                    ))}

                    <div className="col-span-full w-[80%] grid grid-cols-4 gap-x-8">
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
                    <div className="flex justify-center justify-between space-between py-10 w-[260px]">
                        <Button label="Show All Video Tools" variant="secondary" width={60} rightIcon={<FaChevronRight size={15} />} />
                    </div>
                </div>
            </div>
            <Footer/>
            { showAuthModal && <AuthModal type={type} setType={setType} showAuthModal={showAuthModal} setAuthModal={setAuthModal} /> }
        </div>
    );
}
