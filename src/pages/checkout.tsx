import { NextPage } from "next";
import { useEffect } from "react";
import { FadeInContainer } from "../components/global/FadeInContainer";
import { KlarnaPayment } from "../components/KlarnaPayment";
import { MyContainer } from "../components/MyContainer";
import { useInitializeKlarnaSessionsMutation } from "../lib/graphql";

const CheckoutPage: NextPage = () => {
  const [initializeKlarna, { data, loading }] =
    useInitializeKlarnaSessionsMutation();

  useEffect(() => {
    initializeKlarna();
  }, []);

  return (
    <FadeInContainer className="text-staytard-dark min-h-screen">
      <MyContainer>
        <h1>You get here when you checkout cart or something, maybe.</h1>
        {data?.initializeKlarnaSession.client_token && (
          <KlarnaPayment
            clientToken={data.initializeKlarnaSession.client_token}
          />
        )}
      </MyContainer>
    </FadeInContainer>
  );
};

export default CheckoutPage;
