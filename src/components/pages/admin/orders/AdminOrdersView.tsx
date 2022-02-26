import { SearchIcon } from "@heroicons/react/solid";
import { capitalize } from "lodash";
import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDebounce } from "usehooks-ts";
import {
  ADMIN_PAGE_QUERY_KEY,
  ADMIN_SUB_PAGE_ROUTE,
  APP_PAGE_ROUTE,
} from "../../../../constants";
import { useFindAllCustomerOrdersQuery } from "../../../../lib/graphql";
import { BaseInput } from "../../../global/BaseInput";
import { CenteredBeatLoader } from "../../../global/CenteredBeatLoader";
import { LoadMoreButton } from "../../../global/LoadMoreButton";
import { PaginationProgressTracker } from "../../../global/PaginationProgressTracker";
import { ORDER_STATUS } from "../../../user/my-orders/CustomerOrderTableRow";
import { ForbiddenResourceErrorCard } from "../components/ForbiddenResourceErrorCard";
import { InformationDetailsCard } from "../components/InformationDetailsCard";
import { MyGrid } from "../components/MyGrid";
import { PaddingContainer } from "../components/PaddingContainer";
import { SubPageHeader } from "../components/SubPageHeader";

interface AdminOrdersViewProps {}

const MAX_ORDERS_TO_FETCH = 50;
export const AdminOrdersView: React.FC<AdminOrdersViewProps> = ({}) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(
    router.query[ADMIN_PAGE_QUERY_KEY.Q]
      ? (router.query[ADMIN_PAGE_QUERY_KEY.Q] as string)
      : ""
  );
  const debouncedSearchTerm = useDebounce<string>(searchTerm, 500);
  const [offset, setOffset] = useState(0);
  const { data, error, loading, fetchMore, refetch } =
    useFindAllCustomerOrdersQuery({
      variables: {
        input: {
          limit: MAX_ORDERS_TO_FETCH,
          offset: 0,
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
        limit: MAX_ORDERS_TO_FETCH,
        offset: 0,
        q: debouncedSearchTerm,
      },
    }).then(() => setOffset(0));
  }, [debouncedSearchTerm, refetch]);
  return (
    <div className="relative pb-20">
      <SubPageHeader title="Orders" />
      <PaddingContainer className="text-sm">
        {error && <ForbiddenResourceErrorCard error={error} />}
        <div className="relative md:max-w-sm">
          <BaseInput
            type="text"
            aria-label="Search"
            className="mb-3 border-opacity-[0.1]"
            placeholder="Search by any order parameter"
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
          {data?.customerOrders.items.map((order) => {
            return (
              <InformationDetailsCard key={order.id} loading={loading}>
                <article>
                  <InformationDetailsCard.Header
                    href={`${APP_PAGE_ROUTE.ADMIN}${ADMIN_SUB_PAGE_ROUTE.EDIT_ORDER}/${order.id}`}
                    anchorTitle={`Edit order ${order.id}`}
                  >
                    <h2 className="truncate font-medium">#{order.id}</h2>
                  </InformationDetailsCard.Header>
                  <InformationDetailsCard.Body
                    items={[
                      { label: "Order ID", value: order.id },
                      { label: "Order number", value: order.orderNumber },
                      { label: "User ID", value: order.userId },
                      {
                        label: "Stripe Session ID",
                        value: order.stripeSessionId
                          ? order.stripeSessionId
                          : "N/A",
                      },
                      {
                        label: "Payment type",
                        value: capitalize(order.paymentType),
                      },
                      { label: "Shipping cost", value: order.shippingCost },
                      { label: "Total price", value: order.totalAmount },
                      { label: "Grand total", value: order.grandTotal },
                      {
                        label: "Currency",
                        value: order.purchaseCurrency,
                      },
                      {
                        label: "Status",
                        value: (
                          <div
                            className={`${
                              orderStatusColors[order.orderStatus.status]
                            }`}
                          >
                            {order.orderStatus.status}
                          </div>
                        ),
                      },
                    ]}
                  />
                </article>
              </InformationDetailsCard>
            );
          })}
        </MyGrid>
        {data && data.customerOrders && (
          <div className="relative mx-auto max-w-xs space-y-4 pt-8">
            <PaginationProgressTracker
              currentCount={data.customerOrders.items.length}
              totalCount={data.customerOrders.totalCount}
              text={`You have seen ${data.customerOrders.items.length} of ${data.customerOrders.totalCount} reviews`}
            />

            {data.customerOrders.hasMore && (
              <LoadMoreButton
                disabled={loading}
                onClick={async () => {
                  await fetchMore({
                    variables: {
                      input: {
                        limit: MAX_ORDERS_TO_FETCH,
                        offset: offset + MAX_ORDERS_TO_FETCH,
                        q: debouncedSearchTerm,
                      },
                    },
                  });
                  setOffset(offset + MAX_ORDERS_TO_FETCH);
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

const orderStatusColors: Record<string, string> = {
  [ORDER_STATUS.PROCESSING]: "text-yellow-700",
  [ORDER_STATUS.SHIPPED]: "text-blue-700",
  [ORDER_STATUS.ON_HOLD]: "text-purple-700",
  [ORDER_STATUS.COMPLETED]: "text-green-700",
  [ORDER_STATUS.CANCELLED]: "text-red-600",
  [ORDER_STATUS.FAILED]: "text-red-700",
  [ORDER_STATUS.REFUNDED]: "text-orange-700",
  [ORDER_STATUS.PENDING]: "text-yellow-700",
};
