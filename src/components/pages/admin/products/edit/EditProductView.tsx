import { TrashIcon } from "@heroicons/react/solid";
import { useWindowWidth } from "@react-hook/window-size";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toast";
import { APP_PAGE_ROUTE, successToastColors } from "../../../../../constants";
import {
  FindOneProductDocument,
  FindOneProductQuery,
  UpdateProductInput,
  useDeleteProductMutation,
  useUpdateProductMutation,
} from "../../../../../lib/graphql";
import { Localized } from "../../../../../Localized";
import { updateProductValidationSchema } from "../../../../../utils/validation/productValidationSchema";
import { BaseButton } from "../../../../global/BaseButton";
import { BaseInput } from "../../../../global/BaseInput";
import { CustomTextArea } from "../../../../global/CustomTextArea";
import { ConfirmDeletionModal } from "../../components/ConfirmDeletionModal";
import { AttributeFieldArray } from "../components/AttributeFieldArray";
import { ImageFieldArray } from "../components/ImageFieldArray";
import { ImagePreviews } from "../components/SmallImagePreview";
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
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);
  const currentWindowWidth = useWindowWidth();
  const showSuccessToast = (): void =>
    toast.success(updateProductSuccessMessage, {
      ...successToastColors,
    });
  const router = useRouter();
  const [updateProduct, { error: updateProductGqlError }] =
    useUpdateProductMutation();
  const [
    deleteProduct,
    { loading: deleteProductLoading, error: deleteProductError },
  ] = useDeleteProductMutation();

  const handleDeleteProduct = async (id: number) => {
    try {
      const { data } = await deleteProduct({
        variables: {
          id,
        },
      });
      if (!data || !data.deleteProduct) {
        throw new Error();
      }
      setIsConfirmDeleteModalOpen(false);
      router.push(APP_PAGE_ROUTE.ADMIN);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="mx-auto max-w-2xl pb-20 text-sm">
      <div className="flex items-center justify-between pb-10">
        <h2 className="text-2xl font-medium">General information</h2>
        {/* delete button */}
        <button
          onClick={() => setIsConfirmDeleteModalOpen(true)}
          type="button"
          aria-label="Open delete product confirmation modal"
          className="bg-red-100 p-2 text-red-600 transition-all duration-100 ease-in-out hover:bg-red-600 hover:text-white"
        >
          <TrashIcon className="h-4" aria-hidden />
        </button>
        <ConfirmDeletionModal
          heading={`Are you sure you want to delete "${product.name}?"`}
          loading={deleteProductLoading}
          onClose={() => setIsConfirmDeleteModalOpen(false)}
          show={isConfirmDeleteModalOpen}
          onDelete={() => handleDeleteProduct(product.id)}
          error={deleteProductError?.message}
        />
      </div>
      <div className="space-y-4 md:flex md:items-center md:justify-between md:space-x-7 md:space-y-0">
        <div className="w-full">
          <BasicInputLabel htmlFor="productId">Product ID</BasicInputLabel>
          <DisabledInput name="productId" value={product.id.toString()} />
        </div>
        <div className="w-full">
          <BasicInputLabel htmlFor="brand">Brand name</BasicInputLabel>
          <DisabledInput name="brand" value={product.brand.name} />
        </div>
        <div className="w-full">
          <BasicInputLabel htmlFor="originalPrice">
            Original price
          </BasicInputLabel>
          <DisabledInput
            name="originalPrice"
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
                  })), // creating a new attribute array because the endpoint does not need SKU or __typename fields
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
                <div className="pt-4">
                  <BaseButton
                    disabled={isSubmitting}
                    type="submit"
                    loading={isSubmitting}
                  >
                    Save
                  </BaseButton>
                </div>
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

interface DisabledInputProps {}
export const DisabledInput = ({
  ...props
}: DisabledInputProps &
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >) => {
  return (
    <div className="w-full opacity-50">
      <input
        {...props}
        className="mt-2 block w-full border border-opacity-0 bg-blue-50 text-sm"
        type="text"
        disabled
      />
    </div>
  );
};

interface BasicInputLabelProps
  extends React.DetailedHTMLProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  > {}
export const BasicInputLabel = ({ ...props }: BasicInputLabelProps) => {
  return (
    <label {...props} className="text-xs font-medium tracking-wide">
      {props.children}
    </label>
  );
};
