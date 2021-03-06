import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  buttonClassName?: string;
  childrenAnimationDuration?: number;
  inlineBlock?: boolean;
}

const chevronClassNames = "w-6 transition-all duration-[400ms] ease-out ";
export const Accordion: React.FC<AccordionProps> & {
  Body: typeof Body;
} = ({
  children,
  title,
  buttonClassName,
  inlineBlock,
  childrenAnimationDuration = 0.3,
  ...rest
}) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      {...rest}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`${
          inlineBlock ? "inline-block" : ""
        } border-t border-white border-opacity-10`}
      >
        <button
          className={`flex w-full items-center justify-between  ${
            buttonClassName ? buttonClassName : ""
          }`}
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
            transition={{
              duration: childrenAnimationDuration,
              easings: "easeIn",
            }}
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
