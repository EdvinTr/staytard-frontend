import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import {
  FindOneProductQuery,
  UpdateProductInput,
} from "../../../../../lib/graphql";
import { BaseButton } from "../../../../global/BaseButton";
import { BaseInput } from "../../../../global/BaseInput";
import { CustomTextArea } from "../../../../global/CustomTextArea";
import { ImageFieldArray } from "../components/ImageFieldArray";
interface EditProductViewProps {
  product: FindOneProductQuery["product"];
}

type FormValues = UpdateProductInput;

// TODO: add category input disabled
const inputClassNames =
  "border border-black border-opacity-10 focus:border-opacity-100 focus:outline-none focus:ring-0";
export const EditProductView: React.FC<EditProductViewProps> = ({
  product,
}) => {
  return (
    <div className="mx-auto max-w-2xl text-sm">
      <h2 className="pb-7 text-2xl font-medium">General information</h2>
      <div className="space-y-4 md:flex md:items-center md:justify-between md:space-x-7 md:space-y-0">
        {/* id and brand disabled inputs */}
        <div className="w-full opacity-50">
          <BasicInputLabel htmlFor="productId">Product ID</BasicInputLabel>
          <input
            className="mt-2 block w-full border border-opacity-0 bg-blue-50 text-sm"
            type="text"
            id="productId"
            name="productId"
            disabled
            value={product.id}
          />
        </div>
        <div className="w-full opacity-50">
          <BasicInputLabel htmlFor="brand">Brand name</BasicInputLabel>
          <input
            className="mt-2 block w-full border border-opacity-0 bg-blue-50 text-sm"
            type="text"
            id="brand"
            name="brand"
            disabled
            value={product.brand.name}
          />
        </div>
        <div className="w-full opacity-50">
          <BasicInputLabel htmlFor="originalPrice">
            Original price
          </BasicInputLabel>
          <input
            className="mt-2 block w-full border border-opacity-0 bg-blue-50 text-sm"
            type="text"
            id="originalPrice"
            name="originalPrice"
            disabled
            value={product.originalPrice + " EUR"}
          />
        </div>
      </div>
      <Formik
        initialValues={{
          name: product.name,
          description: product.description,
          attributes: product.attributes,
          currentPrice: product.currentPrice,
          imageUrls: product.images.map((img) => img.imageUrl),
          isDiscontinued: product.isDiscontinued,
          productId: product.id,
        }}
        onSubmit={(values: FormValues) => {
          console.log("update save: ", values);
        }}
        validate={(values: FormValues) => {
          const errors: Partial<FormValues> = {};
          if (!values.name) {
            errors.name = "Required";
          }
          if (values.name.length > 100) {
            errors.name = "Name must be less than 100 characters";
          }
          if (!values.description) {
            errors.description = "Required";
          }

          return errors;
        }}
      >
        {({ values, errors, touched }) => {
          return (
            <Form>
              <div className="mt-8 space-y-5">
                <div className="space-y-2">
                  <BasicInputLabel htmlFor="name">Display name</BasicInputLabel>
                  <Field
                    className={`${inputClassNames} text-13  w-full`}
                    id="name"
                    name="name"
                    type="text"
                    as={BaseInput}
                    label="name"
                    hasError={errors.name && touched.name}
                    value={values.name}
                    placeholder="Name"
                    autoComplete="off"
                  />
                  <ErrorMessage name="name">
                    {(msg) => (
                      <div className="pt-0 text-[11px] text-red-600">{msg}</div>
                    )}
                  </ErrorMessage>
                </div>
                <div className="space-y-2">
                  <BasicInputLabel htmlFor="description">
                    Description
                  </BasicInputLabel>
                  <Field
                    className={`${inputClassNames} text-13  w-full`}
                    id="description"
                    name="description"
                    as={CustomTextArea}
                    rows={6}
                    label="Description"
                    hasError={errors.description && touched.description}
                    currentValue={values.description}
                    placeholder="Description"
                    aria-label="Description"
                    autoComplete="off"
                  />
                  <ErrorMessage name="description">
                    {(msg) => (
                      <div className="pt-0 text-[11px] text-red-600">{msg}</div>
                    )}
                  </ErrorMessage>
                </div>
                <div className="space-y-2">
                  <BasicInputLabel htmlFor="currentPrice">
                    Current price
                  </BasicInputLabel>
                  <Field
                    className={`${inputClassNames} text-13 w-full`}
                    id="currentPrice"
                    name="currentPrice"
                    type="number"
                    as={BaseInput}
                    rows={5}
                    label="currentPrice"
                    hasError={errors.currentPrice && touched.currentPrice}
                    value={values.currentPrice}
                    placeholder="currentPrice"
                    aria-label="currentPrice"
                    autoComplete="off"
                  />
                  <ErrorMessage name="currentPrice">
                    {(msg) => (
                      <div className="pt-0 text-[11px] text-red-600">{msg}</div>
                    )}
                  </ErrorMessage>
                </div>
                {/* image input */}
                <div>
                  <h2 className="pb-4 text-xl font-semibold">Images</h2>
                  <ImageFieldArray
                    imageUrls={values.imageUrls}
                    name="imageUrls"
                  />
                </div>
                <BaseButton type="submit" loading={false}>
                  Save
                </BaseButton>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

interface BasicInputLabelProps
  extends React.DetailedHTMLProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  > {}
const BasicInputLabel = ({ ...props }: BasicInputLabelProps) => {
  return (
    <label {...props} className="text-xs font-medium">
      {props.children}
    </label>
  );
};
