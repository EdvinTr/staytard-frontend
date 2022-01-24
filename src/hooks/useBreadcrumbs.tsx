import { NextRouter } from "next/router";
import { useEffect, useState } from "react";

export interface Breadcrumb {
  breadcrumb: string;
  href: string;
}
export const useBreadcrumbs = (router: NextRouter) => {
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([]);
  useEffect(() => {
    if (!router) {
      return;
    }
    const linkPath = router.asPath.split("/");
    linkPath.shift();
    const pathArray = linkPath.map((path, idx) => {
      return {
        breadcrumb: path,
        href: "/" + linkPath.slice(0, idx + 1).join("/"),
      };
    });
    setBreadcrumbs(pathArray);
  }, [router]);

  return breadcrumbs;
};
