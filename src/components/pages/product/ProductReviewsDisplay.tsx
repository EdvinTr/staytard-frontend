import {
  ChevronDownIcon,
  ChevronRightIcon,
  StarIcon as OutlineStarIcon,
} from "@heroicons/react/outline";
import SolidStarIcon from "@heroicons/react/solid/StarIcon";
import { useWindowWidth } from "@react-hook/window-size";
import React, { Fragment, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toast";
import { LOCAL_STORAGE_KEY } from "../../../constants";
import { useSsrCompatible } from "../../../hooks/useSsrCompatible";
import { FindOneProductQuery, ProductReviewsQuery } from "../../../lib/graphql";
import { ssrProductReviews } from "../../../lib/page";
import { Localized } from "../../../Localized";
import { MyContainer } from "../../global/MyContainer";
import { PaginationProgressTracker } from "../../global/PaginationProgressTracker";
import { ProductReviewFormModal } from "./ProductReviewFormModal";
interface ProductReviewsDisplayProps {
  product: FindOneProductQuery["product"];
}
const { createProductReviewSuccessMessage } = Localized.page.product;

export const ProductReviewsDisplay = ({
  product: { id: productId, name },
}: ProductReviewsDisplayProps) => {
  useEffect(() => {
    if (typeof localStorage !== undefined) {
      localStorage.removeItem(LOCAL_STORAGE_KEY.PRODUCT_REVIEW_FORM); // clear the form when component first mounts
    }
  }, []);
  const currentWindowWidth = useSsrCompatible(useWindowWidth(), 0);
  const showSuccessToast = (): void =>
    toast.success(createProductReviewSuccessMessage, {
      backgroundColor: "black",
      color: "white",
    });
  const { data, fetchMore } = ssrProductReviews.usePage();
  const reviews = data?.productReviews;
  const [offset, setOffset] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  if (!reviews) {
    return (
      <div>Could not load reviews for some reason</div> // TODO: show error of some sort
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
          onClick={() => setIsReviewModalOpen(true)}
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
  const handleOnReviewCreateSuccess = () => {
    showSuccessToast();
  };
  const reviewModal = (
    <ProductReviewFormModal
      show={isReviewModalOpen}
      onClose={() => setIsReviewModalOpen(false)}
      productId={productId}
      onSuccess={() => handleOnReviewCreateSuccess()}
      title={`My review of ${name}`}
    />
  );
  if (reviews.totalCount === 0) {
    return (
      <ReviewSectionContainer>
        {reviewModal}
        <MyContainer className="space-y-7">
          <SectionHeading hasReviews={false} />
          <OutlineStarIcon className="mx-auto w-20" fill="#d8d8d8" stroke="0" />
          <p>
            <strong className="block text-lg  font-medium uppercase">
              No reviews yet
            </strong>
            <span className=" text-sm">Let us know what you think</span>
          </p>
          <button
            onClick={() => setIsReviewModalOpen(true)}
            className="bg-staytard-dark p-5 text-xs uppercase tracking-wider text-white"
          >
            Write a review
          </button>
        </MyContainer>
      </ReviewSectionContainer>
    );
  }
  return (
    <ReviewSectionContainer>
      {reviewModal}
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
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 xl:gap-7">
          {/* review cards */}
          {reviews.items.map((review) => {
            return (
              <ProductReviewCard
                key={review.id}
                isLoadingMore={isLoadingMore}
                review={review}
              />
            );
          })}
        </div>
        <div className="relative mx-auto max-w-xs space-y-4 pt-8">
          <PaginationProgressTracker
            currentCount={reviews.items.length}
            totalCount={reviews.totalCount}
            text={`You have seen ${reviews.items.length} of ${reviews.totalCount} reviews`}
          />
          {isLoadingMore && (
            <div className="absolute inset-0">
              <BeatLoader
                color="#faba"
                css="display:flex; justify-content:center;"
              />
            </div>
          )}
          {reviews.hasMore && (
            <button
              className="bg-staytard-dark flex w-full items-center justify-center p-4 text-white"
              onClick={async () => {
                if (isLoadingMore) {
                  return; // prevent spam
                }
                setIsLoadingMore(true);
                await fetchMore({
                  variables: {
                    input: {
                      limit: 6,
                      offset: offset + 6,
                      productId,
                    },
                  },
                });
                setOffset(offset + 6);
                setIsLoadingMore(false);
              }}
            >
              <span>Show more</span>
              <ChevronDownIcon className="w-6" />
            </button>
          )}
        </div>
        <div className="z-50">
          <ToastContainer
            position={
              currentWindowWidth <= 768 ? "bottom-center" : "bottom-left"
            }
          />
        </div>
      </MyContainer>
    </ReviewSectionContainer>
  );
};
type Review = ProductReviewsQuery["productReviews"]["items"][0];
interface ProductReviewCardProps {
  review: Review;
  isLoadingMore: boolean;
}
const ProductReviewCard = ({
  review,
  isLoadingMore,
}: ProductReviewCardProps) => {
  const RatingStars = () => {
    const numberOfSolidStars = [...Array(review.rating)];
    const numberOfEmptyStars = [...Array(5 - review.rating)];
    return (
      <Fragment>
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
      </Fragment>
    );
  };
  return (
    <div
      className={`relative bg-white p-4 shadow-md ${
        isLoadingMore ? "opacity-60" : ""
      }`}
    >
      <RatingStars />
      <h3 className="mt-4 font-bold">{review.title}</h3>
      <p className="text-13 mt-3 pb-6">{review.content}</p>
      <p className="text-13 absolute bottom-[10px] font-light text-[#6b6b6b]">
        {review.nickname} - {review.createdAt.split("T")[0]}
      </p>
    </div>
  );
};

const ReviewSectionContainer: React.FC = ({ children }) => {
  return (
    <div className="bg-staytard-light-gray mt-24 py-10 text-center">
      {children}
    </div>
  );
};
