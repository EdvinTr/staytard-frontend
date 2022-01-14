import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { FadeInContainer } from "../../components/global/FadeInContainer";
import { SortBy, SortDirection } from "../../lib/graphql";
import { ssrGetProductBrands } from "../../lib/page";

const BrandPage: NextPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { data } = ssrGetProductBrands.usePage();

  if (!data) {
    return <div>NO DATA...</div>;
  }

  return (
    <FadeInContainer className="text-stayhard-dark">
      <div className=" text-staytard-dark">
        <div className="flex items-center flex-wrap gap-8 mt-20">
          <ul>
            {data.productBrands.map((brand) => (
              <li key={brand.id}>{brand.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </FadeInContainer>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
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
};

export default BrandPage;
