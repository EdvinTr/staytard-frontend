import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import React, { Fragment } from "react";
interface SortProductsPopoverProps {
  totalItems: number;
}

export const SortProductsPopover: React.FC<SortProductsPopoverProps> = ({
  totalItems,
}) => {
  return (
    <div className={`md:px-4 `}>
      <Popover className="relative ">
        {({ open }) => (
          <>
            <Popover.Button className=" ">
              <p className="flex relative">
                <div className="">
                  {totalItems} hits. Sort on
                  <span className="font-bold "> popularity</span>
                </div>
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
              <Popover.Panel className="absolute z-10 w-80 max-w-sm px-2 mt-3 transform -translate-x-1/3 left-6 md:left-2  ">
                <div className="overflow-hidden shadow-lg ">
                  <div className="relative grid gap-8 bg-white px-4 py-8 border-l-black border-r-black border-b-black border-opacity-5  ">
                    <PopoverItemContainer>Popularity</PopoverItemContainer>
                    <PopoverItemContainer>
                      Highest Discount
                    </PopoverItemContainer>
                    <PopoverItemContainer>Lowest Discount</PopoverItemContainer>
                    <PopoverItemContainer>Highest price</PopoverItemContainer>
                    <PopoverItemContainer>Lowest price</PopoverItemContainer>
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
      className="ml-0 flex items-center justify-between p-2 px-4 -m-3 transition duration-150 ease-in-out hover:underline focus:outline-none focus-visible:ring focus-visible:ring-black focus-visible:ring-opacity-50"
    >
      {children}
    </div>
  );
};
