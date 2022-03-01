import { APP_PAGE_ROUTE } from "../../constants";
import {
  MyOrdersIcon,
  MyPriceTagIcon,
  MyUserIcon,
} from "../global/icons/Icons";

interface MenuItem {
  name: string;
  href: APP_PAGE_ROUTE;
  icon: any;
}
export const userMenuItems: MenuItem[] = [
  {
    name: "My orders",
    href: APP_PAGE_ROUTE.MY_ORDERS,
    icon: MyOrdersIcon,
  },
  {
    name: "My offers",
    href: APP_PAGE_ROUTE.MY_OFFERS,
    icon: MyPriceTagIcon,
  },
  {
    name: "My profile",
    href: APP_PAGE_ROUTE.MY_PROFILE,
    icon: MyUserIcon,
  },
];
