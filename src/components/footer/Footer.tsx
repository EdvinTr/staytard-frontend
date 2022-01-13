import React, { Fragment } from "react";
import { Accordion } from "./Accordion";
interface FooterProps {}

export const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <Fragment>
      <div className="h-screen bg-staytard-dark text-white  ">
        {/* accordion button */}
        <div className="h-10"></div>
        <Accordion>
          <Accordion.Body>
            <ul className="space-y-5 px-16 pb-6">
              <li>Returns</li>
              <li>Terms and Conditions</li>
              <li>Deliveries</li>
              <li>Personal data policy</li>
            </ul>
          </Accordion.Body>
        </Accordion>
        <Accordion>
          <Accordion.Header>
            <div>Hello world</div>
          </Accordion.Header>
          <Accordion.Body>
            <ul className="space-y-5 px-16 pb-6">
              <li>Returns</li>
              <li>Terms and Conditions</li>
              <li>Deliveries</li>
              <li>Personal data policy</li>
            </ul>
          </Accordion.Body>
        </Accordion>
      </div>
    </Fragment>
  );
};
