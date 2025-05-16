import Badge from '@/components/Badge';
import StatCard from '@/components/cards/StatCard';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/Table';
import { ExpiredIcon, WhiteExpiredIcon } from '@/icons';
import { jobStatusColumns } from '@/lib/constants';
import { useGetJobsQuery } from '@/services/api/job';
import { useGetStatsQuery } from '@/services/api/stats';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { DateRange } from 'react-day-picker';
import PaginationWithIcon from '../PaginationWithIcon';

import ComponentCard from '@/components/ComponentCard';
import Copy from '@/components/icons/Copy';
import Download from '@/components/icons/Download';
import Play from '@/components/icons/Play';
import Menu from '@/components/Menu';

import ErrorModal from '@/components/modals/ErrorModal';
import FilterModal from '@/components/modals/FilterModal';
import VideoPreviewModal from '@/components/modals/VideoPreviewModal';
import { Spinner } from '@/components/Spinner';
import Button from '@/components/ui/button/Button';
import { DatePickerWithRange } from '@/components/ui/DateRangePicker';
import { useSidebar } from '@/context/SidebarContext';
import {
  downloadFile,
  getErrorMessage,
  getFileTypeFromExtension,
  PreviewFileType,
  truncateFileName,
} from '@/lib/utils';
import { useLazyPreviewVideoQuery } from '@/services/api/file';
import { router } from 'next/client';
import { AiOutlinePlus } from 'react-icons/ai';
import { IoMdRefresh } from 'react-icons/io';
import { LuSettings2 } from 'react-icons/lu';

export default function JobStatus() {
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange | undefined>(undefined);
  const { isMobileOpen, isHovered, isExpanded } = useSidebar();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filterModal, setFilterModal] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [filters, setFilters] = useState<string[]>([]);
  const [videoPreviewModal, setVideoPreviewModal] = useState(false);
  const [video, setVideo] = useState<string | null>(null);
  const [previewFileType, setPreviewFileType] = useState<PreviewFileType>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errorModalOpen, setErrorModalOpen] = useState(false);

  const { data: statsData, isLoading: isStatsLoading, refetch: refetchStats } = useGetStatsQuery();

  const {
    data: queryData,
    isError: isJobsError,
    refetch: refetchJobs,
  } = useGetJobsQuery({
    //@ts-ignore
    from_ts: selectedDateRange?.from
      ? Math.floor(selectedDateRange.from.getTime() / 1000)
      : undefined,
    to_ts: selectedDateRange?.to ? Math.floor(selectedDateRange.to.getTime() / 1000) : undefined,
    offset: currentPage > 1 ? currentPage - 1 : 0,
    limit: itemsPerPage,
    status: filters.length > 0 ? filters[0] : undefined,
  });

  const [triggerPreview] = useLazyPreviewVideoQuery();

  const handleDownloadClick = async (outputFileId: string) => {
    if (!outputFileId) {
      setError('Download cannot proceed: Output file ID is missing.');
      setErrorModalOpen(true);
      return null;
    }
    try {
      const result = await triggerPreview({ fileId: outputFileId });
      const resultData = result.data as { url: string } | undefined;
      if (!result.isError && resultData?.url) {
        const fileNameToDownload = outputFileId || 'downloaded_file';
        downloadFile(resultData.url, fileNameToDownload);
        return resultData.url;
      }
      const errorMsg = getErrorMessage(result.error, 'Failed to get download URL.');
      setError(errorMsg);
      setErrorModalOpen(true);
      return null;
    } catch (error) {
      const errorMsg = getErrorMessage(
        error,
        'An unexpected error occurred while preparing the download.'
      );
      setError(errorMsg);
      setErrorModalOpen(true);
      return null;
    }
  };

  const handlePreviewClick = async (outputFileId: string, inputFileNameForPreview?: string) => {
    if (!outputFileId) {
      setError('Cannot preview: Output file ID is missing.');
      setErrorModalOpen(true);
      return;
    }
    if (!inputFileNameForPreview) {
      setError('Cannot preview: Input file name is missing for type determination.');
      setErrorModalOpen(true);
      return;
    }
    try {
      const result = await triggerPreview({ fileId: outputFileId });
      const resultData = result.data as { url: string } | undefined;

      if (!result.isError && resultData?.url) {
        const extension = inputFileNameForPreview.split('.').pop();
        const fileType = getFileTypeFromExtension(extension);
        setVideo(resultData.url);
        setPreviewFileType(fileType);
        setVideoPreviewModal(true);
      } else {
        const errorMsg = getErrorMessage(result.error, 'Preview failed');
        setError(errorMsg);
        setErrorModalOpen(true);
      }
    } catch (error) {
      const errorMsg = getErrorMessage(error, 'An unexpected error occurred during preview.');
      setError(errorMsg);
      setErrorModalOpen(true);
    }
  };

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
    refetchJobs();
  }, [currentPage, refetchJobs]);

  function applyFilter() {
    setFilters(selectedFilters);
    setFilterModal(false);
    setCurrentPage(1);
  }

  const totalItems = (queryData as any)?.metadata?.total;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const dataToDisplay =
    filters.length === 0 ? jobsArray : jobsArray.filter(item => filters.includes(item.status));

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
        className={`${mainContentMargin} min-h-[100vh] transition-all duration-300 ease-in-out overflow-hidden dark:bg-gray-900 dark:border-gray-800 rounded-xl sm:max-w-[980px] lg:max-w-[1920px] lg:p-6`}
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
          <div className="dark:bg-white/3 flex flex-col gap-2 mb-0 px-4 py-4 border border-b-0 border-gray-100 dark:border-white/[0.05] rounded-t-xl lg:flex-row sm:items-center sm:justify-between">
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
            <div className="flex max-[360px]:flex-col max-[360px]:items-center flex-row gap-5">
              <DatePickerWithRange date={selectedDateRange} onDateChange={setSelectedDateRange} />

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
                <span className="max-[590px]:hidden">Filters</span>
              </Button>
              <Button
                startIcon={<AiOutlinePlus size={18} />}
                variant="primary"
                onClick={() => router.push('/tools')}
              >
                <span className="max-[590px]:hidden">New Job</span>
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
                      setSelectedDateRange(undefined);
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
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-gray-700 text-theme-xs dark:text-gray-400">
                            {name}
                          </p>
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
                            <Copy className="w-5 h-5 text-[#1C274C] dark:text-white" />
                          </button>
                        </div>
                      </TableCell>
                      <TableCell className="px-4 py-3 font-normal dark:text-gray-400/90 text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm whitespace-nowrap">
                        {truncateFileName(job.input_file_name)}
                      </TableCell>
                      <TableCell className="px-4 py-3 font-normal dark:text-gray-400/90 text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm whitespace-nowrap">
                        {getFileTypeFromExtension(
                          job.input_file_name ? job.input_file_name.split('.').pop() : undefined
                        ) || 'N/A'}
                      </TableCell>
                      <TableCell className="px-4 py-3 font-normal dark:text-gray-400/90 text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm whitespace-nowrap">
                        {new Intl.DateTimeFormat('sv-SE', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit',
                          hour12: false,
                        }).format(new Date(job.created_at * 1000))}
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
                                    <Copy className="w-5 h-5 text-[#1C274C] dark:text-white" />
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
                                    <Copy className="w-5 h-5 text-[#1C274C] dark:text-white" />
                                  </button>
                                </div>
                              </div>
                            )}
                          </>
                        )}
                      </TableCell>
                      <TableCell className="px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-white/90 whitespace-nowrap ">
                        {job.output_file_id && (
                          <div className="flex items-center w-full justify-around gap-3">
                            <div>
                              <button
                                onClick={async () => {
                                  await handlePreviewClick(job.output_file_id, job.input_file_name);
                                }}
                                className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white/90"
                              >
                                <Play className="w-5 h-5 text-[#1C274C] dark:text-white" />
                              </button>
                            </div>
                            <a
                              href="#"
                              onClick={async e => {
                                e.preventDefault();
                                await handleDownloadClick(job.output_file_id);
                              }}
                            >
                              <button className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white/90">
                                <Download className="w-5 h-5 text-[#1C274C] dark:text-white" />
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
                          handleDownload={() => handleDownloadClick(job.output_file_id)}
                          handlePreview={() =>
                            handlePreviewClick(job.output_file_id, job.input_file_name)
                          }
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
        <VideoPreviewModal
          open={videoPreviewModal}
          setOpen={setVideoPreviewModal}
          url={video}
          fileType={previewFileType}
        />
        <ErrorModal
          isOpen={errorModalOpen}
          onClose={() => {
            setErrorModalOpen(false);
            setError(null);
          }}
          errorMessage={error || 'An unexpected error occurred.'}
        />
      </div>
    </>
  );
}
