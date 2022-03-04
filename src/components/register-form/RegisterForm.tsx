import { Form, Formik } from "formik";
import React, { useState } from "react";
import { registerUserValidationSchema } from "../../utils/validation/userValidationSchema";
import { BaseButton } from "../global/BaseButton";
import { CustomInputField } from "../global/CustomInputField";
import { InputFieldErrorText } from "../global/InputFieldErrorText";
interface RegisterFormProps {
  onSubmit: (values: FormValues) => Promise<void>;
  errorMessage?: string;
}

interface FormValues {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  street: string;
  postalCode: string;
  city: string;
  mobilePhoneNumber: string;
}

const hasFieldError = (value?: string) => {
  return `${
    value
      ? "border-red-600 placeholder:text-red-600 focus:placeholder:text-sm"
      : "mb-3"
  } text-xs placeholder:text-xs`;
};

export const RegisterForm = ({ onSubmit, errorMessage }: RegisterFormProps) => {
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
        street: "",
        postalCode: "",
        city: "",
        mobilePhoneNumber: "",
      }}
      onSubmit={async (values: FormValues, { setSubmitting }) => {
        await onSubmit(values);
        setSubmitting(false);
      }}
      validationSchema={registerUserValidationSchema}
      validateOnBlur
    >
      {({ values, errors, touched, isSubmitting, handleBlur }) => {
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
                  onBlur={() => {
                    setFocusedInput(null);
                    handleBlur("firstName");
                  }}
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
                  aria-label="Last name"
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
            <div>
              <CustomInputField
                name="street"
                type="text"
                data-cy="address-input"
                aria-label="Address"
                placeholder="Address"
                required
                label="Address"
                className={hasFieldError(errors.street)}
                errorMessage={errors.street}
                hasError={!!errors.street && touched.street}
                value={values.street}
                isFocused={focusedInput === "street"}
                onFocus={() => setFocusedInput("street")}
                onBlur={() => setFocusedInput(null)}
              />
              {errors.street && (
                <InputFieldErrorText
                  data-cy="address-error-message"
                  isInputFocused={focusedInput === "street"}
                >
                  {errors.street}
                </InputFieldErrorText>
              )}
            </div>
            <div className="grid grid-cols-2 gap-x-3 ">
              <div>
                <CustomInputField
                  name="postalCode"
                  type="text"
                  data-cy="zip-code-input"
                  placeholder="ZIP code"
                  aria-label="Zip code"
                  required
                  label="ZIP code"
                  className={hasFieldError(errors.postalCode)}
                  errorMessage={errors.postalCode}
                  hasError={!!errors.postalCode && touched.postalCode}
                  value={values.postalCode}
                  isFocused={focusedInput === "postalCode"}
                  onFocus={() => setFocusedInput("postalCode")}
                  onBlur={() => setFocusedInput(null)}
                />
                {errors.postalCode && (
                  <InputFieldErrorText
                    data-cy="zip-code-error-message"
                    isInputFocused={focusedInput === "postalCode"}
                  >
                    {errors.postalCode}
                  </InputFieldErrorText>
                )}
              </div>
              <div>
                <CustomInputField
                  name="city"
                  type="text"
                  placeholder="City"
                  data-cy="city-input"
                  aria-label="City"
                  required
                  label="City"
                  className={hasFieldError(errors.city)}
                  errorMessage={errors.city}
                  hasError={!!errors.city && touched.city}
                  value={values.city}
                  isFocused={focusedInput === "city"}
                  onFocus={() => setFocusedInput("city")}
                  onBlur={() => setFocusedInput(null)}
                />
                {errors.city && (
                  <InputFieldErrorText
                    data-cy="city-error-message"
                    isInputFocused={focusedInput === "city"}
                  >
                    {errors.city}
                  </InputFieldErrorText>
                )}
              </div>
            </div>
            <CustomInputField
              type="tel"
              name="mobilePhoneNumber"
              aria-label="Mobile number"
              placeholder="Mobile number"
              data-cy="phone-number-input"
              required
              label="Mobile number"
              className={hasFieldError(errors.mobilePhoneNumber)}
              errorMessage={errors.mobilePhoneNumber}
              hasError={!!errors.mobilePhoneNumber && touched.mobilePhoneNumber}
              value={values.mobilePhoneNumber}
              isFocused={focusedInput === "mobilePhoneNumber"}
              onFocus={() => setFocusedInput("mobilePhoneNumber")}
              onBlur={() => setFocusedInput(null)}
            />
            {errors.mobilePhoneNumber && (
              <InputFieldErrorText
                data-cy="cell-phone-error-message"
                isInputFocused={focusedInput === "mobilePhoneNumber"}
              >
                {errors.mobilePhoneNumber}
              </InputFieldErrorText>
            )}
            {errorMessage && (
              <div className="text-13 mt-4 bg-red-50 p-4 text-red-600">
                <div data-cy="registration-failed-error">{errorMessage}</div>
              </div>
            )}
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
