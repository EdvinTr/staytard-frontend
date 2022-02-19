import { CheckIcon, ChevronRightIcon, XIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import {
  ADMIN_PAGE_QUERY_KEY,
  ADMIN_SUB_PAGE_ROUTE,
  APP_PAGE_ROUTE,
} from "../../../../constants";
import { useFindAllProductReviewsQuery } from "../../../../lib/graphql";
import { getOffset } from "../../../../utils/pagination/getOffset";
import { getTotalPages } from "../../../../utils/pagination/getTotalPages";
import { BasicCard } from "../../../global/BasicCard";
import { CenteredBeatLoader } from "../../../global/CenteredBeatLoader";
import { MyPagination } from "../../../global/MyPagination";
import { PaddingContainer } from "../components/PaddingContainer";
import { SubPageHeader } from "../components/SubPageHeader";
import { ItemDetailRow } from "../products/components/ProductViewRow";

const MAX_PRODUCT_REVIEW_LIMIT = 50;
export const AdminProductReviewsView = () => {
  const router = useRouter();
  const activePage = router.query[ADMIN_PAGE_QUERY_KEY.PAGE];
  const { data, fetchMore, loading, error } = useFindAllProductReviewsQuery({
    variables: {
      input: {
        offset: getOffset(MAX_PRODUCT_REVIEW_LIMIT, activePage),
        limit: MAX_PRODUCT_REVIEW_LIMIT,
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
        },
      },
    });
  }, [activePage, fetchMore]);

  return (
    <div className="relative">
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
