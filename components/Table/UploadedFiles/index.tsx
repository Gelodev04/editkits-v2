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
import Typography from "@/components/Typography";

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
                <Typography variant="b4" label={col.name} bold/>
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
                <Typography label={row.file_name} className="font-lato font-normal text-sm leading-[19.6px] text-[#4f4f4f]"/>
              </TableCell>
              <TableCell sx={{border: "none"}} align="left">
                <Typography label={row.size} className="font-lato font-normal text-sm leading-[19.6px] text-[#4f4f4f]"/>
              </TableCell>
              <TableCell sx={{border: "none"}} align="left">
                <Typography label={row.created_at} className="font-lato font-normal text-sm leading-[19.6px] text-[#4f4f4f]"/>
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