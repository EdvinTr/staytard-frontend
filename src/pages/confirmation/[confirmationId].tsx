import { NextPage } from "next";
import { useRouter } from "next/router";
import { FadeInContainer } from "../../components/global/FadeInContainer";
const ConfirmationPage: NextPage = () => {
  const router = useRouter();
  const confirmationId = router.query.confirmationId as string;
  return (
    <FadeInContainer className="text-staytard-dark min-h-screen">
      <div className=" text-staytard-dark">
        <h1>You get here when you confirm payment or something I guess</h1>
        <h2>Here is the order number I guess: {confirmationId}</h2>
      </div>
    </FadeInContainer>
  );
};

export default ConfirmationPage;
