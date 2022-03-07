// HOC/withAuth.jsx
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

export function withHasCookie(
  WrappedComponent: any,
  cookieName: string,
  redirectPath: string
) {
  return function WithHasCookie(props: any) {
    const [cookies] = useCookies();
    const router = useRouter();
    // checks whether we are on client / browser or server.
    if (typeof window !== "undefined") {
      // If there is an access token we redirect
      if (cookies[cookieName]) {
        router.replace(redirectPath);
        return null;
      }
      return <WrappedComponent {...props} />;
    }
    // If we are on server, return null
    return null;
  };
}
