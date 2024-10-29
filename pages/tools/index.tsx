import Typography from "../../components/Typography";
import ToolsList from "../../components/ToolsList/index";

export default function Tools() {
  return (
    <div className="mb-20">
      <div className="pt-16">
        <Typography
          label="Tools"
          variant="h1"
          center
        />
      </div>

      <div style={{boxShadow: "0px 20px 12px #fafafa"}} className="border-solid border-2 border-zinc-100 py-6 rounded rounded-md justify-center mt-12 lg:px-[5%] 2xl:px-[12%]">
        <Typography
          label="Video Tools"
          variant="h4"
          center
        />
        <div className="flex justify-center">
          <ToolsList />
        </div>
      </div>
    </div>
  )
}