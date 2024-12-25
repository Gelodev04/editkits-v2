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
import CopyIcon from "@/assets/img/icons/copy.svg";
import Success from "@/assets/img/icons/success.svg";
import Failed from "@/assets/img/icons/failed.svg";
import Progress from "@/assets/img/icons/pending.svg";

export default function JobStatusTable({data, search}) {
  return (
    <TableContainer className="p-2">
      <Table
        aria-label="simple table"
      >
        <TableHead sx={{backgroundColor: "#f0f0f0"}}>
          <TableRow>
            {tableColumns.map(col => (
              <TableCell align="left">
                <Typography variant="b4" label={col.name} bold/>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.filter(row => row.file_name.toLowerCase().includes(search)).map((row) => (
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
                  <Image className="rounded-md" src={row.icon} alt="icon" layout="fill" objectFit="cover"/>

                  <div
                    style={{
                      position: "absolute",
                      bottom: "-6px",
                      right: "-5px",
                    }}
                  >
                    <Image src={row.status === "Success" ? Success : row.status === "Failed" ? Failed : Progress}
                           alt="success-icon"/>
                  </div>
                </div>
              </TableCell>
              <TableCell className="flex items-center gap-2 center border-none mt-3.5" align="left">
              <Typography label={row.input_id} className="font-lato font-normal text-sm leading-[19.6px] text-[#4f4f4f]"/>
              <Image
                src={CopyIcon}
                className="cursor-pointer"
                onClick={() => navigator.clipboard.writeText(row.input_id)}
                alt="input_id"
              />
            </TableCell>
              <TableCell sx={{border: "none"}} align="left">
                <Typography label={row.file_name} className="font-lato font-normal text-sm leading-[19.6px] text-[#4f4f4f]" />
              </TableCell>
              <TableCell sx={{border: "none"}} align="left">
                <Typography label="View Details" variant="bl3" underline/>
              </TableCell>
              <TableCell sx={{border: "none"}} align="left">
                <Typography label={row.credits_used} className="font-lato font-normal text-sm leading-[19.6px] text-[#4f4f4f]"/>
              </TableCell>
              <TableCell sx={{border: "none"}} align="left">
                <StatusTag status={row.status}/>
              </TableCell>
              <TableCell className="flex items-center gap-2 center border-none mt-3.5" align="left">
                <Typography label={row.input_id} className="font-lato font-normal text-sm leading-[19.6px] text-[#4f4f4f]"/>
                <Image
                  src={CopyIcon}
                  className="cursor-pointer"
                  onClick={() => navigator.clipboard.writeText(row.input_id)}
                  alt="input_id"
                />
              </TableCell>
              <TableCell sx={{border: "none"}} align="left">
                <Typography label={row.created_at} className="font-lato font-normal text-sm leading-[19.6px] text-[#4f4f4f]"/>
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