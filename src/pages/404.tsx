import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FadeInContainer } from "../components/global/FadeInContainer";
import { APP_PAGE_ROUTE } from "../constants";
const NotFoundPage: NextPage = () => {
  const router = useRouter();
  return (
    <FadeInContainer className=" text-white">
      <section className="relative h-[90vh] w-[90wh] ">
        <div className="w-full absolute z-10 bg-black bg-opacity-20 h-full"></div>
        <Image
          src={"/img/not-found.webp"}
          className="h-full w-full "
          objectFit="cover"
          layout="fill"
          alt=""
          loading="lazy"
        />
        <div className="flex justify-center items-center h-full">
          <article className="text-center z-20 px-6">
            <div className="max-w-[35rem] mx-auto space-y-4 lg:space-y-6">
              <h1 className=" font-black text-6xl  lg:text-[100px] italic">
                Oops!
              </h1>
              <h2 className="text-2xl lg:text-4xl font-extrabold">
                Here it stopped...
              </h2>
              <p className="text-xs leading-5 lg:text-[15px] max-w-md font-medium ">
                We can not find the page you are looking for and it may be
                because it no longer exists or has been moved. We apologize for
                the inconvenience. In the menu above, you can try searching
                again, or visit one of our popular departments.
              </p>
              <div className="pt-4 space-y-2 lg:space-y-0 lg:flex lg:justify-center lg:space-x-4">
                <button
                  onClick={() => router.back()}
                  className="p-4 w-32  bg-white text-staytard-dark text-13 font-semibold"
                >
                  Previous page
                </button>
                <div>
                  <Link href={APP_PAGE_ROUTE.INDEX}>
                    <a className="p-4 inline-block w-32  bg-staytard-dark text-13 font-semibold">
                      Home page
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
    </FadeInContainer>
  );
};

export default NotFoundPage;
