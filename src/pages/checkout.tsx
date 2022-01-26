import { NextPage } from "next";
import { KlarnaPaymentControls } from "../components/checkout/klarna/KlarnaPaymentControls";
import { FadeInContainer } from "../components/global/FadeInContainer";
import { MyContainer } from "../components/MyContainer";
import { useMeQuery } from "../lib/graphql";

const CheckoutPage: NextPage = () => {
  const { data: meData } = useMeQuery();

  return (
    <FadeInContainer className="text-staytard-dark min-h-screen">
      <MyContainer className="pt-8 text-center">
        {meData?.me ? (
          <KlarnaPaymentControls />
        ) : (
          <h1 className="text-2xl font-semibold">
            You need to be logged in to checkout.
          </h1>
        )}
      </MyContainer>
    </FadeInContainer>
  );
};

export default CheckoutPage;
