import { ChevronLeftIcon } from "@heroicons/react/solid";
import { useWindowSize } from "@react-hook/window-size";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { APP_NAME, APP_PAGE_ROUTE } from "../constants";
import { useSsrCompatible } from "../hooks/useSsrCompatible";
import { MyContainer } from "./MyContainer";
interface AppHeaderProps {}

export const AppHeader: React.FC<AppHeaderProps> = () => {
  const router = useRouter();
  const [width, height] = useSsrCompatible(useWindowSize(), [0, 0]);

  return (
    <MyContainer>
      <header className="relative text-center pt-6 max-w-3xl mx-auto">
        <div className="absolute  top-6">
          <button
            className="flex items-center hover:underline uppercase font-light text-13 tracking-widest"
            onClick={() => router.back()}
            role="link"
          >
            <ChevronLeftIcon className="w-4" />
            {width > 640 ? "Back" : ""}
          </button>
        </div>
        <Link href={APP_PAGE_ROUTE.INDEX}>
          <a className="text-4xl uppercase font-bold">{APP_NAME}</a>
        </Link>
      </header>
    </MyContainer>
  );
};
