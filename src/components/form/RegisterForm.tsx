import React, { useState } from "react";
import { Localized } from "../../Localized";
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

  return (
    <form className="pt-4">
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
        <div className="grid grid-cols-2 gap-x-3 ">{/* zip code input */}</div>
      </div>
      <BaseButton type="submit" className="hover:bg-black hover:text-white ">
        Continue
      </BaseButton>
    </form>
  );
};
