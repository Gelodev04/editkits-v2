import ComponentCard from '@/components/ComponentCard';
import Menu from '@/components/Menu';
import FilterModal from '@/components/modals/FilterModal';
import VideoPreviewModal from '@/components/modals/VideoPreviewModal';
import Spinner from '@/components/Spinner';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/Table';
import Button from '@/components/ui/button/Button';
import { DatePickerWithRange } from '@/components/ui/DateRangePicker';
import { useSidebar } from '@/context/SidebarContext';
import { ExpiredIcon, WhiteExpiredIcon } from '@/icons';
import { uploadedFilesColumns } from '@/lib/constants';
import { truncateFileName } from '@/lib/utils';
import { useGetRecentFilesQuery, usePreviewVideoQuery } from '@/services/api/file';
import { router } from 'next/client';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { AiOutlinePlus } from 'react-icons/ai';
import { IoMdRefresh } from 'react-icons/io';
import { IoCopyOutline } from 'react-icons/io5';
import PaginationWithIcon from '../PaginationWithIcon';

type PreviewFileType = 'VIDEO' | 'IMAGE' | null;

type SortKey = 'id' | 'name' | 'size_in_mb' | 'age' | 'date' | 'salary' | 'type';
type SortOrder = 'asc' | 'desc';

export default function JobStatus() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange | undefined>(undefined);
  const [filterModal, setFilterModal] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [fileId, setFileId] = useState('');
  const [videoPreviewModal, setVideoPreviewModal] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewFileType, setPreviewFileType] = useState<PreviewFileType>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { data: queryData, refetch: refetchRecentFiles } = useGetRecentFilesQuery({
    //@ts-ignore
    from_ts: selectedDateRange?.from
      ? Math.floor(selectedDateRange.from.getTime() / 1000)
      : undefined,
    to_ts: selectedDateRange?.to ? Math.floor(selectedDateRange.to.getTime() / 1000) : undefined,
    offset: currentPage > 1 ? currentPage - 1 : 0,
    limit: itemsPerPage,
  });

  useEffect(() => {
    refetchRecentFiles();
  }, [currentPage, refetchRecentFiles]);

  const { data: videoUrl, refetch: refetchVideoUrl } = usePreviewVideoQuery(
    { fileId },
    { skip: !fileId }
  );
  const { isMobileOpen, isExpanded, isHovered } = useSidebar();

  const recentFiles = useMemo(() => {
    return (queryData as any)?.files ?? [];
  }, [queryData]);

  const totalItems = (queryData as any)?.metadata?.total ?? recentFiles.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    // @ts-ignore
    const url = (videoUrl as { url: string } | undefined)?.url;
    if (url) {
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  }, [videoUrl]);

  const handlePreviewClick = async (jobId: string, jobTypeRaw: string) => {
    const jobType = jobTypeRaw.toUpperCase();
    if (!jobId) return;

    await setFileId(jobId);
    setPreviewFileType(null);
    setPreviewUrl(null);

    const result = await refetchVideoUrl();
    const resultData = result.data as { url: string } | undefined;

    if (resultData?.url) {
      setPreviewUrl(resultData.url);
      if (jobType === 'VIDEO') {
        setPreviewFileType('VIDEO');
      } else if (jobType === 'IMAGE' || jobType === 'PNG' || jobType === 'JPG') {
        setPreviewFileType('IMAGE');
      } else {
        console.warn('File type not supported:', jobType);
        return;
      }
      setVideoPreviewModal(true);
    } else {
      console.error('Failed to get preview URL for:', jobId, 'Type:', jobType);
    }
  };

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
        className={`${mainContentMargin} min-h-[100vh] transition-all duration-300 ease-in-out overflow-hidden dark:bg-gray-900 dark:border-gray-800 rounded-xl sm:max-w-[980px] lg:max-w-[1920px] lg:p-6`}
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
            <div className="flex flex-col lg:flex-row gap-5">
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
                          <IoCopyOutline size={17} />
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
                      {new Date(job.created_at * 1000).toLocaleDateString('en-GB') +
                        ' ' +
                        new Date(job.created_at * 1000).toLocaleTimeString('en-GB')}
                    </TableCell>
                    <TableCell className="text-center px-4 py-3 font-normal dark:text-gray-400/90 text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm whitespace-nowrap">
                      <Menu
                        outputFileId={job.id}
                        handleCopy={() => navigator.clipboard.writeText(job.id)}
                        handleDownload={async (outputFileId: string) => {
                          if (outputFileId) {
                            await setFileId(outputFileId);
                            const result = await refetchVideoUrl();
                            const resultData = result.data as { url: string } | undefined;
                            return resultData?.url;
                          }
                          return undefined;
                        }}
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
    </>
  );
}
