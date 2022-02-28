import { motion } from "framer-motion";
import React, { useState } from "react";
import { useMyCustomerOrdersQuery } from "../../../lib/graphql";
import { CenteredBeatLoader } from "../../global/CenteredBeatLoader";
import { LoadMoreButton } from "../../global/LoadMoreButton";
import { PaginationLoadMoreContainer } from "../../global/PaginationLoadMoreContainer";
import { PaginationProgressTracker } from "../../global/PaginationProgressTracker";
import { CustomerOrderTableRow } from "./CustomerOrderTableRow";

const MAX_ORDER_PER_PAGE = 10;
const containerVariant = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};
const variantItem = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

export const CustomerOrderTable = () => {
  const [offset, setOffset] = useState(0);
  const { data, fetchMore, loading, refetch } = useMyCustomerOrdersQuery({
    variables: {
      input: {
        limit: MAX_ORDER_PER_PAGE,
        offset: 0,
      },
    },
    notifyOnNetworkStatusChange: true,
  });
  return (
    <div className="mx-auto max-w-5xl overflow-auto px-4">
      {data && data.myOrders.items.length > 0 && (
        <div>
          <table className={`mx-auto w-full ${loading ? "opacity-75" : ""}`}>
            <thead>
              <tr>
                <th className="text-staytard-dark w-40 px-4 py-4 pr-20 text-left text-sm  font-medium tracking-wide text-opacity-75">
                  Order ID
                </th>
                <th className="text-staytard-dark pr-20 text-left text-sm  font-medium tracking-wide text-opacity-75">
                  Address
                </th>
                <th className="text-staytard-dark pr-20 text-left text-sm  font-medium tracking-wide text-opacity-75">
                  Date
                </th>
                <th className="text-staytard-dark pr-20 text-left text-sm  font-medium tracking-wide text-opacity-75">
                  Cost
                </th>
                <th className="text-staytard-dark pr-20 text-left text-sm  font-medium tracking-wide text-opacity-75">
                  Status
                </th>
              </tr>
            </thead>
            <motion.tbody
              variants={containerVariant}
              initial="hidden"
              animate="show"
            >
              {data?.myOrders.items.map((order) => (
                <CustomerOrderTableRow
                  key={order.id}
                  variants={variantItem}
                  customerOrder={order}
                />
              ))}
            </motion.tbody>
          </table>
          {loading && <CenteredBeatLoader />}
          {data && (
            <PaginationLoadMoreContainer>
              <PaginationProgressTracker
                currentCount={data.myOrders.items.length}
                text={`You have seen ${data.myOrders.items.length} of ${data.myOrders.totalCount} orders `}
                totalCount={data.myOrders.totalCount}
              />
              {data.myOrders.hasMore && (
                <LoadMoreButton
                  disabled={loading}
                  onClick={async () => {
                    try {
                      await fetchMore({
                        variables: {
                          input: {
                            limit: MAX_ORDER_PER_PAGE,
                            offset: offset + MAX_ORDER_PER_PAGE,
                          },
                        },
                      });
                      setOffset(offset + MAX_ORDER_PER_PAGE);
                    } catch (err) {
                      console.log(err);
                    }
                  }}
                >
                  Show more
                </LoadMoreButton>
              )}
            </PaginationLoadMoreContainer>
          )}
        </div>
      )}
    </div>
  );
};
