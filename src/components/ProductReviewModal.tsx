import { StarIcon as OutlineStarIcon } from "@heroicons/react/outline";
import SolidStarIcon from "@heroicons/react/solid/StarIcon";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import React, { useState } from "react";
import Rating from "react-rating";
import { useCreateProductReviewMutation } from "../lib/graphql";
import { isEmailAddress } from "../utils/validation/isEmailAddress";
import { BaseButton } from "./global/BaseButton";
import { BaseInput } from "./global/BaseInput";
import { Modal } from "./global/Modal";
import { MyCheckbox } from "./global/MyCheckbox";

interface ProductReviewModalProps {
  show: boolean;
  onClose: () => void;
  productId: number;
}

// TODO:
// Build this: https://help.commerce.campaignmonitor.com/servlet/rtaImage?eid=ka83b000000PC9S&feoid=00N1J00000F1Qs5&refid=0EM1J000000lpRi
interface Values {
  title: string;
  content: string;
  nickname: string;
  rating: number;
  email: string;
  wouldRecommend: boolean;
}
const inputClassNames =
  "border border-black border-opacity-10 focus:border-opacity-100 focus:outline-none focus:ring-0";
export const ProductReviewModal = ({
  onClose,
  show,
  productId,
}: ProductReviewModalProps) => {
  const [rating, setRating] = useState<number>(0);

  const [createReview, { loading }] = useCreateProductReviewMutation();
  const onSubmit = async (values: Values) => {
    try {
      await createReview({
        variables: {
          input: {
            ...values,
            rating: rating,
            productId: productId,
          },
        },
      });
    } catch (e) {
      console.log(e);
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
            const errors: Partial<Values> = {};
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
            return errors;
          }}
          onSubmit={(
            values: Values,
            { setSubmitting }: FormikHelpers<Values>
          ) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 500);
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
                  onChange={(value) => setRating(value)}
                  initialRating={rating}
                />
              </div>
              <div className="text-left">
                {/* email input */}
                <Field
                  className={inputClassNames}
                  id="email"
                  name="email"
                  as={BaseInput}
                  label="Email"
                  hasError={errors.email}
                  value={values.email}
                  isFocused={touched.email}
                  placeholder="Email"
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
                  hasError={errors.nickname}
                  value={values.nickname}
                  isFocused={touched.nickname}
                  placeholder="Nickname"
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
                  hasError={errors.title}
                  value={values.title}
                  isFocused={touched.title}
                  placeholder="Title"
                />
                <ErrorMessage name="title">
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

              <BaseButton type="submit">Submit</BaseButton>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};
