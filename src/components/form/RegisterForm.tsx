import React, { useState } from "react";
import { Localized } from "../../Localized";
import { isCellPhoneNumber } from "../../utils/validation/isCellPhoneNumber";
import { BaseButton } from "../BaseButton";
import { BaseInput } from "../BaseInput";
import { InputFieldErrorText } from "../InputFieldErrorText";
import { InputState } from "./types";

interface RegisterFormProps {}

const {
  firstNameFieldErrorMessage,
  inputContainsNumberErrorMessage,
  addressValidationErrorMessage,
  addressFieldErrorMessage,
  zipCodeValidationErrorMessage,
  cityInputValidationErrorMessage,
  phoneNumberValidationErrorMessage,
} = Localized.page.register;

const containsLettersRegex = new RegExp(
  /^([\s'\-\.\/:A-Za-z\xC0-\xCB\xCC\xCD\xCF\xCE\xC9\xD1\xD6\xD8\xDA\xDC\xDD\xDE\xDF\xD9\xF9\xEC\xCD\xE0-\xEB\xED\xEE\xEF\xE9\xFF\xF0\xF1\xF3\xF6\xF8\xFA\xFC\xFD\xD5\xF5\xDB\xD0\xFB\xFB\xFE\xD2\xD3\xF2\xD4\xF4\xF3\u0178\u1E9E\u0105\u0104\u0107\u0106\u0119\u0118\u0142\u0141\u0144\u0143\u00f3\u00d3\u015b\u015a\u017a\u0179\u017c\u017b]){1,100}$/
);

const isAddressRegex = new RegExp(/^[a-zA-Z0-9\s]{1,36}$/);

const isZipCodeRegex = new RegExp(/^[0-9]{3,3}\ ?[0-9]{2,2}$/);

export const RegisterForm = ({}: RegisterFormProps) => {
  const [firstNameInput, setFirstNameInput] = useState<InputState>({
    value: null,
    isFocused: false,
    error: null,
  });
  const [lastNameInput, setLastNameInput] = useState<InputState>({
    value: null,
    isFocused: false,
    error: null,
  });
  const [addressInput, setAddressInput] = useState<InputState>({
    value: null,
    isFocused: false,
    error: null,
  });
  const [zipCodeInput, setZipCodeInput] = useState<InputState>({
    value: null,
    isFocused: false,
    error: null,
  });
  const [cityInput, setCityInput] = useState<InputState>({
    value: null,
    isFocused: false,
    error: null,
  });

  const [phoneNumberInput, setPhoneNumberInput] = useState<InputState>({
    value: null,
    isFocused: false,
    error: null,
  });
  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = [
      firstNameInput.error,
      lastNameInput.error,
      addressInput.error,
      zipCodeInput.error,
      phoneNumberInput.error,
      firstNameInput.error,
      lastNameInput.error,
    ].filter((error) => error);
    if (errors.length) {
      return;
    }
    console.log("is now valid form");
  };

  return (
    <form className="pt-4" onSubmit={onFormSubmit}>
      <div className="grid grid-cols-2 gap-x-3 ">
        {/* first name input */}
        <div>
          <BaseInput
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
          data-cy="last-name-error-message"
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
      <BaseButton type="submit" className="hover:bg-black hover:text-white ">
        Continue
      </BaseButton>
    </form>
  );
};
