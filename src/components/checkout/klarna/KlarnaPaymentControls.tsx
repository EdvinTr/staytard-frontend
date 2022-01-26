import { useRouter } from "next/router";
import React, { Fragment, useEffect } from "react";
import {
  InitKlarnaSessionInput,
  useCreateOrderWithKlarnaMutation,
  useInitializeKlarnaSessionMutation,
  useMeQuery,
} from "../../../lib/graphql";
import { KlarnaPaymentWidget } from "./KlarnaPaymentWidget";

interface KlarnaPaymentControlsProps {}

interface KlarnaAuthorizationResponse {
  approved: boolean;
  authorization_token: string;
  finalize_required: boolean;
  show_form: boolean;
}

export const KlarnaPaymentControls = () => {
  const router = useRouter();
  const { data: meData } = useMeQuery();

  const [initializeKlarna, { data: klarnaSessionData, loading }] =
    useInitializeKlarnaSessionMutation();

  const [createOrderWithKlarna] = useCreateOrderWithKlarnaMutation();

  // TODO: should grab stuff from cart
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
      const response = await createOrderWithKlarna({
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
      const redirectURL = response.data.createOrderWithKlarna.redirect_url;
      router.push(redirectURL);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Fragment>
      {klarnaSessionData && (
        <KlarnaPaymentWidget
          klarnaData={klarnaSessionData.initializeKlarnaSession}
          cartData={cartData}
          onAuthorization={handleKlarnaAuthorization}
        />
      )}
    </Fragment>
  );
};
