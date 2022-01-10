import { NextPage } from "next";
import { FadeInContainer } from "../components/global/FadeInContainer";
import { Navbar } from "../components/navbar/Navbar";
const IndexPage: NextPage = () => {
  return (
    <FadeInContainer className="text-stayhard-dark">
      <div className=" text-staytard-dark">
        <Navbar />
      </div>
    </FadeInContainer>
  );
};

export default IndexPage;
