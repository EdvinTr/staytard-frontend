import React, { Fragment } from "react";
import { Accordion } from "./Accordion";
import { footerItems } from "./footer-items.data";
interface FooterProps {}

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
