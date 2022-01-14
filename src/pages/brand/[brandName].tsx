import { NextPage } from "next";
import { useRouter } from "next/router";
import { FadeInContainer } from "../../components/global/FadeInContainer";
import { Navbar } from "../../components/navbar/Navbar";
const OneBrandPage: NextPage = () => {
  const router = useRouter();

  return (
    <FadeInContainer className="text-stayhard-dark">
      <div className=" text-staytard-dark">
        <Navbar />
        <div className="flex items-center flex-wrap gap-8 mt-20">
          <h1>
            I display products for the brand ---{">"} {router.query.brandName}
          </h1>
        </div>
      </div>
    </FadeInContainer>
  );
};

export default OneBrandPage;
