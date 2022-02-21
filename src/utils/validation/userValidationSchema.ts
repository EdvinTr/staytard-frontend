import * as Yup from "yup";
import { containsLettersRegex } from "../../components/register-form/utils/validation";

const firstNameValidation = {
  firstName: Yup.string()
    .required("Required")
    .matches(containsLettersRegex, "Use only letters. Max 100 characters.")
    .min(2, "First name must be at least 2 character")
    .max(100, "First name must be at most 100 characters"),
};

const lastNameValidation = {
  lastName: Yup.string()
    .required("Required")
    .matches(containsLettersRegex, "Use only letters. Max 100 characters.")
    .min(2, "Last name must be at least 2 character")
    .max(100, "Last name must be at most 100 characters"),
};

export const updateUserValidationSchema = Yup.object().shape({
  ...firstNameValidation,
  ...lastNameValidation,
});
