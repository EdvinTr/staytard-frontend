import React from "react";
import { useForm } from "react-hook-form";
import { useApollo } from "../lib/apolloClient";
import { BaseButton } from "./global/BaseButton";
import { Modal } from "./global/Modal";

interface ProductReviewModalProps {
  show: boolean;
  onClose: () => void;
  productId: number;
}

export const ProductReviewModal = ({
  onClose,
  show,
  productId,
}: ProductReviewModalProps) => {
  const apollo = useApollo({});
  console.log(apollo.cache);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => console.log(data);
  return (
    <Modal onClose={onClose} show={show}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col p-8">
        <input defaultValue="test" {...register("example")} />

        {/* include validation with required or other standard HTML validation rules */}
        <input
          {...register("exampleRequired", { required: true })}
          placeholder="Title"
        />
        {/* errors will return when field validation fails  */}
        {errors.exampleRequired && <span>This field is required</span>}

        <BaseButton type="submit">Submit Review</BaseButton>
      </form>
    </Modal>
  );
};
