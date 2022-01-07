import Link from "next/link";
import React from "react";
import { APP_PAGE_ROUTE } from "../constants";
import { MyContainer } from "./MyContainer";
interface AppHeaderProps {}

export const AppHeader: React.FC<AppHeaderProps> = ({}) => {
  return (
    <MyContainer>
      <header className="text-center pt-4">
        <Link href={APP_PAGE_ROUTE.INDEX}>
          <a className="text-3xl uppercase font-bold">Staytard</a>
        </Link>
      </header>
    </MyContainer>
  );
};
