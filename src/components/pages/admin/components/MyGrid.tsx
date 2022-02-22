import React from "react";

interface MyGridProps {}

export const MyGrid: React.FC<MyGridProps> = ({ children }) => {
  return (
    <div className="3xl:grid-cols-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8 2xl:grid-cols-4">
      {children}
    </div>
  );
};
