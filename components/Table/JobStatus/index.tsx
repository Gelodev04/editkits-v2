import Image from "next/image";

import {BsThreeDotsVertical} from "react-icons/bs";
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

export default function JobStatusTable({data, search, optionsModal, setOptionsModal}: { data: any; search: string }) {

  const toggleDropdown = (id) => {
    setOptionsModal(optionsModal === id ? null : id);
  };

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
              <TableCell sx={{border: "none"}} align="center">
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
                {row.output_file_ids?.map(id => (
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
                    <PiPlayCircleLight size={23}/>
                    <IoDownloadOutline size={23}/>
                  </div>
                ))}
              </TableCell>
              <TableCell
                sx={{
                  border: "none",

                }}
                align="center"

              >
                <BsThreeDotsVertical
                  color="#4f4f4f"
                  cursor="pointer"
                  onClick={() => toggleDropdown(row.input_file_id)}
                />
                {optionsModal === row.input_file_id && (
                  <div className="relative">
                    <div
                      className="absolute right-[10px] mt-2 bg-white shadow-md rounded-md w-[150px] p-2 z-auto"
                      style={{
                        right: 10, // Aligns dropdown to the right of the cell
                        minWidth: "120px", // Ensures consistent size
                        whiteSpace: "nowrap", // Prevents text wrapping
                        zIndex: 9999
                      }}
                    >
                      <div onClick={() => setOptionsModal(false)} className="flex items-center gap-[12px] cursor-pointer pb-2">
                        <PiPlayCircleLight size={22}/>
                        <p className="font-lato font-normal text-sm">Play</p>
                      </div>
                      <div onClick={() => setOptionsModal(false)} className="flex items-center gap-[12px] cursor-pointer pb-2">
                        <IoDownloadOutline size={22}/>
                        <p className="font-lato font-normal text-sm">Download</p>
                      </div>
                      <div onClick={() => setOptionsModal(false)} className="flex items-center gap-[12px] cursor-pointer">
                        <Image src={CopyIcon} alt="copy icon" />
                        <p className="font-lato font-normal text-sm">Copy File ID</p>
                      </div>
                    </div>
                  </div>
                )}
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}