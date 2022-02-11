import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import React, { useState } from "react";
import { useCreateProductReviewMutation } from "../lib/graphql";
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
  const [activeField, setActiveField] = useState("");

  return (
    <Modal onClose={onClose} show={show}>
      {/*    <form onSubmit={onSubmit} className="flex flex-col p-8">
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
        <input type="email" {...register("email")} placeholder="Email" />
        <input type="text" {...register("nickname")} placeholder="Nickname" />

        <input type="text" {...register("title")} placeholder="Title" />

        {errors?.title && <p>{errors.title.message}</p>}
        <MyCheckbox {...register("wouldRecommend")} />

        <textarea {...register("content")} placeholder="Content"></textarea>

        <BaseButton type="submit">Submit Review</BaseButton>
      </form> */}
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
          <Form className=" space-y-8 p-8">
            <div>
              <label htmlFor="email" className="block">
                Email
              </label>
              <Field
                id="email"
                name="email"
                placeholder="john@acme.com"
                type="email"
              />
            </div>

            <div className="text-left">
              <Field
                className="border border-black border-opacity-10 focus:border-opacity-100 focus:outline-none focus:ring-0"
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

            <label htmlFor="wouldRecommend">
              Would you recommend to a good friend?
            </label>
            <Field name="wouldRecommend" as={MyCheckbox} />

            <BaseButton type="submit">Submit</BaseButton>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
