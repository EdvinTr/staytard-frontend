export const getOffset = (
  limit: number,
  pageNumber?: string | string[]
): number => {
  if (!pageNumber || Array.isArray(pageNumber)) {
    return 0;
  }
  const parsedPageNumber = parseInt(pageNumber) - 1;
  if (parsedPageNumber < 0) {
    return 0;
  }
  return parsedPageNumber * limit;
};
