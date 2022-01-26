import { NextPage } from "next";
import { FadeInContainer } from "../../components/global/FadeInContainer";
const ConfirmationPage: NextPage = () => {
  return (
    <FadeInContainer className="text-staytard-dark min-h-screen">
      <div className=" text-staytard-dark">
        <h1>You get here when you confirm payment or something I guess</h1>
      </div>
    </FadeInContainer>
  );
};

export default ConfirmationPage;
