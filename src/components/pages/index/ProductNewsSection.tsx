import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ProductNewsSectionProps {}

export const ProductNewsSection: React.FC<ProductNewsSectionProps> = ({}) => {
  return (
    <section>
      <div className="grid grid-cols-2 gap-5 md:grid-cols-3">
        <NewsCard
          href="/clothes"
          subTitle="Dazzlingly fresh"
          title="Spring news"
          image={{
            alt: "Spring news",
            src: "/img/front-page/spring-news.webp",
          }}
        />
        <NewsCard
          href="/shoes"
          subTitle="Sneaker news!"
          title="Step into spring"
          image={{
            alt: "3 Shoes on top over each other on a red box",
            src: "/img/front-page/spring-sneakers.webp",
          }}
        />
        <NewsCard
          href="/clothes/jackets"
          subTitle="Cord, pile, fleece"
          title="Beautiful materials"
          image={{
            alt: "Man in gray jackets leaning against window panel",
            src: "/img/front-page/spring-jackets.webp",
          }}
        />
      </div>
    </section>
  );
};

interface NewsCardProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  href: string;
  image: {
    src: string;
    alt: string;
  };
  title: string;
  subTitle: string;
}
const NewsCard = ({
  href,
  image,
  subTitle,
  title,
  ...props
}: NewsCardProps) => {
  return (
    <div {...props}>
      <Link href={href}>
        <a>
          <Image
            src={image.src}
            width={600}
            height={740}
            objectFit="contain"
            alt={image.alt}
            quality={100}
          />
          <div>
            <h2 className="text-base font-semibold">{title}</h2>
            <p className="pt-2 pb-4 text-xs">{subTitle}</p>
            <div className="bg-staytard-dark inline-block p-3 text-[11px] font-medium uppercase tracking-wider text-white">
              Shop here
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};
