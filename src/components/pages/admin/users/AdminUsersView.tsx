import React from "react";

interface AdminUsersViewProps {}

export const AdminUsersView: React.FC<AdminUsersViewProps> = ({}) => {
  return (
    <div className="w-96 bg-red-500">
      <h1 className="text-2xl font-bold">Users are shown here</h1>
    </div>
  );
};
