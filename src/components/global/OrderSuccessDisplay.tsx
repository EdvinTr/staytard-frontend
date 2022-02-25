import {
  QuestionMarkCircleIcon as QuestionMarkCircleIconOutline,
  ShoppingBagIcon,
} from "@heroicons/react/outline";
import { ArrowRightIcon, CheckIcon } from "@heroicons/react/solid";
import { capitalize } from "lodash";
import Link from "next/link";
import React, { DetailedHTMLProps, HTMLAttributes } from "react";
import { APP_NAME, APP_PAGE_ROUTE } from "../../constants";
import { CenteredBeatLoader } from "./CenteredBeatLoader";
import { FadeInContainer } from "./FadeInContainer";

type DataDetails = {
  userEmail?: string;
  totalAmount: number;
  paymentMethod: string;
  orderNumber: string;
  purchaseCurrency: string;
};

interface OrderSuccessDisplayProps {
  error?: { message: string };
  loading?: boolean;
  data?: DataDetails;
}

export const OrderSuccessDisplay = ({
  error,
  loading,
  data,
}: OrderSuccessDisplayProps) => {
  if (loading) {
    return <CenteredBeatLoader />;
  }
  if (error) {
    return (
      <FadeInContainer className="text-staytard-dark bg-staytard-light-gray min-h-[130vh] text-center">
        <CustomHeader />
        <SectionContainer className="mt-20 px-4 py-8 md:px-10">
          <h1 className="text-red-600">{error.message}</h1>
        </SectionContainer>
      </FadeInContainer>
    );
  }
  return (
    <FadeInContainer className="text-staytard-dark bg-staytard-light-gray min-h-[130vh]">
      <CustomHeader />
      <div className="text-staytard-dark mt-20 space-y-6 text-center">
        {/* order success message info */}
        <SectionContainer className="px-4 md:px-10">
          <div className="mx-auto max-w-3xl py-10">
            <div className="flex justify-center">
              <CheckIcon className="border-staytard-yellow text-staytard-yellow ring-staytard-yellow h-10 rounded-full border p-1 ring-2" />
            </div>
            <h1 className="py-4 text-3xl font-medium uppercase tracking-wider">
              Thanks for your order!
            </h1>
            <p className="mx-auto max-w-lg text-sm tracking-wide">
              We will be sending an email{" "}
              {data?.userEmail ? `to ${data.userEmail}` : ""} with the updated
              information regarding your order.
            </p>
          </div>
          <CustomLink
            href={APP_PAGE_ROUTE.MY_ORDERS}
            text="See current order status"
          />
        </SectionContainer>

        {/* order details */}
        <SectionContainer className="px-4 py-4 text-left md:px-10 md:py-7">
          <div className="text-sm">Order number</div>
          <div className="font-bold">{data?.orderNumber}</div>
          <div className="border-staytard-dark mt-5 border border-opacity-10 px-4 py-4 text-sm">
            <h2 className="font-bold">Order details</h2>
            <ul className="leading-6">
              <li className="flex">
                <div className="min-w-[13rem] sm:min-w-[14rem]">
                  Payment method:
                </div>
                <div className="">{capitalize(data?.paymentMethod)}</div>
              </li>
              <li className="flex">
                <div className="min-w-[13rem] sm:min-w-[14rem]">
                  Total amount:
                </div>
                <div className="font-bold">
                  {data?.totalAmount} {data?.purchaseCurrency?.toUpperCase()}
                </div>
              </li>
            </ul>
          </div>
        </SectionContainer>
        {/* customer FAQ section */}
        <SectionContainer className=" px-4 text-center md:px-10 ">
          <div className="space-y-4 py-4 md:py-7">
            <div className="flex justify-center">
              <QuestionMarkCircleIconOutline className="text-staytard-yellow h-12" />
            </div>
            <h3 className="text-lg font-bold uppercase tracking-wider">
              Do you have questions about your order?
            </h3>
            <p className="mx-auto max-w-lg text-sm tracking-wide">
              In our FAQ you will find the answers to the most common questions.
              Here is also information on how you can most easily contact us.
            </p>
          </div>

          <CustomLink href={APP_PAGE_ROUTE.INDEX} text="Customer support" />
        </SectionContainer>
      </div>
    </FadeInContainer>
  );
};
interface CustomLinkProps {
  href: string;
  text: string;
}
const CustomLink = ({ href, text }: CustomLinkProps) => {
  return (
    <div className="border-t-staytard-dark border-t border-opacity-10 py-4 text-sm">
      <Link href={href}>
        <a className="flex items-center justify-center space-x-2 hover:underline">
          <span>{text}</span>
          <ArrowRightIcon className="h-4" />
        </a>
      </Link>
    </div>
  );
};

const CustomHeader = () => {
  return (
    <header className=" bg-white py-3 text-center ">
      <div className="relative mx-auto max-w-5xl">
        <Link href={APP_PAGE_ROUTE.INDEX}>
          <a className="text-4xl font-bold uppercase md:text-5xl">{APP_NAME}</a>
        </Link>
        <div className="absolute top-2 right-0 hidden sm:block">
          <Link href={APP_PAGE_ROUTE.INDEX}>
            <a>
              <div className="border-staytard-dark flex items-center space-x-2 border px-3 py-1">
                <ShoppingBagIcon className="h-4" aria-hidden />
                <span>Shop</span>
              </div>
            </a>
          </Link>
        </div>
      </div>
    </header>
  );
};

const SectionContainer: React.FC<
  DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
> = ({ children, ...props }) => {
  return (
    <section
      className={`mx-auto max-w-5xl bg-white ${
        props.className ? props.className : ""
      }`}
    >
      {children}
    </section>
  );
};
