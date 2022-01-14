import { NextPage } from "next";
import { useRouter } from "next/router";
import { FadeInContainer } from "../../components/global/FadeInContainer";
const BrandPage: NextPage = () => {
  const router = useRouter();

  return (
    <FadeInContainer className="text-stayhard-dark">
      <div className=" text-staytard-dark">
        <div className="flex items-center flex-wrap gap-8 mt-20">
          <h1>I display a list of all brands </h1>
        </div>
      </div>
    </FadeInContainer>
  );
};

export default BrandPage;
