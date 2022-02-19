export const getTotalPages = (totalItems: number, limit: number): number => {
  const totalPages = Math.ceil(totalItems / limit);
  return totalPages === 0 ? 1 : totalPages;
};
