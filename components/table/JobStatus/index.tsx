import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {tableColumns} from "@/lib/constants";
import TableCell from "@mui/material/TableCell";
import Typography from "@/components/Typography";
import TableBody from "@mui/material/TableBody";
import Image from "next/image";
import {IoCopyOutline} from "react-icons/io5";
import StatusTag from "@/components/table/StatusTag";
import {BsThreeDotsVertical} from "react-icons/bs";
import * as React from "react";
import styled from "styled-components";

const StyledTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(even)': {
    backgroundColor: "#fcfcfc",
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function JobStatusTable({data, search}) {
  return (
    <TableContainer component={Paper} className="border-none p-2">
      <Table aria-label="simple table">
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
            <StyledTableRow
              key={row.input_id}
              sx={{'&:last-child td, &:last-child th': {border: "none"}}}
            >
              <TableCell sx={{border: "none"}} component="th" scope="row">
                <Image src={row.icon} alt="icon"/>
              </TableCell>
              <TableCell className="flex items-center gap-2 center border-none mt-3.5" align="left">
                <Typography label={row.input_id} variant="b3"/>
                <IoCopyOutline className="cursor-pointer" onClick={() => navigator.clipboard.writeText(row.input_id)}
                               color="#4f4f4f"/>
              </TableCell>
              <TableCell sx={{border: "none"}} align="left">
                <Typography label={row.file_name} variant="b3"/>
              </TableCell>
              <TableCell sx={{border: "none"}} align="left">
                <Typography label="View Details" variant="bl3" underline/>
              </TableCell>
              <TableCell sx={{border: "none"}} align="left">
                <Typography label={row.credits_used} variant="b3"/>
              </TableCell>
              <TableCell sx={{border: "none"}} align="left">
                <StatusTag status={row.status}/>
              </TableCell>
              <TableCell className="flex items-center gap-2 center border-none mt-3.5" align="left">
                <Typography label={row.input_id} variant="b3"/>
                <IoCopyOutline className="cursor-pointer" onClick={() => navigator.clipboard.writeText(row.output_id)}
                               color="#4f4f4f"/>
              </TableCell>
              <TableCell sx={{border: "none"}} align="left">
                <Typography label={row.created_at} variant="b3"/>
              </TableCell>
              <TableCell sx={{border: "none"}} align="left"><BsThreeDotsVertical cursor="pointer"/></TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}