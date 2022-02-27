import { useWindowWidth } from "@react-hook/window-size";
import { NextPage } from "next";
import Image from "next/image";
import { FadeInContainer } from "../components/global/FadeInContainer";
import { ShopByBrandSection } from "../components/pages/index/ShopByBrandSection";
import { useSsrCompatible } from "../hooks/useSsrCompatible";
const IndexPage: NextPage = () => {
  const windowWidth = useSsrCompatible(useWindowWidth(), 0);
  return (
    <FadeInContainer className="text-staytard-dark min-h-screen">
      <div className=" text-staytard-dark">
        {windowWidth >= 768 ? (
          <Image
            width={1600}
            height={400}
            alt="Icon brand"
            objectFit="contain"
            layout="responsive"
            priority
            src="/img/front-page/2208_icon_fullwide_ny_1.jpg"
          />
        ) : (
          <Image
            width={580}
            height={580}
            alt="winter sale"
            objectFit="contain"
            priority
            layout="responsive"
            src="/img/front-page/2208_icon_fullwith_mobil_1.jpg"
            className="max-h-[2rem]"
          />
        )}
        <ShopByBrandSection />
      </div>
    </FadeInContainer>
  );
};

export default IndexPage;
