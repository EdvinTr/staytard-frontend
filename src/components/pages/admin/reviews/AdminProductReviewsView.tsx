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
import { getOffset } from "../../../../utils/pagination/getOffset";
import { getTotalPages } from "../../../../utils/pagination/getTotalPages";
import { BaseInput } from "../../../global/BaseInput";
import { BasicCard } from "../../../global/BasicCard";
import { CenteredBeatLoader } from "../../../global/CenteredBeatLoader";
import { MyPagination } from "../../../global/MyPagination";
import { PaddingContainer } from "../components/PaddingContainer";
import { SubPageHeader } from "../components/SubPageHeader";
import { ItemDetailRow } from "../products/components/ProductViewRow";

const MAX_PRODUCT_REVIEW_LIMIT = 50;
export const AdminProductReviewsView = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(
    router.query[ADMIN_PAGE_QUERY_KEY.Q]
      ? (router.query[ADMIN_PAGE_QUERY_KEY.Q] as string)
      : ""
  );
  const debouncedSearchTerm = useDebounce<string>(searchTerm, 500);
  const activePage = router.query[ADMIN_PAGE_QUERY_KEY.PAGE];
  const { data, fetchMore, loading, error } = useFindAllProductReviewsQuery({
    variables: {
      input: {
        offset: getOffset(MAX_PRODUCT_REVIEW_LIMIT, activePage),
        limit: MAX_PRODUCT_REVIEW_LIMIT,
        q: debouncedSearchTerm,
      },
    },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    fetchMore({
      variables: {
        input: {
          offset: getOffset(MAX_PRODUCT_REVIEW_LIMIT, activePage),
          limit: MAX_PRODUCT_REVIEW_LIMIT,
          q: debouncedSearchTerm,
        },
      },
    });
  }, [activePage, fetchMore, debouncedSearchTerm]);

  useEffect(() => {
    Router.replace({
      query: {
        ...Router.query,
        q: debouncedSearchTerm,
        [ADMIN_PAGE_QUERY_KEY.PAGE]: 1,
      },
    }); // Using default Router to avoid missing dependency eslint warnings
  }, [debouncedSearchTerm]); // update URL when search term changes

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
              <Link
                key={review.id}
                href={`${APP_PAGE_ROUTE.ADMIN}${ADMIN_SUB_PAGE_ROUTE.EDIT_PRODUCT_REVIEW}/${review.id}`}
              >
                <a title={`Edit review ${review.id}`}>
                  <BasicCard>
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
                              ? "text-green-700"
                              : "text-red-700"
                          }`}
                        />
                        <ItemDetailRow
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
                          backgroundColor="none"
                          label="Created At"
                          value={`${new Date(
                            review.createdAt
                          ).toLocaleString()}`}
                        />
                        <ItemDetailRow
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
        <div className="flex justify-center pt-14">
          {data && (
            <MyPagination
              currentPage={activePage ? +activePage - 1 : 0}
              disableInitialCallback
              onPageChange={async (page) => {
                router.replace(
                  {
                    pathname: router.pathname,
                    query: {
                      ...router.query,
                      [ADMIN_PAGE_QUERY_KEY.PAGE]: page + 1,
                    },
                  },
                  undefined,
                  { shallow: true }
                );
              }}
              totalPages={getTotalPages(
                data.allProductReviews.totalCount,
                MAX_PRODUCT_REVIEW_LIMIT
              )}
            />
          )}
        </div>
      </PaddingContainer>
    </div>
  );
};
