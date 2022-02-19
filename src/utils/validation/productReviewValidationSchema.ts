import * as Yup from "yup";

const nicknameValidation = {
  nickname: Yup.string()
    .required("Required")
    .max(50, "Nickname must be 50 characters or less"),
};
const emailValidation = {
  email: Yup.string().email("Invalid email address").required("Required"),
};
const titleValidation = {
  title: Yup.string()
    .required("Required")
    .max(50, "Title must be 50 characters or less"),
};
const contentValidation = {
  content: Yup.string()
    .required("Required")
    .max(1000, "Content must be 1000 characters or less"),
};

export const updateProductReviewValidationSchema = Yup.object().shape({
  ...titleValidation,
  ...contentValidation,
});

export const createProductReviewValidationSchema = Yup.object().shape({
  ...nicknameValidation,
  ...emailValidation,
  ...titleValidation,
  ...contentValidation,
});
