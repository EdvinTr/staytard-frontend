import { ErrorMessage, Field, FieldArray } from "formik";
import React from "react";
import { BaseInput } from "../../../../global/BaseInput";
import { AddRemoveButton } from "./CreateProductModal";

interface ImageFieldArrayProps {
  imageUrls: string[];
  name: string;
}

export const ImageFieldArray: React.FC<ImageFieldArrayProps> = ({
  imageUrls,
  name,
}) => {
  return (
    <div>
      <FieldArray
        name={name}
        render={(arrayHelpers) => (
          <div className="space-y-4">
            {imageUrls && imageUrls.length > 0 ? (
              imageUrls.map((url, index) => (
                <div key={index}>
                  <div className="mr-8 flex w-full justify-between">
                    <div className="w-9/12 md:w-10/12">
                      <Field
                        name={`${name}.${index}`}
                        as={BaseInput}
                        className=""
                        type="url"
                        required
                        id={`${name}.${index}`}
                        autoComplete="off"
                        label="Image URL"
                        value={imageUrls[index]}
                        placeholder="Image URL"
                        aria-label="Image URL"
                      />
                    </div>
                    <div className="space-x-4 pt-2">
                      <AddRemoveButton
                        variant="remove"
                        aria-label="Remove image"
                        type="button"
                        onClick={() => arrayHelpers.remove(index)} // remove image from the list
                      >
                        -
                      </AddRemoveButton>
                      <AddRemoveButton
                        variant="add"
                        aria-label="Add image"
                        className="h-8 w-8 bg-green-600 text-white"
                        type="button"
                        onClick={() => {
                          arrayHelpers.insert(index, "");
                        }} // insert an empty string at a position
                      >
                        +
                      </AddRemoveButton>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  className="bg-green-600 p-2 text-sm uppercase text-white"
                  onClick={() => arrayHelpers.push("")}
                >
                  Add Images
                </button>
                <ErrorMessage name={name}>
                  {(msg) => (
                    <div className="text-[11px] text-red-600">{msg}</div>
                  )}
                </ErrorMessage>
              </div>
            )}
          </div>
        )}
      />
    </div>
  );
};
