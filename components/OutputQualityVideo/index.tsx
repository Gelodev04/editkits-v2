import { outputQualityList, videoType } from "@/lib/constants";

type OutputQualityVideoType = {
    file : any,
    isUploading : boolean,
    fetchedData : any,
    outputQuality : any,
    setOutputQuality : any,
    videoContainer : any,
    setVideoContainer : any
}


export default function OutputQualityVideo(props : OutputQualityVideoType) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
      <div className="w-full">
        <label
          htmlFor="quality"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Output Quality
        </label>
        <div className="relative">
          <select
            id="quality"
            disabled={!props.file || props.isUploading || !props.fetchedData?.metadata}
            value={props.outputQuality}
            onChange={e => props.setOutputQuality(e.target.value)}
            className="w-full text-black dark:text-white bg-white dark:bg-gray-800 pl-4 pr-10 py-3 border border-gray-300 dark:border-gray-700 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 dark:disabled:bg-gray-800/50 disabled:text-gray-500 dark:disabled:text-gray-400 transition-all outline-none"
          >
            {outputQualityList.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500 dark:text-gray-400">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </div>
        </div>
      </div>

      <div className="w-full">
        <label
          htmlFor="format"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Video Format
        </label>
        <div className="relative">
          <select
            id="format"
            disabled={!props.file || props.isUploading || !props.fetchedData?.metadata}
            value={props.videoContainer}
            onChange={e => props.setVideoContainer(e.target.value)}
            className="w-full text-black dark:text-white bg-white dark:bg-gray-800 pl-4 pr-10 py-3 border border-gray-300 dark:border-gray-700 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 dark:disabled:bg-gray-800/50 disabled:text-gray-500 dark:disabled:text-gray-400 transition-all outline-none"
          >
            {videoType.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500 dark:text-gray-400">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
