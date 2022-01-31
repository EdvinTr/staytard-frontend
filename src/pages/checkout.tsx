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

      <FadeInContainer className="text-staytard-dark bg-[#f3f3f3] min-h-screen">
        <MyContainer className="">
          <h1 className="py-8 text-center text-xl md:text-2xl uppercase font-light tracking-widest">
            Your shopping cart
          </h1>
          {/* cart item */}

          <SectionWrapper>
            <StepBadge step="1" />
            <CartItemList />
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
