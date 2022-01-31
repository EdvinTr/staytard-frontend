import { NextPage } from "next";
import React, { Fragment } from "react";
import { AppHeader } from "../components/AppHeader";
import { CartItemList } from "../components/checkout/cart/CartItemList";
import { StepBadge } from "../components/checkout/cart/StepBadge";
import { FadeInContainer } from "../components/global/FadeInContainer";
import { MyContainer } from "../components/MyContainer";
import { useMeQuery } from "../lib/graphql";

const CheckoutPage: NextPage = () => {
  const { data: meData } = useMeQuery();

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
                <div>617 EUR</div>
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
          <SectionWrapper>
            <StepBadge step="2" />
            <div className="uppercase text-sm font-bold tracking-wider">
              Your Information
            </div>
          </SectionWrapper>
          {/*  {meData?.me ? (
          <KlarnaPaymentControls />
        ) : (
          <h1 className="text-2xl font-semibold">
            You need to be logged in to checkout.
          </h1>
        )} */}
        </MyContainer>
      </FadeInContainer>
    </Fragment>
  );
};

const SectionWrapper: React.FC = ({ children }) => {
  return (
    <section className="relative bg-white p-2 max-w-5xl lg:max-w-4xl mx-auto lg:px-16 lg:py-6">
      {children}
    </section>
  );
};

export default CheckoutPage;
