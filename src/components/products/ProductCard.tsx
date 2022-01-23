import { useWindowWidth } from "@react-hook/window-size";
import { AnimatePresence, motion } from "framer-motion";
import { propertyOf, sortBy } from "lodash";
import NextImage from "next/image";
import Link from "next/link";
import React, { useCallback, useMemo, useState } from "react";
import { useSsrCompatible } from "../../hooks/useSsrCompatible";
import { ProductItem } from "../../typings/GetProductsResponse.interface";
interface ProductCardProps {
  product: ProductItem;
}
const sizeOptions = {
  XS: 1,
  S: 2,
  M: 3,
  L: 4,
  XL: 5,
  XXL: 6,
};
const largeImageSize = "300";
const smallImageSize = "34";
export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const currentWindowWidth = useSsrCompatible(useWindowWidth(), 0);
  const slicedImages = product.images.slice(0, 4);
  const [isHovered, setIsHovered] = useState(false);

  const [largeWebpImages] = useState(() => {
    return slicedImages.map((image) => {
      image.imageUrl = image.imageUrl.replace("{size}", largeImageSize);
      image.imageUrl = image.imageUrl + "&fmt=webp";
      return image;
    });
  });
  const [smallWebpImages] = useState(() => {
    return slicedImages.map((image) => {
      image.imageUrl = image.imageUrl.replace("{size}", smallImageSize);
      image.imageUrl = image.imageUrl + "&fmt=webp";
      return image;
    });
  });
  const [activeImage, setActiveImage] = useState(largeWebpImages[0]);

  const smallImages =
    smallWebpImages.length >= 1
      ? [smallWebpImages[0], ...smallWebpImages.slice(3, 5)] // get some small images, but not first/second (a strange solution :)
      : [];

  const cacheImages = useCallback(async () => {
    if (currentWindowWidth < 768) {
      return;
    }
    const promises = largeWebpImages.map(({ imageUrl }) => {
      return new Promise(function (resolve, reject) {
        const img = new Image();
        img.src = imageUrl.replace("{size}", largeImageSize);
        img.onload = () => resolve(img.height);
        img.onerror = reject;
      });
    });
    await Promise.all(promises);
  }, [currentWindowWidth, largeWebpImages]);

  const onMouseEnter = () => {
    if (currentWindowWidth < 768 || isHovered) {
      return;
    }
    setIsHovered(true);
    if (largeWebpImages.length > 1) {
      setActiveImage(largeWebpImages[1]);
    }
    cacheImages();
  };

  const onMouseLeave = () => {
    if (currentWindowWidth < 768) {
      return;
    }
    setActiveImage(largeWebpImages[0]);
    setIsHovered(false);
  };

  const availableSizes: string[] = useMemo(() => {
    const sizeArray = product.attributes.reduce((acc: string[], val) => {
      if (acc.includes(val.size.value)) {
        return acc;
      }
      return [...acc, val.size.value];
    }, []);
    return sortBy(sizeArray, propertyOf(sizeOptions));
  }, [product.attributes]);

  return (
    <article
      className={`md:p-3  ${
        isHovered && "shadow-lg transition-shadow duration-300 ease-in-out"
      }`}
      onMouseLeave={onMouseLeave}
    >
      <Link href={`/product/${product.id}`}>
        <a>
          <NextImage
            className="hover:scale-105 duration-300 ease-in-out"
            src={activeImage.imageUrl}
            placeholder="blur"
            priority
            blurDataURL={activeImage.imageUrl}
            objectFit="contain"
            width={400}
            onMouseEnter={onMouseEnter}
            height={600}
            alt={`${product.brand.name} - ${product.name}`}
          />
        </a>
      </Link>
      <div className="h-[4.5rem]">
        <AnimatePresence initial={false}>
          {isHovered ? (
            <motion.div
              key="small-images"
              initial="collapsed"
              animate="open"
              exit="collapsed"
              variants={{
                open: { opacity: 1 },
                collapsed: {
                  height: 0,
                  opacity: 0,
                },
              }}
            >
              <div className="flex items-center space-x-2 ">
                {smallImages.map((image, idx) => {
                  /*  const smallImageUrl = image.imageUrl.replace(
                    "{size}",
                    smallImageSize
                  ); */
                  return (
                    <div key={idx} className="">
                      <NextImage
                        src={image.imageUrl}
                        placeholder="blur"
                        blurDataURL={image.imageUrl}
                        key={idx}
                        width={34}
                        height={51}
                        alt={`${product.brand.name} - ${product.name}`}
                        objectFit="contain"
                        quality={65}
                        onMouseEnter={() => {
                          setActiveImage(image);
                        }}
                      />
                    </div>
                  );
                })}
              </div>
              <ul className="flex space-x-2 text-xs">
                {availableSizes.map((size, idx) => {
                  return <li key={idx}>{size}</li>;
                })}
              </ul>
            </motion.div>
          ) : (
            <motion.div
              key="product-details"
              initial="collapsed"
              animate="open"
              exit="collapsed"
              variants={{
                open: { opacity: 1, height: 0 },
                collapsed: {
                  height: 0,
                  opacity: 0,
                },
              }}
            >
              {/* names and price */}
              <h2>
                <b className="text-xs block w-full uppercase">
                  {product.brand.name}
                </b>
                <span className="text-[10px] block w-full overflow-hidden overflow-ellipsis whitespace-nowrap">
                  {product.name}
                </span>
              </h2>
              <strong className="text-13 font-semibold flex">
                {/* {product.priceLabel} */}
                {product.unitPrice} EUR
              </strong>
              {currentWindowWidth < 768 && (
                <div className="text-[8px] uppercase pt-1">
                  + {product.attributes.length} colors
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </article>
  );
};
