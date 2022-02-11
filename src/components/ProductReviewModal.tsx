import { StarIcon as OutlineStarIcon } from "@heroicons/react/outline";
import SolidStarIcon from "@heroicons/react/solid/StarIcon";
import React, { useState } from "react";
import { Resolver, useForm } from "react-hook-form";
import Rating from "react-rating";
import { BaseButton } from "./global/BaseButton";
import { Modal } from "./global/Modal";
interface ProductReviewModalProps {
  show: boolean;
  onClose: () => void;
  productId: number;
}

// TODO:
// Build this: https://help.commerce.campaignmonitor.com/servlet/rtaImage?eid=ka83b000000PC9S&feoid=00N1J00000F1Qs5&refid=0EM1J000000lpRi
type FormValues = {
  title: string;
  content: string;
  wouldRecommend: boolean;
  email: string;
  nickname: string;
};

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.title ? values : {},
    errors: !values.title
      ? {
          title: {
            type: "required",
            message: "First name is required.",
          },
        }
      : {},
  };
};
export const ProductReviewModal = ({
  onClose,
  show,
  productId,
}: ProductReviewModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });
  const [rating, setRating] = useState<number>(0);
  const onSubmit = handleSubmit((data) => {
    const newData = {
      ...data,
      rating: rating,
    };
  });

  return (
    <Modal onClose={onClose} show={show}>
      <form onSubmit={onSubmit} className="flex flex-col p-8">
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

        <textarea {...register("content")} placeholder="Content"></textarea>

        <BaseButton type="submit">Submit Review</BaseButton>
      </form>
    </Modal>
  );
};
