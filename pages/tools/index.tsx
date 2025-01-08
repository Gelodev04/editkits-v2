import ToolsList from "../../components/ToolsList/index";

export default function Tools() {
  return (
    <div className="mx-8">
      <div className="mb-20 max-w-[1280px] mx-auto">
        <div className="pt-16">
          <p className="font-montserrat font-extrabold text-[36px] text-[#2c2c2c] leading-[45px] text-center">Tools</p>
        </div>

        <div
          style={{boxShadow: "0px 20px 12px #fafafa"}}
           className="border-solid border-2 border-zinc-100 py-6 rounded rounded-md justify-center mt-12 flex flex-col items-center max-w-[1280px] mx-auto"
        >
          <p className="font-lato font-bold text-[32px] leading-[48px] text-[#4f4f4f]">Video Tools</p>
          <ToolsList />
        </div>
      </div>
    </div>
  )
}