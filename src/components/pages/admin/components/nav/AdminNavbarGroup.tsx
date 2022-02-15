import React from "react";
import { DefaultAdminNavbar } from "./DefaultAdminNavbar";
import { MobileAdminNavbar } from "./MobileAdminNavbar";

export const AdminNavbarGroup = () => {
  return (
    <>
      <div className="hidden lg:block">
        <DefaultAdminNavbar />
      </div>
      <div className="bg-staytard-dark h-16 lg:hidden">
        <MobileAdminNavbar />
      </div>
    </>
  );
};
