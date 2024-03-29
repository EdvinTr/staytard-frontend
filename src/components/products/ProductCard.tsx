import { useWindowWidth } from "@react-hook/window-size";
import { AnimatePresence, motion } from "framer-motion";
import { propertyOf, sortBy } from "lodash";
import Link from "next/link";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSsrCompatible } from "../../hooks/useSsrCompatible";
import {
  ProductImage,
  ProductItem,
} from "../../typings/GetProductsResponse.interface";
interface ProductCardProps {
  product: ProductItem;
  isLoading: boolean;
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
export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isLoading,
}) => {
  const currentWindowWidth = useSsrCompatible(useWindowWidth(), 0);
  const [isHovered, setIsHovered] = useState(false);

  const [activeImage, setActiveImage] = useState<ProductImage | null>(null);
  const [largeWebpImages, setLargeWebpImages] = useState<ProductImage[]>([]);
  const [smallWebpImages, setSmallWebpImages] = useState<ProductImage[]>([]);

  useEffect(() => {
    const image = product.images[0];
    image.imageUrl = image.imageUrl.replace("{size}", largeImageSize);
    setActiveImage(image);

    setSmallWebpImages(() => {
      return product.images.slice(0, 4).map((image) => {
        image.imageUrl = image.imageUrl.replace("{size}", smallImageSize);
        image.imageUrl = image.imageUrl + "&fmt=webp";
        return image;
      });
    });

    setLargeWebpImages(() => {
      return product.images.slice(0, 4).map((image) => {
        image.imageUrl = image.imageUrl.replace("{size}", largeImageSize);
        image.imageUrl = image.imageUrl + "&fmt=webp";
        return image;
      });
    });
  }, [product.images]);

  const cacheLargeImages = useCallback(async () => {
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
    if (product.images.length > 1) {
      setActiveImage(product.images[1]);
    }
    cacheLargeImages();
  };

  const onMouseLeave = () => {
    if (currentWindowWidth < 768) {
      return;
    }
    setActiveImage(product.images[0]);
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
      className={`md:p-3 ${isLoading && "opacity-70"}  ${
        isHovered && "shadow-lg transition-shadow duration-300 ease-in-out"
      }`}
      onMouseLeave={onMouseLeave}
    >
      <Link href={`/product/${product.id}`}>
        <a>
          {activeImage && (
            <>
              <img
                src={activeImage.imageUrl}
                onMouseEnter={onMouseEnter}
                alt={`${product.brand.name} - ${product.name}`}
                className="mb-2 w-full object-contain"
              />
            </>
          )}
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
              <div className="mb-2 flex items-center space-x-2 ">
                {smallWebpImages.map((image, idx) => {
                  const smallImageUrl = image.imageUrl.replace(
                    "{size}",
                    smallImageSize
                  );
                  return (
                    <div key={idx} className="">
                      <img
                        src={smallImageUrl}
                        key={idx}
                        className="h-[51px] w-[34px]"
                        alt={`${product.brand.name} - ${product.name}`}
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
                <b className="block w-full text-xs uppercase">
                  {product.brand.name}
                </b>
                <span className="text-xss block w-full overflow-hidden overflow-ellipsis whitespace-nowrap">
                  {product.name}
                </span>
              </h2>

              {product.currentPrice === product.originalPrice ? (
                <strong className="text-13 flex font-semibold">
                  {product.currentPrice} EUR
                </strong>
              ) : (
                <div className="flex items-center justify-between space-x-2 lg:justify-start lg:space-x-3">
                  <div className="space-x-2">
                    <strong className="text-13 text-app-red">
                      {product.currentPrice} EUR
                    </strong>
                    <del className="text-xss text-stone-500">
                      {product.originalPrice} EUR
                    </del>
                  </div>
                  {/* discount percentage calculation */}
                  <div>
                    <span className="text-app-red text-xs font-semibold tracking-wide lg:text-[11px]">
                      {Math.ceil(
                        ((product.currentPrice - product.originalPrice) /
                          product.originalPrice) *
                          100
                      ).toFixed(0)}
                      %
                    </span>
                  </div>
                </div>
              )}
              {currentWindowWidth < 768 && (
                <div className="pt-1 text-[8px] uppercase">
                  +{" "}
                  {
                    product.attributes.reduce((acc: string[], val) => {
                      if (!acc.includes(val.color.value)) {
                        return [...acc, val.color.value];
                      }
                      return acc;
                    }, []).length
                  }{" "}
                  colors
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </article>
  );
};
