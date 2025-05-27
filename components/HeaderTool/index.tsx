import { HiOutlineTemplate } from 'react-icons/hi';

interface HeaderToolProps {
  children: React.ReactNode;
}

export function HeaderToolInput({ children }: HeaderToolProps) {
  return (
    <div className="flex items-center mb-4">
      <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mr-3">
        {/* <HiOutlineVideoCamera size={20} /> */}
        {children}
      </div>
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">Input</h2>
    </div>
  );
}

export function HeaderToolProperties({ children }: HeaderToolProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
      <div className="flex items-center mb-4 sm:mb-6">
        <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mr-3">
          <HiOutlineTemplate size={20} />
        </div>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">Tool Properties</h2>
      </div>
      <div className="flex items-center justify-end mb-4 sm:mb-0 ml-1 sm:ml-0">{children}</div>
    </div>
  );
}
