import { LOCAL_STORAGE_KEY } from "../constants";

export const setTokensInLocalStorage = ({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}) => {
  localStorage.setItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN, accessToken);
  localStorage.setItem(LOCAL_STORAGE_KEY.REFRESH_TOKEN, refreshToken);
};
