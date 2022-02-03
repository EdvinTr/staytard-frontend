import React, { Fragment, useState } from "react";
import { BaseInput } from "../global/BaseInput";
import { InputFieldErrorText } from "../global/InputFieldErrorText";
import { InputState } from "../register-form/types";
import { passwordValidationRegex } from "../register-form/utils/validation";

interface ChangePasswordProps {}

export const ChangePassword: React.FC<ChangePasswordProps> = ({}) => {
  const [passwordInput, setPasswordInput] = useState<InputState>({
    value: "",
    isFocused: false,
    error: null,
  });
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  return (
    <Fragment>
      <BaseInput
        data-cy="password-input"
        type={isPasswordShown ? "text" : "password"}
        className={`${!passwordInput.error && "mb-3"} `}
        placeholder="Password"
        label="Password"
        required
        errorMessage={passwordInput.error}
        hasError={!!passwordInput.error}
        value={passwordInput.value || ""}
        isFocused={passwordInput.isFocused}
        onFocus={() => setPasswordInput({ ...passwordInput, isFocused: true })}
        onChange={(e) =>
          setPasswordInput({
            ...passwordInput,
            value: e.target.value,
          })
        }
        onBlur={(e) => {
          const value = e.target.value.trim();
          if (value.length === 0) {
            return setPasswordInput({
              ...passwordInput,
              isFocused: false,
              error: "Some Erorr goes here", // passwordInputErrorMessage,
            });
          }
          // validate against regex
          if (!passwordValidationRegex.test(value)) {
            return setPasswordInput({
              ...passwordInput,
              isFocused: false,
              error: "Some Erorr goes here", // passwordInputErrorMessage,
            });
          }
          // no error
          return setPasswordInput({
            ...passwordInput,
            isFocused: false,
            error: null,
          });
        }}
      />
      {passwordInput.error && (
        <InputFieldErrorText
          data-cy="password-error-message"
          isInputFocused={passwordInput.isFocused}
        >
          {passwordInput.error}
        </InputFieldErrorText>
      )}
    </Fragment>
  );
};
