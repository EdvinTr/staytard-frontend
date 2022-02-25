import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import React, {
  Fragment,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import CartContext from "../../../contexts/CartContext";
import { useFindProductsBySkusQuery } from "../../../lib/graphql";
import { CreateStripeSessionResponse } from "../../../typings/StripeSessionResponse.interface";
import { BaseButton } from "../../global/BaseButton";
import { KlarnaPaymentControls } from "../klarna/KlarnaPaymentControls";

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51KWgCBIgZ4CKdcTmxGN6i7axd5axnOVQILMYUn7qOY5bFvXbUj2GgOy0QiPaJWexQOYIfJ74VgqkbWuZkKcrtd7y00cCNQrfBU"
);
interface PaymentOptionsGroupProps {}

enum PAYMENT_PROVIDER {
  KLARNA = "klarna",
  PAYPAL = "paypal",
  STRIPE = "stripe",
}

export const PaymentOptionsGroup: React.FC<PaymentOptionsGroupProps> = ({}) => {
  const [selectedPaymentProvider, setSelectedPaymentProvider] =
    React.useState<null | PAYMENT_PROVIDER>(null);

  const handlePaymentSelectionChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedPaymentProvider(e.target.value as PAYMENT_PROVIDER);
    },
    []
  );

  return (
    <Fragment>
      {/* radio buttons */}
      <div className="mt-4 flex flex-col space-y-2 text-sm">
        <div>
          <input
            checked={selectedPaymentProvider === PAYMENT_PROVIDER.PAYPAL}
            type="radio"
            id="paypal"
            name="paypal"
            value="paypal"
            onChange={(e) => handlePaymentSelectionChange(e)}
          />
          <label htmlFor="paypal" className="ml-4 font-semibold tracking-wide">
            PayPal
          </label>
        </div>
        {/*  <div>
          <input
            checked={selectedPaymentProvider === PAYMENT_PROVIDER.KLARNA}
            type="radio"
            id="klarna"
            name="klarna"
            value="klarna"
            onChange={(e) => handlePaymentSelectionChange(e)}
          />
          <label htmlFor="klarna" className="font-semibold tracking-wide ml-4">
            Klarna
          </label>
        </div> */}
        <div>
          <input
            checked={selectedPaymentProvider === PAYMENT_PROVIDER.STRIPE}
            type="radio"
            id="stripe"
            name="stripe"
            value="stripe"
            onChange={(e) => handlePaymentSelectionChange(e)}
          />
          <label htmlFor="stripe" className="ml-4 font-semibold tracking-wide">
            Stripe
          </label>
        </div>
      </div>
      {selectedPaymentProvider === PAYMENT_PROVIDER.STRIPE && (
        /*  <StripeCheckoutForm /> */
        <PayWithStripeComponent />
      )}
      {/* TODO: should only be visible as well when there is user data and the user has an address */}
      {selectedPaymentProvider === PAYMENT_PROVIDER.KLARNA && (
        <KlarnaPaymentControls />
      )}
    </Fragment>
  );
};

/* {
  // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
  quantity: 1,
  price_data: {
    currency: 'EUR',
    unit_amount: 1000,
    product_data: {
      name: 'Solid Jeans',
      description: 'Category goes here',
      images: [
        'https://images.unsplash.com/photo-1645653025752-d6604441e9de?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1865&q=80',
      ],
    },
  },
}, */
interface StripeOrderLine {
  quantity: number;
  price_data: {
    currency: string;
    unit_amount: number;
    product_data: {
      name: string;
      description: string;
      images: string[];
      metadata?: Record<string, string | number>;
    };
  };
}

const PayWithStripeComponent = () => {
  const { cart, totalCartPrice, resetCart } = useContext(CartContext);
  const { data: cartProducts } = useFindProductsBySkusQuery({
    variables: {
      input: { limit: 50, offset: 0, skus: cart.map((item) => item.sku) },
    },
  });
  const orderLines = useMemo((): StripeOrderLine[] => {
    if (!cartProducts) {
      return [];
    }
    return cartProducts?.productsBySku.items.map((product) => {
      const quantity =
        cart.find((item) => item.sku === product.attributes[0].sku)?.quantity ||
        0;

      return {
        quantity: quantity,
        price_data: {
          currency: "EUR",
          unit_amount: product.currentPrice * 100,
          product_data: {
            name: product.name,
            description: product.brand.name,
            images: [product.images[0].imageUrl.replace("{size}", "400")],
            metadata: {
              sku: product.attributes[0].sku,
              productId: product.id,
            },
          },
        },
      };
    });
  }, [cartProducts, cart]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const startSession = async () => {
    try {
      setError(null);
      setLoading(true);
      const res = await axios.post<CreateStripeSessionResponse>(
        process.env.NEXT_PUBLIC_REST_API_ENDPOINT + "/stripe/create-session",
        {
          orderLines: orderLines,
        }
      );
      if (!res || !res.data) {
        throw new Error();
      }
      await stripePromise.then((stripe) => {
        stripe?.redirectToCheckout({
          sessionId: res.data.id,
        });
      });
      setLoading(false);
    } catch (err: any) {
      console.log(err?.response);
      setLoading(false);
      setError(err?.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <div className="pt-6 pl-4">
      {error && <div className="py-3 text-xs text-red-600">{error}</div>}
      <BaseButton
        disabled={loading}
        variant="outline"
        onClick={() => startSession()}
        loading={loading}
      >
        Pay with Stripe
      </BaseButton>
    </div>
  );
};
