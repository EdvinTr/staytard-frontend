import { NextPage } from "next";
import { useEffect } from "react";
import { FadeInContainer } from "../components/global/FadeInContainer";
import { useInitializeKlarnaSessionsMutation } from "../lib/graphql";
const CheckoutPage: NextPage = () => {
  const [initializeKlarna, { data, loading }] =
    useInitializeKlarnaSessionsMutation();

  useEffect(() => {
    initializeKlarna();
  }, []);
  return (
    <FadeInContainer className="text-staytard-dark min-h-screen">
      <div className=" text-staytard-dark">
        <h1>You get here when you checkout cart or something, maybe.</h1>
        <h2>{data?.initializeKlarnaSession.client_token}</h2>
      </div>
    </FadeInContainer>
  );
};

export default CheckoutPage;
