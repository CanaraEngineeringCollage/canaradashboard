"use client";

import React from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

type Props = {
  currentPage: number;
  totalPages: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
  className?: string;
};

const TablePagination: React.FC<Props> = ({
  currentPage,
  totalPages,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  className = "",
}) => {
  const rowsOptions = [10, 25, 50, 100];

  const gotoFirst = () => onPageChange(1);
  const gotoLast = () => onPageChange(totalPages);
  const gotoPrev = () => onPageChange(Math.max(1, currentPage - 1));
  const gotoNext = () => onPageChange(Math.min(totalPages, currentPage + 1));

  const disabledFirstPrev = currentPage <= 1;
  const disabledNextLast = currentPage >= totalPages;

  return (
    <div className={`w-full ${className}`}>
      <div className="bg-white border rounded-md shadow-sm p-2 flex flex-col sm:flex-row items-center justify-between gap-2">
        {/* Rows per page selector */}
        <div className="flex items-center space-x-2">
          <label className="text-sm text-gray-600">Rows per page:</label>
          <select
            value={rowsPerPage}
            onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
            className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-300"
          >
            {rowsOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* Page info (center on mobile, inline on desktop) */}
        <div className="text-sm text-gray-700 text-center sm:text-left">
          Page {currentPage} of {totalPages}
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center space-x-1">
          <button
            onClick={gotoFirst}
            disabled={disabledFirstPrev}
            aria-label="first page"
            className={`p-2 rounded text-sm border bg-white hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed ${
              disabledFirstPrev ? "" : "shadow-sm"
            }`}
          >
            <ChevronsLeft size={16} />
          </button>
          <button
            onClick={gotoPrev}
            disabled={disabledFirstPrev}
            aria-label="previous page"
            className={`p-2 rounded text-sm border bg-white hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed ${
              disabledFirstPrev ? "" : "shadow-sm"
            }`}
          >
            <ChevronLeft size={16} />
          </button>

          <button
            onClick={gotoNext}
            disabled={disabledNextLast}
            aria-label="next page"
            className={`p-2 rounded text-sm border bg-white hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed ${
              disabledNextLast ? "" : "shadow-sm"
            }`}
          >
            <ChevronRight size={16} />
          </button>
          <button
            onClick={gotoLast}
            disabled={disabledNextLast}
            aria-label="last page"
            className={`p-2 rounded text-sm border bg-white hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed ${
              disabledNextLast ? "" : "shadow-sm"
            }`}
          >
            <ChevronsRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TablePagination;
