import * as Yup from "yup";

const nameValidation = {
  name: Yup.string()
    .required("Required")
    .min(1, "Name must be at least 1 character")
    .max(100, "Name must be at most 100 characters"),
};

const descriptionValidation = {
  description: Yup.string()
    .required("Required")
    .min(1, "Description must be at least 1 character")
    .max(1000, "Description must be at most 1000 characters"),
};

const currentPriceValidation = {
  currentPrice: Yup.number().required("Required").min(1),
};

const imageUrlsValidation = {
  imageUrls: Yup.array()
    .of(Yup.string().required("Required"))
    .min(1, "At least one image is required"),
};
const attributesValidation = {
  attributes: Yup.array()
    .of(
      Yup.object().shape({
        size: Yup.object().shape({ value: Yup.string().required("Required") }),
        color: Yup.object().shape({ value: Yup.string().required("Required") }),
        quantity: Yup.number().required("Required").min(1),
      })
    )
    .min(1, "At least one attribute is required"),
};

export const createProductValidationSchema = Yup.object().shape({
  ...nameValidation,
  ...descriptionValidation,
  ...imageUrlsValidation,
  ...attributesValidation,
  brandId: Yup.number().min(1, "Select a brand"),
  categoryId: Yup.number().min(1, "Select a category"),
  price: Yup.number().min(1, "Price must be greater than 0"),
});

export const updateProductValidationSchema = Yup.object().shape({
  ...nameValidation,
  ...descriptionValidation,
  ...currentPriceValidation,
  ...imageUrlsValidation,
  ...attributesValidation,
});
