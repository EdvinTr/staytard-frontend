import React from "react";

interface ImagePreviewsProps {
  imageUrls: string[];
}

export const ImagePreviews = ({ imageUrls }: ImagePreviewsProps) => {
  return (
    <div className="flex items-center space-x-4">
      {imageUrls &&
        imageUrls.map((url, index) => {
          return (
            url.length > 0 && (
              <img
                key={index}
                src={url.replace("{size}", "100")}
                className="mt-4 h-16 w-12 object-cover"
                alt={`Product image ${index + 1}`}
              />
            )
          );
        })}
    </div>
  );
};
