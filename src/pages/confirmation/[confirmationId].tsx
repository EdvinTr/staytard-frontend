import { NextPage } from "next";
import { useRouter } from "next/router";
import { FadeInContainer } from "../../components/global/FadeInContainer";
const ConfirmationPage: NextPage = () => {
  const router = useRouter();
  const confirmationId = router.query.confirmationId as string;

  //TODO: should not be able to get here unless you have a valid orderId and this order belongs to the currently logged in user
  return (
    <FadeInContainer className="text-staytard-dark min-h-screen">
      <div className=" text-staytard-dark text-center mt-20 space-y-7">
        <h1 className="text-2xl font-bold">Thanks for the order mate!</h1>
        <h2 className="text-xl tracking-wide">
          <span className="font-semibold">Order number:</span> {confirmationId}
        </h2>
      </div>
    </FadeInContainer>
  );
};

export default ConfirmationPage;
