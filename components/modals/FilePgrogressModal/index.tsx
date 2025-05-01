import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

import { Fade, Modal } from '@mui/material';
import {
  HiOutlineCheck,
  HiOutlineX,
  HiOutlineClipboardCopy,
  HiOutlineDownload,
  HiOutlinePlay,
  HiX,
} from 'react-icons/hi';

import { lato, montserrat, opensans } from '@/lib/fonts';
import Typography from '@/components/Typography';

import Rocket from '@/public/images/rocket.gif';
import CheckMark from '@/public/icons/check-circle_success.svg';
import Error from '@/public/icons/error.svg';
import ButtonOld from '@/components/Button_Old';

export default function FileProgressModal(props) {
  const router = useRouter();

  return (
    <Modal open={props.progressModal} onClose={() => props.setProgressModal(false)}>
      <Fade in={props.progressModal}>
        {/*@ts-ignore*/}
        <div className={`${montserrat.variable} ${lato.variable} ${opensans.variable}`}>
          <div
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            aria-hidden="true"
          />
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-[540px] sm:max-w-[540px]"
            >
              {/* Close button */}
              <button
                onClick={() => props.setProgressModal(false)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
              >
                <HiX className="w-5 h-5" />
              </button>

              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-blue-50/60 to-purple-50/60 rounded-full -mr-24 -mt-24 z-0" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-purple-50/60 to-blue-50/60 rounded-full -ml-24 -mb-24 z-0" />

              <div className="relative z-10 px-6 py-6">
                {(props.data?.status === 'PENDING' || props.data?.status === 'IN_PROGRESS') && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center"
                  >
                    <div className="flex justify-center py-6">
                      <Image src={Rocket} width={120} alt="Processing" className="rounded-lg" />
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2 dark:bg-gray-700">
                      <motion.div
                        className="bg-gradient-to-r from-blue-600 to-purple-600 h-2.5 rounded-full"
                        style={{ width: `${props.data?.progress ?? 0}%` }}
                        initial={{ width: 0 }}
                        animate={{ width: `${props.data?.progress ?? 0}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>

                    <Typography
                      variant="body1"
                      className="font-semibold text-gray-900"
                      label={`Processing... ${(props.data?.progress ?? 0).toFixed(2)}%`}
                    />

                    <Typography
                      variant="body2"
                      className="text-center text-gray-600 mt-4 max-w-md"
                      label="Your job is being processed in the background. Feel free to continue exploring while we handle the rest!"
                    />
                  </motion.div>
                )}

                {props.data?.status === 'COMPLETED' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center"
                  >
                    <div className="flex justify-center py-4">
                      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                        <HiOutlineCheck className="w-8 h-8 text-green-600" />
                      </div>
                    </div>

                    <Typography
                      variant="h3"
                      className="font-semibold text-gray-900 mb-4"
                      label="Processing Complete!"
                    />

                    {props.fetchedData?.metadata?.thumbnail_url && (
                      <div className="relative rounded-md overflow-hidden mb-6">
                        <Image
                          src={props.fetchedData?.metadata?.thumbnail_url}
                          className="object-contain h-[140px] w-[240px] rounded-lg"
                          width={240}
                          height={140}
                          alt="Processed file thumbnail"
                          priority
                          quality={90}
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity">
                          <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center">
                            <HiOutlinePlay className="w-6 h-6 text-gray-900" />
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg mb-4">
                      <span className="text-sm font-medium text-gray-500">
                        #{props.data?.id.slice(0, 5)}
                      </span>

                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700"
                      >
                        <HiOutlineClipboardCopy className="w-4 h-4" />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700"
                      >
                        <HiOutlinePlay className="w-4 h-4" />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-700"
                      >
                        <HiOutlineDownload className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {(props.data?.status === 'FAILED' || props.data?.status === 'CANCELLED') && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center py-6"
                  >
                    <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
                      <HiOutlineX className="w-8 h-8 text-red-600" />
                    </div>

                    <Typography
                      variant="h3"
                      className="font-semibold text-gray-900 mb-4"
                      label="Processing Failed"
                    />

                    <Typography
                      variant="body2"
                      className="text-center text-gray-600 mb-6 max-w-md"
                      label="An error occurred while processing your job. Please try again, and if the issue persists, contact support for assistance."
                    />
                  </motion.div>
                )}

                {props.data && (
                  <div className="flex gap-4 justify-center mt-6">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        props.setProgressModal(false);
                        router.push('/dashboard/jobs-status');
                      }}
                      className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-medium transition-all"
                    >
                      Dashboard
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        props.setProgressModal(false);
                        router.push('/tools');
                      }}
                      className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
                    >
                      Explore All Tools
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </Fade>
    </Modal>
  );
}
