import { NextPage } from "next";
import { useRouter } from "next/router";
import { FadeInContainer } from "../../components/global/FadeInContainer";
const OneBrandPage: NextPage = () => {
  const router = useRouter();

  return (
    <FadeInContainer className="text-app-dark min-h-screen text-center">
      <div>
        <div className="mt-20"></div>
      </div>
    </FadeInContainer>
  );
};

export default OneBrandPage;
