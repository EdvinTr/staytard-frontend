import { useWindowWidth } from "@react-hook/window-size";
import React, { FormEvent, Fragment, useState } from "react";
import { toast, ToastContainer } from "react-toast";
import { useSsrCompatible } from "../../hooks/useSsrCompatible";
import {
  HasPasswordDocument,
  useHasPasswordQuery,
  useUpdatePasswordMutation,
} from "../../lib/graphql";
import { Localized } from "../../Localized";
import { BaseInput } from "../global/BaseInput";
import { InputFieldErrorText } from "../global/InputFieldErrorText";
import { InputState } from "../register-form/types";
import { passwordValidationRegex } from "../register-form/utils/validation";
import { EditForm } from "./EditForm";

interface ChangePasswordProps {}

const {
  oldPasswordErrorMessage,
  confirmPasswordErrorMessage,
  newPasswordErrorMessage,
  updatePasswordSuccessMessage,
} = Localized.page.myProfile;
export const ChangePassword: React.FC<ChangePasswordProps> = ({}) => {
  const currentWindowWidth = useSsrCompatible(useWindowWidth(), 0);
  const showSuccessToast = (): void =>
    toast.success(updatePasswordSuccessMessage, {
      backgroundColor: "black",
      color: "white",
    });

  const { data } = useHasPasswordQuery();

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

  const resetFormInputs = () => {
    setNewPasswordInput((cur) => ({ ...cur, value: "" }));
    setOldPasswordInput((cur) => ({ ...cur, value: "" }));
    setConfirmPasswordInput((cur) => ({ ...cur, value: "" }));
  };

  const [updatePassword, { loading: updatePasswordLoading, client, error }] =
    useUpdatePasswordMutation();

  const [isFormChildrenVisible, setIsFormChildrenVisible] = useState(false);
  const onUpdatePasswordSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { value: oldPassword } = oldPasswordInput;
    const { value: newPassword } = newPasswordInput;
    const { value: confirmPassword } = confirmPasswordInput;
    if (newPassword !== confirmPassword) {
      return;
    }
    try {
      if (oldPassword) {
        // user has old password and wants to update it with new password
        await updatePassword({
          variables: {
            input: {
              newPassword,
              oldPassword,
            },
          },
        });
      } else {
        // user has no old password since he must have signed up through OAuth
        await updatePassword({
          variables: {
            input: {
              newPassword,
            },
          },
        });
      }
      await client.refetchQueries({
        include: [HasPasswordDocument],
      });
      showSuccessToast();
      setIsFormChildrenVisible(true); // force form to react to props change, yes, it is ugly
      setIsFormChildrenVisible(false);
      resetFormInputs();
    } catch {
    } finally {
      setTimeout(() => {
        toast.hideAll();
      }, 5000);
    }
  };
  return (
    <Fragment>
      <EditForm
        label="Password"
        onSubmit={onUpdatePasswordSubmit}
        error={error?.message}
        loading={updatePasswordLoading}
        showChildren={isFormChildrenVisible}
      >
        <Fragment>
          <div className="md:flex md:space-x-4">
            {data?.hasPassword && (
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
                    setOldPasswordInput({
                      ...oldPasswordInput,
                      isFocused: true,
                    })
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
                  <InputFieldErrorText
                    isInputFocused={oldPasswordInput.isFocused}
                  >
                    {oldPasswordInput.error}
                  </InputFieldErrorText>
                )}
              </div>
            )}
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
      </EditForm>
      <ToastContainer
        position={currentWindowWidth <= 768 ? "bottom-center" : "top-right"}
      />
    </Fragment>
  );
};
