import React, { Fragment, useState } from "react";
import { Localized } from "../../Localized";
import { BaseInput } from "../global/BaseInput";
import { InputFieldErrorText } from "../global/InputFieldErrorText";
import { InputState } from "../register-form/types";
import { passwordValidationRegex } from "../register-form/utils/validation";

interface ChangePasswordProps {}

const {
  oldPasswordErrorMessage,
  confirmPasswordErrorMessage,
  newPasswordErrorMessage,
} = Localized.page.myProfile;
export const ChangePassword: React.FC<ChangePasswordProps> = ({}) => {
  const [newPasswordInput, setNewPasswordInput] = useState<InputState>({
    value: "",
    isFocused: false,
    error: null,
  });
  const [oldPasswordInput, setOldPasswordInput] = useState<InputState>({
    value: "",
    isFocused: false,
    error: null,
  });
  const [confirmPasswordInput, setConfirmPasswordInput] = useState<InputState>({
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
            data-cy="new-password-input"
            type={isPasswordShown ? "text" : "password"}
            className={`${!newPasswordInput.error && "mb-3"} `}
            placeholder="New password"
            label="New password"
            required
            errorMessage={newPasswordInput.error}
            hasError={!!newPasswordInput.error}
            value={newPasswordInput.value || ""}
            isFocused={newPasswordInput.isFocused}
            onFocus={() =>
              setNewPasswordInput({ ...newPasswordInput, isFocused: true })
            }
            onChange={(e) =>
              setNewPasswordInput({
                ...newPasswordInput,
                value: e.target.value,
              })
            }
            onBlur={(e) => {
              const value = e.target.value.trim();
              if (value.length === 0) {
                return setNewPasswordInput({
                  ...newPasswordInput,
                  isFocused: false,
                  error: newPasswordErrorMessage,
                });
              }
              // validate against regex
              if (!passwordValidationRegex.test(value)) {
                return setNewPasswordInput({
                  ...newPasswordInput,
                  isFocused: false,
                  error: newPasswordErrorMessage,
                });
              }
              // no error
              return setNewPasswordInput({
                ...newPasswordInput,
                isFocused: false,
                error: null,
              });
            }}
          />
          {newPasswordInput.error && (
            <InputFieldErrorText
              data-cy="new-password-error-message"
              isInputFocused={newPasswordInput.isFocused}
            >
              {newPasswordInput.error}
            </InputFieldErrorText>
          )}
        </div>

        <div className="md:w-1/3">
          {/* confirm password input */}
          <BaseInput
            data-cy="confirm-password-input"
            type={isPasswordShown ? "text" : "password"}
            className={`${!confirmPasswordInput.error && "mb-3"} `}
            placeholder="Confirm password"
            label="Confirm password"
            required
            errorMessage={confirmPasswordInput.error}
            hasError={!!confirmPasswordInput.error}
            value={confirmPasswordInput.value || ""}
            isFocused={confirmPasswordInput.isFocused}
            onFocus={() =>
              setConfirmPasswordInput({
                ...confirmPasswordInput,
                isFocused: true,
              })
            }
            onChange={(e) =>
              setConfirmPasswordInput({
                ...confirmPasswordInput,
                value: e.target.value,
              })
            }
            onBlur={(e) => {
              const value = e.target.value;
              if (value !== newPasswordInput.value) {
                return setConfirmPasswordInput({
                  ...confirmPasswordInput,
                  isFocused: false,
                  error: confirmPasswordErrorMessage,
                });
              }
              // no error
              return setConfirmPasswordInput({
                ...confirmPasswordInput,
                isFocused: false,
                error: null,
              });
            }}
          />
          {confirmPasswordInput.error && (
            <InputFieldErrorText
              data-cy="confirm-password-error-message"
              isInputFocused={confirmPasswordInput.isFocused}
            >
              {confirmPasswordInput.error}
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
