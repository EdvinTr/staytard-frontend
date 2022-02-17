import { ErrorMessage, Field, FieldArray } from "formik";
import React from "react";
import { CreateProductAttributeInput } from "../../../../../lib/graphql";
import { BaseInput } from "../../../../global/BaseInput";
import { AddRemoveButton } from "./CreateProductModal";

interface AttributeFieldArrayProps {
  attributes: CreateProductAttributeInput[];
}

export const AttributeFieldArray = ({
  attributes,
}: AttributeFieldArrayProps) => {
  return (
    <FieldArray
      name="attributes"
      render={(arrayHelpers) => (
        <div className="w-full space-y-7 md:space-y-4">
          {attributes.length > 0 ? (
            attributes.map((attribute, index) => (
              <div
                key={index}
                className="w-full md:flex md:items-center md:justify-between md:space-x-0"
              >
                <div className="md:w-3/12">
                  <Field
                    name={`attributes[${index}].size.value`}
                    as={BaseInput}
                    type="text"
                    id={`attributes.${index}.size`}
                    autoComplete="off"
                    label="Size"
                    required
                    value={attributes[index].size.value}
                    placeholder="Size"
                    aria-label="Size"
                  />
                </div>
                <div className="relative mt-2 md:mt-0 md:w-3/12">
                  <Field
                    name={`attributes.${index}.color.value`}
                    as={BaseInput}
                    type="text"
                    id={`attributes.${index}.color`}
                    autoComplete="off"
                    label="Color"
                    required
                    value={attributes[index].color.value}
                    placeholder="Color"
                    aria-label="Color"
                  />
                </div>
                <div className="mt-2 md:mt-0 md:w-1/5">
                  <Field
                    name={`attributes.${index}.quantity`}
                    as={BaseInput}
                    type="number"
                    id={`attributes.${index}.quantity`}
                    autoComplete="off"
                    label="Quantity"
                    min="1"
                    value={attributes[index].quantity}
                    placeholder="Quantity"
                    aria-label="Quantity"
                  />
                </div>

                <div className="space-x-4 pt-2">
                  <AddRemoveButton
                    variant="remove"
                    type="button"
                    aria-label="Remove attribute"
                    onClick={() => arrayHelpers.remove(index)}
                  >
                    -
                  </AddRemoveButton>
                  <AddRemoveButton
                    variant="add"
                    type="button"
                    aria-label="Add attribute"
                    onClick={() =>
                      arrayHelpers.push({
                        size: { value: "" },
                        color: { value: "" },
                        quantity: 0,
                      })
                    }
                  >
                    +
                  </AddRemoveButton>
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center space-x-4">
              <button
                type="button"
                className="bg-green-600 p-2 text-sm uppercase text-white"
                onClick={() =>
                  arrayHelpers.push({
                    size: { value: "" },
                    color: { value: "" },
                    quantity: 0,
                  })
                }
              >
                Add Attributes
              </button>
              <ErrorMessage name="attributes">
                {(msg) => <div className="text-[11px] text-red-600">{msg}</div>}
              </ErrorMessage>
            </div>
          )}
        </div>
      )}
    />
  );
};
