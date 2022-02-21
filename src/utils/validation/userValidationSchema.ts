import * as Yup from "yup";
import {
  containsLettersRegex,
  emailValidationRegex,
  mobilePhoneNumber,
} from "../../components/register-form/utils/validation";
import { Localized } from "../../Localized";

const {
  emailInputErrorMessage,
  phoneNumberValidationErrorMessage,
  cityInputValidationErrorMessage,
  zipCodeValidationErrorMessage,
  addressValidationErrorMessage,
} = Localized.page.register;
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

const emailValidation = {
  email: Yup.string()
    .required("Required")
    .matches(emailValidationRegex, emailInputErrorMessage),
};

const mobileNumberValidation = {
  mobilePhoneNumber: Yup.string()
    .required("Required")
    .matches(mobilePhoneNumber, phoneNumberValidationErrorMessage),
};

const streetAddressValidation = {
  street: Yup.string()
    .required("Required")
    .min(1)
    .max(36)
    .matches(
      new RegExp(/^[a-zA-ZåäöæøÅÄÖÆØ0-9\s]{1,36}$/),
      addressValidationErrorMessage
    ),
};

const postalCodeValidation = {
  postalCode: Yup.string()
    .required("Required")
    .matches(/^[0-9]{3,3}\ ?[0-9]{2,2}$/, zipCodeValidationErrorMessage),
};

const cityValidation = {
  city: Yup.string()
    .required("Required")
    .min(1)
    .max(100)
    .matches(containsLettersRegex, cityInputValidationErrorMessage),
};

export const updateUserValidationSchema = Yup.object().shape({
  ...firstNameValidation,
  ...lastNameValidation,
  ...emailValidation,
  ...mobileNumberValidation,
  ...streetAddressValidation,
  ...postalCodeValidation,
  ...cityValidation,
});
