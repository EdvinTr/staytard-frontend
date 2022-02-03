import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
}

const chevronClassNames = "w-6 transition-all duration-[400ms] ease-out ";
export const Accordion: React.FC<AccordionProps> & {
  Body: typeof Body;
} = ({ children, title, ...rest }) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      {...rest}
      onMouseEnter={() => setIsHovered(true)} // TODO: refactor with useCallback?
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="border-t border-white border-opacity-10">
        <button
          className="flex justify-between w-full py-5 px-8 "
          onClick={() => setIsAccordionOpen(!isAccordionOpen)}
        >
          <div className="font-bold">{title}</div>
          {isAccordionOpen ? (
            <ChevronUpIcon
              className={`${chevronClassNames} ${isHovered && "opacity-30"}`}
            />
          ) : (
            <ChevronDownIcon
              className={`${chevronClassNames} ${isHovered && "opacity-30"}`}
            />
          )}
        </button>
      </div>
      {/* accordion content */}
      <AnimatePresence initial={false}>
        {isAccordionOpen && (
          <motion.div
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

const Body: React.FC = ({ children }): JSX.Element => <>{children}</>;

Accordion.Body = Body;
