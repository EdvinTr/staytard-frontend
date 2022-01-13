import { NextPage } from "next";
import { FadeInContainer } from "../components/global/FadeInContainer";
const IndexPage: NextPage = () => {
  return (
    <FadeInContainer className="text-stayhard-dark">
      <div className=" text-staytard-dark">
        <div className="flex items-center justify-center py-12 flex-wrap gap-8 mt-20">
          <div className="w-72 h-72 bg-red-500"></div>
          <div className="w-72 h-72 bg-orange-500"></div>
          <div className="w-72 h-72 bg-orange-500"></div>
          <div className="w-72 h-72 bg-orange-500"></div>
          <div className="w-72 h-72 bg-green-500"></div>
          <div className="w-72 h-72 bg-orange-500"></div>
          <div className="w-72 h-72 bg-orange-500"></div>
          <div className="w-72 h-72 bg-green-500"></div>
          <div className="w-72 h-72 bg-purple-500"></div>
          <div className="w-72 h-72 bg-orange-500"></div>
          <div className="w-72 h-72 bg-orange-500"></div>
          <div className="w-72 h-72 bg-orange-500"></div>
          <div className="w-72 h-72 bg-orange-500"></div>
          <div className="w-72 h-72 bg-green-500"></div>
          <div className="w-72 h-72 bg-blue-500"></div>
        </div>
      </div>
    </FadeInContainer>
  );
};

export default IndexPage;
