import Typography from "../../components/Typography";
import ToolsList from "../../components/ToolsList/index";

export default function Tools() {
  return (
    <div className="mx-8">
      <div className="mb-20 max-w-[1280px] mx-auto">
        <div className="pt-16">
          <Typography
            label="Tools"
            className="font-montserrat font-extrabold text-[36px] leading-[45px]"
            center
          />
        </div>

        <div style={{boxShadow: "0px 20px 12px #fafafa"}}
             className="border-solid border-2 border-zinc-100 py-6 rounded rounded-md justify-center mt-12 flex flex-col items-center max-w-[1280px] mx-auto">
          <Typography
            label="Video Tools"
            className="text-[2em] font-lato font-bold  leading-[48px] text-[#4f4f4f]"
            center
          />
          <ToolsList />
        </div>
      </div>
    </div>
  )
}