export const getPathFromParams = (params: string[]) => {
  const [first, ...rest] = params;
  let fullPath = `/${first}`;
  if (rest.length > 0) {
    fullPath = `/${first}/${rest.join("/")}`;
  }
  return fullPath;
};
