import { useWindowWidth } from "@react-hook/window-size";
import axios from "axios";
import { GetStaticProps, NextPage } from "next";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useScrollDirection } from "react-use-scroll-direction";
import useSWR, { SWRConfig } from "swr";
import { useEventListener } from "usehooks-ts";
import { FadeInContainer } from "../../components/global/FadeInContainer";
import { MyContainer } from "../../components/global/MyContainer";
import { MyMetaTags } from "../../components/global/MyMetaTags";
import { BrandsList } from "../../components/pages/brand/BrandsList";
import { APP_NAME } from "../../constants";
import { useSsrCompatible } from "../../hooks/useSsrCompatible";
import {
  GetBrandsResponse,
  SortedBrandKey,
} from "../../typings/GetBrandsResponse";
const brandImages = [
  {
    logoUrl:
      "https://assets.ellosgroup.com/i/ellos/logo_les-deux?$sc$&w=360&fmt=webp",
    name: "Les Deux",
    largeImgSrc:
      "https://assets.ellosgroup.com/i/ellos/2140_focusbrand_lesdeux?$sc$&w=360&fmt=webp",
  },
  {
    logoUrl:
      "https://assets.ellosgroup.com/i/ellos/logo_bjorn-borg?$sc$&w=360&fmt=webp",
    name: "Björn Borg",
    largeImgSrc:
      "https://assets.ellosgroup.com/i/ellos/2149_bb_focusbrand?$sc$&w=360&fmt=webp",
  },
  {
    logoUrl:
      "https://assets.ellosgroup.com/i/ellos/2027_ralph_lauren_logo?$sc$&w=360&fmt=webp",
    name: "Ralph Lauren",
    largeImgSrc:
      "https://assets.ellosgroup.com/i/ellos/2146_POLO?$sc$&w=360&fmt=webp",
  },
  {
    logoUrl:
      "https://assets.ellosgroup.com/i/ellos/logo_gant?$sc$&w=360&fmt=webp",
    name: "GANT",
    largeImgSrc:
      "https://assets.ellosgroup.com/i/ellos/2140_focusbrand_gant?$sc$&w=360&fmt=webp",
  },
  {
    logoUrl:
      "https://assets.ellosgroup.com/i/ellos/logo_studiototal_2?$sc$&w=360&fmt=webp",
    name: "Studio Total",
    largeImgSrc:
      "https://assets.ellosgroup.com/i/ellos/2140_focusbrand_studio?$sc$&w=360&fmt=webp",
  },
];

interface BrandsPageProps {
  fallback: any;
}

const API_URL = `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/brands`;

const fetcher = (url: string) => axios.get(url).then((r) => r.data);

// create array with lower case alphabet
const alphabet = [
  "a",
  "b",
  "c",
  "d",

  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
const BrandPage: NextPage<BrandsPageProps> = ({ fallback }) => {
  const { data } = useSWR<GetBrandsResponse>(API_URL, fetcher);
  const [activeScrollDirection, setActiveScrollDirection] = useState<
    string | null
  >(null);
  const [currentScrollY, setCurrentScrollY] = useState(0);

  const brandNamesContainerRef = useRef<HTMLDivElement>(null);
  const alphabetStartingPosition = useRef(0);
  const alphabetButtonRef = useRef<HTMLUListElement>(null);

  const { scrollDirection } = useScrollDirection();

  const currentWindowWidth = useSsrCompatible(useWindowWidth(), 0);

  useEventListener("scroll", () => {
    setCurrentScrollY(window.scrollY);
  });

  useEffect(() => {
    if (scrollDirection) {
      setActiveScrollDirection(scrollDirection);
    }
  }, [scrollDirection]);

  useEffect(() => {
    if (brandNamesContainerRef.current) {
      alphabetStartingPosition.current =
        brandNamesContainerRef.current.offsetTop;
    }
  }, [brandNamesContainerRef]);

  return (
    <SWRConfig value={{ fallback }}>
      <MyMetaTags
        title={`A-Z Brands - Buy online - ${APP_NAME}.com`}
        description={`Find more than 250 brands on ${APP_NAME}.com. See the full list of everything from sporty brands to luxury premium brands.`}
      />
      <FadeInContainer className="text-staytard-dark ">
        <MyContainer className="">
          <ul
            ref={alphabetButtonRef}
            style={
              currentWindowWidth >= 1024
                ? {}
                : {
                    top:
                      currentScrollY > alphabetStartingPosition.current - 100 // It is a bit unclear how all of this logic came into existence
                        ? 0
                        : alphabetStartingPosition.current,
                    paddingTop:
                      currentScrollY > alphabetStartingPosition.current - 100 &&
                      activeScrollDirection === "UP"
                        ? 90
                        : 0,
                    position:
                      currentScrollY > alphabetStartingPosition.current - 100
                        ? "fixed"
                        : "absolute",
                  }
            }
            className={`right-0 translate-y-2 space-y-1 px-4 lg:static lg:flex lg:justify-center lg:space-y-0 lg:space-x-5 lg:px-0 lg:pt-10 lg:pb-20`}
          >
            {alphabet.map((letter) => {
              const isDisabled = !data?.brands[letter as SortedBrandKey];
              return (
                <li
                  key={letter}
                  className={`flex select-none justify-center text-center text-xs uppercase lg:text-lg ${
                    isDisabled ? "opacity-30" : ""
                  }`}
                >
                  {isDisabled ? (
                    <span className="">{letter}</span>
                  ) : (
                    <button
                      onClick={() => {
                        const element = document.getElementById(
                          `alphabet-target-${letter}`
                        );
                        element?.scrollIntoView({ behavior: "smooth" });
                      }}
                      disabled={isDisabled}
                      type="button"
                      className="font-medium uppercase lg:font-normal"
                      aria-label={`Scroll to brands starting with the letter ${letter}`}
                    >
                      {letter}
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
          <div className="lg:flex">
            <div className="no-scrollbar flex space-x-4 overflow-x-scroll pb-5 lg:mr-16 lg:block lg:space-x-0 lg:space-y-10 lg:pb-0">
              {brandImages.map((brandImage, idx) => {
                return (
                  <div
                    key={idx}
                    className="relative flex flex-shrink-0 lg:block"
                  >
                    <Image
                      src={brandImage.largeImgSrc}
                      alt={brandImage.name}
                      priority
                      quality={100}
                      width={400}
                      height={264}
                    />
                    <div className="absolute -bottom-2 left-4">
                      <div className="bg-white p-2 ">
                        <Image
                          src={brandImage.logoUrl}
                          alt={brandImage.name}
                          width={118}
                          height={30}
                          objectFit="contain"
                          className=""
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="w-full" ref={brandNamesContainerRef}>
              {data &&
                Object.keys(data.brands).map((key) => {
                  return (
                    <BrandsList
                      brands={data.brands}
                      brandsKey={key as SortedBrandKey}
                      key={key}
                    />
                  );
                })}
            </div>
          </div>
        </MyContainer>
      </FadeInContainer>
    </SWRConfig>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const revalidate = 60; // 60 secs
  try {
    const data: GetBrandsResponse = await fetcher(API_URL);
    return {
      props: {
        fallback: {
          [API_URL]: data,
        },
      },
      revalidate,
    };
  } catch {
    return {
      props: {},
      revalidate,
    };
  }
};

export default BrandPage;
