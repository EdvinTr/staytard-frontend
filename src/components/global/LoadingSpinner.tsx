import React from "react";
import { SpinnerCircularFixed } from "spinners-react";

interface LoadingSpinnerProps {
  size?: number | string;
  className?: string;
}

export const LoadingSpinner = ({ size, className }: LoadingSpinnerProps) => {
  return (
    <SpinnerCircularFixed
      size={size || 30}
      thickness={80}
      speed={300}
      color="rgba(0,0,0,1)"
      secondaryColor="rgba(172, 57, 57, 0)"
      className={`inline ${className}`}
    />
  );
};
