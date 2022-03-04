import { ArrowUpIcon } from "@heroicons/react/solid";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";

interface ScrollTopButtonProps {}

export const ScrollTopButton = ({}: ScrollTopButtonProps) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <AnimatePresence>
      {scrollPosition > 800 && (
        <motion.div
          className="fixed bottom-[2rem] right-[2rem]"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          exit={{ opacity: 0, y: 50, transition: { duration: 0.3 } }}
        >
          <button
            className="text-13 flex items-center space-x-2 bg-stone-200 py-3 px-4"
            onClick={() =>
              window.scroll({ behavior: "smooth", left: 0, top: 0 })
            }
          >
            <span className="font-semibold">Top</span>
            <ArrowUpIcon className="h-3 w-3 opacity-40" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
