import React from 'react';
import { motion } from 'framer-motion';
import Typography from '@/components/Typography';

/**
 * SectionCard component with heading, icon and animated content
 *
 * @param {Object} props - Component props
 * @param {string} props.title - Title text of the section
 * @param {React.ReactNode} props.children - Content to display inside the card
 * @param {React.ReactNode} props.icon - Icon to display next to the title
 * @returns {JSX.Element}
 */
const SectionCard = ({ title, children, icon }) => (
  <div className="mb-8">
    <div className="flex items-center mb-4 gap-2">
      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
        {icon}
      </div>
      <Typography label={title} variant="h5" className="text-[#2c2c2c] font-semibold" />
    </div>
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-100 shadow-sm"
    >
      {children}
    </motion.div>
  </div>
);

export default SectionCard;
