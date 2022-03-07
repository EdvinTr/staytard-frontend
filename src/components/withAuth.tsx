// HOC/withAuth.jsx
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { COOKIE_NAME } from "../constants";
import { useMeQuery } from "../lib/graphql";
export const withAuth = (
  WrappedComponent: any,
  redirectPath: string,
  checkIsAdmin: boolean = false
) => {
  return (props: any) => {
    const [cookies] = useCookies();
    // checks whether we are on client / browser or server.
    if (typeof window !== "undefined") {
      const router = useRouter();
      const { data, loading } = useMeQuery();
      const accessToken = cookies[COOKIE_NAME.ACCESS_TOKEN];

      // If there is no access token we redirect to "/" page.
      if (!accessToken) {
        router.replace(redirectPath);
        return null;
      }
      if (loading) {
        return null;
      }
      // If there is an access token we check if it is valid.
      if ((!data || !data.me) && !loading) {
        router.replace(redirectPath);
        return null;
      }
      if (checkIsAdmin) {
        // If the user is not an admin we redirect to "/" page.
        if (!data?.me.isAdmin) {
          router.replace(redirectPath);
          return null;
        }
      }
      // return the wrapped component.
      return <WrappedComponent {...props} />;
    }
    // If we are on server, return null
    return null;
  };
};
