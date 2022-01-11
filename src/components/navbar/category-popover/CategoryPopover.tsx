import { Popover, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
interface CategoryPopoverProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CategoryPopover = ({ ...props }: CategoryPopoverProps) => {
  return (
    <div
      className={`px-4 ${props.className ? props.className : ""}`}
      {...props}
    >
      <Popover className="relative ">
        {({ open }) => (
          <>
            <Popover.Button className="flex items-center space-x-3">
              <p className="font-medium text-13 ">Clothes</p>
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
              <Popover.Panel className="absolute top-1/2 px-2 mt-8 sm:px-0">
                <div className="shadow-lg overflow-hidden w-[40rem] p-4 ">
                  <div className="flex">
                    <h1 className="uppercase text-2xl font-bold px-8 border-r border-opacity-20 border-r-staytard-dark">
                      Clothes
                    </h1>
                    <div className="relative grid grid-cols-2 gap-y-6 gap-x-12 bg-white px-8 pb-8 pt-1 border-l-black border-r-black border-b-black border-opacity-5  ">
                      <div>Jeans</div>
                      <div>Pants</div>
                      <div>Sweaters</div>
                      <div>Shirts</div>
                      <div>Overshirts</div>
                      <div>Overshirts</div>
                      <div>Overshirts</div>
                      <div>Overshirts</div>
                      <div>Shorts</div>
                      <div>{`Socks & underwear`}</div>
                    </div>
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
