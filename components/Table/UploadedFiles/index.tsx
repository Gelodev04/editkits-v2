import * as React from "react";
import Image from "next/image";

import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {BsThreeDotsVertical} from "react-icons/bs";

import CopyIcon from '@/assets/img/icons/copy.svg';
import {uploadedFilesColumns} from "@/lib/constants";

type UploadedFilesTableProps = {
  search: string;
  data: any
}

export default function UploadedFilesTable(props: UploadedFilesTableProps) {
  return (
    <TableContainer component={Paper} className="min-h-full">
      <Table sx={{minWidth: 650}} aria-label="simple table">
        <TableHead sx={{backgroundColor: "#f0f0f0"}}>
          <TableRow>
            {uploadedFilesColumns.map(col => (
              <TableCell align="left">
                <p className="font-lato font-bold text-xs leading-[16.8px]  text-[#201D23]">{col.name}</p>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.filter((row: any) => row.file_name.toLowerCase().includes(props.search)).map((row: any) => (
            <TableRow
              key={row.input_id}
              sx={{
                '&:last-child td, &:last-child th': {border: "none"},
                '&:nth-of-type(even)': { backgroundColor: '#fcfcfc' },
              }}
            >
              <TableCell width={172} height={92} sx={{border: "none"}} component="th" scope="row">
                <Image className="rounded-md bg-[#000000] p-[2px]" src={row.icon} alt="icon" objectFit="cover" />
              </TableCell>
              <TableCell align="left">
                <div className="flex items-center gap-8">
                  <p className="font-lato text-sm font-normal text-[#4f4f4f] leading-[19.6px]">{row.input_id}</p>
                  <Image
                    src={CopyIcon}
                    className="cursor-pointer"
                    onClick={() => navigator.clipboard.writeText(row.input_id)}
                    alt="input_id"
                  />
                </div>
              </TableCell>
              <TableCell sx={{border: "none"}} align="left">
                <p className="font-lato text-sm font-normal text-[#4f4f4f] leading-[19.6px]">{row.file_name}</p>
              </TableCell>
              <TableCell sx={{border: "none"}} align="left">
                <p className="font-lato text-sm font-normal text-[#4f4f4f] leading-[19.6px]">{row.size}</p>
              </TableCell>
              <TableCell sx={{border: "none"}} align="left">
                <p className="font-lato text-sm font-normal text-[#4f4f4f] leading-[19.6px]">{row.created_at}</p>
              </TableCell>
              <TableCell width={10} sx={{border: "none"}}>
                <BsThreeDotsVertical color="#4f4f4f" cursor="pointer"/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}