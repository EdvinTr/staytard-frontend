import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import React, { Fragment, useContext } from "react";
import { CartItemList } from "../../components/checkout/cart/CartItemList";
import { StepBadge } from "../../components/checkout/cart/StepBadge";
import { CustomerInformation } from "../../components/checkout/customer-information/CustomerInformation";
import { PaymentOptionsGroup } from "../../components/checkout/payment-options/PaymentOptionsGroup";
import { UpdateUserAddressInputGroup } from "../../components/checkout/update-address/UpdateUserAddressInputGroup";
import { AppHeader } from "../../components/global/AppHeader";
import { CenteredBeatLoader } from "../../components/global/CenteredBeatLoader";
import { FadeInContainer } from "../../components/global/FadeInContainer";
import { MyContainer } from "../../components/global/MyContainer";
import { RampingCounter } from "../../components/global/RampingCounter";
import { RegisterForm } from "../../components/register-form/RegisterForm";
import { APP_NAME, APP_PAGE_ROUTE, COOKIE_NAME } from "../../constants";
import CartContext from "../../contexts/CartContext";
import { useMeQuery, useRegisterUserMutation } from "../../lib/graphql";

const CheckoutPage: NextPage = () => {
  const { data: meData, loading } = useMeQuery();
  const { totalCartPrice, totalItems } = useContext(CartContext);
  const [registerUser, { client, error, error: registerUserError }] =
    useRegisterUserMutation();
  if (loading) {
    return <CenteredBeatLoader />;
  }

  if (totalItems === 0) {
    return <NoItemsInCartComponent />;
  }

  return (
    <Fragment>
      <AppHeader />
      <Head>
        <title>{APP_NAME}.com</title>
      </Head>
      <FadeInContainer className="text-app-dark bg-app-light-gray">
        <MyContainer className="">
          <ShoppingCartHeading />
          <SectionWrapper>
            <StepBadge step="1" />
            <CartItemList />
            <div className="md:bg-app-light-gray mt-8 md:px-8 md:py-4">
              <div className="flex justify-between font-bold">
                <div className="text-13 uppercase">Your products</div>
                <RampingCounter to={totalCartPrice} from={0} duration={0.5}>
                  {" "}
                  EUR
                </RampingCounter>
              </div>
              <div className="text-13 flex w-full space-x-3 py-4 md:py-2">
                <button className="border-app-dark w-full border-2 border-opacity-20 py-3 tracking-wider hover:border-black">
                  Discount code
                </button>
                <button className="border-app-dark w-full border-2 border-opacity-20 py-3 tracking-wider hover:border-black">
                  Gift card
                </button>
              </div>
            </div>
          </SectionWrapper>
          <h2 className="py-8 text-center text-xl font-light uppercase tracking-widest md:text-2xl">
            Complete Purchase
          </h2>
          <div className="min-h-screen space-y-6">
            <SectionWrapper>
              {/* user information */}
              <StepBadge step="2" />
              <div className="text-sm font-bold uppercase tracking-wider">
                Your Information
              </div>
              {!meData?.me && (
                <RegisterForm
                  containerClassName="pt-4"
                  errorMessage={registerUserError?.message}
                  onSubmit={async (values) => {
                    try {
                      const { data } = await registerUser({
                        variables: {
                          input: {
                            ...values,
                          },
                        },
                      });
                      if (!data || !data.registerUser) {
                        throw new Error();
                      }
                      localStorage.setItem(
                        COOKIE_NAME.ACCESS_TOKEN,
                        data.registerUser.accessToken
                      );
                      await client.resetStore();
                    } catch {}
                  }}
                />
              )}
              {meData?.me && <CustomerInformation customerData={meData.me} />}
              {meData?.me && !meData.me.address && (
                <UpdateUserAddressInputGroup containerClassName="pt-4" />
              )}
            </SectionWrapper>
            <SectionWrapper>
              {/* shipping method */}
              <StepBadge step="3" />
              <div className="text-sm font-bold uppercase tracking-wider">
                Shipping Method
              </div>
            </SectionWrapper>
            <SectionWrapper>
              {/* payment selection */}
              <StepBadge step="4" />
              <div className="text-sm font-bold uppercase tracking-wider">
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
      <div className="bg-app-light-gray min-h-[75vh]">
        <SectionWrapper className="bg-app-light-gray text-center xl:max-w-7xl">
          <ShoppingCartHeading />
          <div className="bg-white py-2 lg:border-b lg:border-t lg:border-black lg:border-opacity-[0.09] lg:bg-inherit lg:py-0">
            <h2 className="py-4 text-2xl lg:py-8 lg:text-4xl">
              Your cart is empty
            </h2>
            <div className="space-y-2 lg:border-t lg:border-black lg:border-opacity-[0.09] lg:py-4">
              <h3>
                Your cart is empty - go to the start page for more shopping!
              </h3>
              <Link href={APP_PAGE_ROUTE.INDEX}>
                <a className="inline-block uppercase tracking-widest hover:underline lg:text-lg">
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
    <h1 className="py-8 text-center text-xl font-light uppercase tracking-widest md:text-2xl">
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
      className={`relative mx-auto max-w-5xl bg-white p-2 lg:max-w-4xl lg:px-16 lg:py-6 ${
        props.className ? props.className : ""
      }`}
    >
      {children}
    </section>
  );
};

export default CheckoutPage;
