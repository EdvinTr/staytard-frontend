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
    variables: { input: { resultLimit: 10, searchTerm: "" } },
    fetchPolicy: "no-cache",
    skip: isSkip,
  });
  /* const [fetchProducts, { data }] = useSearchProductsLazyQuery({
    fetchPolicy: "no-cache",
  }); */
  useEffect(() => {
    setSearchTerm("");
  }, [show]);
  useEffect(() => {
    refetch({ input: { resultLimit: 10, searchTerm: debouncedSearchTerm } });
    /* fetchProducts({
      variables: { input: { resultLimit: 10, searchTerm: debouncedValue } },
    }); */
  }, [debouncedSearchTerm, refetch]);
  return (
    <Modal onClose={onClose} show={show}>
      <div className="px-12 py-4">
        <div className="flex items-center justify-between border-b border-black border-opacity-20">
          <div className="flex w-full items-center">
            <SearchIcon className="w-6" />
            <input
              type="text"
              placeholder="Search"
              className="w-full border-none border-black focus:ring-0"
              autoFocus
              onChange={handleChange}
              value={searchTerm}
            />
          </div>
          <button aria-label="close" onClick={onClose}>
            <XIcon className="w-6" />
          </button>
        </div>
        {/* results */}
        <div className="mt-6 space-y-6">
          {searchTerm.length > 0 &&
            data?.searchProducts.map((prod, idx) => {
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
      </div>
    </Modal>
  );
};
