import { useApolloClient } from "@apollo/client";
import { Popover, Transition } from "@headlessui/react";
import { LockOpenIcon } from "@heroicons/react/outline";
import Link from "next/link";
import React, { Fragment } from "react";
import { APP_PAGE_ROUTE, COOKIE_NAME } from "../../../constants";
import { MeQuery, useLogoutMutation } from "../../../lib/graphql";
import { LogoutIcon, MyUserIcon } from "../../global/icons/Icons";
import { LoadingSpinner } from "../../global/LoadingSpinner";
import { userMenuItems } from "../userMenuItems";
interface MyPagesPopoverProps extends React.HTMLAttributes<HTMLDivElement> {
  currentUser?: MeQuery["me"];
}

export const MyPagesPopover = ({
  currentUser,
  ...props
}: MyPagesPopoverProps) => {
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
              <Popover.Panel className="absolute -left-14 z-10 mt-12 w-80 max-w-sm -translate-x-1/2 transform px-2 sm:px-0 lg:max-w-3xl">
                <div className="overflow-hidden shadow-lg ">
                  <div className="relative grid gap-6 border-l-black border-r-black border-b-black border-opacity-5 bg-white px-4 py-8  ">
                    {userMenuItems.map((item) => (
                      <Link href={item.href} key={item.name}>
                        <a>
                          <PopoverItemContainer>
                            <p className="text-app-dark text-base">
                              {item.name}
                            </p>
                            <PopoverIconContainer>
                              <item.icon aria-hidden="true" className="w-8" />
                            </PopoverIconContainer>
                          </PopoverItemContainer>
                        </a>
                      </Link>
                    ))}
                    {currentUser && currentUser.isAdmin && (
                      <Link href={APP_PAGE_ROUTE.ADMIN}>
                        <a>
                          <PopoverItemContainer>
                            <p className="text-app-dark text-base">
                              Admin panel
                            </p>
                            <PopoverIconContainer>
                              <LockOpenIcon
                                aria-hidden="true"
                                className="h-8 w-8 font-light text-black"
                              />
                            </PopoverIconContainer>
                          </PopoverItemContainer>
                        </a>
                      </Link>
                    )}
                    <button
                      onClick={async () => {
                        if (isLogoutUserLoading) {
                          return;
                        }
                        try {
                          const response = await logoutUser();
                          if (response.data) {
                            localStorage.removeItem(COOKIE_NAME.ACCESS_TOKEN);
                            await apollo.resetStore();
                            window.location.reload();
                          }
                        } catch {
                          // TODO: handle logout error
                        }
                      }}
                    >
                      <PopoverItemContainer>
                        <span className="text-app-dark text-base">Log out</span>
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
      className="-m-3 ml-0 flex items-center justify-between p-2 transition duration-150 ease-in-out hover:underline focus:outline-none focus-visible:ring focus-visible:ring-black focus-visible:ring-opacity-50"
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
      className="flex h-10 w-10 items-center justify-center text-white sm:h-12 sm:w-12"
    >
      {children}
    </div>
  );
};
