import React from "react";

interface PaginationProgressTrackerProps {
  totalCount: number;
  currentCount: number;
  text: string;
}

export const PaginationProgressTracker: React.FC<
  PaginationProgressTrackerProps
> = ({ currentCount, totalCount, text }) => {
  return (
    <div className="space-y-1 px-2 text-center">
      {/* pagination progress */}
      <p className="text-[#6b6b6b]">{text}</p>
      <progress
        max={totalCount}
        value={currentCount}
        className="block h-[0.125rem] w-full appearance-none bg-gray-50"
        style={{
          color: "#222",
        }}
      ></progress>
    </div>
  );
};
