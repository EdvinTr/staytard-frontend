import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/solid";
import React from "react";
import ReactPaginate from "react-paginate";

interface MyPaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const MyPagination = ({
  currentPage,
  onPageChange,
  totalPages,
}: MyPaginationProps) => {
  return (
    <ReactPaginate
      containerClassName="flex items-center space-x-5"
      breakLabel="..."
      activeLinkClassName="bg-staytard-dark text-staytard-yellow"
      pageLinkClassName="border border-gray-300 rounded-md px-3 py-2 text-sm font-semibold text-gray-500"
      previousLabel={<ArrowLeftIcon className="h-4" />}
      nextLabel={<ArrowRightIcon className="h-4" />}
      onPageChange={(page) => onPageChange(page.selected)}
      pageRangeDisplayed={2}
      pageCount={totalPages}
      nextAriaLabel="Next"
      initialPage={currentPage}
      previousAriaLabel="Previous"
    />
  );
};
