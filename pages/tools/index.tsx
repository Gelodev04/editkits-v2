import Typography from "../../components/Typography";
import ToolsList from "../../components/ToolsList/index";

export default function Tools() {
  return (
    <div className="mb-20 max-w-[1536px] mx-auto">
      <div className="pt-16">
        <Typography
          label="Tools"
          variant="h2"
          center
        />
      </div>

      <div className="flex justify-center">
        <div style={{boxShadow: "0px 20px 12px #fafafa"}}
             className="border-solid border-2 border-zinc-100 py-6 rounded rounded-md justify-center mt-12 flex flex-col items-center">
          <Typography
            label="Video Tools"
            variant="h4"
            center
          />
          <ToolsList tools/>
        </div>
      </div>
    </div>
  )
}