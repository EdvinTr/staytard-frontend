import { useRouter } from "next/router";
import { useMeQuery } from "../lib/graphql";
import { CenteredBeatLoader } from "./global/CenteredBeatLoader";

export const withIsLoggedIn = (WrappedComponent: any, redirectPath: string) => {
  return function WithIsLoggedIn(props: any) {
    const router = useRouter();
    const { data, loading } = useMeQuery();
    // checks whether we are on client / browser or server.
    if (typeof window !== "undefined") {
      if (loading) {
        return <CenteredBeatLoader />;
      }
      // If there is an access token we check if it is valid.
      if (data && data.me && !loading) {
        router.replace(redirectPath);
        return null;
      }
      // return the wrapped component.
      return <WrappedComponent {...props} />;
    }
    // If we are on server, return null
    return null;
  };
};
