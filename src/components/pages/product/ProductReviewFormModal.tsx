import { StarIcon as OutlineStarIcon } from "@heroicons/react/outline";
import SolidStarIcon from "@heroicons/react/solid/StarIcon";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import React, { useState } from "react";
import Rating from "react-rating";
import { useCreateProductReviewMutation } from "../../../lib/graphql";
import { isEmailAddress } from "../../../utils/validation/isEmailAddress";
import { BaseButton } from "../../global/BaseButton";
import { BaseInput } from "../../global/BaseInput";
import { Modal } from "../../global/Modal";
import { MyCheckbox } from "../../global/MyCheckbox";

interface ProductReviewFormModalProps {
  show: boolean;
  onClose: () => void;
  productId: number;
  onSuccess: () => void;
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
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal onClose={onClose} show={show}>
      <div className="p-8">
        <h1 className="pb-6 text-left text-2xl font-bold ">My review</h1>
        <Formik
          initialValues={{
            email: "",
            wouldRecommend: false,
            title: "",
            content: "",
            nickname: "",
            rating: 0,
          }}
          validate={(values) => {
            const errors: Partial<FormValues> = {};
            if (!values.nickname) {
              errors.nickname = "Required";
            }
            if (!isEmailAddress(values.email)) {
              errors.email = "Invalid email address";
            }
            if (!values.title) {
              errors.title = "Required";
            }
            if (values.title.length > 50) {
              errors.title = "Title must be 50 characters or less";
            }
            if (!values.content) {
              errors.content = "Required";
            }
            if (values.content.length > 1000) {
              errors.content = "Content must be 1000 characters or less";
            }

            return errors;
          }}
          onSubmit={async (
            values: FormValues,
            { setSubmitting, resetForm }: FormikHelpers<FormValues>
          ) => {
            await onSubmit(values, resetForm);
          }}
        >
          {({ isSubmitting, values, touched, errors }) => (
            <Form className="space-y-6 text-left ">
              <div>
                {/* rating select */}
                <Rating
                  fullSymbol={
                    <SolidStarIcon className="text-staytard-dark inline-block w-8" />
                  }
                  emptySymbol={
                    <OutlineStarIcon
                      className="text-staytard-dark inline-block w-8"
                      stroke="0"
                      fill="#d8d8d8"
                    />
                  }
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
interface CustomTextAreaProps extends React.HTMLProps<HTMLTextAreaElement> {
  hasError?: boolean;
  currentValue: string;
  label: string;
}
const CustomTextArea = ({
  hasError,
  currentValue,
  label,
  ...props
}: CustomTextAreaProps) => {
  const currentValueLength = currentValue?.toString().length ?? 0;

  return (
    <div className="relative">
      <textarea
        {...props}
        className={`focus:border-opacity-100
        ${props.className ? props.className : ""} border-opacity-50
        ${label && currentValueLength > 0 ? "pt-6" : ""} 
         ${
           hasError
             ? "border-red-600 border-opacity-100 placeholder-red-600 focus:border-red-600"
             : "border-black border-opacity-10 focus:border-black"
         } `}
      ></textarea>
      {currentValueLength > 0 && (
        /* floating label */
        <span
          className={`absolute top-2 left-4 py-0 text-[10px] tracking-[1.6px] opacity-50
          ${hasError && "text-red-600 opacity-100"}
          `}
        >
          {label.toUpperCase()}
        </span>
      )}
    </div>
  );
};
