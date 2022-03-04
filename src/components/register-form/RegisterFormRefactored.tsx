import { Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { Localized } from "../../Localized";
import {
  emailRegex,
  firstNameValidation,
  lastNameValidation,
  passwordValidation,
} from "../../utils/validation/userValidationSchema";
import { BaseButton } from "../global/BaseButton";
import { CustomInputField } from "../global/CustomInputField";
import { InputFieldErrorText } from "../global/InputFieldErrorText";
interface RegisterFormProps {
  onSuccess: () => void;
}

const {
  firstNameFieldErrorMessage,
  inputContainsNumberErrorMessage,
  addressValidationErrorMessage,
  addressFieldErrorMessage,
  zipCodeValidationErrorMessage,
  cityInputValidationErrorMessage,
  phoneNumberValidationErrorMessage,
  emailInputErrorMessage,
  registrationFailedErrorMessage,
  passwordInputErrorMessage,
} = Localized.page.register;

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required(emailInputErrorMessage)
    .matches(emailRegex, emailInputErrorMessage),
  password: passwordValidation,
  firstName: firstNameValidation,
  lastName: lastNameValidation,
});
interface FormValues {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

const hasFieldError = (value?: string) => {
  return `${
    value
      ? "border-red-600 placeholder:text-red-600 focus:placeholder:text-sm"
      : "mb-3"
  } text-xs placeholder:text-xs`;
};

export const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState<null | keyof FormValues>(
    null
  );
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        firstName: "",
        lastName: "",
      }}
      onSubmit={async (values: FormValues, { setSubmitting }) => {
        console.log(values);
        setSubmitting(false);
      }}
      validateOnBlur
      validationSchema={validationSchema}
    >
      {({ values, errors, touched, isSubmitting }) => {
        return (
          <Form>
            <CustomInputField
              data-cy="email-input"
              type="email"
              name="email"
              placeholder="E-mail"
              aria-label="Email"
              label="E-mail"
              className={`${hasFieldError(errors.email)}`}
              required
              errorMessage={errors.email}
              hasError={!!errors.email && touched.email}
              value={values.email}
              isFocused={focusedInput === "email"}
              onFocus={() => setFocusedInput("email")}
              onBlur={() => setFocusedInput(null)}
            />
            {errors.email && (
              <InputFieldErrorText
                data-cy="email-error-message"
                isInputFocused={focusedInput === "email"}
              >
                {errors.email}
              </InputFieldErrorText>
            )}
            <div className="relative">
              <CustomInputField
                data-cy="password-input"
                name="password"
                aria-label="password"
                required
                type={isShowPassword ? "text" : "password"}
                placeholder="Password"
                className={hasFieldError(errors.password)}
                label="Password"
                errorMessage={errors.password}
                hasError={!!errors.password && touched.password}
                value={values.password}
                isFocused={focusedInput === "password"}
                onFocus={() => setFocusedInput("password")}
                onBlur={() => setFocusedInput(null)}
              />
              <button
                type="button"
                onClick={() => setIsShowPassword(!isShowPassword)}
                className="text-13 absolute top-4 right-10 font-light"
              >
                {isShowPassword ? "Hide" : "Show"}
              </button>
              {errors.password && (
                <InputFieldErrorText
                  data-cy="password-error-message"
                  isInputFocused={focusedInput === "password"}
                >
                  {errors.password}
                </InputFieldErrorText>
              )}
            </div>

            <div className="grid grid-cols-2 gap-x-3 ">
              <div>
                <CustomInputField
                  name="firstName"
                  data-cy="first-name-input"
                  type="text"
                  aria-label="First name"
                  className={hasFieldError(errors.firstName)}
                  placeholder="First name"
                  label="First name"
                  required
                  errorMessage={errors.firstName}
                  hasError={!!errors.firstName && touched.firstName}
                  value={values.firstName}
                  isFocused={focusedInput === "firstName"}
                  onFocus={() => setFocusedInput("firstName")}
                  onBlur={() => setFocusedInput(null)}
                />
                {errors.firstName && (
                  <InputFieldErrorText
                    data-cy="first-name-error-message"
                    isInputFocused={focusedInput === "firstName"}
                  >
                    {errors.firstName}
                  </InputFieldErrorText>
                )}
              </div>
              <div>
                <CustomInputField
                  name="lastName"
                  data-cy="last-name-input"
                  type="text"
                  placeholder="Last name"
                  required
                  label="Last name"
                  className={hasFieldError(errors.lastName)}
                  errorMessage={errors.lastName}
                  hasError={!!errors.lastName && touched.lastName}
                  value={values.lastName}
                  isFocused={focusedInput === "lastName"}
                  onFocus={() => setFocusedInput("lastName")}
                  onBlur={() => setFocusedInput(null)}
                />
                {errors.lastName && (
                  <InputFieldErrorText
                    data-cy="last-name-error-message"
                    isInputFocused={focusedInput === "lastName"}
                  >
                    {errors.lastName}
                  </InputFieldErrorText>
                )}
              </div>
            </div>
            <BaseButton
              data-cy="submit-button"
              variant="solid"
              className="mt-6"
              size="lg"
              type="submit"
              loading={isSubmitting}
              disabled={isSubmitting}
            >
              Continue
            </BaseButton>
          </Form>
        );
      }}
    </Formik>
  );
};
