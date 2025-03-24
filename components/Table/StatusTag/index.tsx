export default function StatusTag({status}: {status: any}) {
  function statusMapper(status) {
    switch (status) {
      case "COMPLETED":
        return "Success"
      case "FAILED":
        return "Failed"
      case "IN_PROGRESS":
        return "In Progress"
    }

  }
  return (
    <div className={`${status === "Failed" ? "bg-[#d80027]" : status === "Progress" ? "bg-[#ff9407]" : "bg-[#0f930f]"} w-[96px] rounded-[22px] py-[4px]`}>
      <p className={`font-lato text-white text-center text-[10px]`}>
        {statusMapper(status)}
      </p>
    </div>
  )
}