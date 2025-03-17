import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {tableColumns} from "@/lib/constants";
import TableCell from "@mui/material/TableCell";
import Typography from "@/components/Typography";
import TableBody from "@mui/material/TableBody";
import Image from "next/image";
import StatusTag from "@/components/Table/StatusTag";
import {BsThreeDotsVertical} from "react-icons/bs";
import * as React from "react";
import CopyIcon from "@/public/assets/icons/copy.svg";
import Success from "@/public/assets/icons/success.svg";
import Failed from "@/public/assets/icons/failed.svg";
import Progress from "@/public/assets/icons/pending.svg";

export default function JobStatusTable({data, search}: { data: any; search: string }) {
  return (
    <TableContainer className="p-2">
      <Table
        aria-label="simple table"
      >
        <TableHead sx={{backgroundColor: "#f0f0f0"}}>
          <TableRow>
            {tableColumns.map(col => (
              <TableCell key={col.name} align="left">
                <p className="font-lato font-bold text-xs leading-[16.8px]  text-[#201D23]">{col.name}</p>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.filter((row: any) => row.file_name.toLowerCase().includes(search)).map((row: any) => (
            <TableRow
              key={row.input_id}
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
                    src={row.icon}
                    alt="icon"
                    layout="fill"
                    objectFit="cover"
                    priority
                    quality={75}
                  />

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
              <TableCell align="left">
                <div className="flex items-center gap-8">
                  <p className="font-lato text-sm font-normal text-[#4f4f4f] leading-[19.6px]">{row.input_id}</p>
                  <Image
                    src={CopyIcon}
                    className="cursor-pointer"
                    onClick={() => navigator.clipboard.writeText(row.input_id)}
                    alt="input_id"
                    priority
                  />
                </div>
              </TableCell>
              <TableCell sx={{border: "none"}} align="left">
                <p className="font-lato text-sm font-normal text-[#4f4f4f] leading-[19.6px]">{row.file_name}</p>

              </TableCell>
              <TableCell sx={{border: "none"}} align="left">
                <Typography label="View Details" variant="bl3" underline/>
              </TableCell>
              <TableCell sx={{border: "none"}} align="left">
                <p className="font-lato text-sm font-normal text-[#4f4f4f] leading-[19.6px]">{row.credits_used}</p>
              </TableCell>
              <TableCell sx={{border: "none"}} align="left">
                <StatusTag status={row.status} />
              </TableCell>
              <TableCell align="left">
                <div className="flex items-center gap-8">
                  <p className="font-lato text-sm font-normal text-[#4f4f4f] leading-[19.6px]">{row.input_id}</p>
                  <Image
                    src={CopyIcon}
                    className="cursor-pointer"
                    onClick={() => navigator.clipboard.writeText(row.input_id)}
                    alt="input_id"
                    priority
                  />
                </div>
              </TableCell>
              <TableCell sx={{border: "none"}} align="left">
                <p className="font-lato text-sm font-normal text-[#4f4f4f] leading-[19.6px]">{row.created_at}</p>
              </TableCell>
              <TableCell
                sx={{border: "none"}}
                align="left">
                <BsThreeDotsVertical
                  color="#4f4f4f"
                  cursor="pointer"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}