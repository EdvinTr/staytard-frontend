import { NextPage } from "next";
import { FadeInContainer } from "../components/global/FadeInContainer";
import { MyContainer } from "../components/global/MyContainer";
import { HeroImageSection } from "../components/pages/index/HeroImageSection";
import { ProductNewsSection } from "../components/pages/index/ProductNewsSection";
import { ShopByBrandSection } from "../components/pages/index/ShopByBrandSection";
const IndexPage: NextPage = () => {
  return (
    <FadeInContainer className="text-staytard-dark min-h-screen">
      <div className=" text-staytard-dark">
        <HeroImageSection />
        <MyContainer className="space-y-12 pt-20">
          <ProductNewsSection />
          <ShopByBrandSection />
        </MyContainer>
      </div>
    </FadeInContainer>
  );
};

export default IndexPage;
