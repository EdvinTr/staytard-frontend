import { useApolloClient } from "@apollo/client";
import { Popover, Transition } from "@headlessui/react";
import Link from "next/link";
import React, { Fragment } from "react";
import { APP_PAGE_ROUTE } from "../../../constants";
import { useLogoutMutation } from "../../../lib/graphql";
import {
  LogoutIcon,
  MyOrdersIcon,
  MyPriceTagIcon,
  MyUserIcon,
} from "../../global/icons/Icons";
import { LoadingSpinner } from "../../global/LoadingSpinner";
interface MyPagesPopoverProps extends React.HTMLAttributes<HTMLDivElement> {}

interface PopoverItem {
  name: string;
  href: APP_PAGE_ROUTE;
  icon: any;
}
const popoverItems: PopoverItem[] = [
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
];

export const MyPagesPopover = ({ ...props }: MyPagesPopoverProps) => {
  const [logoutUser, { data, error, loading: isLogoutUserLoading }] =
    useLogoutMutation();
  const apollo = useApolloClient();
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
              enterFrom="opacity-0 translate-y-4"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-4"
            >
              <Popover.Panel className="absolute z-10 w-80 max-w-sm px-2 mt-12 transform -translate-x-1/2 -left-14 sm:px-0 lg:max-w-3xl">
                <div className="overflow-hidden shadow-lg ">
                  <div className="relative grid gap-6 bg-white px-4 py-8 border-l-black border-r-black border-b-black border-opacity-5  ">
                    {popoverItems.map((item) => (
                      <Link href={item.href} key={item.name}>
                        <a>
                          <PopoverItemContainer>
                            <p className="text-base text-staytard-dark">
                              {item.name}
                            </p>
                            <PopoverIconContainer>
                              <item.icon aria-hidden="true" className="w-8" />
                            </PopoverIconContainer>
                          </PopoverItemContainer>
                        </a>
                      </Link>
                    ))}
                    <button>
                      <PopoverItemContainer
                        onClick={async () => {
                          if (isLogoutUserLoading) {
                            return;
                          }
                          try {
                            await apollo.resetStore();
                            const response = await logoutUser();
                            if (response.data) {
                              window.location.reload();
                            }
                          } catch {
                            // TODO: handle logout error
                          }
                        }}
                      >
                        <span className="text-base text-staytard-dark">
                          Log out
                        </span>
                        <PopoverIconContainer>
                          {isLogoutUserLoading ? (
                            <LoadingSpinner size={30} />
                          ) : (
                            <LogoutIcon className="w-8" />
                          )}
                        </PopoverIconContainer>
                      </PopoverItemContainer>
                    </button>
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
      className="ml-0 flex items-center justify-between p-2 -m-3 transition duration-150 ease-in-out hover:underline focus:outline-none focus-visible:ring focus-visible:ring-black focus-visible:ring-opacity-50"
    >
      {children}
    </div>
  );
};

const PopoverIconContainer: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  ...props
}) => {
  return (
    <div
      {...props}
      className="flex items-center justify-center w-10 h-10 text-white sm:h-12 sm:w-12"
    >
      {children}
    </div>
  );
};
