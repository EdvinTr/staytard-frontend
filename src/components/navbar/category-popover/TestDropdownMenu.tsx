import { AnimatePresence, motion } from "framer-motion";
import React, { useRef, useState } from "react";
interface TestDropdownMenuProps {}

let renders = 0;
export const TestDropdownMenu: React.FC<TestDropdownMenuProps> = ({}) => {
  renders++;
  console.log(renders);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const [isCursorInMenu, setIsCursorInMenu] = useState(false);
  const menuContentRef = useRef(null);

  return (
    <div className="w-full relative">
      <div className="flex justify-center">
        <button
          className="p-4 -m-4"
          onMouseEnter={() => {
            setIsButtonHovered(true);
          }}
          onMouseLeave={() => {
            setIsButtonHovered(false);
          }}
        >
          Hover me
        </button>
      </div>
      {/* menu */}
      <AnimatePresence>
        {(isButtonHovered || isCursorInMenu) && (
          <motion.div
            animate={{ opacity: [0, 1] }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            exit={{ opacity: 0 }}
            onMouseEnter={() => {
              setIsCursorInMenu(true);
            }}
            onMouseLeave={() => {
              setIsCursorInMenu(false);
            }}
            ref={menuContentRef}
            className="bg-orange-50 opacity-0 hover:opacity-100 z-20 p-8 absolute w-full mt-4 flex justify-center"
          >
            <h1 className="uppercase text-2xl font-bold px-8 border-r border-opacity-20 border-r-staytard-dark">
              Clothes
            </h1>
            <ul className="relative grid grid-cols-2 gap-y-6 gap-x-12  px-8 pb-8 pt-1 border-l-black border-r-black border-b-black border-opacity-5  ">
              <a href="#" className="hover:underline cursor-pointer">
                Jeans
              </a>
              <a href="#" className="hover:underline cursor-pointer">
                Pants
              </a>
              <a href="#" className="hover:underline cursor-pointer">
                Sweaters
              </a>
              <a href="#" className="hover:underline cursor-pointer">
                Shirts
              </a>
              <a href="#" className="hover:underline cursor-pointer">
                Overshirts
              </a>
              <a href="#" className="hover:underline cursor-pointer">
                Overshirts
              </a>
              <a href="#" className="hover:underline cursor-pointer">
                Overshirts
              </a>
              <a href="#" className="hover:underline cursor-pointer">
                Overshirts
              </a>
              <a href="#" className="hover:underline cursor-pointer">
                Shorts
              </a>
              <a
                href="#"
                className="hover:underline cursor-pointer"
              >{`Socks & underwear`}</a>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
