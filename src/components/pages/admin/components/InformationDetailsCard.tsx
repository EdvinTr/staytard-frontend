import { ChevronRightIcon } from "@heroicons/react/solid";
import Link from "next/link";
import React from "react";
import { BasicCard } from "../../../global/BasicCard";
import { ItemDetailRow } from "../products/components/ProductViewRow";

interface InformationDetailsCardProps {
  loading?: boolean;
}

export const InformationDetailsCard: React.FC<InformationDetailsCardProps> & {
  Header: typeof Header;
  Body: typeof Body;
} = ({ children, loading }) => {
  return (
    <BasicCard
      className={`${
        loading ? "opacity-50" : ""
      } transition-opacity duration-100 ease-in-out`}
    >
      {children}
    </BasicCard>
  );
};

interface HeaderProps {
  href: string;
}
const Header: React.FC<HeaderProps> = ({ children, href }): JSX.Element => (
  <>
    <Link href={href}>
      <a>
        <div className="flex items-center justify-between p-4 hover:underline">
          {children}
          <ChevronRightIcon className="w-6" />
        </div>
      </a>
    </Link>
  </>
);

interface BodyProps {
  items: { label: string; value: string | React.ReactNode }[];
}
const Body: React.FC<BodyProps> = ({ items }): JSX.Element => (
  <div className="px-4 pb-4">
    {items.map(({ label, value }, idx) => {
      return (
        <ItemDetailRow
          key={idx}
          backgroundColor={idx % 2 === 0 ? "gray" : "none"}
          valueClassName="truncate"
          label={label}
          value={value}
        />
      );
    })}
  </div>
);

InformationDetailsCard.Header = Header;
InformationDetailsCard.Body = Body;
