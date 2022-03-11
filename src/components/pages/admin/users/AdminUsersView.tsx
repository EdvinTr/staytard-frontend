import { CheckIcon, SearchIcon, XIcon } from "@heroicons/react/solid";
import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDebounce } from "usehooks-ts";
import {
  ADMIN_PAGE_QUERY_KEY,
  ADMIN_SUB_PAGE_ROUTE,
  APP_PAGE_ROUTE,
} from "../../../../constants";
import { useFindAllUsersQuery } from "../../../../lib/graphql";
import { BaseInput } from "../../../global/BaseInput";
import { BasicCard } from "../../../global/BasicCard";
import { CenteredBeatLoader } from "../../../global/CenteredBeatLoader";
import { LoadMoreButton } from "../../../global/LoadMoreButton";
import { PaginationLoadMoreContainer } from "../../../global/PaginationLoadMoreContainer";
import { PaginationProgressTracker } from "../../../global/PaginationProgressTracker";
import { InformationDetailsCard } from "../components/InformationDetailsCard";
import { MyGrid } from "../components/MyGrid";
import { PaddingContainer } from "../components/PaddingContainer";
import { SubPageHeader } from "../components/SubPageHeader";

interface AdminUsersViewProps {}

const MAX_USER_FETCH_LIMIT = 50;
export const AdminUsersView: React.FC<AdminUsersViewProps> = ({}) => {
  const router = useRouter();
  const [offset, setOffset] = useState(0);
  const [searchTerm, setSearchTerm] = useState(
    router.query[ADMIN_PAGE_QUERY_KEY.Q]
      ? (router.query[ADMIN_PAGE_QUERY_KEY.Q] as string)
      : ""
  );
  const debouncedSearchTerm = useDebounce<string>(searchTerm, 500);
  const { data, fetchMore, error, loading, refetch, previousData } =
    useFindAllUsersQuery({
      variables: {
        input: {
          limit: MAX_USER_FETCH_LIMIT,
          offset: 0,
          q: debouncedSearchTerm,
        },
      },
      notifyOnNetworkStatusChange: true,
    });

  const handleFetchMore = async () => {
    try {
      await fetchMore({
        variables: {
          input: {
            limit: MAX_USER_FETCH_LIMIT,
            offset: offset + MAX_USER_FETCH_LIMIT,
            q: debouncedSearchTerm,
          },
        },
      });
      setOffset(offset + MAX_USER_FETCH_LIMIT);
    } catch {}
  };

  useEffect(() => {
    Router.replace(
      {
        query: {
          ...Router.query,
          q: debouncedSearchTerm,
        },
      },
      undefined,
      { shallow: true }
    );
    refetch({
      input: {
        limit: MAX_USER_FETCH_LIMIT,
        offset: 0,
        q: debouncedSearchTerm,
      },
    }).then(() => setOffset(0));
  }, [debouncedSearchTerm, refetch]);
  return (
    <div className="pb-20">
      <SubPageHeader title="Users" />
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
        {!loading && !error && (
          <div className="relative md:max-w-sm">
            <BaseInput
              type="text"
              aria-label="Search"
              className="mb-3 border-opacity-[0.1]"
              placeholder="Search by any user parameter"
              label="Search"
              name="search"
              autoComplete="off"
              hasLeftIcon
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchIcon className="absolute top-3 left-3 w-6 text-stone-700" />
          </div>
        )}
        {loading && <CenteredBeatLoader />}
        <MyGrid>
          {data &&
            data.users &&
            data.users.items.map((user) => {
              return (
                <InformationDetailsCard key={user.id} loading={loading}>
                  <InformationDetailsCard.Header
                    href={`${APP_PAGE_ROUTE.ADMIN}${ADMIN_SUB_PAGE_ROUTE.EDIT_USER}/${user.id}`}
                    anchorTitle={`Edit user ${user.firstName} ${user.lastName}`}
                  >
                    <h2 className="font-medium">
                      {user.firstName} {user.lastName}
                    </h2>
                  </InformationDetailsCard.Header>
                  <InformationDetailsCard.Body
                    items={[
                      { label: "User ID", value: user.id },
                      { label: "First name", value: user.firstName },
                      { label: "Last name", value: user.lastName },
                      { label: "Email", value: user.email },
                      { label: "Phone", value: user.mobilePhoneNumber || "-" },
                      {
                        label: "Admin",
                        value: (
                          <div>
                            {user.isAdmin ? (
                              <CheckIcon className="w-4 text-green-700" />
                            ) : (
                              <XIcon className="w-4 text-red-700" />
                            )}
                          </div>
                        ),
                      },
                      {
                        label: "Confirmed email",
                        value: (
                          <div>
                            {user.isEmailConfirmed ? (
                              <CheckIcon className="w-4 text-green-700" />
                            ) : (
                              <XIcon className="w-4 text-red-700" />
                            )}
                          </div>
                        ),
                      },
                      {
                        label: "Registered",
                        value: new Date(user.createdAt).toLocaleString(),
                      },
                      {
                        label: "Updated",
                        value: new Date(user.updatedAt).toLocaleString(),
                      },
                    ]}
                  />
                </InformationDetailsCard>
              );
            })}
        </MyGrid>
        {data && data.users && (
          <PaginationLoadMoreContainer>
            <PaginationProgressTracker
              currentCount={data.users.items.length}
              totalCount={data.users.totalCount}
              text={`You have seen ${data.users.items.length} of ${data.users.totalCount} users`}
            />

            {data.users.hasMore && (
              <LoadMoreButton
                disabled={loading}
                onClick={async () => {
                  await handleFetchMore();
                }}
              >
                Show more
              </LoadMoreButton>
            )}
          </PaginationLoadMoreContainer>
        )}
      </PaddingContainer>
    </div>
  );
};
