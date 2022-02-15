import { GetServerSidePropsContext, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";
import { COOKIE_NAME } from "../../constants";
import { ssrMe } from "../../lib/page";

export const isAdminSsrAuthGuard = async (
  ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) => {
  try {
    const accessToken = ctx.req.cookies[COOKIE_NAME.ACCESS_TOKEN];
    if (!accessToken) {
      // save some bandwidth if no access token is present
      throw new Error();
    }
    // fetch user by passing the cookies in the request header
    const user = await ssrMe.getServerPage({
      context: { headers: ctx.req.headers },
    });
    // check if user is admin
    if (!user || !user.props.data || !user.props.data.me.isAdmin) {
      throw new Error();
    }
    return {
      props: {}, // requesting user is admin
    };
  } catch (err) {
    return {
      props: {},
      notFound: true,
    };
  }
};
