import { useApolloClient } from "@apollo/client";
import { useLogoutMutation } from "../lib/graphql";

/* export const useLogoutUser = async () => {
  const apolloClient = useApolloClient();
  const [logoutUser, { data, error }] = useLogoutMutation();
  try {
    await apolloClient.resetStore();
    await logoutUser();
    return {
      data,
    };
  } catch (err) {
    return {
      success: false,
      error,
    };
  }
}; */

export const useLogoutUser = () => {
  const apolloClient = useApolloClient();
  const [logoutUser, { data, error }] = useLogoutMutation();
  return async () => {
    try {
      await apolloClient.resetStore();
      await logoutUser();
      return {
        data,
      };
    } catch (err) {
      return {
        success: false,
        error,
      };
    }
  };
};
