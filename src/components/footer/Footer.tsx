import React, { Fragment } from "react";
import { APP_NAME } from "../../constants";
import { Accordion } from "./Accordion";
interface FooterProps {}

interface FooterItem {
  title: string;
  listItems: string[];
}
const footerItems: FooterItem[] = [
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
export const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <Fragment>
      <div className="h-screen bg-staytard-dark text-white  ">
        {/* accordion button */}
        <div className="h-10"></div>
        {footerItems.map(({ listItems, title }, idx) => (
          <Accordion title={title} key={idx}>
            <Accordion.Body>
              <ul className="space-y-5 px-16 pb-6">
                {listItems.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </Accordion.Body>
          </Accordion>
        ))}
      </div>
    </Fragment>
  );
};
