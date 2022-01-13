import { APP_NAME } from "../../constants";

export interface FooterItem {
  title: string;
  listItems: string[];
}
export const footerItems: FooterItem[] = [
  {
    title: "Shop Safe",
    listItems: [
      "Returns",
      "Terms and Conditions",
      "Deliveries",
      "Personal data policy",
    ],
  },
  {
    title: "Information",
    listItems: [
      `About ${APP_NAME}`,
      "Sustainability",
      "Cookies",
      "Affiliate",
      `Work at ${APP_NAME}`,
      `#yes${APP_NAME.toLowerCase()}`,
      "About Ellos Group",
    ],
  },
  {
    title: "Gift Cards",
    listItems: ["Buy gift cards"],
  },
  {
    title: "Our friends",
    listItems: ["Elpy", "Ellos", "Jotex", "Homeroom"],
  },
];
