import { GetServerSidePropsContext, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";
import { APP_PAGE_ROUTE, COOKIE_NAME } from "../../constants";
import { ssrMe } from "../../lib/page";

export const isUserLoggedInRouteGuard = async (
  ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) => {
  const accessToken = ctx.req.cookies[COOKIE_NAME.ACCESS_TOKEN];
  if (!accessToken) {
    // save some bandwidth if no access token is present
    return {
      props: {},
      redirect: {
        destination: APP_PAGE_ROUTE.INDEX,
      },
    };
  }
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
        destination: APP_PAGE_ROUTE.INDEX,
      },
    };
  }
};
