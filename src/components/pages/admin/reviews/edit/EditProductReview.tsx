import React from "react";
import { ProductReview } from "../../../../../lib/graphql";
import { MyRatingSelect } from "../../../../global/MyRatingSelect";
import {
  BasicInputLabel,
  DisabledInput,
} from "../../products/edit/EditProductView";
interface EditProductReviewProps {
  review: ProductReview;
}

export const EditProductReview = ({ review }: EditProductReviewProps) => {
  return (
    <div>
      <div className="space-y-4 md:flex md:items-center md:justify-between md:space-x-7 md:space-y-0">
        <div className="w-full">
          <BasicInputLabel htmlFor="productId">Review ID</BasicInputLabel>
          <DisabledInput name="reviewId" value={review.id.toString()} />
        </div>
        <div className="w-full">
          <BasicInputLabel htmlFor="productId">Product ID</BasicInputLabel>
          <DisabledInput name="productId" value={review.productId.toString()} />
        </div>
      </div>

      <div className="pt-4">
        <MyRatingSelect readonly initialRating={review.rating} />
      </div>
    </div>
  );
};
