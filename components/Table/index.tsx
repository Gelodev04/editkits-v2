import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Image from "next/image";
import Typography from "@/components/Typography";
import styled from "styled-components";
import {tableColumns, uploadedFilesColumns, uploadedFileTableData} from "@/lib/constants";
import {BsThreeDotsVertical} from "react-icons/bs";
import {MdOutlineCalendarMonth} from "react-icons/md";
import Filter from "@/assets/img/table/filter.svg"
import Button from "@/components/Button";
import {IoAdd, IoCopyOutline} from "react-icons/io5";
import StatusTag from "@/components/table/StatusTag";
import {useState} from "react";
import UploadFileModal from "@/components/modals/UploadFileModal";

const StyledTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(even)': {
    backgroundColor: "#fcfcfc",
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function DashboardTable({data, active}) {
  const [search, setSearch] = useState("");
  const [uploadModal, setUploadModal] = useState(false);

  return (
    <div className="bg-white p-2">
      <div className="grid grid-cols-12 items-center gap-3 py-4">
        <div
          className="col-span-4 flex items-center bg-gray-100 rounded-lg px-4 py-2 w-full border-solid border-2 border-[#e1e1e1]">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24"
               stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1112 4.5a7.5 7.5 0 014.35 12.15z"/>
          </svg>
          <input
            type="text"
            placeholder="Search here..."
            className="bg-gray-100 outline-none ml-2 text-sm text-[#737791] w-full"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex gap-8 col-span-4">
          <button className="flex items-center bg-gray-100 rounded-lg px-4 py-2 col-span-3 w-32 gap-2">
            <MdOutlineCalendarMonth color="#4f4f4f" size={20}/>
            <Typography label="All Time" variant="bb3"/>
          </button>

          <button className="flex items-center bg-gray-100 rounded-lg px-4 py-2 col-span-3 w-32 gap-2">
            <Image src={Filter}/>
            <Typography label="Filter" variant="bb3"/>
          </button>
        </div>

        <div className="col-span-4 place-items-end w-full">
          <div className="w-[114px]">
            <Button onClick={() => setUploadModal(true)} width={10} label="New Job" rightIcon={<IoAdd size={20}/>} variant="secondary" filled/>
          </div>
        </div>
      </div>
      {active === "Job status" && <JobStatusTable data={data} search={search}/>}
      {active === "Uploaded files" && <UploadedFilesTable data={uploadedFileTableData} search={search}/>}
      <UploadFileModal uploadModal={uploadModal} setUploadModal={setUploadModal} />
    </div>
  );
}

function JobStatusTable({data, search}) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{minWidth: 650}} aria-label="simple table">
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
                <Image src={row.icon}/>
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

function UploadedFilesTable({data, search}) {
  return (
    <TableContainer component={Paper}>
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
          {data.filter(row => row.file_name.toLowerCase().includes(search)).map((row) => (
            <StyledTableRow
              key={row.input_id}
              sx={{'&:last-child td, &:last-child th': {border: "none"}}}
            >
              <TableCell sx={{border: "none"}} component="th" scope="row">
                <Image src={row.icon}/>
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
                <Typography label={row.size} variant="b3"/>
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