import { StarIcon as OutlineStarIcon } from "@heroicons/react/outline";
import { StarIcon as SolidStarIcon } from "@heroicons/react/solid";
import React from "react";
import Rating, { RatingComponentProps } from "react-rating";

interface MyRatingSelectProps extends RatingComponentProps {}

export const MyRatingSelect = ({
  initialRating,
  onChange,
  ...props
}: MyRatingSelectProps) => {
  return (
    <Rating
      {...props}
      fullSymbol={
        <SolidStarIcon className={`text-app-dark inline-block w-8`} />
      }
      emptySymbol={
        <OutlineStarIcon
          className={`text-app-dark inline-block w-8`}
          stroke="0"
          fill="#d8d8d8"
        />
      }
      onChange={onChange}
      initialRating={initialRating}
    />
  );
};
