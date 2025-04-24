import Badge from '@/components/Badge';
import StatCard from '@/components/cards/StatCard';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/Table';
import { ExpiredIcon, WhiteExpiredIcon } from '@/icons';
import { jobStatusColumns } from '@/lib/constants';
import { useGetJobsQuery } from '@/services/api/job';
import { useGetStatsQuery } from '@/services/api/stats';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import PaginationWithIcon from '../PaginationWithIcon';

import Button from '@/components/Button';
import ComponentCard from '@/components/ComponentCard';
import Menu from '@/components/Menu';
import DateFilterModal from '@/components/modals/DateFilterModal';
import FilterModal from '@/components/modals/FilterModal';
import VideoPreviewModal from '@/components/modals/VideoPreviewModal';
import Spinner from '@/components/Spinner';
import { useSidebar } from '@/context/SidebarContext';
import { downloadFile, truncateFileName } from '@/lib/utils';
import { usePreviewVideoQuery } from '@/services/api/file';
import { router } from 'next/client';
import { AiOutlinePlus } from 'react-icons/ai';
import { IoMdRefresh } from 'react-icons/io';
import { IoCopyOutline, IoDownloadOutline } from 'react-icons/io5';
import { LuCirclePlay, LuSettings2 } from 'react-icons/lu';
import { RxCalendar } from 'react-icons/rx';

type SortKey =
  | 'input_file_name'
  | 'input_file_id'
  | 'createdAt'
  | 'tools_used'
  | 'credits'
  | 'status'
  | 'output_file_id';
type SortOrder = 'asc' | 'desc';

export default function JobStatus() {
  const [dateRange, setDateRange] = useState({});
  const { isMobileOpen, isHovered, isExpanded } = useSidebar();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortKey, setSortKey] = useState<SortKey>('input_file_name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [dateFilterModal, setDateFilterModal] = useState(false);
  const [filterModal, setFilterModal] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [filters, setFilters] = useState<string[]>([]);
  const [fileId, setFileId] = useState<string | null>(null);
  const [videoPreviewModal, setVideoPreviewModal] = useState(false);
  const [video, setVideo] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { data: statsData, isLoading: isStatsLoading, refetch: refetchStats } = useGetStatsQuery();

  const {
    data: queryData,
    isError: isJobsError,
    refetch: refetchJobs,
  } = useGetJobsQuery({
    //@ts-ignore
    from_ts: dateRange?.startDate ? new Date(dateRange.startDate).getTime() / 1000 : undefined,
    //@ts-ignore
    to_ts: dateRange?.endDate ? new Date(dateRange.endDate).getTime() / 1000 : undefined,
    offset: currentPage > 1 ? currentPage - 1 : 0,
    limit: itemsPerPage,
    status: filters.length > 0 ? filters[0] : undefined,
  });

  const { data: videoData, refetch: refetchVideoUrl } = usePreviewVideoQuery(
    { fileId },
    { skip: !fileId }
  );

  const realTimeStats = useMemo(() => {
    if (!statsData) {
      return [
        {
          label: 'Credits',
          data: [
            { title: 'Available', value: 0 },
            { title: 'In use', value: 0 },
            { title: 'Used', value: 0 },
          ],
        },
        {
          label: 'Job Status',
          data: [
            { title: 'In progress', value: 0 },
            { title: 'Success', value: 0 },
            { title: 'Failed', value: 0 },
          ],
        },
      ];
    }

    const stats = [
      {
        label: 'Credits',
        data: [
          {
            title: 'Available',
            value: statsData.credits.available,
          },
          {
            title: 'In use',
            value: statsData.credits.inUse,
          },
          {
            title: 'Used',
            value: statsData.credits.used,
          },
        ],
      },
      {
        label: 'Job Status',
        data: [
          {
            title: 'In progress',
            value: statsData.jobStatus.inProgress,
          },
          {
            title: 'Success',
            value: statsData.jobStatus.success,
          },
          {
            title: 'Failed',
            value: statsData.jobStatus.failed,
          },
        ],
      },
    ];

    return stats;
  }, [statsData]);

  const jobsArray = (queryData as any)?.jobs ?? [];

  useEffect(() => {
    // @ts-ignore - Use type assertion here if needed, or check videoData directly
    setVideo((videoData as { url: string } | undefined)?.url);
  }, [videoData]);

  useEffect(() => {
    refetchJobs();
  }, [currentPage, refetchJobs]);

  function applyFilter() {
    setFilters(selectedFilters);
    setFilterModal(false);
    setCurrentPage(1);
  }

  const totalItems = (queryData as any)?.metadata?.total;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const sortedJobs = [...jobsArray].sort((a, b) => {
    const aValue = a[sortKey];
    const bValue = b[sortKey];

    if (aValue === null || aValue === undefined) return 1;
    if (bValue === null || bValue === undefined) return -1;

    if (typeof aValue === 'string') {
      return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    } else if (typeof aValue === 'number') {
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    } else if (Array.isArray(aValue)) {
      return sortOrder === 'asc' ? aValue.length - bValue.length : bValue.length - aValue.length;
    }
    return 0;
  });

  const dataToDisplay =
    filters.length === 0 ? sortedJobs : sortedJobs.filter(item => filters.includes(item.status));

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  function statusMapper(status) {
    switch (status) {
      case 'COMPLETED':
        return 'Success';
      case 'FAILED':
        return 'Failed';
      case 'IN_PROGRESS':
        return 'In Progress';
    }
  }

  const mainContentMargin = isMobileOpen
    ? 'ml-0'
    : isExpanded || isHovered
    ? 'lg:ml-[290px] 2xl:ml-[300px] lg:pr-[24px] 4xl:mx-auto'
    : 'lg:ml-[90px]';

  return (
    <>
      <div
        className={`${mainContentMargin} min-h-[100vh] transition-all duration-300 ease-in-out overflow-hidden dark:bg-gray-900 dark:border-gray-800 rounded-xl sm:max-w-[980px] lg:max-w-[1920px] p-6`}
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 pb-6 max-w-[1488px] mx-auto">
          {isStatsLoading ? (
            <div className="col-span-2 h-32 flex items-center justify-center">
              <p className="text-gray-500 dark:text-gray-400">Loading statistics...</p>
            </div>
          ) : !realTimeStats || realTimeStats.length === 0 ? (
            <div className="col-span-2 h-32 flex items-center justify-center">
              <p className="text-gray-500 dark:text-gray-400">No statistics available</p>
            </div>
          ) : (
            <StatCard stats={realTimeStats} />
          )}
        </div>
        <ComponentCard title="Job Status" className="max-w-[1488px] mx-auto">
          <div className="dark:bg-white/3 flex flex-col gap-2 mb-0 px-4 py-4 border border-b-0 border-gray-100 dark:border-white/[0.05] rounded-t-xl sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="hidden sm:block text-gray-500 dark:text-gray-400"> Show </span>
              <div className="relative z-20 bg-transparent">
                <select
                  className="w-full py-2 pl-3 pr-8 text-sm text-gray-800 bg-transparent border border-gray-300 rounded-lg appearance-none dark:bg-dark-900 h-9 bg-none shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                  value={itemsPerPage}
                  onChange={e => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                    refetchJobs();
                  }}
                >
                  {[5, 10, 15].map(value => (
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
            <div
              className={`grid grid-cols-1 2xsm:grid-cols-2 ${
                isExpanded ? 'lg:grid-cols-2 xl:grid-cols-4' : 'lg:grid-cols-4'
              } relative flex items-center gap-5`}
            >
              <Button
                //@ts-ignore
                variant={dateRange?.startDate || dateRange?.endDate ? 'primary' : 'outline'}
                onClick={() => setDateFilterModal(true)}
                startIcon={
                  <>
                    <RxCalendar
                      className="dark:hidden"
                      size={18}
                      //@ts-ignore
                    />
                    <RxCalendar className="hidden dark:block" size={18} color="white" />
                  </>
                }
              >
                All Time
              </Button>
              <Button
                variant={filters.length > 0 ? 'primary' : 'outline'}
                onClick={() => setFilterModal(true)}
                startIcon={
                  <>
                    <LuSettings2 className="dark:hidden" size={18} />
                    <LuSettings2 className="hidden dark:block" size={18} color={'white'} />
                  </>
                }
              >
                Filters
              </Button>
              <Button
                startIcon={<AiOutlinePlus size={18} />}
                variant="primary"
                onClick={() => router.push('/tools')}
              >
                <p>New Job</p>
              </Button>

              {isRefreshing ? (
                <Spinner />
              ) : (
                <Button
                  variant="primary"
                  onClick={async () => {
                    setIsRefreshing(true);
                    try {
                      setSelectedFilters([]);
                      setFilters([]);
                      setDateRange({});
                      await refetchJobs();
                      await refetchStats();
                    } catch (error) {
                      console.error('Error during refresh:', error);
                    } finally {
                      setIsRefreshing(false);
                    }
                  }}
                >
                  <IoMdRefresh size={20} />
                </Button>
              )}
            </div>
          </div>
          <div className="dark:bg-white/3 max-w-full overflow-x-auto custom-scrollbar">
            {isJobsError ? (
              <div className="p-6 text-center">
                <p className="text-red-500 dark:text-red-400 mb-2">
                  There was an error loading the data.
                </p>
                <button
                  onClick={() => refetchJobs()}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Try again
                </button>
              </div>
            ) : (
              <Table>
                <TableHeader className="border-gray-100 dark:border-white/[0.05]">
                  <TableRow>
                    {jobStatusColumns?.map(({ key, name }, index) => (
                      <TableCell
                        key={`${key}-${index}`}
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
                            className={
                              !name || name === 'Thumbnail'
                                ? 'hidden'
                                : 'flex flex-col gap-0.5 text-gray-800 dark:text-gray-700'
                            }
                          >
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
                  {dataToDisplay?.map((job, i) => (
                    <TableRow key={job.id || `job-${i}`}>
                      <TableCell className="min-w-[100px] px-4 py-3 border border-gray-100 dark:border-white/[0.05] whitespace-nowrap">
                        <div className="flex justify-center items-center gap-3">
                          {!job.thumbnail_url || job.thumbnail_url === 'EXPIRED' ? (
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
                                onError={e => {
                                  e.currentTarget.onerror = null;
                                  e.currentTarget.src = ExpiredIcon.src;
                                }}
                              />
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="px-4 py-3 font-normal dark:text-gray-400/90 text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm whitespace-nowrap">
                        <div className="flex items-center gap-[6.75px]">
                          {job.input_file_id?.slice(0, 5)}...
                          <button
                            onClick={() => navigator.clipboard.writeText(job.input_file_id)}
                            className="text-gray-500 dark:text-gray-400 dark:hover:text-white/90"
                          >
                            <IoCopyOutline size={17} />
                          </button>
                        </div>
                      </TableCell>
                      <TableCell className="px-4 py-3 font-normal dark:text-gray-400/90 text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm whitespace-nowrap">
                        {truncateFileName(job.input_file_name)}
                      </TableCell>
                      <TableCell className="px-4 py-3 font-normal dark:text-gray-400/90 text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm whitespace-nowrap">
                        {new Date(job.created_at * 1000).toLocaleDateString('en-GB') +
                          ' ' +
                          new Date(job.created_at * 1000).toLocaleTimeString('en-GB')}
                      </TableCell>
                      <TableCell className="px-4 py-3 font-normal dark:text-gray-400/90 text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm whitespace-nowrap">
                        {job.tools_used.join(', ')}
                      </TableCell>
                      <TableCell className="text-center px-4 py-3 font-normal dark:text-gray-400/90 text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm whitespace-nowrap">
                        {job.credits}
                      </TableCell>
                      <TableCell className="text-center px-4 py-3 font-normal dark:text-gray-400/90 text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm whitespace-nowrap">
                        <Badge
                          color={
                            job.status === 'COMPLETED'
                              ? 'success'
                              : job.status === 'IN_PROGRESS'
                              ? 'warning'
                              : 'error'
                          }
                        >
                          {statusMapper(job.status)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center px-4 py-3 font-normal dark:text-gray-400/90 text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm whitespace-nowrap">
                        {job.is_multi_output ? (
                          <div className="flex flex-col gap-2">
                            {job.output_file_id.split(',').map(id => (
                              <div key={id} className="flex items-center gap-[6.75px]">
                                <p className="font-lato text-sm font-normal text-[#4f4f4f] leading-[19.6px]">
                                  {id.slice(0, 5)}...
                                </p>
                                <div>
                                  <button
                                    onClick={() => navigator.clipboard.writeText(id)}
                                    className="text-gray-500 hover:text-error-500 dark:text-gray-400 dark:hover:text-white/90"
                                  >
                                    <IoCopyOutline size={17} />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <>
                            {job.output_file_id && (
                              <div className="flex items-center gap-2">
                                <p className="font-lato text-sm font-normal text-[#4f4f4f] dark:text-gray-400/90 leading-[19.6px]">
                                  {job.output_file_id.slice(0, 5)}...
                                </p>
                                <div>
                                  <button
                                    onClick={() =>
                                      navigator.clipboard.writeText(job.output_file_id)
                                    }
                                    className="text-gray-500 hover:text-error-500 dark:text-gray-400 dark:hover:text-white/90"
                                  >
                                    <IoCopyOutline size={17} />
                                  </button>
                                </div>
                              </div>
                            )}
                          </>
                        )}
                      </TableCell>
                      <TableCell className="px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-white/90 whitespace-nowrap ">
                        {job.output_file_id && (
                          <div className="flex items-center w-full gap-2">
                            <div>
                              <button
                                onClick={async () => {
                                  if (job.output_file_id) {
                                    await setFileId(job.output_file_id);
                                    const result = await refetchVideoUrl();
                                    const resultData = result.data as { url: string } | undefined;
                                    if (resultData?.url) {
                                      setVideo(resultData.url);
                                      setVideoPreviewModal(true);
                                    } else {
                                      console.error('Failed to get video preview URL');
                                    }
                                  }
                                }}
                                className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white/90"
                              >
                                <LuCirclePlay size={17} />
                              </button>
                            </div>
                            <a
                              href="#"
                              onClick={async e => {
                                e.preventDefault();
                                if (job.output_file_id) {
                                  try {
                                    await setFileId(job.output_file_id);
                                    const result = await refetchVideoUrl();
                                    const resultData = result.data as { url: string } | undefined;
                                    const url = resultData?.url;
                                    if (url) {
                                      downloadFile(url, 'video.mp4');
                                    } else {
                                      console.error('Failed to get video download URL');
                                    }
                                  } catch (error) {
                                    console.error('Error fetching video URL:', error);
                                  }
                                }
                              }}
                            >
                              <button className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white/90">
                                <IoDownloadOutline size={17} />
                              </button>
                            </a>
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="text-center px-4 py-3 font-normal dark:text-gray-400/90 text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm whitespace-nowrap">
                        <Menu
                          outputFileId={job.output_file_id}
                          handleCopy={() =>
                            job.output_file_id && navigator.clipboard.writeText(job.output_file_id)
                          }
                          handleDownload={async (outputFileId: string) => {
                            if (outputFileId) {
                              await setFileId(outputFileId);
                              const result = await refetchVideoUrl();
                              const resultData = result.data as { url: string } | undefined;
                              return resultData?.url;
                            }
                            return undefined;
                          }}
                          handlePreview={async () => {
                            if (job.output_file_id) {
                              await setFileId(job.output_file_id);
                              const result = await refetchVideoUrl();
                              const resultData = result.data as { url: string } | undefined;
                              if (resultData?.url) {
                                setVideo(resultData.url);
                                setVideoPreviewModal(true);
                              } else {
                                console.error('Failed to get video preview URL');
                              }
                            }
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </ComponentCard>

        <div className="max-w-[1488px] mx-auto border bg-white dark:bg-white/[0.03] mt-5 p-2 rounded-xl border-t-0 rounded-b-xl border-gray-100 py-4 pl-[18px] pr-4 dark:border-white/[0.05]">
          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between">
            <div className="pb-3 xl:pb-0">
              <p className="pb-3 text-sm font-medium text-center text-gray-500 border-b border-gray-100 dark:border-gray-800 dark:text-gray-400 xl:border-b-0 xl:pb-0 xl:text-left">
                Showing {currentPage * itemsPerPage - itemsPerPage + 1} to{' '}
                {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} entries
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
          setSelected={setSelectedFilters}
          onClick={applyFilter}
          filters={filters}
        />
        <VideoPreviewModal open={videoPreviewModal} setOpen={setVideoPreviewModal} url={video} />
      </div>
    </>
  );
}
