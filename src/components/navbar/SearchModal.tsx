import { SearchIcon, XIcon } from "@heroicons/react/solid";
import Link from "next/link";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useDebounce } from "usehooks-ts";
import { APP_PAGE_ROUTE } from "../../constants";
import { useSearchProductsQuery } from "../../lib/graphql";
import { Modal } from "../global/Modal";

interface SearchModalProps {
  onClose: () => void;
  show: boolean;
}

export const SearchModal = ({ onClose, show }: SearchModalProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce<string>(searchTerm, 500);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  const isSkip = debouncedSearchTerm.length === 0 || searchTerm.length === 0;
  const { data, refetch } = useSearchProductsQuery({
    variables: { input: { resultLimit: 20, searchTerm: "" } },
    fetchPolicy: "no-cache",
    skip: isSkip,
  });

  const handleClose = () => {
    setSearchTerm("");
    onClose();
  };

  useEffect(() => {
    refetch({ input: { resultLimit: 20, searchTerm: debouncedSearchTerm } });
  }, [debouncedSearchTerm, refetch]);
  return (
    <Modal onClose={onClose} show={show}>
      <div className="no-scrollbar max-h-[31rem] overflow-auto px-12 py-4">
        <form
          role="search"
          onSubmit={(e) => e.preventDefault()}
          className="flex items-center justify-between border-b border-black border-opacity-20"
        >
          <div className="flex w-full items-center">
            <SearchIcon className="w-6" />
            <input
              data-cy="search-input"
              aria-label="Search for products"
              type="text"
              placeholder="Search"
              className="w-full border-none border-black focus:ring-0"
              autoFocus
              onChange={handleChange}
              value={searchTerm}
            />
          </div>
          <button
            aria-label="close"
            onClick={handleClose}
            data-cy="close-search-modal-button"
          >
            <XIcon className="w-6" />
          </button>
        </form>
        {/* search results */}
        {data && data.searchProducts.length > 0 && (
          <div className="mt-6 space-y-6">
            {data.searchProducts.map((prod, idx) => {
              return (
                <Link href={`${APP_PAGE_ROUTE.PRODUCT}/${prod.id}`} key={idx}>
                  <a
                    onClick={onClose}
                    className="block text-base font-light hover:underline lg:text-xl"
                  >
                    {prod.name}
                  </a>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </Modal>
  );
};
