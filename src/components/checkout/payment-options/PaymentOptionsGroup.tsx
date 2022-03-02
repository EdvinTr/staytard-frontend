import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import Image from "next/image";
import React, { Fragment, useContext, useMemo, useState } from "react";
import { SpinnerCircularFixed } from "spinners-react";
import CartContext from "../../../contexts/CartContext";
import { useFindProductsBySkusQuery } from "../../../lib/graphql";
import { CreateStripeSessionResponse } from "../../../typings/StripeSessionResponse.interface";

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
interface PaymentOptionsGroupProps {}

enum PAYMENT_PROVIDER {
  STRIPE = "stripe",
}

export const PaymentOptionsGroup: React.FC<PaymentOptionsGroupProps> = ({}) => {
  return (
    <Fragment>
      <div className="pt-6">
        <PayWithStripeComponent />
      </div>
    </Fragment>
  );
};

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
    <div className="">
      <div>
        {error && <div className="py-3 text-xs text-red-600">{error}</div>}

        <div className="max-w-xs text-sm">
          <button
            disabled={loading}
            onClick={() => startSession()}
            className="flex w-[17rem] items-center rounded-lg bg-[#3A3662] text-white sm:w-[19rem]"
          >
            {loading ? (
              <div className="flex w-full items-center justify-center py-4">
                <SpinnerCircularFixed
                  size={21}
                  thickness={100}
                  speed={300}
                  color="rgba(255,255,255,1)"
                  secondaryColor="rgba(172, 57, 57, 0)"
                />
              </div>
            ) : (
              <>
                <div className="w-full py-4">
                  <span className="font-medium">Checkout with</span>{" "}
                  <span className="font-bold">stripe</span>
                </div>
              </>
            )}
            <div className="w-24 rounded-r-lg bg-[#555177] py-4  font-medium">
              €{totalCartPrice}
            </div>
          </button>
          <div className="text-center">
            <Image
              width={34}
              height={34}
              alt="Visa"
              objectFit="contain"
              src="/img/Visa_Brandmark_RGB_2021_PNG/Visa_Brandmark_Blue_RGB_2021.png"
            />
            <Image
              width={34}
              height={34}
              alt="Visa"
              objectFit="contain"
              src="/img/mastercard-symbol/mc_symbol.svg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
