import { ChevronRightIcon } from "@heroicons/react/solid";
import { capitalize } from "lodash";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import { useBreadcrumbs } from "../../hooks/useBreadcrumbs";

interface BreadcrumbsProps {}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({}) => {
  const router = useRouter();
  const breadcrumbs = useBreadcrumbs(router);
  return (
    <ul className="flex">
      {breadcrumbs.map(({ breadcrumb, href }, idx, arr) => {
        const isLastItemInArray = arr.length - 1 === idx;
        const capitalizedBreadcrumb = capitalize(breadcrumb);
        return (
          <li key={idx} className="flex items-center">
            {isLastItemInArray ? (
              <span className="opacity-70">{capitalizedBreadcrumb}</span>
            ) : (
              <Fragment>
                <Link href={href}>
                  <a className="hover:underline">{capitalizedBreadcrumb}</a>
                </Link>
                <ChevronRightIcon className="w-4 mx-1" />
              </Fragment>
            )}
          </li>
        );
      })}
    </ul>
  );
};
