import React from "react";
import { useFindAllProductReviewsQuery } from "../../../../lib/graphql";
import { PaddingContainer } from "../components/PaddingContainer";
import { PageHeading } from "../components/PageHeading";

export const AdminProductReviewsView = () => {
  const { data, fetchMore, loading } = useFindAllProductReviewsQuery({
    variables: {
      input: {
        limit: 50,
        offset: 0,
      },
    },
  });
  console.log(data);
  return (
    <div>
      <div className="bg-staytard-semi-light-gray">
        <PaddingContainer>
          <div className="flex items-center lg:justify-between">
            <PageHeading>Reviews</PageHeading>
          </div>
        </PaddingContainer>
      </div>
    </div>
  );
};
