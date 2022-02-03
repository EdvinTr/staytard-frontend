import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { APP_PAGE_ROUTE } from "../../constants";

const navItems = [
  { name: "My Orders", route: APP_PAGE_ROUTE.MY_ORDERS },
  { name: "My Offers", route: APP_PAGE_ROUTE.MY_OFFERS },
  { name: "My Profile", route: APP_PAGE_ROUTE.MY_PROFILE },
];

export const UserSettingsNavbar = () => {
  const router = useRouter();
  const currentRoutePath = router.pathname;
  console.log(currentRoutePath);

  return (
    <nav className="bg-gray-100 py-2">
      <ul className="flex space-x-2 justify-center tracking-widest uppercase text-xs">
        {navItems.map((item, index) => (
          <li
            key={index}
            className={`relative p-2   
                  ${currentRoutePath === item.route ? "font-semibold" : ""}`}
          >
            <Link href={item.route}>
              <a className="hover:underline">{item.name}</a>
            </Link>
            {currentRoutePath === item.route && (
              <div className="absolute w-[85%] bg-black h-[2px] top-9"></div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};
