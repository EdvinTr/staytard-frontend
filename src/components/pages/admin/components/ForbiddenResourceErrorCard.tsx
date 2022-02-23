import React from "react";
import { BasicCard } from "../../../global/BasicCard";

interface ForbiddenResourceErrorCardProps {
  error: any;
}

export const ForbiddenResourceErrorCard: React.FC<
  ForbiddenResourceErrorCardProps
> = ({ error }) => {
  return (
    <BasicCard className="mx-auto max-w-xl p-4">
      <h3 className="text-lg text-red-600">
        {error.message.includes("Forbidden")
          ? "You do not have sufficient permissions to view this page."
          : error.message}
      </h3>
    </BasicCard>
  );
};
