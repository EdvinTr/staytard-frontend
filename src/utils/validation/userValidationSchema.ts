import * as Yup from "yup";
import { Localized } from "../../Localized";
import {
  addressRegex,
  containsLettersRegex,
  emailRegex,
  emailValidationRegex,
  mobilePhoneNumberRegex,
  passwordRegex,
  swedishPostalCodeRegex,
} from "./regex";
const {
  emailInputErrorMessage,
  phoneNumberValidationErrorMessage,
  cityInputValidationErrorMessage,
  zipCodeValidationErrorMessage,
  addressValidationErrorMessage,
  passwordInputErrorMessage,
} = Localized.page.register;

export const passwordValidation = Yup.string().matches(
  passwordRegex,
  passwordInputErrorMessage
);

export const firstNameValidation = Yup.string()
  .matches(containsLettersRegex, "Use only letters. Max 100 characters.")
  .min(2, "First name must be at least 2 character")
  .max(100, "First name must be at most 100 characters");

export const lastNameValidation = Yup.string()
  .matches(containsLettersRegex, "Use only letters. Max 100 characters.")
  .min(2, "Last name must be at least 2 character")
  .max(100, "Last name must be at most 100 characters");

export const emailValidation = Yup.string().matches(
  emailValidationRegex,
  emailInputErrorMessage
);

export const mobilePhoneNumberValidation = Yup.string().matches(
  mobilePhoneNumberRegex,
  phoneNumberValidationErrorMessage
);

export const addressValidationGenerator = (
  key: string,
  errorMessage: string
) => {
  return {
    [key]: Yup.string()
      .required("Required")
      .min(1)
      .max(36)
      .matches(addressRegex, errorMessage),
  };
};

export const streetAddressValidation = Yup.string()
  .min(1)
  .max(36)
  .matches(addressRegex, addressValidationErrorMessage);

export const postalCodeValidation = Yup.string().matches(
  swedishPostalCodeRegex,
  zipCodeValidationErrorMessage
);

export const cityValidation = Yup.string()
  .min(1)
  .max(100)
  .matches(containsLettersRegex, cityInputValidationErrorMessage);

export const updateUserValidationSchema = Yup.object().shape({
  firstName: firstNameValidation.required("Required"),
  lastNameValidation: lastNameValidation.required("Required"),
  email: emailValidation.required("Required"),
  mobilePhoneNumber: mobilePhoneNumberValidation.required("Required"),
  street: streetAddressValidation.required("Required"),
  postalCode: postalCodeValidation.required("Required"),
  city: cityValidation.required("Required"),
});

export const registerUserValidationSchema = Yup.object().shape({
  email: Yup.string().matches(emailRegex, emailInputErrorMessage),
  password: passwordValidation,
  firstName: firstNameValidation,
  lastName: lastNameValidation,
  street: streetAddressValidation,
  postalCode: postalCodeValidation,
  city: cityValidation,
  mobilePhoneNumber: mobilePhoneNumberValidation,
});
