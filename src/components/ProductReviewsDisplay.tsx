import {
  ChevronDownIcon,
  ChevronRightIcon,
  StarIcon as OutlineStarIcon,
} from "@heroicons/react/outline";
import SolidStarIcon from "@heroicons/react/solid/StarIcon";
import React from "react";
import { ssrProductReviews } from "../lib/page";
import { MyContainer } from "./global/MyContainer";
interface ProductReviewsDisplayProps {}

export const ProductReviewsDisplay = ({}: ProductReviewsDisplayProps) => {
  const { data, fetchMore } = ssrProductReviews.usePage();
  const reviews = data?.productReviews;
  if (!reviews) {
    return (
      <div>Something went wrong</div> // TODO: show error of some sort
    );
  }
  const SectionHeading = ({ hasReviews }: { hasReviews: boolean }) => {
    return (
      <div
        className={`flex items-center ${
          hasReviews ? "justify-between" : "justify-center lg:justify-between"
        }`}
      >
        <div className="flex items-center space-x-4">
          <h2 className="text-3xl font-bold lg:text-left">Reviews</h2>
          <div className="bg-staytard-dark pointer-events-none hidden h-[1px] w-32 lg:block"></div>
        </div>
        <button
          className={`${
            hasReviews ? "flex items-center" : "hidden lg:flex lg:items-center"
          } font-semibold transition-all duration-200 hover:opacity-60`}
        >
          <span>Write a review</span>
          <ChevronRightIcon className="w-4" />
        </button>
      </div>
    );
  };
  if (reviews.totalCount === 0) {
    return (
      <ReviewSectionContainer>
        <MyContainer className="space-y-7">
          <SectionHeading hasReviews={false} />
          <OutlineStarIcon className="mx-auto w-20" fill="#d8d8d8" stroke="0" />
          <p>
            <strong className="block text-lg  font-medium uppercase">
              No reviews yet
            </strong>
            <span className=" text-sm">Let us know what you think</span>
          </p>
          <button className="bg-staytard-dark p-5 text-xs uppercase tracking-wider text-white">
            Write a review
          </button>
        </MyContainer>
      </ReviewSectionContainer>
    );
  }
  return (
    <ReviewSectionContainer>
      <MyContainer className="space-y-7 text-left">
        <SectionHeading hasReviews />
        <p className="flex items-center space-x-4 pt-6 text-2xl font-bold">
          <span>{reviews.averageRating.toFixed(1)}</span>
          <span className="flex items-center">
            {[...Array(5)].map((_, idx) => {
              return (
                <SolidStarIcon
                  key={idx}
                  className="text-staytard-dark inline-block w-5"
                />
              );
            })}
          </span>
          <span className="text-sm font-light">Average rating</span>
        </p>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {/* review cards */}
          {reviews.items.map((review, idx) => {
            const numberOfSolidStars = [...Array(review.rating)];
            const numberOfEmptyStars = [...Array(5 - review.rating)];
            return (
              <div key={idx} className="bg-white p-4 shadow-sm">
                {numberOfSolidStars.map((_, idx) => {
                  return (
                    <SolidStarIcon
                      key={idx}
                      className="text-staytard-dark inline-block w-4"
                    />
                  );
                })}
                {numberOfEmptyStars.map((_, idx) => {
                  return (
                    <OutlineStarIcon
                      key={idx}
                      className="text-staytard-dark inline-block w-4"
                      stroke="0"
                      fill="#d8d8d8"
                    />
                  );
                })}
                <h3 className="mt-4 font-bold">{review.title}</h3>
                <p className="text-13 mt-3 mb-2">{review.content}</p>
                <p className="text-13 font-light text-[#6b6b6b]">
                  {review.submittedByAlias} - {review.createdAt.split("T")[0]}
                </p>
              </div>
            );
          })}
          <div className="relative mx-auto max-w-xs space-y-4 pt-8">
            <div className="space-y-1 px-2 text-center">
              {/* pagination progress */}
              <p className="text-[#6b6b6b]">
                You have seen {reviews.items.length} of {reviews.totalCount}{" "}
                reviews
              </p>
              <progress
                max={reviews.totalCount}
                value={reviews.items.length}
                className="block h-[0.125rem] w-full appearance-none bg-gray-50"
                style={{
                  color: "#222",
                }}
              ></progress>
            </div>
          </div>
          <button
            className="bg-staytard-dark flex w-full items-center justify-center p-4 text-white"
            onClick={() => {
              fetchMore({
                variables: {
                  input: {
                    limit: 5,
                    offset: 5,
                    productId: 10421,
                  },
                },
              });
            }}
          >
            <span>Show more</span>
            <ChevronDownIcon className="w-6" />
          </button>
        </div>
      </MyContainer>
    </ReviewSectionContainer>
  );
};

const ReviewSectionContainer: React.FC = ({ children }) => {
  return (
    <div className="bg-staytard-light-gray mt-24 py-10 text-center">
      {children}
    </div>
  );
};
