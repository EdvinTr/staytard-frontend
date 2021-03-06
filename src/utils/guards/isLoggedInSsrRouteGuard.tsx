import { GetServerSidePropsContext, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";
import { APP_PAGE_ROUTE } from "../../constants";
import { ssrMe } from "../../lib/page";

/**
 * @description
 * Route guard for checking if the user is allowed to visit a page depending on the validity of the user's cookies.
 *  */
export const isUserLoggedInRouteGuard = async (
  ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>,
  redirectDestination?: string
) => {
  /*   const accessToken = ctx.req.cookies[COOKIE_NAME.ACCESS_TOKEN];
  if (!accessToken) {
    // save some bandwidth if no access token is present
    return {
      props: {},
      redirect: {
        destination: redirectDestination
          ? redirectDestination
          : APP_PAGE_ROUTE.INDEX,
      },
    };
  } */
  try {
    // fetch user by passing the cookies in the request header
    const { props } = await ssrMe.getServerPage({
      context: { headers: ctx.req.headers },
    });
    if (!props.data || !props.data.me) {
      throw new Error(); // redirect to index page
    }
    return {
      props,
    };
  } catch (err) {
    return {
      props: {},
      redirect: {
        destination: redirectDestination
          ? redirectDestination
          : APP_PAGE_ROUTE.INDEX,
      },
    };
  }
};
