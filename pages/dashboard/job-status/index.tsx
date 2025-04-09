import {useState, useMemo, useEffect} from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/Table";
import Badge from '@/components/Badge'
import {
  ExpiredIcon, WhiteExpiredIcon
} from "@/icons";
import Image from "next/image";
import PaginationWithIcon from "../PaginationWithIcon";
import {useGetJobsQuery} from "@/services/api/job";
import {jobStatusColumns, stats} from "@/lib/constants";
import StatCard from "@/components/cards/StatCard";

import {router} from "next/client";
import {IoMdRefresh} from "react-icons/io";
import {IoDownloadOutline} from "react-icons/io5";
import Button from "@/components/Button";
import {useSidebar} from "@/context/SidebarContext";
import ComponentCard from "@/components/ComponentCard";
import {truncateFileName} from "@/lib/utils";
import FilterModal from "@/components/modals/FilterModal";
import DateFilterModal from "@/components/modals/DateFilterModal";
import {RxCalendar} from "react-icons/rx";
import {LuCirclePlay, LuSettings2} from "react-icons/lu";
import {AiOutlinePlus} from "react-icons/ai";
import {IoCopyOutline} from "react-icons/io5";
import VideoPreviewModal from "@/components/modals/VideoPreviewModal";
import {usePreviewVideoQuery} from "@/services/api/file";
import Menu from "@/components/Menu";

type SortKey =
  "input_file_name"
  | "input_file_id"
  | "createdAt"
  | "tools_used"
  | "credits"
  | "status"
  | "output_file_id";
type SortOrder = "asc" | "desc";

export default function JobStatus() {
  //@ts-ignore
  const [dateRange, setDateRange] = useState({})
  const {isMobileOpen, isHovered, isExpanded} = useSidebar()
  const {data: jobs, refetch: refetchJobs} = useGetJobsQuery({
    //@ts-ignore
    from_ts: new Date(dateRange?.startDate / 1000).getTime(), to_ts: new Date(dateRange?.endDate / 1000).getTime()
  });


  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortKey, setSortKey] = useState<SortKey>("input_file_name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const [dateFilterModal, setDateFilterModal] = useState(false);
  const [filterModal, setFilterModal] = useState(false);

  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filters, setFilters] = useState([]);

  const [fileId, setFileId] = useState(null);
  const [videoPreviewModal, setVideoPreviewModal] = useState(false);
  const [video, setVideo] = useState(null);
  const {data: videoUrl} = usePreviewVideoQuery({fileId}, {skip: !fileId});

  useEffect(() => {
    // @ts-ignore
    setVideo(videoUrl?.url)
  }, [videoUrl])


  function applyFilter() {
    setFilters(selectedFilters)
    setFilterModal(false)
  }


  const filteredAndSortedData = useMemo(() => {
    //@ts-ignore
    return jobs?.filter((item) =>
      Object.values(item).some(
        (value) =>
          typeof value === "string"
      )
    )
      .sort((a, b) => {
        //@ts-ignore
        if (sortKey === ("input_file_name" || "input_files" || "status" || "output_file")) {
          return sortOrder === "asc"
            ? a[sortKey]?.localeCompare(b[sortKey])
            : b[sortKey]?.localeCompare(a[sortKey]);
        }
        if (sortKey === "tools_used") {
          return sortOrder === "asc"
            ? a.tools_used[0]?.localeCompare(b.tools_used[0])
            : b.tools_used[0]?.localeCompare(a.tools_used[0]);
        }
        if (sortKey === "credits") {
          const salaryA = Number.parseInt(
            String(a[sortKey] || "0").replace(/\$|,/g, "")
          );
          const salaryB = Number.parseInt(
            String(b[sortKey] || "0").replace(/\$|,/g, "")
          );
          return sortOrder === "asc" ? salaryA - salaryB : salaryB - salaryA;
        }
        return sortOrder === "asc"
          ? String(a[sortKey] || "")?.localeCompare(String(b[sortKey] || ""))
          : String(b[sortKey] || "")?.localeCompare(String(a[sortKey] || ""));
      });
  }, [jobs, sortKey, sortOrder]);


  const totalItems = filteredAndSortedData?.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentData = filteredAndSortedData?.slice(startIndex, endIndex);

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

  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
      ? "lg:ml-[290px] 2xl:ml-[300px] lg:pr-[24px] 4xl:mx-auto"
      : "lg:ml-[90px]";

  //@ts-ignore
  const data = filters.length === 0 ? currentData : currentData.filter(item => filters.includes(item.status))
  return (
    <>
      <div
        className={`${mainContentMargin} min-h-[100vh] transition-all duration-300 ease-in-out overflow-hidden dark:bg-gray-900 dark:border-gray-800 rounded-xl sm:max-w-[980px] lg:max-w-[1920px] p-6`}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 pb-6 max-w-[1488px] mx-auto">
          <StatCard stats={stats}/>
        </div>
        <ComponentCard title="Job Status" className="max-w-[1488px] mx-auto">
          <div
            className="dark:bg-white/3 flex flex-col gap-2 mb-0 px-4 py-4 border border-b-0 border-gray-100 dark:border-white/[0.05] rounded-t-xl sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="hidden sm:block text-gray-500 dark:text-gray-400"> Show </span>
              <div className="relative z-20 bg-transparent">
                <select
                  className="w-full py-2 pl-3 pr-8 text-sm text-gray-800 bg-transparent border border-gray-300 rounded-lg appearance-none dark:bg-dark-900 h-9 bg-none shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                >
                  {[5, 8, 10].map((value) => (
                    <option
                      key={value}
                      value={value}
                      className="text-gray-500 dark:bg-gray-900 dark:text-gray-400"
                    >
                      {value}
                    </option>
                  ))}
                </select>
                <span className="absolute z-30 text-gray-500 -translate-y-1/2 right-2 top-1/2 dark:text-gray-400">
                  <svg
                    className="stroke-current"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.8335 5.9165L8.00016 10.0832L12.1668 5.9165"
                      stroke=""
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
              <span className="text-gray-500 dark:text-gray-400"> entries </span>
            </div>
            <div className={`grid grid-cols-1 2xsm:grid-cols-2 ${isExpanded ? "lg:grid-cols-2 xl:grid-cols-4" : "lg:grid-cols-4"} relative flex items-center gap-5`}>
              <Button
                //@ts-ignore
                variant={(dateRange?.startDate || dateRange?.endDate) ? "primary" : "outline"}
                onClick={() => setDateFilterModal(true)}
                startIcon={(
                  <>
                    <RxCalendar className="dark:hidden" size={18}
                      //@ts-ignore
                                color={(dateRange?.startDate || dateRange?.endDate) ? "white" : "#4f4f4f"}/>
                    <RxCalendar className="hidden dark:block" size={18}
                                color="white"/>
                  </>
                )}>
                All Time
              </Button>
              <Button
                variant={filters.length > 0 ? "primary" : "outline"} onClick={() => setFilterModal(true)}
                startIcon={(
                  <>
                    <LuSettings2 className="dark:hidden" size={18}
                                 color={filters.length > 0 ? "white" : "#4f4f4f"}/>
                    <LuSettings2 className="hidden dark:block" size={18} color={"white"}/>
                  </>
                )}
              >Filters</Button>
              <Button startIcon={<AiOutlinePlus size={18}/>} variant="primary" onClick={() => router.push("/tools")}>
                <p>New Job</p>
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  setSelectedFilters([])
                  setFilters([])
                  refetchJobs()
                  setDateRange({})
                }}
              >
                <IoMdRefresh
                  size={20}
                />
              </Button>
            </div>
          </div>
          <div className="dark:bg-white/3 max-w-full overflow-x-auto custom-scrollbar">
            <Table>
              <TableHeader className="border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  {jobStatusColumns?.map(({key, name}) => (
                    <TableCell
                      key={name}
                      isHeader
                      className="px-4 py-3 border border-gray-100 dark:border-white/[0.05]"
                    >
                      <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => handleSort(key as SortKey)}
                      >
                        <p className="font-medium text-gray-700 text-theme-xs dark:text-gray-400">
                          {name}
                        </p>
                        <button
                          className={(!name || name === "Thumbnail") ? "hidden" : "flex flex-col gap-0.5 text-gray-800 dark:text-gray-700"}>
                          <svg
                            width="8"
                            height="5"
                            viewBox="0 0 8 5"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M4.40962 4.41483C4.21057 4.69919 3.78943 4.69919 3.59038 4.41483L1.05071 0.786732C0.81874 0.455343 1.05582 0 1.46033 0H6.53967C6.94418 0 7.18126 0.455342 6.94929 0.786731L4.40962 4.41483Z"
                              fill="currentColor"
                            />
                          </svg>
                          <svg
                            width="8"
                            height="5"
                            viewBox="0 0 8 5"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M4.40962 0.585167C4.21057 0.300808 3.78943 0.300807 3.59038 0.585166L1.05071 4.21327C0.81874 4.54466 1.05582 5 1.46033 5H6.53967C6.94418 5 7.18126 4.54466 6.94929 4.21327L4.40962 0.585167Z"
                              fill="currentColor"
                            />
                          </svg>
                        </button>
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.map((job, i) => (
                  <TableRow key={i + 1}>
                    <TableCell className="min-w-[100px] px-4 py-3 border border-gray-100 dark:border-white/[0.05] whitespace-nowrap">
                      <div className="flex justify-center items-center gap-3">
                        {job.thumbnail_url === "EXPIRED" ? (
                          <div className="w-10 h-10 rounded-full">
                            <Image
                              width={40}
                              height={40}
                              src={ExpiredIcon}
                              alt="expired"
                              className="dark:hidden"
                            />
                            <Image
                              width={40}
                              height={40}
                              src={WhiteExpiredIcon}
                              alt="expired"
                              className="hidden dark:block"
                            />
                          </div>
                        ) : (
                          <div className="flex justify-center">
                            <Image
                              width={135}
                              height={40}
                              src={job.thumbnail_url}
                              alt="thumbnail"
                              className="object-fit w-full h-[40px] rounded-md"
                            />
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell
                      className="px-4 py-3 font-normal dark:text-gray-400/90 text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm whitespace-nowrap">
                      <div className="flex items-center gap-[6.75px]">
                        {job.input_file_id?.slice(0, 5)}...
                        <button onClick={() => navigator.clipboard.writeText(job.input_file_id)}
                                className="text-gray-500 dark:text-gray-400 dark:hover:text-white/90">
                          <IoCopyOutline size={17}/>
                        </button>
                      </div>
                    </TableCell>
                    <TableCell
                      className="px-4 py-3 font-normal dark:text-gray-400/90 text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm whitespace-nowrap">
                      {truncateFileName(job.input_file_name)}
                    </TableCell>
                    <TableCell
                      className="px-4 py-3 font-normal dark:text-gray-400/90 text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm whitespace-nowrap">
                      {new Date(job.created_at * 1000).toLocaleDateString('en-GB') + " " + new Date(job.created_at * 1000).toLocaleTimeString('en-GB')}
                    </TableCell>
                    <TableCell
                      className="px-4 py-3 font-normal dark:text-gray-400/90 text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm whitespace-nowrap">
                      {job.tools_used.join(", ")}
                    </TableCell>
                    <TableCell
                      className="text-center px-4 py-3 font-normal dark:text-gray-400/90 text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm whitespace-nowrap">
                      {job.credits}
                    </TableCell>
                    <TableCell
                      className="text-center px-4 py-3 font-normal dark:text-gray-400/90 text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm whitespace-nowrap">
                      <Badge
                        color={job.status === "COMPLETED" ? "success" : job.status === "IN_PROGRESS" ? "warning" : "error"}
                      >
                        {statusMapper(job.status)}
                      </Badge>
                    </TableCell>
                    <TableCell
                      className="text-center px-4 py-3 font-normal dark:text-gray-400/90 text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm whitespace-nowrap">
                      {job.is_multi_output ? job.output_file_ids?.map(id => (
                          <div className="flex items-center gap-[6.75px]">
                            <p
                              className="font-lato text-sm font-normal text-[#4f4f4f] leading-[19.6px]">{id?.slice(0, 5)}...</p>
                            <div>
                              <button onClick={() => navigator.clipboard.writeText(job.output_file_id)}
                                      className="text-gray-500 hover:text-error-500 dark:text-gray-400 dark:hover:text-white/90">
                                <IoCopyOutline size={17}/>
                              </button>
                            </div>
                          </div>
                        ))
                        : (
                          <>
                            {job.output_file_id && (
                              <div className="flex items-center gap-2">
                                <p
                                  className="font-lato text-sm font-normal text-[#4f4f4f] dark:text-gray-400/90 leading-[19.6px]">{job.output_file_id?.slice(0, 5)}...</p>
                                <div>
                                  <button onClick={() => navigator.clipboard.writeText(job.output_file_id)}
                                          className="text-gray-500 hover:text-error-500 dark:text-gray-400 dark:hover:text-white/90">
                                    <IoCopyOutline size={17}/>
                                  </button>
                                </div>
                              </div>
                            )}
                          </>
                        )}
                    </TableCell>
                    <TableCell
                      className="px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-white/90 whitespace-nowrap ">
                      {(job.output_file_id || job.output_file_ids) && (
                        <div className="flex items-center w-full gap-2">
                          <div>
                            <button onClick={() => {
                              setFileId(job.output_file_id)
                              setVideoPreviewModal(true)

                            }}
                                    className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white/90">
                              <LuCirclePlay size={17}/>
                            </button>
                          </div>
                          {/*@ts-ignore*/}
                          <a onMouseOver={() => setFileId(job.output_file_id)} href={videoUrl?.url}
                             download="video.mp4">
                            <button onClick={async () => {
                              await setFileId(job.output_file_id);
                            }}
                                    className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white/90">
                              <IoDownloadOutline size={17}/>
                            </button>
                          </a>
                        </div>
                      )}
                    </TableCell>
                    <TableCell
                      className="text-center px-4 py-3 font-normal dark:text-gray-400/90 text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm whitespace-nowrap">
                      <Menu
                        videoUrl={videoUrl}
                        handleCopy={() => navigator.clipboard.writeText(job.output_file_id)}
                        handleDownload={async () => {
                          await setFileId(job.output_file_id)
                        }}
                        handlePreview={() => {
                          setFileId(job.output_file_id)
                          setVideoPreviewModal(true)
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </ComponentCard>

        <div
          className="max-w-[1488px] mx-auto border bg-white dark:bg-white/[0.03] mt-5 p-2 rounded-xl border-t-0 rounded-b-xl border-gray-100 py-4 pl-[18px] pr-4 dark:border-white/[0.05]">
          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between">
            <div className="pb-3 xl:pb-0">
              <p
                className="pb-3 text-sm font-medium text-center text-gray-500 border-b border-gray-100 dark:border-gray-800 dark:text-gray-400 xl:border-b-0 xl:pb-0 xl:text-left">
                Showing {startIndex + 1} to {endIndex} of {totalItems} entries
              </p>
            </div>
            <PaginationWithIcon
              totalPages={totalPages}
              initialPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
        <DateFilterModal
          open={dateFilterModal}
          setOpen={setDateFilterModal}
          setDateRange={setDateRange}
        />
        <FilterModal
          open={filterModal}
          setOpen={setFilterModal}
          title="Filters"
          description="Status"
          selected={selectedFilters}
          //@ts-ignore
          setSelected={setSelectedFilters}
          onClick={applyFilter}
          filters={filters}
        />
        <VideoPreviewModal
          open={videoPreviewModal}
          setOpen={setVideoPreviewModal}
          video={video}
        />
      </div>
    </>

  );
}
