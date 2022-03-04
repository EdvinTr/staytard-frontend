import {
  CheckIcon,
  ExclamationIcon,
  LockClosedIcon,
  MailIcon,
} from "@heroicons/react/solid";
import { Form, Formik } from "formik";
import React, { Fragment, useState } from "react";
import * as Yup from "yup";
import { Localized } from "../../Localized";
import { emailRegex } from "../../utils/validation/userValidationSchema";
import { BaseButton } from "../global/BaseButton";
import { CustomInputField } from "../global/CustomInputField";
import { InputFieldErrorText } from "../global/InputFieldErrorText";

const inputIconClassNames =
  "w-[13px] absolute top-[19px] left-4 text-black text-opacity-40";
const exclamationIconClassNames = "w-[13px] absolute top-[19px] right-4";
const {
  loginFailedErrorMessage,
  emailInputErrorMessage,
  passwordInputErrorMessage,
} = Localized.page.login;
const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .required(emailInputErrorMessage)
    .matches(emailRegex, emailInputErrorMessage),
  password: Yup.string().required(passwordInputErrorMessage),
});

interface LoginFormProps {
  onSubmit: (values: FormValues) => Promise<void>;
  loginError?: boolean;
}
interface FormValues {
  email: string;
  password: string;
}
export const LoginForm = ({ onSubmit, loginError }: LoginFormProps) => {
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  return (
    <Formik
      onSubmit={async (values: FormValues, { setSubmitting }) => {
        await onSubmit(values);
        setSubmitting(false);
      }}
      initialValues={{
        email: "",
        password: "",
      }}
      validateOnBlur
      validationSchema={loginValidationSchema}
    >
      {({ values, errors, touched, isSubmitting }) => {
        return (
          <Form className="pt-6">
            <div className="space-y-3">
              <div className={`relative`} data-cy="email-input-container">
                <CustomInputField
                  required
                  type="email"
                  name="email"
                  label="E-mail"
                  autoComplete="on"
                  placeholder="E-mail"
                  data-cy="email-input"
                  value={values.email}
                  isFocused={focusedInput === "email"}
                  className={`${
                    errors.email
                      ? "border-red-600 placeholder:text-red-600 focus:placeholder:text-sm"
                      : ""
                  } text-xs placeholder:text-xs`}
                  hasError={!!errors.email && touched.email}
                  errorMessage={errors.email}
                  hasLeftIcon={true}
                  onFocus={() => setFocusedInput("email")}
                  onBlur={() => setFocusedInput(null)}
                />
                <MailIcon
                  className={`${inputIconClassNames} ${
                    focusedInput === "email" && "opacity-50"
                  }`}
                />
                {errors.email && (
                  <Fragment>
                    <ExclamationIcon
                      className={`${exclamationIconClassNames} ${
                        focusedInput === "email"
                          ? "text-black opacity-30"
                          : "text-red-600"
                      }`}
                    />
                    <InputFieldErrorText
                      data-cy="email-input-error-text"
                      isInputFocused={focusedInput === "email"}
                    >
                      {errors.email}
                    </InputFieldErrorText>
                  </Fragment>
                )}
              </div>
              <div className="relative" data-cy="password-input-container">
                <CustomInputField
                  required
                  name="password"
                  type="password"
                  label="Password"
                  placeholder="Password"
                  className={`${
                    errors.password
                      ? "border-red-600 placeholder:text-red-600 focus:placeholder:text-sm"
                      : ""
                  } text-xs placeholder:text-xs`}
                  data-cy="password-input"
                  errorMessage={errors.password}
                  hasLeftIcon
                  hasError={!!errors.password && touched.password}
                  isFocused={focusedInput === "password"}
                  value={values.password}
                  onFocus={() => setFocusedInput("password")}
                  onBlur={() => setFocusedInput(null)}
                />
                <LockClosedIcon
                  className={`${inputIconClassNames} ${
                    focusedInput === "password" && "opacity-50"
                  } `}
                />
                {errors.password && (
                  <>
                    <ExclamationIcon
                      className={`${exclamationIconClassNames} ${
                        focusedInput === "password"
                          ? "opacity-50"
                          : "text-red-600"
                      }`}
                    />
                    <InputFieldErrorText
                      data-cy="password-input-error-text"
                      isInputFocused={focusedInput === "password"}
                    >
                      {errors.password}
                    </InputFieldErrorText>
                  </>
                )}
                {!errors.password && (
                  <CheckIcon className="absolute top-[19px] right-4 w-4 opacity-40" />
                )}
              </div>
            </div>
            {loginError && (
              <div className="text-13 mt-4 bg-red-50 p-4 text-red-600">
                <div data-cy="login-failed-error">
                  {loginFailedErrorMessage}
                </div>
              </div>
            )}
            <div className="text-13  pt-4 font-light hover:underline">
              Forgot password?
            </div>
            <BaseButton
              variant="solid"
              disabled={isSubmitting}
              loading={isSubmitting}
              size="lg"
              type="submit"
              className="mt-6"
            >
              Sign In
            </BaseButton>
          </Form>
        );
      }}
    </Formik>
  );
};
