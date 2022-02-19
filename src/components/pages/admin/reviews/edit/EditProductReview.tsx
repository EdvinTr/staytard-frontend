import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { ProductReview } from "../../../../../lib/graphql";
import { updateProductReviewValidationSchema } from "../../../../../utils/validation/productReviewValidationSchema";
import { BaseButton } from "../../../../global/BaseButton";
import { BaseInput } from "../../../../global/BaseInput";
import { CustomTextArea } from "../../../../global/CustomTextArea";
import { DeleteButton } from "../../../../global/DeleteButton";
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

const inputClassNames =
  "border border-black border-opacity-10 focus:border-opacity-100 focus:outline-none focus:ring-0";
export const EditProductReview = ({ review }: EditProductReviewProps) => {
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);
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
            <BasicInputLabel htmlFor="productId">Review ID</BasicInputLabel>
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
              value={review.publishedAt ? review.publishedAt.toString() : "-"}
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

      <div className="pt-4">
        <MyRatingSelect readonly initialRating={review.rating} />
      </div>
      <Formik
        validationSchema={updateProductReviewValidationSchema}
        onSubmit={async (values: FormValues, { setSubmitting }) => {
          try {
            console.log("Submit form:", values);
          } catch (e) {
            console.log(e);
          } finally {
            setSubmitting(false);
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
                      <div className="pt-0 text-[11px] text-red-600">{msg}</div>
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
                      <div className="pt-2 text-[11px] text-red-600">{msg}</div>
                    )}
                  </ErrorMessage>
                </div>
              </div>

              <div className="pt-4">
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
