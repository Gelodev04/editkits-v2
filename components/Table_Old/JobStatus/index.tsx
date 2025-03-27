import Image from "next/image";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  TopHeader
} from "@/components/Table";
import Badge from "@/components/Badge";
// import {TableContainer, Table, TableHead, TableRow, TableCell, TableBody} from "@mui/material";

// import StatusTag from "@/components/Table_Old/StatusTag";
import {jobStatusColumns} from "@/lib/constants";

// import CopyIcon from "@/public/assets/icons/copy.svg";
// import PlayIconSm from "@/public/assets/icons/play_sm.svg";
// import DownloadIcon from "@/public/assets/icons/download.svg";
// import Success from "@/public/assets/icons/success.svg";
// import Failed from "@/public/assets/icons/failed.svg";
// import Progress from "@/public/assets/icons/pending.svg";
import ExpiredIcon from "@/public/assets/icons/expired_icon.svg"
// import {PiPlayCircleLight} from "react-icons/pi";
// import {IoDownloadOutline} from "react-icons/io5";
//
// import PlayIcon from "@/public/assets/icons/play.png";
// import Menu from "@/components/Menu";

type JobStatusTableProps = {
  data: any;
  handleVideoPreview: any;
  handleVideoDownload: any;
  setVideoPreviewModal: any;
  videoUrl: any;
}

// const tableData: Product[] = [
//   {
//     id: 1,
//     name: "MacBook Pro 13”",
//     variants: "2 Variants",
//     category: "Laptop",
//     price: "$2399.00",
//     status: "Delivered",
//     image: "/images/product/product-01.jpg", // Replace with actual image URL
//   },
//   {
//     id: 2,
//     name: "Apple Watch Ultra",
//     variants: "1 Variant",
//     category: "Watch",
//     price: "$879.00",
//     status: "Pending",
//     image: "/images/product/product-02.jpg", // Replace with actual image URL
//   },
//   {
//     id: 3,
//     name: "iPhone 15 Pro Max",
//     variants: "2 Variants",
//     category: "SmartPhone",
//     price: "$1869.00",
//     status: "Delivered",
//     image: "/images/product/product-03.jpg", // Replace with actual image URL
//   },
//   {
//     id: 4,
//     name: "iPad Pro 3rd Gen",
//     variants: "2 Variants",
//     category: "Electronics",
//     price: "$1699.00",
//     status: "Canceled",
//     image: "/images/product/product-04.jpg", // Replace with actual image URL
//   },
//   {
//     id: 5,
//     name: "AirPods Pro 2nd Gen",
//     variants: "1 Variant",
//     category: "Accessories",
//     price: "$240.00",
//     status: "Delivered",
//     image: "/images/product/product-05.jpg", // Replace with actual image URL
//   },
// ];

export default function JobStatusTable({
  data,
  // handleVideoPreview,
  // handleVideoDownload,
  // setVideoPreviewModal
}: JobStatusTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <TopHeader />
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              {jobStatusColumns.map(col => (
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  {col.name}
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>

          {/* Table Body */}

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {data.map((product) => (
              <TableRow key={product.id} className="">
                <TableCell className="py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-[50px] w-[50px] overflow-hidden rounded-md">
                      <Image
                        width={50}
                        height={50}
                        src={product.thumbnail_url === "EXPIRED" ? ExpiredIcon : product.thumbnail_url}
                        className="h-[50px] w-[50px]"
                        alt={product.name}
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  #{product.input_file_id.slice(0,5)}...
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {product.input_file_name}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {new Date(product.created_at * 1000).toLocaleDateString('en-GB') + " " + new Date(product.created_at * 1000).toLocaleTimeString('en-GB')}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {product.tools_used}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {product.credits}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <Badge
                    size="sm"
                    //@ts-ignore
                    color={
                      product.status === "SUCCESS"
                        ? "success"
                        : product.status === "IN_PROGRESS"
                        ? "FAILED"
                        : "error"
                    }
                  >
                    {product.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}