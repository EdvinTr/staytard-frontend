import { useWindowWidth } from "@react-hook/window-size";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toast";
import { successToastColors } from "../../../../../constants";
import {
  FindOneProductReviewDocument,
  ProductReview,
  useDeleteProductReviewMutation,
  useUpdateProductReviewMutation,
} from "../../../../../lib/graphql";
import { Localized } from "../../../../../Localized";
import { updateProductReviewValidationSchema } from "../../../../../utils/validation/productReviewValidationSchema";
import { BaseButton } from "../../../../global/BaseButton";
import { BaseInput } from "../../../../global/BaseInput";
import { CustomTextArea } from "../../../../global/CustomTextArea";
import { DeleteButton } from "../../../../global/DeleteButton";
import { MyCheckbox } from "../../../../global/MyCheckbox";
import { MyRatingSelect } from "../../../../global/MyRatingSelect";
import { ConfirmDeletionModal } from "../../components/ConfirmDeletionModal";
import {
  BasicInputLabel,
  DisabledInput,
} from "../../products/edit/EditProductView";
interface EditProductReviewProps {
  review: ProductReview;
}

interface FormValues {
  title: string;
  content: string;
  isPublished: boolean;
}

const { updateProductReviewSuccessMessage } = Localized.page.admin;

const inputClassNames =
  "border border-black border-opacity-10 focus:border-opacity-100 focus:outline-none focus:ring-0";
export const EditProductReview = ({ review }: EditProductReviewProps) => {
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);
  const showSuccessToast = (): void =>
    toast.success(updateProductReviewSuccessMessage, {
      ...successToastColors,
    });
  const currentWindowWidth = useWindowWidth();

  const [updateReview] = useUpdateProductReviewMutation();
  const [deleteReview] = useDeleteProductReviewMutation();
  return (
    <div>
      <div className="flex items-center justify-between pb-10">
        <h2 className="text-2xl font-medium">General information</h2>
        <DeleteButton
          onClick={() => setIsConfirmDeleteModalOpen(true)}
          aria-label="Open delete review confirmation modal"
        />
        <ConfirmDeletionModal
          heading={`Are you sure you want to delete this review?`}
          loading={false}
          onClose={() => setIsConfirmDeleteModalOpen(false)}
          show={isConfirmDeleteModalOpen}
          onDelete={async () => {
            try {
              console.log("Do delete");
              // check data was returned

              // hide modal
              setIsConfirmDeleteModalOpen(false);
            } catch (err) {
              console.log(err);
            }
          }}
          error={undefined}
        />
      </div>
      <div className="space-y-6">
        <MyWrapper>
          <div className="w-full">
            <BasicInputLabel htmlFor="reviewId">Review ID</BasicInputLabel>
            <DisabledInput name="reviewId" value={review.id.toString()} />
          </div>
          <div className="w-full">
            <BasicInputLabel htmlFor="productId">Product ID</BasicInputLabel>
            <DisabledInput
              name="productId"
              value={review.productId.toString()}
            />
          </div>
        </MyWrapper>
        <MyWrapper>
          <div className="w-full">
            <BasicInputLabel htmlFor="nickname">Nickname</BasicInputLabel>
            <DisabledInput name="nickname" value={review.nickname} />
          </div>
          <div className="w-full">
            <BasicInputLabel htmlFor="publishedAt">
              Published At
            </BasicInputLabel>
            <DisabledInput
              name="publishedAt"
              value={
                review.publishedAt
                  ? new Date(review.publishedAt).toLocaleString()
                  : "-"
              }
            />
          </div>
        </MyWrapper>
        <MyWrapper>
          <div className="w-full">
            <BasicInputLabel htmlFor="createdAt">Created At</BasicInputLabel>
            <DisabledInput
              name="createdAt"
              value={new Date(review.createdAt.toString()).toLocaleString()}
            />
          </div>
          <div className="w-full">
            <BasicInputLabel htmlFor="updatedAt">Updated At</BasicInputLabel>
            <DisabledInput
              name="updatedAt"
              value={new Date(review.updatedAt.toString()).toLocaleString()}
            />
          </div>
        </MyWrapper>
      </div>

      <div className="space-y-2 py-6">
        <div className="text-xs font-medium">Rating</div>
        <div>
          <MyRatingSelect readonly initialRating={review.rating} />
        </div>
      </div>
      <Formik
        validationSchema={updateProductReviewValidationSchema}
        onSubmit={async (values: FormValues, { setSubmitting }) => {
          try {
            const { data } = await updateReview({
              variables: {
                input: {
                  ...values,
                  reviewId: review.id,
                },
              },
              refetchQueries: [FindOneProductReviewDocument], // could also manually write to cache but who has time for that
            });
            if (!data || !data.updateProductReview) {
              throw new Error();
            }
            showSuccessToast();
          } catch (e) {
            console.log(e);
          } finally {
            setSubmitting(false);
            setTimeout(() => {
              toast.hideAll();
            }, 8000);
          }
        }}
        initialValues={{
          title: review.title,
          content: review.content,
          isPublished: review.isPublished,
        }}
      >
        {({ values, errors, isSubmitting, touched }) => {
          return (
            <Form>
              <div className="space-y-6">
                <div className="space-y-2">
                  <BasicInputLabel htmlFor="name">Title</BasicInputLabel>
                  <Field
                    className={`${inputClassNames} text-13`}
                    id="title"
                    name="title"
                    type="text"
                    as={BaseInput}
                    label="title"
                    hasError={errors.title && touched.title}
                    value={values.title}
                    placeholder="Title"
                    autoComplete="off"
                  />
                  <ErrorMessage name="title">
                    {(msg) => (
                      <div className="text-[11px] text-red-600">{msg}</div>
                    )}
                  </ErrorMessage>
                </div>

                <div className="space-y-2">
                  <BasicInputLabel htmlFor="content">Content</BasicInputLabel>
                  <Field
                    className={`${inputClassNames} text-13 w-full`}
                    id="content"
                    name="content"
                    as={CustomTextArea}
                    rows={7}
                    label="Content"
                    hasError={errors.content && touched.content}
                    currentValue={values.content}
                    placeholder="Content"
                    aria-label="Content"
                    autoComplete="off"
                  />
                  <ErrorMessage name="content">
                    {(msg) => (
                      <div className="text-[11px] text-red-600">{msg}</div>
                    )}
                  </ErrorMessage>
                </div>
                <div className="space-x-2">
                  <Field
                    className={``}
                    id="isPublished"
                    name="isPublished"
                    as={MyCheckbox}
                    rounded="md"
                    value={values.isPublished}
                    checked={values.isPublished}
                  />
                  <BasicInputLabel htmlFor="isPublished">
                    Publish
                  </BasicInputLabel>
                </div>
              </div>

              <div className="pt-12">
                <BaseButton
                  type="submit"
                  disabled={isSubmitting}
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

const MyWrapper: React.FC<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = ({ children, ...props }) => {
  return (
    <div
      className={`space-y-4 md:flex md:items-center md:justify-between md:space-x-7 md:space-y-0 ${
        props.className ? props.className : ""
      }`}
    >
      {children}
    </div>
  );
};
