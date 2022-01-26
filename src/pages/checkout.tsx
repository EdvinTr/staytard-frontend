import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FadeInContainer } from "../components/global/FadeInContainer";
import { KlarnaPayment } from "../components/KlarnaPayment";
import { MyContainer } from "../components/MyContainer";
import {
  InitKlarnaSessionInput,
  useAuthorizeKlarnaMutation,
  useInitializeKlarnaSessionMutation,
  useMeQuery,
} from "../lib/graphql";

interface KlarnaAuthorizationResponse {
  approved: boolean;
  authorization_token: string;
  finalize_required: boolean;
  show_form: boolean;
}
const CheckoutPage: NextPage = () => {
  const router = useRouter();
  const [initializeKlarna, { data: klarnaSessionData, loading }] =
    useInitializeKlarnaSessionMutation();
  const { data: meData } = useMeQuery();

  const [authorizeWithKlarna, { data: authorizeWithKlarnaData }] =
    useAuthorizeKlarnaMutation();

  // TODO: checkout page should consist of several components where user gets to enter his details and stuff and in the end you show payment options.
  // for now, just hard code things to make sure it is working correctly.
  const cartData: InitKlarnaSessionInput = {
    locale: "sv-SE",
    order_amount: 100,
    order_lines: [
      {
        image_url: "someurl",
        name: "product1",
        quantity: 1,
        tax_rate: 0,
        total_amount: 100,
        product_url: "produrl",
        total_discount_amount: 0,
        total_tax_amount: 0,
        unit_price: 100,
      },
    ],
    purchase_country: "SE",
    purchase_currency: "SEK",
    order_tax_amount: 0,
    billing_address: {
      given_name: meData?.me.firstName || "",
      family_name: meData?.me.lastName || "",

      email: meData?.me.email || "",
      phone: meData?.me.mobilePhoneNumber || "",
      postal_code: meData?.me?.address?.postalCode || "75645",
      city: meData?.me.address?.city || "Uppsala",
      country: "SE",
      street_address: meData?.me?.address?.street || "Tuvängsvägen 15",
    },
  };
  useEffect(() => {
    initializeKlarna({
      variables: {
        input: {
          ...cartData,
        },
      },
    });
  }, []);

  const handleKlarnaAuthorization = async (
    data: KlarnaAuthorizationResponse
  ) => {
    try {
      const response = await authorizeWithKlarna({
        variables: {
          input: {
            ...cartData,
          },
          authorizationToken: data.authorization_token,
        },
      });
      if (!response || !response.data) {
        throw new Error();
      }
      // TODO: check it got approved, if so, go ahead and send request to backend to create order. (can use the order_id as the order_number column)

      const redirectURL = response.data.authorizeKlarnaToken.redirect_url;
      router.push(redirectURL);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <FadeInContainer className="text-staytard-dark min-h-screen">
      <MyContainer>
        <h1>You get here when you checkout cart or something, maybe.</h1>
        {klarnaSessionData && (
          <KlarnaPayment
            klarnaData={klarnaSessionData.initializeKlarnaSession}
            cartData={cartData}
            onAuthorization={handleKlarnaAuthorization}
          />
        )}
      </MyContainer>
    </FadeInContainer>
  );
};

export default CheckoutPage;
