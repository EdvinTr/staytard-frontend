import React from "react";

type AvailableStep = "1" | "2" | "3" | "4";
interface StepBadgeProps {
  step: AvailableStep;
}

export const StepBadge = ({ step }: StepBadgeProps) => {
  return (
    <div className="hidden lg:flex lg:items-center lg:justify-center font-bold bg-staytard-yellow absolute  left-4 rounded-full w-7 text-center h-7">
      {step}
    </div>
  );
};
