import Image from "next/image";

import {TableContainer, Table, TableHead, TableRow, TableCell, TableBody} from "@mui/material";

import StatusTag from "@/components/Table/StatusTag";
import {jobStatusColumns} from "@/lib/constants";

import CopyIcon from "@/public/assets/icons/copy.svg";
import PlayIconSm from "@/public/assets/icons/play_sm.svg";
import DownloadIcon from "@/public/assets/icons/download.svg";
import Success from "@/public/assets/icons/success.svg";
import Failed from "@/public/assets/icons/failed.svg";
import Progress from "@/public/assets/icons/pending.svg";
import ExpiredIcon from "@/public/assets/icons/expired_icon.svg"
import {PiPlayCircleLight} from "react-icons/pi";
import {IoDownloadOutline} from "react-icons/io5";

import PlayIcon from "@/public/assets/icons/play.png";
import Menu from "@/components/Menu";

type JobStatusTableProps = {
  data: any;
  handleVideoPreview: any;
  handleVideoDownload: any;
  setVideoPreviewModal: any;
  videoUrl: any;
}

export default function JobStatusTable({
  data,
  handleVideoPreview,
  handleVideoDownload,
  setVideoPreviewModal
}: JobStatusTableProps) {
  return (
    <TableContainer className="px-[42px]">
      <Table
        aria-label="simple table"
      >
        <TableHead sx={{backgroundColor: "#f0f0f0"}}>
          <TableRow>
            {jobStatusColumns.map(col => (
              <TableCell key={col.name} align="center" className="py-[18px] px-0" padding="none" sx={{paddingY: "18px"}}>
                <p className="font-lato font-bold text-xs leading-[16.8px]  text-[#201D23]">{col.name}</p>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.filter((row: any) => row.input_file_name.toLowerCase()).map((row: any) => (
            <TableRow
              key={row.input_file_id}
              sx={{
                '&:last-child td, &:last-child th': {border: "none"},
                '&:nth-of-type(even)': {backgroundColor: '#fcfcfc'},
              }}
            >
              <TableCell sx={{border: "none"}} component="th" scope="row" width={109} padding="none" align="right">
                <div
                  style={{
                    position: "relative",
                    width: "80px",
                    height: "47px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                    margin: "auto"
                  }}
                >
                  <Image
                    className="rounded-md bg-[#000000] w-[138%] p-[2px]"
                    src={row.thumbnail_url === "EXPIRED" ? ExpiredIcon : row.thumbnail_url}
                    alt="icon"
                    layout="fill"
                    objectFit="cover"
                    priority
                    quality={75}
                  />

                  <Image src={PlayIcon} className="absolute" width={50} height={50} alt="play icon"/>
                  <div
                    style={{
                      position: "absolute",
                      bottom: "-6px",
                      right: "-5px",
                    }}
                  >
                    <Image
                      src={row.status === "COMPLETED" ? Success : row.status === "FAILED" ? Failed : Progress}
                      alt="success-icon"
                      priority
                    />
                  </div>
                </div>
              </TableCell>
              <TableCell width={150}>
                <div className="flex items-center gap-[12px]">
                  <p
                    className="font-lato text-sm font-normal text-[#4f4f4f] leading-[19.6px]">#{row.input_file_id.slice(0, 5)}...</p>
                  <Image
                    src={CopyIcon}
                    className="cursor-pointer"
                    onClick={() => navigator.clipboard.writeText(row.input_file_id)}
                    alt="input_id"
                    priority
                  />
                </div>
              </TableCell>
              <TableCell sx={{border: "none"}} align="left" width={140}>
                <p className="font-lato text-sm font-normal text-[#4f4f4f] leading-[19.6px]">{row.input_file_name.slice(0,10)} {row.input_file_name.length > 10 && "..."}</p>
              </TableCell>
              <TableCell sx={{border: "none"}} width={154} align="center" className="w-[154px]" padding="none">
                <p className="font-lato font-normal text-sm leading-[19.6px] text-[#4f4f4f] p-[0px]">{new Date(row.created_at * 1000).toLocaleDateString('en-GB') + " " + new Date(row.created_at * 1000).toLocaleTimeString('en-GB')}</p>
              </TableCell>
              <TableCell sx={{border: "none"}} align="center" width={123}>
                <p className="font-lato text-sm font-normal text-[#4f4f4f] leading-[19.6px] w-full">{row.tools_used}</p>
              </TableCell>
              <TableCell sx={{border: "none"}} align="center" className="w-[104px]" padding="none">
                <p className="font-lato font-normal text-sm leading-[19.6px] text-[#4f4f4f]">{row.credits}</p>
              </TableCell>
              <TableCell align="center" className="w-[124px]" padding="none">
                <StatusTag status={row.status}/>
              </TableCell>
              <TableCell sx={{border: "none"}} align="center" padding="none" width={156}>
                {row.is_multi_output ? row.output_file_ids?.map(id => (
                    <div className="flex items-center gap-[6.75px]">
                      <div className="flex items-center gap-[12px]">
                        <p className="font-lato text-sm font-normal text-[#4f4f4f] leading-[19.6px]">#{id.slice(0, 5)}...</p>
                        <Image
                          src={CopyIcon}
                          className="cursor-pointer"
                          onClick={() => navigator.clipboard.writeText(id)}
                          alt="input_id"
                          priority
                        />
                      </div>
                      <PiPlayCircleLight className="cursor-pointer" size={24}/>
                      <IoDownloadOutline className="cursor-pointer" size={24}/>
                    </div>
                  ))
                  : (
                    <div className="flex items-center gap-[6px]">
                      <p
                        className="font-lato text-sm font-normal text-[#4f4f4f] leading-[19.6px]">#{row.output_file_id.slice(0, 5)}...</p>
                      <Image
                        src={CopyIcon}
                        className="cursor-pointer"
                        onClick={() => navigator.clipboard.writeText(row.output_file_id)}
                        alt="input_id"
                        priority
                      />
                      <Image
                        className="cursor-pointer"
                        src={PlayIconSm}
                        onClick={() => {
                          handleVideoPreview(row.output_file_id)
                          setVideoPreviewModal(true)
                        }}
                        alt="play icon"
                      />
                      <Image
                        className="cursor-pointer"
                        src={DownloadIcon}
                        onClick={() => {
                          handleVideoDownload(row.output_file_id)
                        }}
                        alt="download icon"
                      />
                    </div>
                  )}
              </TableCell>
              <TableCell
                sx={{
                  border: "none",
                }}
                padding="none"
                width={50}

              >
                <Menu
                  handleCopy={() => navigator.clipboard.writeText(row.output_file_id)}
                  handleDownload={() => handleVideoDownload(row.output_file_id)}
                  handlePreview={() => {
                    handleVideoPreview(row.output_file_id)
                    setVideoPreviewModal(true)
                  }}
                />
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}