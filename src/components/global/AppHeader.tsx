import { ChevronLeftIcon } from "@heroicons/react/solid";
import { useWindowWidth } from "@react-hook/window-size";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { APP_NAME, APP_PAGE_ROUTE } from "../../constants";
import { useSsrCompatible } from "../../hooks/useSsrCompatible";
import { MyContainer } from "./MyContainer";
interface AppHeaderProps {}

export const AppHeader: React.FC<AppHeaderProps> = () => {
  const router = useRouter();
  const currentWindowWidth = useSsrCompatible(useWindowWidth(), 0);

  return (
    <MyContainer>
      <header className="relative mx-auto max-w-3xl py-6 text-center">
        <div className="absolute top-8">
          <button
            className="text-13 flex items-center font-light uppercase tracking-widest hover:underline"
            onClick={() => router.back()}
            role="link"
            aria-label="Go back"
          >
            <ChevronLeftIcon className="w-4" />
            {currentWindowWidth > 640 ? "Back" : ""}
          </button>
        </div>
        <Link href={APP_PAGE_ROUTE.INDEX}>
          <a className="text-4xl font-bold uppercase">{APP_NAME}</a>
        </Link>
      </header>
    </MyContainer>
  );
};
