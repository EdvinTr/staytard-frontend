// HOC/withAuth.jsx
import { useRouter } from "next/router";
import { useMeQuery } from "../lib/graphql";
import { CenteredBeatLoader } from "./global/CenteredBeatLoader";
export const withAuth = (
  WrappedComponent: any,
  redirectPath: string,
  checkIsAdmin: boolean = false
) => {
  return function WithAuth(props: any) {
    const router = useRouter();
    const { data, loading } = useMeQuery();
    // checks whether we are on client / browser or server.
    if (typeof window !== "undefined") {
      if (loading) {
        return <CenteredBeatLoader />;
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
