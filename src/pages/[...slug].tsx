import { NextPage } from "next";
import { useRouter } from "next/router";
import { FadeInContainer } from "../components/global/FadeInContainer";
const SlugPage: NextPage = () => {
  const router = useRouter();

  const routeParams = router.query;
  console.log(routeParams);

  // make fetch with lastProp as key
  return (
    <FadeInContainer className="text-stayhard-dark">
      <div className=" text-staytard-dark">
        <div className="flex items-center justify-center flex-wrap gap-8 mt-20">
          <h2 className="text-center">
            I am here and route params is:
            <span className="font-bold"> {routeParams.slug}</span>
          </h2>
        </div>
      </div>
    </FadeInContainer>
  );
};

export default SlugPage;
