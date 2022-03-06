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
        <div className="absolute z-10 h-full w-full bg-black bg-opacity-20"></div>
        <Image
          src={"/img/not-found.webp"}
          className="h-full w-full "
          objectFit="cover"
          layout="fill"
          alt="Man in white jacket standing close to a stone wall."
          priority
        />
        <div className="flex h-full items-center justify-center">
          <article className="z-20 px-6 text-center">
            <div className="mx-auto max-w-[35rem] space-y-4 lg:space-y-6">
              <h1 className=" text-6xl font-black  italic lg:text-[100px]">
                Oops!
              </h1>
              <h2 className="text-2xl font-extrabold lg:text-4xl">
                Here it stopped...
              </h2>
              <p className="max-w-md text-xs font-medium leading-5 lg:text-[15px] ">
                We can not find the page you are looking for and it may be
                because it no longer exists or has been moved. We apologize for
                the inconvenience. In the menu above, you can try searching
                again, or visit one of our popular departments.
              </p>
              <div className="space-y-2 pt-4 lg:flex lg:justify-center lg:space-y-0 lg:space-x-4">
                <button
                  onClick={() => router.back()}
                  className="text-app-dark text-13  w-32 bg-white p-4 font-semibold"
                >
                  Previous page
                </button>
                <div>
                  <Link href={APP_PAGE_ROUTE.INDEX}>
                    <a className="bg-app-dark text-13 inline-block  w-32 p-4 font-semibold">
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
