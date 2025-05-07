import React from 'react';
import { FaRuler } from 'react-icons/fa';
import GradientHeading from '../Typography/GradientHeading';
import { motion } from 'framer-motion';

interface ComponentToolCardProps {
  title: string;
  children: React.ReactNode;
  className?: string; // Additional custom classes for styling
  desc?: string; // Description text
}

const ComponentToolCard: React.FC<ComponentToolCardProps> = ({
  title,
  children,
  className = ''
}) => {
  return (
    <div
      className={`rounded-2xl border-2 border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] ${className}`}
    >
      <div className="max-w-[900px] px-4 sm:px-8 lg:px-12 mx-auto py-6 sm:py-12">
        {/* Main Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white dark:bg-white/[0.03] rounded-2xl border border-gray-200 dark:border-gray-800 relative overflow-hidden"
        >
          {/* Header */}
          <div className="relative z-10 pt-8 pb-4 px-8 border-b border-gray-100 dark:border-gray-800">
            <GradientHeading
              text={title}
              subtext="Easily change the dimensions of your video to fit any platform"
              icon={<FaRuler size={18} />}
              fromColor="blue-600"
              toColor="purple-700"
            />
          </div>

          {/* Card Header */}
          {/* <div className="px-6 py-5">
          <h3 className="text-base font-medium text-gray-800 dark:text-white/90">{title}</h3>
          {desc && <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{desc}</p>}
        </div> */}

          {/* Card Body */}
          <div className="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6">
            <div className="space-y-6">{children}</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ComponentToolCard;
