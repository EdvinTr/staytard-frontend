import {
  CheckIcon,
  ExclamationIcon,
  LockClosedIcon,
  MailIcon,
} from "@heroicons/react/solid";
import React, { Fragment, useState } from "react";
import { LoginUserDto } from "../../lib/graphql";
import { Localized } from "../../Localized";
import { isEmailAddress } from "../../utils/validation/isEmailAddress";
import { BaseButton } from "../global/BaseButton";
import { BaseInput } from "../global/BaseInput";
import { InputFieldErrorText } from "../global/InputFieldErrorText";
import { InputState } from "../register-form/types";

interface LoginFormProps {
  onSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    { email, password }: LoginUserDto,
    hasUnresolvedFieldErrors: boolean
  ) => void;
  isSubmitting: boolean;
  loginError?: string;
}
const inputIconClassNames =
  "w-[13px] absolute top-[19px] left-4 text-black text-opacity-40";

const exclamationIconClassNames = "w-[13px] absolute top-[19px] right-4 ";

const {
  loginFailedErrorMessage,
  emailInputErrorMessage,
  passwordInputErrorMessage,
} = Localized.page.login;

export const LoginForm = ({
  onSubmit,
  isSubmitting,
  loginError,
}: LoginFormProps) => {
  const [emailState, setEmailState] = useState<InputState>({
    value: "",
    error: null,
    isFocused: false,
  });
  const [passwordState, setPasswordState] = useState<InputState>({
    value: "",
    error: null,
    isFocused: false,
  });
  const [isDisplayPasswordCheckMark, setIsDisplayPasswordCheckMark] =
    useState(false);

  const hasUnresolvedFieldErrors = () => {
    if (emailState.error || passwordState.error) {
      return true;
    }
    return false;
  };
  return (
    <form
      className="pt-6"
      onSubmit={(e) => {
        onSubmit(
          e,
          {
            email: emailState.value,
            password: passwordState.value,
          },
          hasUnresolvedFieldErrors()
        );
      }}
    >
      <div>
        <div className={`relative`} data-cy="email-input-container">
          {/* email input */}
          <BaseInput
            required
            type="email"
            name="email"
            label="E-mail"
            autoComplete="on"
            placeholder="E-mail"
            data-cy="email-input"
            className={`${!emailState.error && "mb-3"} `}
            value={emailState.value}
            isFocused={emailState.isFocused}
            hasError={!!emailState.error}
            errorMessage={emailState.error}
            hasLeftIcon={true}
            onChange={(e) => {
              setEmailState({
                ...emailState,
                value: e.target.value,
              });
            }}
            onFocus={() => {
              setEmailState({
                ...emailState,
                isFocused: true,
              });
            }}
            onBlur={(e) => {
              const value = e.target.value.trim();
              if (value.length === 0 || !isEmailAddress(value)) {
                return setEmailState({
                  ...emailState,
                  error: emailInputErrorMessage,
                  isFocused: false,
                });
              }
              return setEmailState({
                ...emailState,
                error: null, // reset error
                isFocused: false,
              });
            }}
          />
          <MailIcon
            className={`${inputIconClassNames} ${
              emailState.isFocused && "opacity-50"
            }`}
          />
          {emailState.error && (
            <Fragment>
              <ExclamationIcon
                className={`${exclamationIconClassNames} ${
                  emailState.isFocused
                    ? "text-black opacity-30"
                    : "text-red-600"
                }`}
              />
              {/* error message text */}
              <InputFieldErrorText
                data-cy="email-input-error-text"
                isInputFocused={emailState.isFocused}
              >
                {emailState.error}
              </InputFieldErrorText>
            </Fragment>
          )}
        </div>
        <div className="relative" data-cy="password-input-container">
          {/* password input */}
          <BaseInput
            required
            name="password"
            type="password"
            label="Password"
            placeholder="Password"
            data-cy="password-input"
            errorMessage={passwordState.error}
            hasLeftIcon
            hasError={!!passwordState.error}
            isFocused={passwordState.isFocused}
            value={passwordState.value}
            onFocus={() => {
              setPasswordState({
                ...passwordState,
                isFocused: true,
              });
            }}
            onBlur={(e) => {
              setIsDisplayPasswordCheckMark(false);
              const value = e.target.value;
              if (value.length === 0) {
                return setPasswordState({
                  ...passwordState,
                  error: passwordInputErrorMessage,
                  isFocused: false,
                });
              }
              setPasswordState({
                ...passwordState,
                error: null,
                isFocused: false,
              });
              setIsDisplayPasswordCheckMark(true);
            }}
            onChange={(e) => {
              setPasswordState({
                ...passwordState,
                value: e.target.value,
              });
            }}
          />
          {/* icons */}
          <LockClosedIcon
            className={`${inputIconClassNames} ${
              passwordState.isFocused && "opacity-50"
            } `}
          />
          {passwordState.error && (
            <Fragment>
              <ExclamationIcon
                className={`${exclamationIconClassNames} ${
                  passwordState.isFocused ? "opacity-50" : "text-red-600"
                }`}
              />
              <InputFieldErrorText
                data-cy="password-input-error-text"
                isInputFocused={passwordState.isFocused}
              >
                {passwordState.error}
              </InputFieldErrorText>
            </Fragment>
          )}
          {/* check mark */}
          {isDisplayPasswordCheckMark && (
            <CheckIcon className="w-4 absolute top-[19px] right-4 opacity-40" />
          )}
        </div>
      </div>
      {/* login error */}
      {loginError && (
        <div className="text-red-600 text-13 bg-red-50 p-4 mt-4">
          <div data-cy="login-failed-error">{loginFailedErrorMessage}</div>
        </div>
      )}
      <div className="text-13 pt-4 font-light hover:underline cursor-pointer">
        {/* //TODO should be link */}
        Forgot password?
      </div>
      {/* submit button */}

      <BaseButton
        variant="solid"
        size="lg"
        loading={isSubmitting}
        className="mt-6"
      >
        Sign In
      </BaseButton>
    </form>
  );
};
