import React from "react";

interface ImagePreviewsProps {
  imageUrls: string[];
}

export const ImagePreviews = ({ imageUrls }: ImagePreviewsProps) => {
  return (
    <div className="no-scrollbar flex items-center space-x-4 overflow-x-auto">
      {imageUrls &&
        imageUrls.map((url, index) => {
          return (
            url.length > 0 && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={index}
                src={url.replace("{size}", "100")}
                className="mt-4 h-16 w-12 flex-shrink-0 object-cover"
                alt={`Product image ${index + 1}`}
              />
            )
          );
        })}
    </div>
  );
};
