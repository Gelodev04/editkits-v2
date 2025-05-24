import ComponentCard from '@/components/ComponentCard';
import Copy from '@/components/icons/Copy';
import Menu from '@/components/Menu';
import ErrorModal from '@/components/modals/ErrorModal';
import FilterModal from '@/components/modals/FilterModal';
import VideoPreviewModal from '@/components/modals/VideoPreviewModal';
import { Spinner } from '@/components/Spinner';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/Table';
import Button from '@/components/ui/button/Button';
import { DatePickerWithRange } from '@/components/ui/DateRangePicker';
import { useSidebar } from '@/context/SidebarContext';
import { ExpiredIcon, WhiteExpiredIcon } from '@/icons';
import { uploadedFilesColumns } from '@/lib/constants';
import { downloadFile, getErrorMessage, PreviewFileType, truncateFileName } from '@/lib/utils';
import { useGetRecentFilesQuery, useLazyPreviewVideoQuery } from '@/services/api/file';
import { router } from 'next/client';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { toast } from 'react-hot-toast';
import { AiOutlinePlus } from 'react-icons/ai';
import { IoMdRefresh } from 'react-icons/io';
import PaginationWithIcon from '../PaginationWithIcon';

export default function JobStatus() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange | undefined>(undefined);
  const [filterModal, setFilterModal] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [videoPreviewModal, setVideoPreviewModal] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewFileType, setPreviewFileType] = useState<PreviewFileType>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { data: queryData, refetch: refetchRecentFiles } = useGetRecentFilesQuery({
    //@ts-ignore
    from_ts: selectedDateRange?.from
      ? Math.floor(
          new Date(
            Date.UTC(
              selectedDateRange.from.getFullYear(),
              selectedDateRange.from.getMonth(),
              selectedDateRange.from.getDate(),
              0,
              0,
              0
            )
          ).getTime() / 1000
        )
      : undefined,
    to_ts: selectedDateRange?.to
      ? Math.floor(
          new Date(
            Date.UTC(
              selectedDateRange.to.getFullYear(),
              selectedDateRange.to.getMonth(),
              selectedDateRange.to.getDate(),
              23,
              59,
              59
            )
          ).getTime() / 1000
        )
      : undefined,
    offset: currentPage > 1 ? currentPage - 1 : 0,
    limit: itemsPerPage,
  });

  useEffect(() => {
    refetchRecentFiles();
  }, [currentPage, refetchRecentFiles]);

  const [triggerPreviewVideo] = useLazyPreviewVideoQuery();
  const { isMobileOpen, isExpanded, isHovered } = useSidebar();

  const recentFiles = useMemo(() => {
    return (queryData as any)?.files ?? [];
  }, [queryData]);

  const totalItems = (queryData as any)?.metadata?.total ?? recentFiles.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePreviewClick = async (jobId: string, jobTypeRaw: string) => {
    const jobType = jobTypeRaw.toUpperCase();
    if (!jobId) {
      setErrorMessage('Cannot preview: File ID is missing.');
      setErrorModalOpen(true);
      return;
    }

    setPreviewFileType(null);
    setPreviewUrl(null);

    try {
      const result = await triggerPreviewVideo({ fileId: jobId });
      const resultData = result.data as { url: string } | undefined;

      if (resultData?.url && !result.isError) {
        setPreviewUrl(resultData.url);
        const jobTypeUpper = jobType.toUpperCase();
        if (jobTypeUpper === 'VIDEO') {
          setPreviewFileType('VIDEO');
        } else if (['IMAGE', 'PNG', 'JPG', 'JPEG'].includes(jobTypeUpper)) {
          setPreviewFileType('IMAGE');
        } else if (['AUDIO', 'MP3', 'WAV'].includes(jobTypeUpper)) {
          setPreviewFileType('AUDIO');
        } else {
          toast('Warning: File type not supported for preview: ' + jobTypeRaw, { icon: '⚠️' });
          setPreviewUrl(null);
          return;
        }
        setVideoPreviewModal(true);
      } else {
        const errorMsg = getErrorMessage(result.error, 'Failed to get preview URL.');
        setErrorMessage(errorMsg);
        setErrorModalOpen(true);
      }
    } catch (error) {
      const errorMsg = getErrorMessage(error);
      setErrorMessage(errorMsg);
      setErrorModalOpen(true);
    }
  };
  // DOWNLOAD
  const handleDownloadClick = async (outputFileId: string) => {
    if (!outputFileId) {
      setErrorMessage('Download cannot proceed: File ID is missing.');
      setErrorModalOpen(true);
      return null;
    }
    try {
      const result = await triggerPreviewVideo({ fileId: outputFileId });
      const resultData = result.data as { url: string } | undefined;
      if (resultData?.url && !result.isError) {
        const fileNameToDownload = outputFileId || 'downloaded_file';
        downloadFile(resultData.url, fileNameToDownload);
        return resultData.url;
      }
      const errorMsg = getErrorMessage(result.error, 'Failed to get download URL.');
      setErrorMessage(errorMsg);
      setErrorModalOpen(true);
      return null;
    } catch (error) {
      const errorMsg = getErrorMessage(
        error,
        'An unexpected error occurred while preparing the download.'
      );
      setErrorMessage(errorMsg);
      setErrorModalOpen(true);
      return null;
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  function applyFilter() {
    setFilterModal(false);
    setCurrentPage(1);
  }
  const mainContentMargin = isMobileOpen
    ? 'ml-0'
    : isExpanded || isHovered
    ? 'lg:ml-[290px] 2xl:ml-[300px] lg:pr-[24px] 4xl:mx-auto'
    : 'lg:ml-[90px]';

  return (
    <>
      <div
        className={`${mainContentMargin} min-h-[100vh] transition-all duration-300 ease-in-out overflow-hidden dark:bg-gray-900 dark:border-gray-800 rounded-xl sm:max-w-[980px] lg:max-w-[1920px] lg:p-6 p-4 `}
      >
        <ComponentCard title="Uploaded Files" className="max-w-[1488px] mx-auto">
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
                    refetchRecentFiles();
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
            <div className="flex max-[360px]:flex-col max-[360px]:items-center flex-row gap-5 whitespace-nowrap overflow-x-auto">
              <DatePickerWithRange date={selectedDateRange} onDateChange={setSelectedDateRange} />

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
                      setSelectedDateRange(undefined);
                      await refetchRecentFiles();
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
          <div className="min-h-[20vh] dark:bg-white/3 max-w-full overflow-x-auto custom-scrollbar">
            <Table>
              <TableHeader className="border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  {uploadedFilesColumns?.map(({ key, name }, index) => (
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
                {recentFiles.map((job, i) => (
                  <TableRow key={i + 1}>
                    <TableCell className="min-w-[100px] px-4 py-3 border border-gray-100 dark:border-white/[0.05] whitespace-nowrap">
                      <div className="flex justify-center items-center gap-3">
                        {job.thumbnail_url === 'EXPIRED' ? (
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
                          <div className="flex max-w-[67px] justify-center">
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
                    <TableCell className="px-4 py-3 font-normal dark:text-gray-400/90 text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm whitespace-nowrap">
                      <div className="flex items-center gap-[6.75px]">
                        {job.id?.slice(0, 5)}...
                        <button
                          onClick={() => navigator.clipboard.writeText(job.id)}
                          className="text-gray-500 dark:text-gray-400 dark:hover:text-white/90"
                        >
                          <Copy className="w-5 h-5 text-[#1C274C] dark:text-white" />
                        </button>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3 font-normal dark:text-gray-400/90 text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm whitespace-nowrap">
                      {truncateFileName(job.name)}
                    </TableCell>
                    <TableCell className="px-4 py-3 font-normal dark:text-gray-400/90 text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm whitespace-nowrap">
                      {Number(job.size_in_mb).toFixed(1)} MB
                    </TableCell>
                    <TableCell className="px-4 py-3 font-normal dark:text-gray-400/90 text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm whitespace-nowrap">
                      {job.type.charAt(0).toUpperCase() + job.type.slice(1).toLowerCase()}
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
                      {job.expires_at
                        ? new Intl.DateTimeFormat('sv-SE', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                            hour12: false,
                          }).format(new Date(job.expires_at * 1000))
                        : 'N/A'}
                    </TableCell>
                    <TableCell className="text-center px-4 py-3 font-normal dark:text-gray-400/90 text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm whitespace-nowrap">
                      <Menu
                        outputFileId={job.id}
                        handleCopy={() => navigator.clipboard.writeText(job.id)}
                        handleDownload={() => handleDownloadClick(job.id)}
                        handlePreview={() => handlePreviewClick(job.id, job.type)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
      </div>
      <FilterModal
        open={filterModal}
        setOpen={setFilterModal}
        title="Filters"
        description="Status"
        selected={selectedFilters}
        //@ts-ignore
        setSelected={setSelectedFilters}
        onClick={applyFilter}
      />
      <VideoPreviewModal
        open={videoPreviewModal}
        setOpen={setVideoPreviewModal}
        url={previewUrl}
        fileType={previewFileType}
      />
      <ErrorModal
        isOpen={errorModalOpen}
        onClose={() => setErrorModalOpen(false)}
        errorMessage={errorMessage}
      />
    </>
  );
}
