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

      <div className="border-solid border-2 border-zinc-100 py-6 rounded rounded-md justify-center shadow-lg sm:mx-40 xl:mx-10 2xl:mx-40 mt-12">
        <Typography
          label="Video Tools"
          variant="h4"
          center
        />
        <div className="flex justify-center">
          <ToolsList />
        </div>
      </div>
      <div className="border-solid border-2 border-zinc-100 py-6 rounded rounded-md justify-center shadow-lg sm:mx-40 xl:mx-10 2xl:mx-40 mt-12">
        <Typography
          label="Image Tools"
          variant="h4"
          center
        />
        <div className="flex justify-center">
          <ToolsList />
        </div>
      </div>
      <div className="border-solid border-2 border-zinc-100 py-6 rounded rounded-md justify-center shadow-lg sm:mx-40 xl:mx-10 2xl:mx-40 mt-12">
        <Typography
          label="Audio Tools"
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