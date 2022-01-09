import { useApolloClient } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { SpinnerCircularFixed } from "spinners-react";
import { APP_PAGE_ROUTE } from "../../constants";
import { useRegisterUserMutation } from "../../lib/graphql";
import { Localized } from "../../Localized";
import { setTokensInLocalStorage } from "../../utils/setTokensInLocalStorage";
import { isCellPhoneNumber } from "../../utils/validation/isCellPhoneNumber";
import { isEmailAddress } from "../../utils/validation/isEmailAddress";
import { BaseButton } from "../BaseButton";
import { BaseInput } from "../BaseInput";
import { InputFieldErrorText } from "../InputFieldErrorText";
import { InputState } from "./types";
import {
  containsLettersRegex,
  isAddressRegex,
  isZipCodeRegex,
  passwordValidationRegex,
} from "./utils/validation";

interface RegisterFormProps {}

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

export const RegisterForm = ({}: RegisterFormProps) => {
  const [emailInput, setEmailInput] = useState<InputState>({
    value: "",
    isFocused: false,
    error: null,
  });
  const [passwordInput, setPasswordInput] = useState<InputState>({
    value: "",
    isFocused: false,
    error: null,
  });

  const [firstNameInput, setFirstNameInput] = useState<InputState>({
    value: "",
    isFocused: false,
    error: null,
  });
  const [lastNameInput, setLastNameInput] = useState<InputState>({
    value: "",
    isFocused: false,
    error: null,
  });
  const [addressInput, setAddressInput] = useState<InputState>({
    value: "",
    isFocused: false,
    error: null,
  });
  const [zipCodeInput, setZipCodeInput] = useState<InputState>({
    value: "",
    isFocused: false,
    error: null,
  });
  const [cityInput, setCityInput] = useState<InputState>({
    value: "",
    isFocused: false,
    error: null,
  });

  const [phoneNumberInput, setPhoneNumberInput] = useState<InputState>({
    value: "",
    isFocused: false,
    error: null,
  });
  const apolloClient = useApolloClient();
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const router = useRouter();
  const [
    registerUser,
    { loading: isRegisterUserLoading, error: registerUserError },
  ] = useRegisterUserMutation();
  const onFormSubmit = async (e: React.FormEvent) => {
    if (formHasErrors()) {
      return;
    }
    if (isRegisterUserLoading) {
      return; // prevent spam
    }
    try {
      await apolloClient.resetStore();
      const { data } = await registerUser({
        variables: {
          input: {
            email: emailInput.value,
            password: passwordInput.value,
            firstName: firstNameInput.value,
            lastName: lastNameInput.value,
            street: addressInput.value,
            postalCode: zipCodeInput.value,
            city: cityInput.value,
            mobilePhoneNumber: phoneNumberInput.value,
          },
        },
      });
      if (!data || !data.registerUser) {
        throw new Error();
      }
      const { accessToken, refreshToken } = data.registerUser;
      setTokensInLocalStorage({ accessToken, refreshToken });
      router.push(APP_PAGE_ROUTE.INDEX);
    } catch (err) {
      console.log(err);
    }
  };

  const formHasErrors = (): boolean => {
    return (
      [
        emailInput.error,
        passwordInput.error,
        firstNameInput.error,
        lastNameInput.error,
        addressInput.error,
        zipCodeInput.error,
        phoneNumberInput.error,
      ].filter((error) => error).length > 0
    );
  };

  return (
    <form className="pt-4" onSubmit={onFormSubmit}>
      {/* email input */}
      <BaseInput
        data-cy="email-input"
        type="email"
        className={`${!emailInput.error && "mb-3"} `}
        placeholder="E-mail"
        label="E-mail"
        required
        errorMessage={emailInput.error}
        hasError={!!emailInput.error}
        value={emailInput.value || ""}
        isFocused={emailInput.isFocused}
        onFocus={() => setEmailInput({ ...emailInput, isFocused: true })}
        onChange={(e) =>
          setEmailInput({
            ...emailInput,
            value: e.target.value,
          })
        }
        onBlur={(e) => {
          const value = e.target.value.trim();
          if (value.length === 0) {
            return setEmailInput({
              ...emailInput,
              isFocused: false,
              error: emailInputErrorMessage,
            });
          }
          // check length and if it contains only letters
          if (!isEmailAddress(value)) {
            return setEmailInput({
              ...emailInput,
              isFocused: false,
              error: emailInputErrorMessage,
            });
          }
          // no error
          return setEmailInput({
            ...emailInput,
            isFocused: false,
            error: null,
          });
        }}
      />
      {emailInput.error && (
        <InputFieldErrorText
          data-cy="email-error-message"
          isInputFocused={emailInput.isFocused}
        >
          {emailInput.error}
        </InputFieldErrorText>
      )}
      {/* password input */}
      <div className="relative">
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
                error: passwordInputErrorMessage,
              });
            }
            // validate against regex
            if (!passwordValidationRegex.test(value)) {
              return setPasswordInput({
                ...passwordInput,
                isFocused: false,
                error: passwordInputErrorMessage,
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
        <button
          type="button"
          onClick={() => setIsPasswordShown(!isPasswordShown)}
          className="absolute top-4 right-10 text-13 font-light"
        >
          {isPasswordShown ? "Hide" : "Show"}
        </button>
      </div>
      {/* grid */}
      <div className="grid grid-cols-2 gap-x-3 ">
        {/* first name input */}
        <div>
          <BaseInput
            data-cy="first-name-input"
            type="text"
            className={`${!firstNameInput.error && "mb-3"} `}
            placeholder="First name"
            label="First name"
            required
            errorMessage={firstNameInput.error}
            hasError={!!firstNameInput.error}
            value={firstNameInput.value || ""}
            isFocused={firstNameInput.isFocused}
            onFocus={() =>
              setFirstNameInput({ ...firstNameInput, isFocused: true })
            }
            onChange={(e) =>
              setFirstNameInput({
                ...firstNameInput,
                value: e.target.value,
              })
            }
            onBlur={(e) => {
              const value = e.target.value.trim();
              if (value.length === 0) {
                return setFirstNameInput({
                  ...firstNameInput,
                  isFocused: false,
                  error: firstNameFieldErrorMessage,
                });
              }
              // check length and if it contains only letters
              if (!containsLettersRegex.test(value)) {
                return setFirstNameInput({
                  ...firstNameInput,
                  isFocused: false,
                  error: inputContainsNumberErrorMessage,
                });
              }
              // no error
              return setFirstNameInput({
                ...firstNameInput,
                isFocused: false,
                error: null,
              });
            }}
          />
          {firstNameInput.error && (
            <InputFieldErrorText
              data-cy="first-name-error-message"
              isInputFocused={firstNameInput.isFocused}
            >
              {firstNameInput.error}
            </InputFieldErrorText>
          )}
        </div>
        {/* last name input */}
        <div>
          <BaseInput
            data-cy="last-name-input"
            type="text"
            placeholder="Last name"
            required
            label="Last name"
            errorMessage={lastNameInput.error}
            hasError={!!lastNameInput.error}
            value={lastNameInput.value || ""}
            isFocused={lastNameInput.isFocused}
            onFocus={() =>
              setLastNameInput({ ...lastNameInput, isFocused: true })
            }
            onChange={(e) =>
              setLastNameInput({
                ...lastNameInput,
                value: e.target.value,
              })
            }
            onBlur={(e) => {
              const value = e.target.value.trim();
              if (value.length === 0) {
                return setLastNameInput({
                  ...lastNameInput,
                  isFocused: false,
                  error: firstNameFieldErrorMessage,
                });
                // check length and if it contains only letters
              }
              if (!containsLettersRegex.test(value)) {
                return setLastNameInput({
                  ...lastNameInput,
                  isFocused: false,
                  error: inputContainsNumberErrorMessage,
                });
              }
              // no error
              return setLastNameInput({
                ...lastNameInput,
                isFocused: false,
                error: null,
              });
            }}
          />
          {lastNameInput.error && (
            <InputFieldErrorText
              data-cy="last-name-error-message"
              isInputFocused={lastNameInput.isFocused}
            >
              {lastNameInput.error}
            </InputFieldErrorText>
          )}
        </div>
      </div>
      {/* address input */}
      <BaseInput
        type="text"
        data-cy="address-input"
        placeholder="Address"
        className={`${!addressInput.error && "mb-3"} `}
        required
        label="Address"
        errorMessage={addressInput.error}
        hasError={!!addressInput.error}
        value={addressInput.value || ""}
        isFocused={addressInput.isFocused}
        onFocus={() => setAddressInput({ ...addressInput, isFocused: true })}
        onChange={(e) =>
          setAddressInput({
            ...addressInput,
            value: e.target.value,
          })
        }
        onBlur={(e) => {
          const value = e.target.value.trim();
          if (value.length === 0) {
            return setAddressInput({
              ...addressInput,
              isFocused: false,
              error: addressFieldErrorMessage,
            });
          }

          if (!isAddressRegex.test(value)) {
            return setAddressInput({
              ...addressInput,
              isFocused: false,
              error: addressValidationErrorMessage,
            });
          }
          // no error
          return setAddressInput({
            ...addressInput,
            isFocused: false,
            error: null,
          });
        }}
      />
      {addressInput.error && (
        <InputFieldErrorText
          data-cy="address-error-message"
          isInputFocused={addressInput.isFocused}
        >
          {addressInput.error}
        </InputFieldErrorText>
      )}
      <div>
        <div className="grid grid-cols-2 gap-x-3 ">
          {/* zip code input */}
          <div>
            <BaseInput
              type="text"
              data-cy="zip-code-input"
              placeholder="ZIP code"
              required
              label="ZIP code"
              errorMessage={zipCodeInput.error}
              hasError={!!zipCodeInput.error}
              value={zipCodeInput.value || ""}
              isFocused={zipCodeInput.isFocused}
              onFocus={() =>
                setZipCodeInput({ ...zipCodeInput, isFocused: true })
              }
              onChange={(e) =>
                setZipCodeInput({
                  ...zipCodeInput,
                  value: e.target.value.trim(),
                })
              }
              onBlur={(e) => {
                const value = e.target.value.trim();
                if (value.length === 0) {
                  return setZipCodeInput({
                    ...zipCodeInput,
                    isFocused: false,
                    error: zipCodeValidationErrorMessage,
                  });
                }

                if (!isZipCodeRegex.test(value)) {
                  return setZipCodeInput({
                    ...zipCodeInput,
                    isFocused: false,
                    error: zipCodeValidationErrorMessage,
                  });
                }
                // no error
                return setZipCodeInput({
                  ...zipCodeInput,
                  isFocused: false,
                  error: null,
                });
              }}
            />
            {zipCodeInput.error && (
              <InputFieldErrorText
                data-cy="zip-code-error-message"
                isInputFocused={zipCodeInput.isFocused}
              >
                {zipCodeInput.error}
              </InputFieldErrorText>
            )}
          </div>
          {/* city input */}
          <div>
            <BaseInput
              type="text"
              placeholder="City"
              data-cy="city-input"
              className={`${!cityInput.error && "mb-3"} `}
              required
              label="City"
              errorMessage={cityInput.error}
              hasError={!!cityInput.error}
              value={cityInput.value || ""}
              isFocused={cityInput.isFocused}
              onFocus={() => setCityInput({ ...cityInput, isFocused: true })}
              onChange={(e) =>
                setCityInput({
                  ...cityInput,
                  value: e.target.value.trim(),
                })
              }
              onBlur={(e) => {
                const value = e.target.value.trim();
                if (value.length === 0) {
                  return setCityInput({
                    ...cityInput,
                    isFocused: false,
                    error: cityInputValidationErrorMessage,
                  });
                }
                // check it contains only letters
                if (!containsLettersRegex.test(value)) {
                  return setCityInput({
                    ...cityInput,
                    isFocused: false,
                    error: cityInputValidationErrorMessage,
                  });
                }
                // no error
                return setCityInput({
                  ...cityInput,
                  isFocused: false,
                  error: null,
                });
              }}
            />
            {cityInput.error && (
              <InputFieldErrorText
                data-cy="city-error-message"
                isInputFocused={cityInput.isFocused}
              >
                {cityInput.error}
              </InputFieldErrorText>
            )}
          </div>
        </div>

        {/* phone number input */}
        <BaseInput
          type="tel"
          placeholder="Mobile number"
          data-cy="phone-number-input"
          required
          label="Mobile number"
          errorMessage={phoneNumberInput.error}
          hasError={!!phoneNumberInput.error}
          value={phoneNumberInput.value || ""}
          isFocused={phoneNumberInput.isFocused}
          onFocus={() =>
            setPhoneNumberInput({ ...phoneNumberInput, isFocused: true })
          }
          onChange={(e) =>
            setPhoneNumberInput({
              ...phoneNumberInput,
              value: e.target.value.trim(),
            })
          }
          onBlur={(e) => {
            const value = e.target.value.trim();
            if (value.length === 0) {
              return setPhoneNumberInput({
                ...phoneNumberInput,
                isFocused: false,
                error: phoneNumberValidationErrorMessage,
              });
            }
            // check is cell phone number
            if (!isCellPhoneNumber(value)) {
              return setPhoneNumberInput({
                ...phoneNumberInput,
                isFocused: false,
                error: phoneNumberValidationErrorMessage,
              });
            }
            // no error
            return setPhoneNumberInput({
              ...phoneNumberInput,
              isFocused: false,
              error: null,
            });
          }}
        />
        {phoneNumberInput.error && (
          <InputFieldErrorText
            data-cy="cell-phone-error-message"
            isInputFocused={phoneNumberInput.isFocused}
          >
            {phoneNumberInput.error}
          </InputFieldErrorText>
        )}
      </div>
      {registerUserError && (
        <div className="text-red-600 text-13 bg-red-50 p-4 mt-4">
          <div data-cy="registration-failed-error">
            {registerUserError.message}
          </div>
        </div>
      )}
      <BaseButton
        data-cy="submit-button"
        type="submit"
        className={`hover:bg-black hover:text-white ${
          isRegisterUserLoading ? "" : "hover:bg-black hover:text-white "
        } `}
      >
        {isRegisterUserLoading ? (
          <SpinnerCircularFixed
            data-cy="login-button-spinner"
            size={30}
            thickness={80}
            speed={300}
            color="rgba(0,0,0,1)"
            secondaryColor="rgba(172, 57, 57, 0)"
            className="inline"
          />
        ) : (
          "Continue"
        )}
      </BaseButton>
    </form>
  );
};
