import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React, { useState } from "react";
interface HoverMenuProps {
  links: string[];
  isButtonHovered: boolean;
}

export const HoverMenu: React.FC<HoverMenuProps> = ({
  links,
  isButtonHovered,
}) => {
  const [isCursorInMenu, setIsCursorInMenu] = useState(false);
  return (
    <div className="w-full relative">
      <div className="flex justify-center "></div>
      {/* menu */}
      <AnimatePresence>
        {(isButtonHovered || isCursorInMenu) && (
          <motion.div
            key={links[0]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            exit={{ opacity: 0 }}
            onMouseEnter={() => {
              setIsCursorInMenu(true);
            }}
            onMouseLeave={() => {
              setIsCursorInMenu(false);
            }}
            className=" absolute w-full h-[30rem] flex justify-center bg-white pt-12 space-x-12 z-20 shadow-sm opacity-0  hover:opacity-100"
          >
            <div className="border-r border-r-black border-opacity-20 pr-12 max-h-96">
              <h4 className=" text-2xl font-bold ">{links[0]}</h4>
            </div>
            <ul className="relative w-[19%]  ">
              <div className="flex space-x-32">
                <div className="space-y-6">
                  {/* left side categories */}
                  {links.slice(0, 9).map((link, idx) => {
                    return (
                      <li key={idx}>
                        <a href="#" className="hover:underline cursor-pointer">
                          {link}
                        </a>
                      </li>
                    );
                  })}
                </div>
                {/* right side categories */}
                <div className="space-y-6">
                  {links.slice(9, links.length).map((link, idx) => {
                    return (
                      <li key={idx}>
                        <a href="#" className="hover:underline cursor-pointer">
                          {link}
                        </a>
                      </li>
                    );
                  })}
                </div>
              </div>
            </ul>
            {/* brand images */}
            <div className="grid grid-cols-2 text-center gap-y-4">
              {[...Array(4)].map((_, idx) => {
                return (
                  <div key={idx}>
                    <Image
                      src="https://assets.ellosgroup.com/i/ellos/2140_navimg_studio?w=420&$sc$&fmt=webp"
                      width={300}
                      height={140}
                      objectFit="contain"
                    />
                    <div className="font-bold mt-1">LES DEUX</div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
