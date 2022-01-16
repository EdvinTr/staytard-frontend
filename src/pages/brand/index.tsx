import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { FadeInContainer } from "../../components/global/FadeInContainer";
import { MyContainer } from "../../components/MyContainer";
import { SortBy, SortDirection } from "../../lib/graphql";
import { ssrGetProductBrands } from "../../lib/page";
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

const BrandPage: NextPage = () => {
  const { data, error } = ssrGetProductBrands.usePage();

  console.log("ERROR client:", error?.message);
  if (!data || error) {
    return (
      <div>
        NO DATA
        <span>{error?.message}</span>
      </div>
    );
  }
  const newData = data.productBrands.map((item) => {});
  return (
    <FadeInContainer className="text-stayhard-dark">
      <MyContainer>
        <div className=" text-staytard-dark ">
          <div className="grid grid-cols-2 gap-4 ">
            {brandImages.map((brandImage, idx) => {
              return (
                <div key={idx} className="relative ">
                  <Image
                    src={brandImage.largeImgSrc}
                    alt={brandImage.name}
                    width={288}
                    height={194}
                  />
                  <div className="absolute -bottom-2 left-4">
                    <div className="p-2 bg-white ">
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
          <div className="flex items-center flex-wrap gap-8 mt-20">
            <ul>
              {data.productBrands.map((brand) => (
                <li key={brand.id}>{brand.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </MyContainer>
    </FadeInContainer>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { props } = await ssrGetProductBrands.getServerPage({
      variables: {
        input: { sortBy: SortBy.Name, sortDirection: SortDirection.Asc },
      },
    });
    return {
      props: {
        initialApolloState: props.apolloState,
      },
    };
  } catch {
    return {
      props: {},
    };
  }
};

export default BrandPage;
