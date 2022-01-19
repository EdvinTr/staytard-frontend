import NextImage from "next/image";
import React, { Fragment, useCallback, useState } from "react";
import { FindProductsQuery } from "../../lib/graphql";
interface ProductCardProps {
  product: FindProductsQuery["products"]["items"][0];
}
const largeImageSize = "380";
const smallImageSize = "34";
let renders = 0;
export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  renders++;
  console.log(renders);
  const slicedImages = product.images.slice(0, 4);
  const [isHovered, setIsHovered] = useState(false);

  const [activeImage, setActiveImage] = useState(
    slicedImages[0].imageUrl.replace("{size}", largeImageSize)
  );

  const cacheImages = async () => {
    const promises = slicedImages.map(({ imageUrl }) => {
      return new Promise(function (resolve, reject) {
        const img = new Image();
        img.src = imageUrl.replace("{size}", largeImageSize);
        img.onload = () => resolve(img.height);
        img.onerror = reject;
      });
    });
    await Promise.all(promises);
  };

  const onMouseEnter = useCallback(async () => {
    setIsHovered(true);
    setActiveImage(slicedImages[1].imageUrl.replace("{size}", largeImageSize));
    await cacheImages();
  }, [setIsHovered]);

  const onMouseLeave = useCallback(() => {
    setActiveImage(slicedImages[0].imageUrl.replace("{size}", largeImageSize));
    setIsHovered(false);
  }, [setIsHovered]);

  return (
    <article
      className=" p-3 hover:shadow-md hover:transition-shadow hover:duration-300 hover:ease-in-out"
      onMouseLeave={onMouseLeave}
    >
      <NextImage
        src={activeImage}
        placeholder="blur"
        priority
        blurDataURL={activeImage}
        objectFit="contain"
        width={400}
        onMouseEnter={onMouseEnter}
        height={600}
        alt={`${product.brand} - ${product.name}`}
      />
      {isHovered ? (
        <div className="flex items-center space-x-2">
          {slicedImages.map((image, idx) => {
            const smallImageUrl = image.imageUrl.replace(
              "{size}",
              smallImageSize
            );
            return (
              <div key={idx}>
                <NextImage
                  src={smallImageUrl}
                  placeholder="blur"
                  blurDataURL={smallImageUrl}
                  key={idx}
                  width={34}
                  height={51}
                  alt={`${product.brand} - ${product.name}`}
                  objectFit="contain"
                  quality={65}
                  onMouseEnter={() => {
                    setActiveImage(image.imageUrl.replace("{size}", "380"));
                  }}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <Fragment>
          <h2>
            <b className="text-xs block w-full uppercase">
              {product.brand.name}
            </b>
            <span className="text-[10px] block w-full overflow-hidden overflow-ellipsis whitespace-nowrap">
              {product.name}
            </span>
          </h2>
          <strong className="text-13 font-semibold flex">
            {product.priceLabel}
          </strong>
        </Fragment>
      )}
    </article>
  );
};
