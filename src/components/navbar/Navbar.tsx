import {
  SearchIcon,
  ShoppingBagIcon,
  UserIcon,
} from "@heroicons/react/outline";
import Link from "next/link";
import React from "react";
import { APP_NAME, APP_PAGE_ROUTE } from "../../constants";
import { useMeQuery } from "../../lib/graphql";
interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const { data, loading, error } = useMeQuery();
  return (
    <div className="text-center text-sm ">
      <div
        className="py-8"
        style={{
          boxShadow: "0 4px 8px 0 rgb(0 0 0 / 4%)",
        }}
      >
        <div className="max-w-[85rem] mx-auto">
          <div className="flex justify-between">
            <div className="flex items-center space-x-2">
              {/* open search modal button */}
              <SearchIcon className="w-5 " />
              <div className="opacity-50">search</div>
            </div>
            <div>
              <Link href={APP_PAGE_ROUTE.INDEX}>
                <a className="text-[32px] uppercase font-bold">{APP_NAME}</a>
              </Link>
            </div>
            <div className="flex items-center space-x-9">
              <Link href={APP_PAGE_ROUTE.LOGIN}>
                <a className="flex items-center space-x-3">
                  <p className="font-medium">Sign In</p>
                  <UserIcon className="w-6 text-staytard-dark" />
                </a>
              </Link>
              <ShoppingBagIcon className="w-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
