import { Popover, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useMemo } from "react";

export enum PRODUCT_SORT_BY {
  UNIT_PRICE = "currentPrice",
}
export enum SORT_DIRECTION {
  ASC = "ASC",
  DESC = "DESC",
}

const sortOptionsMap = {
  currentPriceDESC: {
    name: "Highest price",
    alias: PRODUCT_SORT_BY.UNIT_PRICE + SORT_DIRECTION.DESC,
    query: {
      sortBy: PRODUCT_SORT_BY.UNIT_PRICE,
      sortDirection: SORT_DIRECTION.DESC,
    },
  },
  currentPriceASC: {
    name: "Lowest price",
    alias: PRODUCT_SORT_BY.UNIT_PRICE + SORT_DIRECTION.ASC,
    query: {
      sortBy: PRODUCT_SORT_BY.UNIT_PRICE,
      sortDirection: SORT_DIRECTION.ASC,
    },
  },
};
interface SortProductsPopoverProps {
  totalItems: number;
}

export const SortProductsPopover: React.FC<SortProductsPopoverProps> = ({
  totalItems,
}) => {
  const router = useRouter();
  const { sortBy, sortDirection } = router.query;

  const currentSortValue = Object.values(PRODUCT_SORT_BY).find(
    (v) => v === sortBy
  );
  const currentSortDirection = Object.values(SORT_DIRECTION).find(
    (v) => v === sortDirection
  );

  /**
   * Alias is the sorting key and the sorting direction combined. Used to determine index in the sort options map.
   *  */
  const currentSortAlias = useMemo(() => {
    if (!currentSortDirection || !currentSortValue) {
      return null;
    }
    return currentSortValue + currentSortDirection;
  }, [currentSortDirection, currentSortValue]);

  const calculateIsActiveLink = (alias: string) => {
    if (!currentSortDirection || !currentSortValue) {
      return null;
    }
    return alias === currentSortValue + currentSortDirection;
  };

  return (
    <div className={`md:px-4 `}>
      <Popover className="relative ">
        {({ open }) => (
          <>
            <Popover.Button className=" ">
              <p className="relative flex">
                {totalItems} hits. Sort on
                <span className="pl-1 font-bold">
                  {
                    Object.values(sortOptionsMap).find((v, _) => {
                      return v.alias === currentSortAlias;
                    })?.name
                  }
                </span>
                {open ? (
                  <ChevronUpIcon className="w-6" />
                ) : (
                  <ChevronDownIcon className="w-6" />
                )}
              </p>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-4"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-4"
            >
              <Popover.Panel className="absolute -left-2 z-10 mt-3 w-80 max-w-sm -translate-x-1/2 transform px-2 ">
                <div className="overflow-hidden shadow-lg ">
                  <div className="relative grid gap-8 border-l-black border-r-black border-b-black border-opacity-5 bg-white px-4 py-8  ">
                    {Object.values(sortOptionsMap).map((sortItem, idx) => {
                      const isActiveLink = calculateIsActiveLink(
                        sortItem.alias
                      );
                      return (
                        <PopoverItemContainer key={idx}>
                          <Link
                            href={{
                              pathname: router.pathname,
                              query: {
                                ...router.query,
                                ...sortItem.query,
                              },
                            }}
                          >
                            {isActiveLink ? (
                              <a className="underline-from-left-to-right relative flex font-bold ">
                                <CheckIcon className="absolute -left-5 mt-[1.5px] w-4" />
                                {sortItem.name}
                              </a>
                            ) : (
                              <a className="underline-from-left-to-right">
                                {sortItem.name}
                              </a>
                            )}
                          </Link>
                        </PopoverItemContainer>
                      );
                    })}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
};

const PopoverItemContainer: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  ...props
}) => {
  return (
    <div
      {...props}
      className="-m-3 ml-0 flex items-center justify-between p-2 px-4 transition duration-150 ease-in-out  focus:outline-none focus-visible:ring focus-visible:ring-black focus-visible:ring-opacity-50"
    >
      {children}
    </div>
  );
};
