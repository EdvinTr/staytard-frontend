import {
  CheckIcon,
  ChevronRightIcon,
  SearchIcon,
  XIcon,
} from "@heroicons/react/solid";
import Link from "next/link";
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
import { PaddingContainer } from "../components/PaddingContainer";
import { SubPageHeader } from "../components/SubPageHeader";
import { ItemDetailRow } from "../products/components/ProductViewRow";

const MAX_PRODUCT_REVIEW_LIMIT = 5;
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
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8 2xl:grid-cols-4">
          {data?.allProductReviews.items.map((review) => {
            return (
              <BasicCard>
                <article className="truncate">
                  <Link
                    key={review.id}
                    href={`${APP_PAGE_ROUTE.ADMIN}${ADMIN_SUB_PAGE_ROUTE.EDIT_PRODUCT_REVIEW}/${review.id}`}
                  >
                    <a title={`Edit review ${review.id}`} className="">
                      <div className="flex w-full items-center justify-between rounded-md p-4  transition-all duration-100 ease-in-out hover:bg-gray-50">
                        <h2 className="truncate font-medium">{review.title}</h2>
                        <ChevronRightIcon className="w-6" />
                      </div>
                    </a>
                  </Link>
                  <div className="px-4 pb-4">
                    <div className="">
                      <ItemDetailRow
                        valueClassName="truncate"
                        label="Nickname"
                        value={`${review.nickname}`}
                      />
                      <ItemDetailRow
                        backgroundColor="none"
                        valueClassName="truncate"
                        label="Review ID"
                        value={`${review.id}`}
                      />
                      <ItemDetailRow
                        valueClassName="truncate"
                        label="Product ID"
                        value={`${review.productId}`}
                      />

                      <ItemDetailRow
                        backgroundColor="none"
                        label="Rating"
                        value={`${review.rating}`}
                      />
                      <ItemDetailRow
                        label="Status"
                        value={`${
                          review.isPublished ? "Published" : "Unpublished"
                        }`}
                        valueClassName={`${
                          review.isPublished ? "text-green-700" : "text-red-700"
                        }`}
                      />
                      <ItemDetailRow
                        backgroundColor="none"
                        label="Recommended"
                        value={
                          <div>
                            {review.wouldRecommend ? (
                              <CheckIcon className="w-4 text-green-700" />
                            ) : (
                              <XIcon className="w-4 text-red-700" />
                            )}
                          </div>
                        }
                      />
                      <ItemDetailRow
                        label="Created At"
                        value={`${new Date(review.createdAt).toLocaleString()}`}
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
                  </div>
                </article>
              </BasicCard>
            );
          })}
        </div>
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
