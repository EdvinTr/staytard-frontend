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

const brands = [
  { src: "/img/les-deux-thumb.webp", name: "Les Deux" },
  { src: "/img/polo-thumb.webp", name: "Polo" },
  { src: "/img/levis-thumb.webp", name: `Levi's` },
  { src: "/img/studio-total-thumb.webp", name: "Studio Total" },
];

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
            <div className="max-h-96 w-2/12 text-right">
              <h4 className="text-2xl font-bold">{title}</h4>
            </div>
            <div className=" h-[90%] w-[1px] bg-black opacity-20"></div>
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
              {brands.map(({ name, src }, idx) => {
                return (
                  <div key={idx}>
                    <Image
                      src={src}
                      width={300}
                      height={140}
                      objectFit="contain"
                      alt={name}
                    />
                    <div className="mt-1 text-[0.8125rem] font-bold uppercase">
                      {name}
                    </div>
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
