import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { ProductReview } from "../../../../../lib/graphql";
import { BaseButton } from "../../../../global/BaseButton";
import { BaseInput } from "../../../../global/BaseInput";
import { MyRatingSelect } from "../../../../global/MyRatingSelect";
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
  return (
    <div>
      <div className="space-y-4 md:flex md:items-center md:justify-between md:space-x-7 md:space-y-0">
        <div className="w-full">
          <BasicInputLabel htmlFor="productId">Review ID</BasicInputLabel>
          <DisabledInput name="reviewId" value={review.id.toString()} />
        </div>
        <div className="w-full">
          <BasicInputLabel htmlFor="productId">Product ID</BasicInputLabel>
          <DisabledInput name="productId" value={review.productId.toString()} />
        </div>
      </div>

      <div className="pt-4">
        <MyRatingSelect readonly initialRating={review.rating} />
      </div>
      <Formik
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
        {({ values, errors, isSubmitting }) => {
          return (
            <Form>
              <div className="space-y-2">
                <BasicInputLabel htmlFor="name">Title</BasicInputLabel>
                <Field
                  className={`${inputClassNames} text-13`}
                  id="title"
                  name="title"
                  type="text"
                  as={BaseInput}
                  label="title"
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
