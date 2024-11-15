import * as React from "react";
import {FaCircleChevronLeft, FaCircleChevronRight} from "react-icons/fa6";

export default function Pagination({totalPages, page, setPage}) {

  const goToPage = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    if (totalPages <= 4) {
      for (let i = 1; i <= totalPages - 1; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => goToPage(i)}
            className={`${
              page === i ? "bg-gray-700 text-white" : "text-xs text-gray-500 bg-gray-200"
            } px-2 py-1 rounded-full text-xs`}
          >
            {i}
          </button>
        );
      }
    } else {
      if (page <= 3) {
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(
            <button
              key={i}
              onClick={() => goToPage(i)}
              className={`${
                page === i ? "text-xs bg-gray-700 text-white" : "text-xs text-gray-500 bg-gray-200"
              } px-2 py-1 rounded-full`}
            >
              {i}
            </button>
          );
        }
        if (totalPages > 4) {
          pageNumbers.push(<span key="dots" className="px-2 text-[#2c2c2c]">...</span>);
        }
      } else if (page >= totalPages - 2) {
        pageNumbers.push(
          <button
            key={1}
            onClick={() => goToPage(1)}
            className="text-xs text-gray-500 hover:bg-gray-200 px-3 py-1 rounded-full"
          >
            1
          </button>
        );
        pageNumbers.push(<span key="dots-left" className="px-2 text-[#2c2c2c]">...</span>);
        for (let i = totalPages - 3; i < totalPages; i++) {  // Exclude the last page
          pageNumbers.push(
            <button
              key={i}
              onClick={() => goToPage(i)}
              className={`${
                page === i ? "text-xs bg-gray-700 text-white" : "text-xs text-gray-500 hover:bg-gray-200"
              } px-2 py-1 rounded-full`}
            >
              {i}
            </button>
          );
        }
      } else {
        pageNumbers.push(
          <button
            key={1}
            onClick={() => goToPage(1)}
            className="text-xs text-gray-500 hover:bg-gray-200 px-3 py-1 rounded-full"
          >
            1
          </button>
        );
        pageNumbers.push(<span key="dots-left" className="px-2 text-[#2c2c2c]">...</span>);
        for (let i = page - 1; i <= page + 1; i++) {
          pageNumbers.push(
            <button
              key={i}
              onClick={() => goToPage(i)}
              className={`${
                page === i ? "text-xs bg-gray-700 text-white" : "text-xs text-gray-500 hover:bg-gray-200"
              } px-2 py-1 rounded-full`}
            >
              {i}
            </button>
          );
        }
        pageNumbers.push(<span key="dots-right" className="px-2 text-[#2c2c2c]">...</span>);
      }
    }

    return pageNumbers;
  };


  return (
    <div className="flex items-center space-x-2 bg-[#fcfcfc]">
      <FaCircleChevronLeft
        onClick={() => goToPage(page - 1)}
        color={(page !== 1) && "#4f4f4f"}
        className={`${(page !== 1) && "cursor-pointer"}`}
        size={20}
      />

      {renderPageNumbers()}

      <button disabled={(page === (totalPages - 1))}>
        <FaCircleChevronRight
          onClick={() => goToPage(page + 1)}
          color={(page !== (totalPages - 1)) && "#4f4f4f"}
          className={`${(page !== totalPages) && "cursor-pointer"}`}
          size={20}
        />
      </button>
    </div>
  );
};