import React, { Fragment, useState } from "react";
import { Localized } from "../../Localized";
import { BaseInput } from "../global/BaseInput";
import { InputFieldErrorText } from "../global/InputFieldErrorText";
import { InputState } from "../register-form/types";
import { passwordValidationRegex } from "../register-form/utils/validation";

interface ChangePasswordProps {}

const { oldPasswordErrorMessage } = Localized.page.myProfile;
export const ChangePassword: React.FC<ChangePasswordProps> = ({}) => {
  const [passwordInput, setPasswordInput] = useState<InputState>({
    value: "",
    isFocused: false,
    error: null,
  });
  const [oldPasswordInput, setOldPasswordInput] = useState<InputState>({
    value: "",
    isFocused: false,
    error: null,
  });
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  return (
    <Fragment>
      <div className="md:flex md:space-x-4">
        <div className="md:w-1/3">
          <BaseInput
            data-cy="old-password-input"
            type={isPasswordShown ? "text" : "password"}
            className={`${!oldPasswordInput.error && "mb-3"} `}
            placeholder="Old password"
            label="Old password"
            required
            errorMessage={oldPasswordInput.error}
            hasError={!!oldPasswordInput.error}
            value={oldPasswordInput.value || ""}
            isFocused={oldPasswordInput.isFocused}
            onFocus={() =>
              setOldPasswordInput({ ...oldPasswordInput, isFocused: true })
            }
            onChange={(e) =>
              setOldPasswordInput({
                ...oldPasswordInput,
                value: e.target.value,
              })
            }
            onBlur={(e) => {
              const value = e.target.value.trim();
              if (value.length === 0) {
                return setOldPasswordInput({
                  ...oldPasswordInput,
                  isFocused: false,
                  error: oldPasswordErrorMessage,
                });
              }
              // no error
              return setOldPasswordInput({
                ...oldPasswordInput,
                isFocused: false,
                error: null,
              });
            }}
          />
          {oldPasswordInput.error && (
            <InputFieldErrorText isInputFocused={oldPasswordInput.isFocused}>
              {oldPasswordInput.error}
            </InputFieldErrorText>
          )}
        </div>
        <div className="md:w-1/3">
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
            onFocus={() =>
              setPasswordInput({ ...passwordInput, isFocused: true })
            }
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
        </div>

        <div className="md:w-1/3">
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
            onFocus={() =>
              setPasswordInput({ ...passwordInput, isFocused: true })
            }
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
        </div>
      </div>
      <div className="space-x-2 py-4 text-13 tracking-wide">
        {/* show password toggle */}
        <input
          onChange={(e) => setIsPasswordShown(e.target.checked)}
          type="checkbox"
          id="show-password"
          className="rounded-full w-5 h-5 checked:bg-black checked:text-black checked:ring-staytard-yellow checked:ring-2 focus:outline-none focus:ring-0 "
        />
        <label htmlFor="show-password">Show password</label>
      </div>
    </Fragment>
  );
};
