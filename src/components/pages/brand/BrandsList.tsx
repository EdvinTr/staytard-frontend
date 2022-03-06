import React from "react";
import { GetBrandsResponse } from "../../../typings/GetBrandsResponse";

interface BrandsListProps {
  brands: GetBrandsResponse["brands"];
  brandsKey: keyof GetBrandsResponse["brands"];
}

export const BrandsList = ({ brands, brandsKey }: BrandsListProps) => {
  // split brands into two separate arrays with equal size
  const firstHalf = brands[brandsKey].slice(
    0,
    Math.ceil(brands[brandsKey].length / 2)
  );
  const secondHalf = brands[brandsKey].slice(
    Math.ceil(brands[brandsKey].length / 2)
  );

  return (
    <>
      <div className="w-full" id={`alphabet-target-${brandsKey}`}>
        <div className="py-2 lg:flex lg:w-full lg:max-w-7xl">
          <h2 className="w-20 text-3xl font-semibold uppercase lg:ml-6 lg:mr-2 lg:pb-0 lg:text-5xl lg:font-medium">
            {brandsKey}
          </h2>
          <div className="bg-app-dark my-1 h-[1px] w-full opacity-10 lg:hidden"></div>
          <div className="w-full lg:flex">
            <ul className="w-1/2 space-y-6 py-2 lg:space-y-3 lg:py-0">
              {firstHalf.map((brand) => (
                <li key={brand.id}>{brand.name}</li>
              ))}
            </ul>
            <ul className="w-1/2 space-y-6 py-2 lg:space-y-3 lg:py-0">
              {secondHalf.map((brand) => (
                <li key={brand.id}>{brand.name}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="bg-app-dark my-4 hidden h-[1px] w-full opacity-10 lg:block"></div>
      </div>
    </>
  );
};
