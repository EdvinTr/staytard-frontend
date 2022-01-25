import { NextPage } from "next";
import { FadeInContainer } from "../components/global/FadeInContainer";
const IndexPage: NextPage = () => {
  return (
    <FadeInContainer className="text-staytard-dark min-h-screen">
      <div className=" text-staytard-dark">
        <h1>You get here when you search for products</h1>
      </div>
    </FadeInContainer>
  );
};

export default IndexPage;
