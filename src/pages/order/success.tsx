import { NextPage } from "next";
import { useRouter } from "next/router";
import { FadeInContainer } from "../../components/global/FadeInContainer";
const OrderSuccessPage: NextPage = () => {
  const router = useRouter();
  return (
    <FadeInContainer className="text-staytard-dark min-h-screen">
      <div className=" text-staytard-dark mt-20 space-y-7 text-center">
        <h1 className="text-2xl font-bold">Thanks for the order mate!</h1>
        <h2 className="text-xl tracking-wide"></h2>
      </div>
    </FadeInContainer>
  );
};

export default OrderSuccessPage;
