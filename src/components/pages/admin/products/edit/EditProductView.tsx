import { useWindowWidth } from "@react-hook/window-size";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { toast, ToastContainer } from "react-toast";
import {
  FindOneProductDocument,
  FindOneProductQuery,
  UpdateProductInput,
  useUpdateProductMutation,
} from "../../../../../lib/graphql";
import { Localized } from "../../../../../Localized";
import { BaseButton } from "../../../../global/BaseButton";
import { BaseInput } from "../../../../global/BaseInput";
import { CustomTextArea } from "../../../../global/CustomTextArea";
import { AttributeFieldArray } from "../components/AttributeFieldArray";
import { ImageFieldArray } from "../components/ImageFieldArray";
import { ImagePreviews } from "../components/SmallImagePreview";
import { updateProductValidationSchema } from "../validation/productValidationSchema";
interface EditProductViewProps {
  product: FindOneProductQuery["product"];
}

type FormValues = UpdateProductInput;

const { updateProductSuccessMessage } = Localized.page.admin;

// TODO: add category input disabled
const inputClassNames =
  "border border-black border-opacity-10 focus:border-opacity-100 focus:outline-none focus:ring-0";
export const EditProductView: React.FC<EditProductViewProps> = ({
  product,
}) => {
  const currentWindowWidth = useWindowWidth();
  const showSuccessToast = (): void =>
    toast.success(updateProductSuccessMessage, {
      backgroundColor: "black",
      color: "white",
    });
  const [updateProduct, { error: updateProductGqlError }] =
    useUpdateProductMutation();
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
        onSubmit={async (values: FormValues, { setSubmitting }) => {
          try {
            const { data } = await updateProduct({
              variables: {
                input: {
                  attributes: values.attributes.map((attr) => ({
                    color: { value: attr.color.value },
                    size: { value: attr.size.value },
                    quantity: attr.quantity,
                  })), // creating a new attribute array because tge endpoint does not need SKU or __typename fields
                  currentPrice: values.currentPrice,
                  description: values.description,
                  productId: values.productId,
                  name: values.name,
                  imageUrls: values.imageUrls,
                  isDiscontinued: false,
                },
              },
              refetchQueries: [FindOneProductDocument],
            });
            if (!data || !data.updateProduct) {
              throw new Error();
            }
            showSuccessToast();
          } catch (err) {
            console.log(err);
          } finally {
            setSubmitting(false);
            setTimeout(() => {
              toast.hideAll();
            }, 5000);
          }
        }}
        validationSchema={updateProductValidationSchema}
      >
        {({ values, errors, touched, isSubmitting }) => {
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
                    label="Current price"
                    hasError={errors.currentPrice && touched.currentPrice}
                    value={values.currentPrice}
                    placeholder="Current price"
                    autoComplete="off"
                  />
                  <ErrorMessage name="currentPrice">
                    {(msg) => (
                      <div className="pt-0 text-[11px] text-red-600">{msg}</div>
                    )}
                  </ErrorMessage>
                </div>
                {/* image input */}
                <div className="pt-4">
                  <h2 className="pb-4 text-xl font-semibold">Images</h2>
                  <ImageFieldArray
                    imageUrls={values.imageUrls}
                    name="imageUrls"
                  />
                  <ImagePreviews imageUrls={values.imageUrls} />
                </div>
                <div className="pt-4">
                  <h3 className="pb-4 text-xl font-semibold">Attributes</h3>
                  <AttributeFieldArray attributes={values.attributes} />
                </div>
                {updateProductGqlError && (
                  <div className="text-xs text-red-600">
                    {updateProductGqlError.message}
                  </div>
                )}
                <BaseButton
                  disabled={isSubmitting}
                  type="submit"
                  loading={isSubmitting}
                >
                  Save
                </BaseButton>
              </div>
            </Form>
          );
        }}
      </Formik>
      <div className="z-50">
        <ToastContainer
          position={currentWindowWidth <= 768 ? "bottom-center" : "bottom-left"}
        />
      </div>
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
