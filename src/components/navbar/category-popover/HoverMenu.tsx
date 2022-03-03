import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

interface HoverMenuProps {
  items: HoverMenuItem[];
  isButtonHovered: boolean;
  title?: string;
}

export interface HoverMenuItem {
  name: string;
  path: string;
}

export const HoverMenu: React.FC<HoverMenuProps> = ({
  items,
  isButtonHovered,
  title,
}) => {
  const [isCursorInMenu, setIsCursorInMenu] = useState(false);
  return (
    <div className="relative w-full">
      <AnimatePresence>
        {(isButtonHovered || isCursorInMenu) && (
          <motion.div
            key="hover-menu"
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
            className="absolute z-20 flex h-[30rem] w-full justify-center space-x-12 bg-white px-5 pt-12 opacity-0 shadow-sm hover:opacity-100  xl:px-0"
          >
            <div className="max-h-96 border-r border-r-black border-opacity-20 pr-12">
              <h4 className=" text-2xl font-bold">{title}</h4>
            </div>
            <ul className="relative w-[19%]  ">
              <div className="flex space-x-24">
                <div className="space-y-6">
                  {/* left side categories */}
                  {items.slice(0, 9).map((item, idx) => {
                    return <HoverMenuListItem item={item} key={idx} />;
                  })}
                </div>
                {/* right side categories */}
                <div className="space-y-6">
                  {items.slice(9, items.length).map((item, idx) => {
                    return <HoverMenuListItem item={item} key={idx} />;
                  })}
                </div>
              </div>
            </ul>
            {/* brand images */}
            <div className="grid grid-cols-2 gap-y-4 text-center">
              {[...Array(4)].map((_, idx) => {
                return (
                  <div key={idx}>
                    <Image
                      src="https://assets.ellosgroup.com/i/ellos/2140_navimg_studio?w=420&$sc$&fmt=webp"
                      width={300}
                      height={140}
                      objectFit="contain"
                      alt="brand"
                    />
                    <div className="mt-1 font-bold uppercase">Les Deux</div>
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

interface HoverMenuListItemProps
  extends React.DetailedHTMLProps<
    React.LiHTMLAttributes<HTMLLIElement>,
    HTMLLIElement
  > {
  item: HoverMenuItem;
}

const HoverMenuListItem = ({ item, ...props }: HoverMenuListItemProps) => {
  return (
    <li {...props}>
      <Link href={item.path}>
        <a className=" cursor-pointer">
          <div className="underline-from-center inline-block">{item.name}</div>
        </a>
      </Link>
    </li>
  );
};
