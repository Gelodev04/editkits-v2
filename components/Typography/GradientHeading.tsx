import React from 'react';
import { motion } from 'framer-motion';
import { FaScissors } from 'react-icons/fa6';
import Typography from '@/components/Typography';

/**
 * GradientHeading component with animated icon and gradient text
 *
 * @param {Object} props - Component props
 * @param {string} props.text - Heading text
 * @param {string} props.subtext - Optional subtext to display below the heading
 * @param {React.ReactNode} props.icon - Optional custom icon (defaults to FaScissors)
 * @param {string} props.fromColor - Starting gradient color (default: blue-600)
 * @param {string} props.toColor - Ending gradient color (default: purple-700)
 * @returns {JSX.Element}
 */
const GradientHeading = ({
  text,
  subtext,
  icon = <FaScissors size={18} />,
  fromColor = 'blue-600',
  toColor = 'purple-700',
}) => (
  <div className="mb-8 text-center">
    <div className="inline-block mb-2">
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3 mb-2 justify-center"
      >
        <div
          className={`w-10 h-10 rounded-lg bg-gradient-to-br from-${fromColor.replace(
            '600',
            '500'
          )} to-${toColor.replace('700', '600')} flex items-center justify-center text-white`}
        >
          {icon}
        </div>
        <Typography
          label={text}
          variant="h3"
          className={`bg-clip-text text-transparent bg-gradient-to-r from-${fromColor} to-${toColor} font-bold`}
        />
      </motion.div>
    </div>
    {subtext && <Typography className="font-lato text-gray-600 max-w-md mx-auto" label={subtext} />}
  </div>
);

export default GradientHeading;
