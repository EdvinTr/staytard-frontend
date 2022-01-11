import { NextPage } from "next";
import { FadeInContainer } from "../components/global/FadeInContainer";
import { Navbar } from "../components/navbar/Navbar";
const IndexPage: NextPage = () => {
  return (
    <FadeInContainer className="text-stayhard-dark">
      <div className=" text-staytard-dark">
        <Navbar />
        <div className="flex items-center flex-wrap gap-8 mt-20">
          <div className="w-72 h-72 bg-red-500"></div>
          <div className="w-72 h-72 bg-red-500"></div>
          <div className="w-72 h-72 bg-red-500"></div>
          <div className="w-72 h-72 bg-red-500"></div>
          <div className="w-72 h-72 bg-red-500"></div>
          <div className="w-72 h-72 bg-red-500"></div>
          <div className="w-72 h-72 bg-red-500"></div>
          <div className="w-72 h-72 bg-red-500"></div>
          <div className="w-72 h-72 bg-red-500"></div>
          <div className="w-72 h-72 bg-red-500"></div>
          <div className="w-72 h-72 bg-red-500"></div>
          <div className="w-72 h-72 bg-red-500"></div>
          <div className="w-72 h-72 bg-red-500"></div>
          <div className="w-72 h-72 bg-red-500"></div>
          <div className="w-72 h-72 bg-red-500"></div>
        </div>
      </div>
    </FadeInContainer>
  );
};

export default IndexPage;
