import React from "react";
import { SpinnerCircularFixed } from "spinners-react";

interface LoadingSpinnerProps {
  size?: number | string;
  cypressId?: string;
}

export const LoadingSpinner = ({ size, cypressId }: LoadingSpinnerProps) => {
  return (
    <SpinnerCircularFixed
      data-cy={cypressId || "loading-spinner"}
      size={size || 30}
      thickness={80}
      speed={300}
      color="rgba(0,0,0,1)"
      secondaryColor="rgba(172, 57, 57, 0)"
      className="inline"
    />
  );
};
