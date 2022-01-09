import { ChevronLeftIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { APP_PAGE_ROUTE } from "../constants";
import { MyContainer } from "./MyContainer";
interface AppHeaderProps {}

export const AppHeader: React.FC<AppHeaderProps> = () => {
  const router = useRouter();
  return (
    <MyContainer>
      <header className="relative text-center pt-4 max-w-3xl mx-auto">
        <div className="absolute  top-6">
          <button
            className="flex items-center hover:underline"
            role="link"
            onClick={() => router.back()}
          >
            <ChevronLeftIcon className="w-4" />
            <a className=" uppercase font-light text-13 tracking-widest">
              back
            </a>
          </button>
        </div>
        <Link href={APP_PAGE_ROUTE.INDEX}>
          <a className="text-4xl uppercase font-bold">Staytard</a>
        </Link>
      </header>
    </MyContainer>
  );
};
