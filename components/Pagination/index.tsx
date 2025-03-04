import React from "react";
import {useRouter} from "next/router";

import {FaCircleChevronLeft, FaCircleChevronRight} from "react-icons/fa6";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ totalPages, currentPage, onPageChange }: PaginationProps) {
  const router = useRouter();

  const handlePageClick = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
      router.push(`?page=${page}`, undefined, { shallow: true });
    }
  };

  const getPageNumbers = () => {
    const pages: number[] = [];
    const lastPage: number = totalPages;
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    pages.push(1);

    if (startPage > 2) {
      // @ts-ignore
      pages.push("...");
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages - 1) {
      // @ts-ignore
      pages.push("...");
    }

    if (totalPages > 1) {
      pages.push(lastPage);
    }

    return pages;
  };


  return (
    <div className="flex justify-end items-center space-x-2 mt-6 pt-[48px] pb-[61px]">
      <FaCircleChevronLeft
        onClick={() => {
          if(currentPage>1) {
            handlePageClick(currentPage - 1)
          }
        }}
        //@ts-ignore
        disabled={currentPage === 1}
        size={24}
        color={currentPage === 1 ? "white" : "#4f4f4f"}
        className={currentPage === 1 ? "bg-[#afafaf] border-[1px] rounded-full" : "bg-[white] rounded-full"}
      />


      {getPageNumbers().map((page, index) =>
        typeof page === "number" ? (
          <button
            key={index}
            onClick={() => handlePageClick(page)}
            className={`font-lato font-medium  text-[10px] leading-[10px] text-[#404b52] px-[9px] py-[7px] rounded-full border ${currentPage === page ? "bg-[#6f6f6f] text-[#ffffff] border-blue-500" : "hover:bg-gray-100 border-gray-400"}`}
          >
            {page}
          </button>
        ) : (
          <span key={index} className="px-2 text-gray-500">...</span>
        )
      )}

      <FaCircleChevronRight
        onClick={() => {
          if(currentPage < totalPages) {
            handlePageClick(currentPage + 1)
          }
        }}
        //@ts-ignore
        disabled={currentPage === totalPages}
        size={24}
        color={currentPage === totalPages ? "white" : "#4f4f4f"}
        className={currentPage === totalPages ? "bg-[#afafaf] border-[1px] rounded-full" : "bg-[white] rounded-full"}
      />
    </div>
  );
};