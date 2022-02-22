import React, { Fragment } from "react";
import { CenteredBeatLoader } from "../../../global/CenteredBeatLoader";
import { AdminNavbarGroup } from "./nav/AdminNavbarGroup";
import { PaddingContainer } from "./PaddingContainer";
import { PageContentWrapper } from "./PageContentWrapper";
import { SubPageHeader } from "./SubPageHeader";

interface EditPageWrapperProps {
  loading?: boolean;
  error?: { message: string };
  noDataErrorMessage: string;
  hasData: boolean;
  navTitle: string;
}

export const EditPageWrapper: React.FC<EditPageWrapperProps> = ({
  children,
  loading,
  error,
  noDataErrorMessage,
  hasData,
  navTitle,
}) => {
  if (loading) {
    return <WrapperGroup loading navTitle={navTitle} />;
  }
  if (error) {
    return (
      <WrapperGroup loading={false} navTitle={navTitle}>
        <BasicErrorMessage error={error.message} />
      </WrapperGroup>
    );
  }
  if (!hasData) {
    return (
      <WrapperGroup loading={false} navTitle={navTitle}>
        <BasicErrorMessage error={noDataErrorMessage} />
      </WrapperGroup>
    );
  }
  return (
    <WrapperGroup loading={false} navTitle={navTitle}>
      <div className="mx-auto max-w-2xl pb-20 text-sm">{children}</div>
    </WrapperGroup>
  );
};
const BasicErrorMessage = ({ error }: { error: string }) => {
  return <div className="text-sm text-red-600">{error}</div>;
};

interface WrapperGroupProps {
  loading: boolean;
  navTitle: string;
}
const WrapperGroup: React.FC<WrapperGroupProps> = ({
  children,
  loading,
  navTitle,
}) => {
  return (
    <Fragment>
      <AdminNavbarGroup />
      <PageContentWrapper>
        <SubPageHeader title={navTitle} />
        <PaddingContainer>
          {loading && <CenteredBeatLoader />}
          {children}
        </PaddingContainer>
      </PageContentWrapper>
    </Fragment>
  );
};
