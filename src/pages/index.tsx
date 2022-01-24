import { useWindowWidth } from "@react-hook/window-size";
import { NextPage } from "next";
import Image from "next/image";
import { FadeInContainer } from "../components/global/FadeInContainer";
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
            alt="winter sale"
            /* //? objectFit contain here too? */
            layout="responsive"
            src="/img/staytard-winter-sale-full-screen.png"
          />
        ) : (
          <Image
            width={580}
            height={580}
            alt="winter sale"
            objectFit="contain"
            layout="responsive"
            src="/img/staytard-winter-sale-mobile-size.png"
            className="max-h-[2rem]"
          />
        )}
      </div>
    </FadeInContainer>
  );
};

export default IndexPage;
