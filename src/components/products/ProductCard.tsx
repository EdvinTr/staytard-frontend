import { useWindowWidth } from "@react-hook/window-size";
import { AnimatePresence, motion } from "framer-motion";
import NextImage from "next/image";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import { useSsrCompatible } from "../../hooks/useSsrCompatible";
import { ProductItem } from "../../typings/GetProductsResponse.interface";
interface ProductCardProps {
  product: ProductItem;
}
const largeImageSize = "380";
const smallImageSize = "34";
let renders = 0;
export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  /*   renders++;
  console.log(renders); */
  const [firstImage] = product.images;
  const currentWindowWidth = useSsrCompatible(useWindowWidth(), 0);
  const slicedImages = product.images.slice(0, 4);

  const [isHovered, setIsHovered] = useState(false);

  const [activeImage, setActiveImage] = useState(
    slicedImages[0].imageUrl.replace("{size}", largeImageSize)
  );
  const smallImages =
    product.images.length >= 1
      ? [firstImage, ...product.images.slice(3, 5)]
      : [];
  const cacheImages = useCallback(async () => {
    if (currentWindowWidth < 768) return;
    const promises = slicedImages.map(({ imageUrl }) => {
      return new Promise(function (resolve, reject) {
        const img = new Image();
        img.src = imageUrl.replace("{size}", largeImageSize);
        img.onload = () => resolve(img.height);
        img.onerror = reject;
      });
    });
    await Promise.all(promises);
  }, [currentWindowWidth]);

  // TODO: small images should not include currently viewed image
  const onMouseEnter = useCallback(async () => {
    if (currentWindowWidth < 768) return;
    setIsHovered(true);
    if (slicedImages.length > 1) {
      setActiveImage(
        slicedImages[1].imageUrl.replace("{size}", largeImageSize)
      );
    }
    await cacheImages(); // TODO: should cancel if mouse leaves
  }, [setIsHovered, currentWindowWidth]);

  const onMouseLeave = useCallback(() => {
    if (currentWindowWidth < 768) return;
    setActiveImage(slicedImages[0].imageUrl.replace("{size}", largeImageSize));
    setIsHovered(false);
  }, [setIsHovered, currentWindowWidth]);

  return (
    <article
      className={`md:p-3 ${
        isHovered && "shadow-lg transition-shadow duration-300 ease-in-out"
      }`}
      onMouseLeave={onMouseLeave}
    >
      <Link href={`/product/${product.id}`}>
        <a>
          <NextImage
            className=""
            src={activeImage}
            placeholder="blur"
            priority
            blurDataURL={activeImage}
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
                  const smallImageUrl = image.imageUrl.replace(
                    "{size}",
                    smallImageSize
                  );
                  return (
                    <div key={idx} className="">
                      <NextImage
                        src={smallImageUrl}
                        placeholder="blur"
                        blurDataURL={smallImageUrl}
                        key={idx}
                        width={34}
                        height={51}
                        alt={`${product.brand.name} - ${product.name}`}
                        objectFit="contain"
                        quality={65}
                        onMouseEnter={() => {
                          setActiveImage(
                            image.imageUrl.replace("{size}", largeImageSize)
                          );
                        }}
                      />
                    </div>
                  );
                })}
              </div>
              <ul className="flex space-x-4 text-xs">
                <li>S</li>
                <li>M</li>
                <li>L</li>
                <li>XL</li>
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </article>
  );
};
