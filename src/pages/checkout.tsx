import { NextPage } from "next";
import { CartItemList } from "../components/checkout/cart/CartItemList";
import { FadeInContainer } from "../components/global/FadeInContainer";
import { MyContainer } from "../components/MyContainer";
import { useMeQuery } from "../lib/graphql";

const CheckoutPage: NextPage = () => {
  const { data: meData } = useMeQuery();

  return (
    <FadeInContainer className="text-staytard-dark bg-[#f3f3f3] min-h-screen">
      <MyContainer className="pt-8 text-center">
        <h1 className="text-xl md:text-2xl uppercase font-light tracking-widest">
          Your shopping cart
        </h1>
        {/* cart item */}
        <div className="bg-white">
          <CartItemList />
        </div>
        {/*  {meData?.me ? (
          <KlarnaPaymentControls />
        ) : (
          <h1 className="text-2xl font-semibold">
            You need to be logged in to checkout.
          </h1>
        )} */}
      </MyContainer>
    </FadeInContainer>
  );
};

export default CheckoutPage;
