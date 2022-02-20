import { CheckIcon, SearchIcon, XIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import React, { useState } from "react";
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
import { InformationDetailsCard } from "../components/InformationDetailsCard";
import { MyGrid } from "../components/MyGrid";
import { PaddingContainer } from "../components/PaddingContainer";
import { SubPageHeader } from "../components/SubPageHeader";

interface AdminUsersViewProps {}

const MAX_FETCH_LIMIT = 50;
export const AdminUsersView: React.FC<AdminUsersViewProps> = ({}) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(
    router.query[ADMIN_PAGE_QUERY_KEY.Q]
      ? (router.query[ADMIN_PAGE_QUERY_KEY.Q] as string)
      : ""
  );
  const debouncedSearchTerm = useDebounce<string>(searchTerm, 500);
  const { data, fetchMore, error, loading } = useFindAllUsersQuery({
    variables: {
      input: {
        limit: MAX_FETCH_LIMIT,
        offset: 0,
      },
    },
    notifyOnNetworkStatusChange: true,
  });
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
        {loading && <CenteredBeatLoader />}
        <MyGrid>
          {data &&
            data.users &&
            data.users.items.map((user) => {
              return (
                <InformationDetailsCard key={user.id} loading={loading}>
                  <InformationDetailsCard.Header
                    href={`${APP_PAGE_ROUTE.ADMIN}${ADMIN_SUB_PAGE_ROUTE.EDIT_USER}/${user.id}`}
                  >
                    <h2 className="font-medium">{user.firstName}</h2>
                  </InformationDetailsCard.Header>
                  <InformationDetailsCard.Body
                    items={[
                      { label: "First name", value: user.firstName },
                      { label: "Last name", value: user.lastName },
                      { label: "Email", value: user.email },
                      { label: "Phone", value: user.mobilePhoneNumber || "" },
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
                    ]}
                  />
                </InformationDetailsCard>
              );
            })}
        </MyGrid>
      </PaddingContainer>
    </div>
  );
};
