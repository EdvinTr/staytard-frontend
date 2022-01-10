import { Popover, Transition } from "@headlessui/react";
import Link from "next/link";
import React, { Fragment } from "react";
import { APP_PAGE_ROUTE } from "../../../constants";
import {
  LogoutIcon,
  MyOrdersIcon,
  MyPriceTagIcon,
  MyUserIcon,
} from "../../icons/Icons";
interface MyPagesPopoverProps extends React.HTMLAttributes<HTMLDivElement> {}

const solutions = [
  {
    name: "My orders",
    href: APP_PAGE_ROUTE.MY_ORDERS,
    icon: MyOrdersIcon,
  },
  {
    name: "My offers",
    href: APP_PAGE_ROUTE.MY_OFFERS,
    icon: MyPriceTagIcon,
  },
  {
    name: "My profile",
    href: APP_PAGE_ROUTE.MY_PROFILE,
    icon: MyUserIcon,
  },
  {
    name: "Log out",
    href: "##",
    icon: LogoutIcon,
  },
];

export const MyPagesPopover = ({ ...props }: MyPagesPopoverProps) => {
  const createPopoverLink = () => {};
  return (
    <div className={`px-4 ${props.className}`} {...props}>
      <Popover className="relative ">
        {({ open }) => (
          <>
            <Popover.Button className="flex items-center space-x-3">
              <p className="font-medium ">My pages</p>
              <MyUserIcon className="w-6" />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 w-80 max-w-sm  px-2 mt-8 transform -translate-x-1/2 -left-14   sm:px-0 lg:max-w-3xl">
                <div className="overflow-hidden  shadow-lg ">
                  <div className="relative grid gap-8 bg-white px-4 py-8 border-l-black border-r-black border-b-black border-opacity-5  ">
                    {solutions.map((item) => (
                      <Link href={item.href} key={item.name}>
                        <a className="flex items-center justify-between  p-2 -m-3 transition duration-150 ease-in-out  hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-staytard-yellow focus-visible:ring-opacity-50">
                          <div className="ml-4">
                            <p className="text-base text-staytard-dark">
                              {item.name}
                            </p>
                          </div>
                          <div className="flex items-center justify-center  w-10 h-10 text-white sm:h-12 sm:w-12">
                            <item.icon aria-hidden="true" className="w-8" />
                          </div>
                        </a>
                      </Link>
                    ))}
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
