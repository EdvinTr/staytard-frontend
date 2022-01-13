import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

export const Accordion: React.FC<{}> & {
  Body: typeof Body;
  Header: typeof Header;
} = ({ children }) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="border-t border-white border-opacity-10">
        <button
          className="flex justify-between w-full py-5 px-8 "
          onClick={() => setIsAccordionOpen(!isAccordionOpen)}
        >
          <div className="text-base font-bold">Shop safe</div>
          {isAccordionOpen ? (
            <ChevronUpIcon
              className={`w-6 transition-all duration-[400ms] ease-out ${
                isHovered && "opacity-30"
              }`}
            />
          ) : (
            <ChevronDownIcon
              className={`w-6 transition-all duration-[400ms] ease-out ${
                isHovered && "opacity-30"
              }`}
            />
          )}
        </button>
      </div>
      {/* accordion content */}
      <AnimatePresence initial={false}>
        {isAccordionOpen && (
          <motion.div
            className=""
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { height: "auto", opacity: 1 },
              collapsed: {
                height: 0,
                opacity: 0,
              },
            }}
            transition={{ duration: 0.3, easings: "easeIn" }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Header: React.FC = ({ children }): JSX.Element => <>{children}</>;
const Body: React.FC = ({ children }): JSX.Element => <>{children}</>;

Accordion.Body = Body;
Accordion.Header = Header;
