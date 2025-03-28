import React from "react";
import Image from "next/image";
import {useRouter} from "next/router";

import Button from "@/components/Button";
import {Fade, Modal} from "@mui/material";

import {lato, montserrat, opensans} from "@/lib/fonts";

import Rocket from "@/public/assets/img/rocket.gif"
import CheckMark from "@/public/assets/icons/check-circle_success.svg"
import Error from "@/public/assets/icons/error.svg"
import PlayIcon from "@/public/assets/icons/play_lg.svg";
import PlaySm from "@/public/assets/icons/play_sm.svg";
import Copy from "@/public/assets/icons/copy.svg";
import Download from "@/public/assets/icons/download.svg";

export default function FileProgressModal(props) {
  const router = useRouter();
  return (
    <Modal open={props.progressModal} onClose={() => props.setProgressModal(false)}>
      <Fade in={props.progressModal}>
        {/*@ts-ignore*/}
        <div className={`${montserrat.variable} ${lato.variable} ${opensans.variable}`}>
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"/>
          <div
            className="fixed inset-0 z-10 w-screen overflow-y-auto flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
            <div
              className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-[540px] sm:max-w-[540px]">
              {(props.data?.status === "PENDING" || props.data?.status === "IN_PROGRESS") && (
                <>
                  <div className="flex justify-center pt-[37px] pb-[6px]">
                    <Image src={Rocket} width={114} alt="Upload"/>
                  </div>
                  <p
                    className="font-lato font-bold text-sm leading-[21px] text-center text-[#273266]">Processing... {(props.data?.progress ?? 0).toFixed(2)}%</p>
                  <p
                    className="font-lato font-PENDINGnormal text-sm leading-[22px] text-center text-[#2c2c2c] pt-[47px] pb-[59px] px-[52px]">Your
                    job is being processed in the background. Feel free to continue exploring while we handle the
                    rest!</p>
                </>
              )}
              {props.data?.status === "COMPLETED" && (
                <>
                  <div className="flex justify-center pt-[37px] pb-[6px]">
                    <Image src={CheckMark} width={76} alt="Check"/>
                  </div>
                  <div className="relative rounded-md pt-[16px] pb-[12px] flex items-center justify-center">
                    {props.fetchedData?.metadata?.thumbnail_url && (
                      <Image
                        src={props.fetchedData?.metadata?.thumbnail_url}
                        className="object-contain h-[125px] w-[212px] rounded rounded-[2px]"
                        width={212}
                        height={125}
                        alt="Uploaded file thumbnail"
                        priority
                        quality={75}
                      />
                    )}
                    <Image
                      width={40}
                      className="absolute inset-0 bottom-1 m-auto object-contain"
                      src={PlayIcon}
                      alt="Play Icon"
                    />
                  </div>
                  <div className="flex justify-center items-center gap-[6px] pb-[59px]">
                    <p
                      className="font-lato font-normal text-sm leading-[19.6px] text-[#4f4f4f]">#{props.data?.id.slice(0, 5)}</p>
                    <Image
                      width={24}
                      src={Copy}
                      alt="Play Icon"
                    />
                    <Image
                      width={22}
                      src={PlaySm}
                      alt="Play Icon"
                    />
                    <Image
                      width={24}
                      src={Download}
                      alt="Play Icon"
                    />
                  </div>
                </>
              )}

              {(props.data?.status === "FAILED" || props.data?.status === "CANCELLED") && (
                <>
                  <div className="flex justify-center pt-[49px] pb-[64px]">
                    <Image src={Error} width={76} alt="Error"/>
                  </div>
                  <p
                    className="font-lato font-normal text-sm leading-[22px] text-center text-[#2c2c2c] pb-[107px] px-[52px]">Your
                    An error occurred while processing your job. Please try again, and if the issue persists, contact
                    support for assistance.</p>
                </>
              )}

              {props.data && (<div className="flex gap-[27px] justify-center pb-[34px]">
                <Button
                  onClick={() => {
                    props.setProgressModal(false)
                    router.push("/dashboard/jobs-status")
                  }}
                  label="Dashboard"
                  variant="secondary"
                />
                <Button
                  onClick={() => {
                    props.setProgressModal(false)
                    router.push("/tools")
                  }}
                  label="Explore All Tools"
                  variant="standard"
                  filled
                />
              </div>)}
            </div>
          </div>
        </div>
      </Fade>
    </Modal>
  )
}