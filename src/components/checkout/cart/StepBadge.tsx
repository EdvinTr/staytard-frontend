import React from "react";

type AvailableStep = "1" | "2" | "3" | "4";
interface StepBadgeProps {
  step: AvailableStep;
}

export const StepBadge = ({ step }: StepBadgeProps) => {
  return (
    <div className="bg-app-yellow absolute top-5 left-4 hidden h-7 w-7 rounded-full text-center font-bold lg:flex lg:items-center lg:justify-center">
      {step}
    </div>
  );
};
