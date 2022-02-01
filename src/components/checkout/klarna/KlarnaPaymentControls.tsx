import { useRouter } from "next/router";
import React, { Fragment, useContext, useEffect, useMemo } from "react";
import { APP_PAGE_ROUTE } from "../../../constants";
import CartContext from "../../../contexts/CartContext";
import {
  InitKlarnaSessionInput,
  useCreateOrderWithKlarnaMutation,
  useFindProductsBySkusQuery,
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
type KlarnaOrderLine = InitKlarnaSessionInput["order_lines"][0];
export const KlarnaPaymentControls = () => {
  const router = useRouter();
  const { data: meData } = useMeQuery();

  const { cart, addToCart, removeFromCart, totalCartPrice } =
    useContext(CartContext);

  const { data: cartProducts } = useFindProductsBySkusQuery({
    variables: {
      input: { limit: 50, offset: 0, skus: cart.map((item) => item.sku) },
    },
  });
  const orderLines = useMemo((): KlarnaOrderLine[] => {
    if (!cartProducts) {
      return [];
    }
    return cartProducts?.productsBySku.items.map((prod) => {
      const quantity =
        cart.find((item) => item.sku === prod.attributes[0].sku)?.quantity || 0;
      return {
        image_url: prod.images[0].imageUrl.replace("{size}", "500"),
        name: prod.name,
        quantity: quantity,
        total_tax_amount: 0,
        tax_rate: 0,
        total_discount_amount: 0,
        total_amount: prod.currentPrice * quantity,
        product_url: `${APP_PAGE_ROUTE.PRODUCT}/${prod.id}`, // TODO: should be pathname of the current Application URL
        unit_price: prod.currentPrice,
        productId: prod.id,
        sku: prod.attributes[0].sku,
      };
    });
  }, [cartProducts, cart]);

  const cartData: InitKlarnaSessionInput = {
    locale: "sv-SE",
    order_amount: totalCartPrice,
    order_lines: [...orderLines],
    purchase_country: "SE",
    purchase_currency: "SEK",
    order_tax_amount: 0,
    billing_address: {
      given_name: meData!.me.firstName,
      family_name: meData!.me.lastName,
      email: meData!.me.email,
      phone: meData!.me.mobilePhoneNumber,
      postal_code: meData!.me!.address!.postalCode,
      city: meData!.me!.address!.city,
      country: "SE",
      street_address: meData!.me!.address!.street,
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

  const [initializeKlarna, { data: klarnaSessionData, loading }] =
    useInitializeKlarnaSessionMutation();

  const [createOrderWithKlarna, { error: createOrderError }] =
    useCreateOrderWithKlarnaMutation();

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
      const orderNumber = response.data.createOrderWithKlarna.orderNumber;
      const redirectURL = `${APP_PAGE_ROUTE.CONFIRMATION}/${orderNumber}`;
      router.push(redirectURL);
    } catch (err) {
      console.log(err);
      // TODO: show some error to the user or something
    }
  };
  return (
    <Fragment>
      {klarnaSessionData && (
        <KlarnaPaymentWidget
          klarnaSessionData={klarnaSessionData.initializeKlarnaSession}
          cartData={cartData}
          onAuthorization={handleKlarnaAuthorization}
          error={createOrderError}
        />
      )}
    </Fragment>
  );
};
