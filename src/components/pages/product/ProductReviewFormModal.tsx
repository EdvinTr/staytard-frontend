import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { Persist } from "formik-persist";
import React, { useState } from "react";
import { LOCAL_STORAGE_KEY } from "../../../constants";
import { useCreateProductReviewMutation } from "../../../lib/graphql";
import { createProductReviewValidationSchema } from "../../../utils/validation/productReviewValidationSchema";
import { BaseButton } from "../../global/BaseButton";
import { BaseInput } from "../../global/BaseInput";
import { CustomTextArea } from "../../global/CustomTextArea";
import { Modal } from "../../global/Modal";
import { MyCheckbox } from "../../global/MyCheckbox";
import { MyRatingSelect } from "../../global/MyRatingSelect";

interface ProductReviewFormModalProps {
  show: boolean;
  onClose: () => void;
  productId: number;
  onSuccess: () => void;
  title: string;
}
interface FormValues {
  title: string;
  content: string;
  nickname: string;
  rating: number;
  email: string;
  wouldRecommend: boolean;
}
const inputClassNames =
  "border border-black border-opacity-10 focus:border-opacity-100 focus:outline-none focus:ring-0";
export const ProductReviewFormModal = ({
  onClose,
  show,
  productId,
  title,
  onSuccess,
}: ProductReviewFormModalProps) => {
  const [rating, setRating] = useState<number>(0);
  const [ratingSelectError, setRatingSelectError] = useState<string | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [createReview] = useCreateProductReviewMutation();
  const onSubmit = async (values: FormValues, resetForm: (_?: any) => void) => {
    if (rating === 0) {
      setRatingSelectError("Please select a rating");
      return;
    }
    if (isLoading) {
      return; // prevent spamming
    }
    setRatingSelectError(null);
    try {
      setIsLoading(true);
      const { data } = await createReview({
        variables: {
          input: {
            ...values,
            rating: rating,
            productId: productId,
          },
        },
      });
      if (data && data.createProductReview) {
        onSuccess();
        resetForm();
        setRatingSelectError(null);
        setRating(0);
        onClose();
      }
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal onClose={onClose} show={show}>
      <div className="p-8">
        <h1 className="pb-6 text-left text-2xl font-bold ">{title}</h1>
        <Formik
          initialValues={{
            email: "",
            wouldRecommend: false,
            title: "",
            content: "",
            nickname: "",
            rating: 0,
          }}
          validationSchema={createProductReviewValidationSchema}
          onSubmit={async (
            values: FormValues,
            { setSubmitting, resetForm }: FormikHelpers<FormValues>
          ) => {
            await onSubmit(values, resetForm);
          }}
        >
          {({ isSubmitting, values, touched, errors }) => (
            <Form className="space-y-6 text-left ">
              <Persist name={LOCAL_STORAGE_KEY.PRODUCT_REVIEW_FORM} />
              <div>
                {/* rating select */}
                <MyRatingSelect
                  onChange={(value) => {
                    setRating(value);
                    setRatingSelectError(null);
                  }}
                  initialRating={rating}
                />
                {ratingSelectError && (
                  <div className="pt-2 text-[11px] text-red-600">
                    {ratingSelectError}
                  </div>
                )}
              </div>
              <div className="text-left">
                {/* email input */}
                <Field
                  className={inputClassNames}
                  id="email"
                  name="email"
                  as={BaseInput}
                  autoFocus
                  label="Email"
                  hasError={errors.email && touched.email}
                  value={values.email}
                  placeholder="Email"
                  aria-label="Email"
                />
                <ErrorMessage name="email">
                  {(msg) => (
                    <div className="pt-2 text-[11px] text-red-600">{msg}</div>
                  )}
                </ErrorMessage>
              </div>
              <div className="text-left">
                {/* nickname input */}
                <Field
                  className={inputClassNames}
                  id="nickname"
                  name="nickname"
                  as={BaseInput}
                  label="Nickname"
                  hasError={errors.nickname && touched.nickname}
                  value={values.nickname}
                  placeholder="Nickname"
                  aria-label="Nickname"
                  autoComplete="off"
                />
                <ErrorMessage name="nickname">
                  {(msg) => (
                    <div className="pt-2 text-[11px] text-red-600">{msg}</div>
                  )}
                </ErrorMessage>
              </div>
              <div className="text-left">
                {/* title input */}
                <Field
                  className={inputClassNames}
                  id="title"
                  name="title"
                  as={BaseInput}
                  label="title"
                  hasError={errors.title && touched.title}
                  value={values.title}
                  placeholder="Title"
                  aria-label="Title"
                  autoComplete="off"
                />
                <ErrorMessage name="title">
                  {(msg) => (
                    <div className="pt-2 text-[11px] text-red-600">{msg}</div>
                  )}
                </ErrorMessage>
              </div>

              <div className="text-left">
                {/* title input */}
                <Field
                  className={`${inputClassNames} text-13 w-full`}
                  id="content"
                  name="content"
                  as={CustomTextArea}
                  rows={5}
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
              {/* would recommend select */}
              <div className="text-13 flex items-center space-x-2">
                <label htmlFor="wouldRecommend">
                  Would you recommend to a good friend?
                </label>
                <Field name="wouldRecommend" as={MyCheckbox} />
              </div>

              <BaseButton loading={isLoading} type="submit">
                Submit
              </BaseButton>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};
