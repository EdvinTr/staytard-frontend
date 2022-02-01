import { NextPage } from "next";
import React, { Fragment, useCallback, useContext } from "react";
import { AppHeader } from "../components/AppHeader";
import { CartItemList } from "../components/checkout/cart/CartItemList";
import { StepBadge } from "../components/checkout/cart/StepBadge";
import { CustomerInformation } from "../components/checkout/customer-information/CustomerInformation";
import { KlarnaPaymentControls } from "../components/checkout/klarna/KlarnaPaymentControls";
import { FadeInContainer } from "../components/global/FadeInContainer";
import { MyContainer } from "../components/MyContainer";
import { RegisterForm } from "../components/register-form/RegisterForm";
import CartContext from "../contexts/CartContext";
import { useMeQuery } from "../lib/graphql";

enum PAYMENT_PROVIDER {
  KLARNA = "klarna",
  PAYPAL = "paypal",
}
const CheckoutPage: NextPage = () => {
  const { data: meData } = useMeQuery();
  const { totalCartPrice } = useContext(CartContext);

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
      <AppHeader />

      <FadeInContainer className="text-staytard-dark bg-staytard-light-gray min-h-screen">
        <MyContainer className="">
          <h1 className="py-8 text-center text-xl md:text-2xl uppercase font-light tracking-widest">
            Your shopping cart
          </h1>
          {/* cart item */}

          <SectionWrapper>
            <StepBadge step="1" />
            <CartItemList />
            <div className="md:bg-staytard-light-gray mt-8 md:px-8 md:py-4">
              <div className="flex justify-between font-bold">
                <div className="uppercase text-13">Your products</div>
                <div>{totalCartPrice} EUR</div>
              </div>
              <div className="w-full flex py-4 md:py-2 text-13 space-x-3">
                <button className="w-full tracking-wider border-staytard-dark border-2 border-opacity-20 py-3 hover:border-black">
                  Discount code
                </button>
                <button className="w-full tracking-wider border-staytard-dark border-2 border-opacity-20 py-3 hover:border-black">
                  Gift card
                </button>
              </div>
            </div>
          </SectionWrapper>
          <h2 className="py-8 text-center text-xl md:text-2xl uppercase font-light tracking-widest">
            Complete Purchase
          </h2>
          <div className="space-y-6 min-h-screen">
            <SectionWrapper>
              {/* user information */}
              <StepBadge step="2" />
              <div className="uppercase text-sm font-bold tracking-wider">
                Your Information
              </div>
              {meData?.me && meData.me.address ? (
                /* TODO: if user doesn't have an address, it should display component that lets the user update his address */
                <CustomerInformation customerData={meData.me} />
              ) : (
                <RegisterForm
                  onSuccess={() => console.log("Register user done")}
                />
              )}
            </SectionWrapper>
            <SectionWrapper>
              {/* shipping method */}
              <StepBadge step="3" />
              <div className="uppercase text-sm font-bold tracking-wider">
                Shipping Method
              </div>
            </SectionWrapper>
            <SectionWrapper>
              {/* payment selection */}
              <StepBadge step="4" />
              <div className="uppercase text-sm font-bold tracking-wider">
                Pay
              </div>
              {/* radio buttons */}
              <div className="flex flex-col text-sm mt-4 space-y-2">
                <div>
                  <input
                    checked={
                      selectedPaymentProvider === PAYMENT_PROVIDER.PAYPAL
                    }
                    type="radio"
                    id="paypal"
                    name="paypal"
                    value="paypal"
                    onChange={(e) => handlePaymentSelectionChange(e)}
                  />
                  <label
                    htmlFor="paypal"
                    className="font-semibold tracking-wide ml-4"
                  >
                    PayPal
                  </label>
                </div>
                <div>
                  <input
                    checked={
                      selectedPaymentProvider === PAYMENT_PROVIDER.KLARNA
                    }
                    type="radio"
                    id="klarna"
                    name="klarna"
                    value="klarna"
                    onChange={(e) => handlePaymentSelectionChange(e)}
                  />
                  <label
                    htmlFor="klarna"
                    className="font-semibold tracking-wide ml-4"
                  >
                    Klarna
                  </label>
                </div>
              </div>
              {selectedPaymentProvider === PAYMENT_PROVIDER.KLARNA && (
                <KlarnaPaymentControls />
              )}
            </SectionWrapper>
          </div>
        </MyContainer>
      </FadeInContainer>
    </Fragment>
  );
};

interface SectionWrapperProps extends React.HTMLAttributes<"section"> {}

const SectionWrapper: React.FC<SectionWrapperProps> = ({
  children,
  className,
}) => {
  return (
    <section
      className={`relative bg-white p-2 max-w-5xl lg:max-w-4xl mx-auto lg:px-16 lg:py-6 ${
        className ? className : ""
      }`}
    >
      {children}
    </section>
  );
};

export default CheckoutPage;
