import { CheckIcon, SearchIcon, XIcon } from "@heroicons/react/solid";
import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDebounce } from "usehooks-ts";
import {
  ADMIN_PAGE_QUERY_KEY,
  ADMIN_SUB_PAGE_ROUTE,
  APP_PAGE_ROUTE,
} from "../../../../constants";
import { useFindAllProductReviewsQuery } from "../../../../lib/graphql";
import { BaseInput } from "../../../global/BaseInput";
import { BasicCard } from "../../../global/BasicCard";
import { CenteredBeatLoader } from "../../../global/CenteredBeatLoader";
import { LoadMoreButton } from "../../../global/LoadMoreButton";
import { PaginationProgressTracker } from "../../../global/PaginationProgressTracker";
import { InformationDetailsCard } from "../components/InformationDetailsCard";
import { MyGrid } from "../components/MyGrid";
import { PaddingContainer } from "../components/PaddingContainer";
import { SubPageHeader } from "../components/SubPageHeader";

const MAX_PRODUCT_REVIEW_LIMIT = 50;
export const AdminProductReviewsView = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(
    router.query[ADMIN_PAGE_QUERY_KEY.Q]
      ? (router.query[ADMIN_PAGE_QUERY_KEY.Q] as string)
      : ""
  );
  const debouncedSearchTerm = useDebounce<string>(searchTerm, 500);
  const [offset, setOffset] = useState(0);
  const { data, fetchMore, refetch, loading, error } =
    useFindAllProductReviewsQuery({
      variables: {
        input: {
          offset: 0,
          limit: MAX_PRODUCT_REVIEW_LIMIT,
          q: debouncedSearchTerm,
        },
      },
      notifyOnNetworkStatusChange: true,
    });

  useEffect(() => {
    Router.replace({
      query: {
        ...Router.query,
        q: debouncedSearchTerm,
      },
    });
    refetch({
      input: {
        limit: MAX_PRODUCT_REVIEW_LIMIT,
        offset: 0,
        q: debouncedSearchTerm,
      },
    }).then(() => setOffset(0));
  }, [debouncedSearchTerm, refetch]);

  return (
    <div className="relative pb-20">
      <SubPageHeader title="Reviews" />
      <PaddingContainer className="text-sm">
        {error && (
          <BasicCard className="mx-auto max-w-xl p-4">
            <h3 className="text-lg text-red-600">
              {error.message.includes("Forbidden")
                ? "You do not have sufficient permissions to view this page."
                : error.message}
            </h3>
          </BasicCard>
        )}
        <div className="relative md:max-w-sm">
          <BaseInput
            type="text"
            aria-label="Search"
            className="mb-3 border-opacity-[0.1]"
            placeholder="Search by any review parameter"
            label="Search"
            name="search"
            autoComplete="off"
            hasLeftIcon
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchIcon className="absolute top-3 left-3 w-6 text-stone-700" />
        </div>
        {loading && <CenteredBeatLoader />}
        <MyGrid>
          {data?.allProductReviews.items.map((review) => {
            return (
              <InformationDetailsCard key={review.id} loading={loading}>
                <article>
                  <InformationDetailsCard.Header
                    href={`${APP_PAGE_ROUTE.ADMIN}${ADMIN_SUB_PAGE_ROUTE.EDIT_PRODUCT_REVIEW}/${review.id}`}
                    anchorTitle={`Edit review ${review.id}`}
                  >
                    <h2 className="truncate font-medium">{review.title}</h2>
                  </InformationDetailsCard.Header>
                  <InformationDetailsCard.Body
                    items={[
                      { label: "Nickname", value: review.nickname },
                      { label: "Review ID", value: review.id },
                      { label: "Product ID", value: review.productId },
                      { label: "Rating", value: review.rating },
                      {
                        label: "Status",
                        value: `${
                          review.isPublished ? "Published" : "Unpublished"
                        }`,
                        valueClassName: `${
                          review.isPublished ? "text-green-700" : "text-red-700"
                        }`,
                      },
                      {
                        label: "Recommended",
                        value: (
                          <div>
                            {review.wouldRecommend ? (
                              <CheckIcon className="w-4 text-green-700" />
                            ) : (
                              <XIcon className="w-4 text-red-700" />
                            )}
                          </div>
                        ),
                      },
                      {
                        label: "Created At",
                        value: `${new Date(review.createdAt).toLocaleString()}`,
                      },
                      {
                        label: "Published At",
                        value: `${
                          review.publishedAt
                            ? new Date(review.publishedAt).toLocaleString()
                            : "-"
                        }`,
                      },
                    ]}
                  />
                </article>
              </InformationDetailsCard>
            );
          })}
        </MyGrid>
        {data && data.allProductReviews && (
          <div className="relative mx-auto max-w-xs space-y-4 pt-8">
            <PaginationProgressTracker
              currentCount={data.allProductReviews.items.length}
              totalCount={data.allProductReviews.totalCount}
              text={`You have seen ${data.allProductReviews.items.length} of ${data.allProductReviews.totalCount} reviews`}
            />

            {data.allProductReviews.hasMore && (
              <LoadMoreButton
                disabled={loading}
                onClick={async () => {
                  await fetchMore({
                    variables: {
                      input: {
                        limit: MAX_PRODUCT_REVIEW_LIMIT,
                        offset: offset + MAX_PRODUCT_REVIEW_LIMIT,
                        q: debouncedSearchTerm,
                      },
                    },
                  });
                  setOffset(offset + MAX_PRODUCT_REVIEW_LIMIT);
                }}
              >
                <span>Show more</span>
              </LoadMoreButton>
            )}
          </div>
        )}
      </PaddingContainer>
    </div>
  );
};
