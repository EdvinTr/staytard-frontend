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
  passwordInputErrorMessage,
  firstNameFieldErrorMessage,
} = Localized.page.register;

export const passwordValidation = Yup.string().matches(
  /^((?=.*[a-zA-ZåäöæøÅÄÖÆØ])(?=.*[0-9]))[\S]{8,}$/,
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
  mobilePhoneNumber,
  phoneNumberValidationErrorMessage
);

export const emailRegex = new RegExp(
  /^((([!#$%&'*+\-/=?^_`{|}~\w])|([!#$%&'*+\-/=?^_`{|}~\w][!#$%&'*+\-/=?^_`{|}~\.\w]{0,}[!#$%&'*+\-/=?^_`{|}~\w]))[@]\w+([-.]\w+)*\.\w+([-.]\w+)*)$/
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
      .matches(new RegExp(/^[a-zA-ZåäöæøÅÄÖÆØ0-9\s]{1,36}$/), errorMessage),
  };
};

export const streetAddressValidation = Yup.string()
  .min(1)
  .max(36)
  .matches(
    new RegExp(/^[a-zA-ZåäöæøÅÄÖÆØ0-9\s]{1,36}$/),
    addressValidationErrorMessage
  );

export const postalCodeValidation = Yup.string().matches(
  /^[0-9]{3,3}\ ?[0-9]{2,2}$/,
  zipCodeValidationErrorMessage
);

export const cityValidation = Yup.string()
  .min(1)
  .max(100)
  .matches(containsLettersRegex, cityInputValidationErrorMessage);

export const updateUserValidationSchema = Yup.object().shape({
  firstName: firstNameValidation,
  lastNameValidation: lastNameValidation,
  email: emailValidation,
  mobilePhoneNumber: mobilePhoneNumberValidation,
  street: streetAddressValidation,
  postalCode: postalCodeValidation,
  city: cityValidation,
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
