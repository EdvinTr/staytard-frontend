import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/solid";
import { useWindowWidth } from "@react-hook/window-size";
import React from "react";
import ReactPaginate from "react-paginate";

interface MyPaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  disableInitialCallback?: boolean;
}

export const MyPagination = ({
  currentPage,
  disableInitialCallback,
  onPageChange,
  totalPages,
}: MyPaginationProps) => {
  const currentWindowWidth = useWindowWidth();
  return (
    <ReactPaginate
      containerClassName="flex items-center space-x-5"
      breakLabel="..."
      activeLinkClassName="bg-staytard-dark text-staytard-yellow border-none"
      pageLinkClassName="border border-gray-300 rounded-md px-3 py-2 text-sm font-semibold"
      previousLabel={<ArrowLeftIcon className="h-4" />}
      nextLabel={<ArrowRightIcon className="h-4" />}
      onPageChange={(page) => onPageChange(page.selected)}
      pageRangeDisplayed={2}
      marginPagesDisplayed={currentWindowWidth >= 768 ? 3 : 1}
      pageCount={totalPages}
      nextAriaLabel="Next"
      initialPage={currentPage}
      previousAriaLabel="Previous"
      disableInitialCallback={disableInitialCallback}
    />
  );
};
