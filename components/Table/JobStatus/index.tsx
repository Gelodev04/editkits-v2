import Image from "next/image";

import {TableContainer, Table, TableHead, TableRow, TableCell, TableBody} from "@mui/material";

import StatusTag from "@/components/Table/StatusTag";
import {tableColumns} from "@/lib/constants";

import CopyIcon from "@/public/assets/icons/copy.svg";
import Success from "@/public/assets/icons/success.svg";
import Failed from "@/public/assets/icons/failed.svg";
import Progress from "@/public/assets/icons/pending.svg";
import ExpiredIcon from "@/public/assets/icons/expired_icon.svg"
import {PiPlayCircleLight} from "react-icons/pi";
import {IoDownloadOutline} from "react-icons/io5";

import PlayIcon from "@/public/assets/icons/play.png";
import Menu from "@/components/Menu";

export default function JobStatusTable({data, search}: { data: any; search: string }) {

  return (
    <TableContainer className="px-[42px]">
      <Table
        aria-label="simple table"
      >
        <TableHead sx={{backgroundColor: "#f0f0f0"}}>
          <TableRow>
            {tableColumns.map(col => (
              <TableCell key={col.name} align="center">
                <p className="font-lato font-bold text-xs leading-[16.8px]  text-[#201D23]">{col.name}</p>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.filter((row: any) => row.input_file_name.toLowerCase().includes(search)).map((row: any) => (
            <TableRow
              key={row.input_file_id}
              sx={{
                '&:last-child td, &:last-child th': {border: "none"},
                '&:nth-of-type(even)': {backgroundColor: '#fcfcfc'},
              }}
            >
              <TableCell sx={{border: "none"}} component="th" scope="row">
                <div
                  style={{
                    position: "relative",
                    width: "80px",
                    height: "47px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
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

                  {row.thumbnail_url !== "EXPIRED" &&
                  <Image src={PlayIcon} className="absolute" width={50} height={50} alt="play icon"/>}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "-6px",
                      right: "-5px",
                    }}
                  >
                    <Image
                      src={row.status === "Success" ? Success : row.status === "Failed" ? Failed : Progress}
                      alt="success-icon"
                      priority
                    />
                  </div>
                </div>
              </TableCell>
              <TableCell align="center">
                <div className="flex items-center gap-[12px]">
                  <p
                    className="font-lato text-sm font-normal text-[#4f4f4f] leading-[19.6px]">#{row.input_file_id.slice(0, 5)}</p>
                  <Image
                    src={CopyIcon}
                    className="cursor-pointer"
                    onClick={() => navigator.clipboard.writeText(row.input_file_id)}
                    alt="input_id"
                    priority
                  />
                </div>
              </TableCell>
              <TableCell sx={{border: "none"}} align="left">
                <p className="font-lato text-sm font-normal text-[#4f4f4f] leading-[19.6px]">{row.input_file_name}</p>
              </TableCell>
              <TableCell sx={{border: "none"}} align="center">
                <p>{new Date(row.created_at * 1000).toLocaleDateString('en-GB') + " " + new Date(row.created_at * 1000).toLocaleTimeString('en-GB')}</p>
              </TableCell>
              <TableCell sx={{border: "none"}} align="center">
                <p className="font-lato text-sm font-normal text-[#4f4f4f] leading-[19.6px]">{row.tools_used}</p>
              </TableCell>
              <TableCell sx={{border: "none"}} align="center">
                <p className="font-lato font-normal text-sm leading-[19.6px] text-[#4f4f4f]">{row.credits}</p>
              </TableCell>
              <TableCell align="left">
                <StatusTag status={row.status}/>
              </TableCell>
              <TableCell sx={{border: "none"}} align="center">
                {row.is_multi_output ? row.output_file_ids?.map(id => (
                  <div className="flex items-center gap-[6.75px]">
                    <div className="flex items-center gap-[12px]">
                      <p className="font-lato text-sm font-normal text-[#4f4f4f] leading-[19.6px]">#{id.slice(0, 5)}</p>
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
                    <div className="flex items-center gap-[10px]">
                      <div className="flex items-end gap-[18px]">
                        <p className="font-lato text-sm font-normal text-[#4f4f4f] leading-[19.6px]">#{row.output_file_id.slice(0, 5)}</p>
                        <Image
                          src={CopyIcon}
                          className="cursor-pointer"
                          onClick={() => navigator.clipboard.writeText(row.output_file_id)}
                          alt="input_id"
                          priority
                        />
                      </div>
                      <PiPlayCircleLight className="cursor-pointer" size={24}/>
                      <IoDownloadOutline className="cursor-pointer" size={22}/>
                    </div>
                  )}
              </TableCell>
              <TableCell
                sx={{
                  border: "none",

                }}
                align="center"

              >
                <Menu />
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}