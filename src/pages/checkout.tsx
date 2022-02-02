import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import React, { FormEvent, Fragment, useContext } from "react";
import { CartItemList } from "../components/checkout/cart/CartItemList";
import { StepBadge } from "../components/checkout/cart/StepBadge";
import { CustomerInformation } from "../components/checkout/customer-information/CustomerInformation";
import { PaymentOptionsGroup } from "../components/checkout/payment-options/PaymentOptionsGroup";
import { AppHeader } from "../components/global/AppHeader";
import { BaseButton } from "../components/global/BaseButton";
import { FadeInContainer } from "../components/global/FadeInContainer";
import { MyContainer } from "../components/global/MyContainer";
import {
  AddressInputField,
  CityInputField,
  RegisterForm,
  ZipCodeInputField,
} from "../components/register-form/RegisterForm";
import { APP_NAME, APP_PAGE_ROUTE } from "../constants";
import CartContext from "../contexts/CartContext";
import { useMeQuery, useUpdateUserAddressMutation } from "../lib/graphql";

const CheckoutPage: NextPage = () => {
  const { data: meData } = useMeQuery();
  const { totalCartPrice, totalItems } = useContext(CartContext);
  const [updateUserAddress, { loading: updateUserAddressLoading }] =
    useUpdateUserAddressMutation();

  if (totalItems === 0) {
    return <NoItemsInCartComponent />;
  }

  const handleUpdateUserAddressSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (updateUserAddressLoading) {
      return; // prevent spamming
    }
    console.log("submit");
  };
  return (
    <Fragment>
      <AppHeader />
      <Head>
        <title>{APP_NAME}.com</title>
      </Head>
      <FadeInContainer className="text-staytard-dark bg-staytard-light-gray min-h-screen">
        <MyContainer className="">
          <ShoppingCartHeading />
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
              {!meData?.me && (
                <RegisterForm
                  onSuccess={() => console.log("Register user done")}
                />
              )}
              {meData?.me && <CustomerInformation customerData={meData.me} />}
              {meData?.me && !meData.me.address && (
                <form onSubmit={handleUpdateUserAddressSubmit} className="pt-6">
                  <AddressInputField onChange={(state) => {}} />

                  <div className="grid grid-cols-2 gap-x-3 ">
                    <div>
                      <ZipCodeInputField onChange={(state) => {}} />
                    </div>
                    <div>
                      <CityInputField onChange={(state) => {}} />
                    </div>
                  </div>
                  <BaseButton
                    data-cy="submit-button"
                    type="submit"
                    loading={updateUserAddressLoading}
                  >
                    Continue
                  </BaseButton>
                </form>
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
              {meData?.me && meData.me.address && <PaymentOptionsGroup />}
            </SectionWrapper>
          </div>
        </MyContainer>
      </FadeInContainer>
    </Fragment>
  );
};

const NoItemsInCartComponent = () => {
  return (
    <Fragment>
      <AppHeader />
      <Head>
        <title>{APP_NAME}.com</title>
      </Head>
      <div className="bg-staytard-light-gray min-h-[75vh]">
        <SectionWrapper className="bg-staytard-light-gray text-center xl:max-w-7xl">
          <ShoppingCartHeading />
          <div className="bg-white lg:bg-inherit py-2 lg:py-0 lg:border-b lg:border-t lg:border-black lg:border-opacity-[0.09]">
            <h2 className="text-2xl lg:text-4xl py-4 lg:py-8">
              Your cart is empty
            </h2>
            <div className="space-y-2 lg:py-4 lg:border-t lg:border-black lg:border-opacity-[0.09]">
              <h3>
                Your cart is empty - go to the start page for more shopping!
              </h3>
              <Link href={APP_PAGE_ROUTE.INDEX}>
                <a className="lg:text-lg inline-block uppercase tracking-widest hover:underline">
                  Back to main page
                </a>
              </Link>
            </div>
          </div>
        </SectionWrapper>
      </div>
    </Fragment>
  );
};

const ShoppingCartHeading = () => {
  return (
    <h1 className="py-8 text-center text-xl md:text-2xl uppercase font-light tracking-widest">
      Your shopping cart
    </h1>
  );
};

const SectionWrapper: React.FC<React.HTMLAttributes<HTMLElement>> = ({
  children,
  ...props
}) => {
  return (
    <section
      {...props}
      className={`relative bg-white p-2 max-w-5xl lg:max-w-4xl mx-auto lg:px-16 lg:py-6 ${
        props.className ? props.className : ""
      }`}
    >
      {children}
    </section>
  );
};

export default CheckoutPage;
