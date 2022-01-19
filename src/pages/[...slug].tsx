import { ChevronDownIcon } from "@heroicons/react/solid";
import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { FadeInContainer } from "../components/global/FadeInContainer";
import { MyContainer } from "../components/MyContainer";
import { ssrFindProducts } from "../lib/page";

const getFullPath = (slug: string[]) => {
  const [first, ...rest] = slug;
  const fullUrl = `/${first}/${rest.join("/")}`;
  return fullUrl;
};
const SlugPage: NextPage = (props) => {
  const { data, fetchMore } = ssrFindProducts.usePage();
  const router = useRouter();
  const fullPath = getFullPath(router.query.slug as string[]);

  // TODO: do something else when no data
  if (!data || data.products.totalCount === 0) {
    return (
      <FadeInContainer className="text-stayhard-dark min-h-screen pb-40 text-center">
        <h2 className="text-center">No Products.</h2>
      </FadeInContainer>
    );
  }
  const { hasMore, items, totalCount } = data.products;
  return (
    <FadeInContainer className="text-stayhard-dark min-h-screen pb-40">
      <MyContainer className=" text-staytard-dark">
        {/* grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-4 xl:gap-x-6 gap-y-12">
          {/* product cards */}
          {data?.products.items.map((item, idx) => {
            const imageUrl = item.images[0].imageUrl.replace("{size}", "400");
            return (
              <article key={idx}>
                <Image
                  src={imageUrl}
                  placeholder="blur"
                  priority
                  blurDataURL={imageUrl}
                  objectFit="contain"
                  width={400}
                  height={600}
                  alt={`${item.brand} - ${item.name}`}
                />
                <h2>
                  <b className="text-xs block w-full uppercase">
                    {item.brand.name}
                  </b>
                  <span className="text-[10px] block w-full overflow-hidden overflow-ellipsis whitespace-nowrap">
                    {" "}
                    {item.name}
                  </span>
                </h2>
              </article>
            );
          })}
        </div>
      </MyContainer>
      {/* load more group */}
      <div className="pt-8 max-w-xs mx-auto space-y-4">
        <div className="px-6 space-y-1">
          <p className="text-[#6b6b6b]">
            You have seen {items.length} of {totalCount} products
          </p>
          <progress
            max={totalCount}
            value={items.length}
            className="appearance-none bg-gray-50 w-full block h-[0.125rem]"
            style={{
              color: "#222",
            }}
          ></progress>
        </div>

        {/* load more button */}
        {hasMore && (
          <button
            className="text-white w-full bg-staytard-dark p-4 flex justify-center items-center"
            onClick={async () => {
              await fetchMore({
                variables: {
                  input: {
                    offset: data.products.items.length,
                    limit: 50,
                    categoryPath: fullPath,
                  },
                },
              });
            }}
          >
            <span>Show more</span>
            <ChevronDownIcon className="w-6" />
          </button>
        )}
      </div>
    </FadeInContainer>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const [first, ...rest] = ctx.query.slug as string[];
  const fullUrl = `/${first}/${rest.join("/")}`;
  try {
    const { props } = await ssrFindProducts.getServerPage({
      variables: {
        input: {
          categoryPath: fullUrl,
          limit: 50,
          offset: 0,
        },
      },
    });
    return {
      props: {
        initialApolloState: props.apolloState,
      },
    };
  } catch (err) {
    return {
      props: {},
    };
  }
};

export default SlugPage;
