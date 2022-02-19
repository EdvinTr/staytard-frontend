import { CheckIcon, ChevronRightIcon, XIcon } from "@heroicons/react/solid";
import Link from "next/link";
import React from "react";
import { ADMIN_SUB_PAGE_ROUTE, APP_PAGE_ROUTE } from "../../../../constants";
import { useFindAllProductReviewsQuery } from "../../../../lib/graphql";
import { BasicCard } from "../../../global/BasicCard";
import { CenteredBeatLoader } from "../../../global/CenteredBeatLoader";
import { PaddingContainer } from "../components/PaddingContainer";
import { PageHeading } from "../components/PageHeading";
import { ItemDetailRow } from "../products/components/ProductViewRow";

export const AdminProductReviewsView = () => {
  const { data, fetchMore, loading } = useFindAllProductReviewsQuery({
    variables: {
      input: {
        limit: 50,
        offset: 0,
      },
    },
  });
  return (
    <div className="relative">
      <div className="bg-staytard-semi-light-gray">
        <PaddingContainer>
          <div className="flex items-center lg:justify-between">
            <PageHeading>Reviews</PageHeading>
          </div>
        </PaddingContainer>
      </div>
      <PaddingContainer className="text-sm">
        {loading && <CenteredBeatLoader />}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8 2xl:grid-cols-4">
          {data?.allProductReviews.items.map((review) => {
            return (
              <Link
                href={`${APP_PAGE_ROUTE.ADMIN}/${ADMIN_SUB_PAGE_ROUTE.EDIT_PRODUCT_REVIEW}/${review.id}`}
              >
                <a aria-labelledby="Edit review" title="Edit review">
                  <BasicCard key={review.id}>
                    <article className="truncate p-4">
                      <div className="flex items-center justify-between">
                        <h2 className="truncate font-medium">{review.title}</h2>
                        <ChevronRightIcon className="w-6" />
                      </div>
                      <div className="mt-4">
                        <ItemDetailRow
                          valueClassName="truncate"
                          label="Nickname"
                          value={`${review.nickname}`}
                        />
                        <ItemDetailRow
                          valueClassName="truncate"
                          label="Product ID"
                          value={`${review.productId}`}
                          backgroundColor="none"
                        />

                        <ItemDetailRow
                          label="Rating"
                          value={`${review.rating}`}
                        />
                        <ItemDetailRow
                          backgroundColor="none"
                          label="Status"
                          value={`${
                            review.isPublished ? "Published" : "Unpublished"
                          }`}
                          valueClassName={`${
                            review.isPublished
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        />
                        <ItemDetailRow
                          label="Recommended"
                          value={
                            <div>
                              {review.wouldRecommend ? (
                                <CheckIcon className="w-4 text-green-600" />
                              ) : (
                                <XIcon className="w-4 text-red-600" />
                              )}
                            </div>
                          }
                        />
                        <ItemDetailRow
                          backgroundColor="none"
                          label="Published At"
                          value={`${
                            review.publishedAt
                              ? new Date(review.publishedAt).toLocaleString()
                              : "-"
                          }`}
                        />
                      </div>
                    </article>
                  </BasicCard>
                </a>
              </Link>
            );
          })}
        </div>
      </PaddingContainer>
    </div>
  );
};
