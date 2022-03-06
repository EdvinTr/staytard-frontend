import { ArrowLeftIcon } from "@heroicons/react/solid";
import router from "next/router";
import React from "react";
import { PaddingContainer } from "./PaddingContainer";
import { PageHeading } from "./PageHeading";

interface SubPageHeaderProps {
  title: string;
}

export const SubPageHeader = ({ title }: SubPageHeaderProps) => {
  return (
    <header className="bg-app-semi-light-gray">
      <PaddingContainer className="flex items-center space-x-5">
        <button aria-label="Navigate back" onClick={() => router.back()}>
          <ArrowLeftIcon className="h-6" aria-hidden />
        </button>
        <PageHeading visibleOnMobile>{title}</PageHeading>
      </PaddingContainer>
    </header>
  );
};
