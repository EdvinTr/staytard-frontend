import { Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import {
  MeDocument,
  UpdateUserAddressInput,
  useUpdateUserAddressMutation,
} from "../../../lib/graphql";
import { Localized } from "../../../Localized";
import {
  cityValidation,
  postalCodeValidation,
  streetAddressValidation,
} from "../../../utils/validation/userValidationSchema";
import { BaseButton } from "../../global/BaseButton";
import { CustomInputField } from "../../global/CustomInputField";
import { InputFieldErrorText } from "../../global/InputFieldErrorText";

const { updateUserAddressErrorMessage } = Localized.page.checkout;

const validationSchema = Yup.object().shape({
  street: streetAddressValidation,
  city: cityValidation,
  postalCode: postalCodeValidation,
});

const hasFieldError = (value?: string): string => {
  return `${
    value
      ? "border-red-600 placeholder:text-red-600 focus:placeholder:text-sm"
      : "mb-3"
  } text-xs placeholder:text-xs`;
};

interface UpdateUserAddressInputGroupProps {
  containerClassName?: string;
}

export const UpdateUserAddressInputGroup = ({
  containerClassName,
}: UpdateUserAddressInputGroupProps) => {
  const [focusedInput, setFocusedInput] = useState<
    keyof UpdateUserAddressInput | null
  >(null);
  const [updateUserAddress, { client, error }] = useUpdateUserAddressMutation();
  return (
    <Formik
      initialValues={{
        street: "",
        city: "",
        postalCode: "",
      }}
      validateOnBlur
      validationSchema={validationSchema}
      onSubmit={async (values: UpdateUserAddressInput, { setSubmitting }) => {
        try {
          const { data } = await updateUserAddress({
            variables: {
              input: {
                ...values,
              },
            },
          });
          if (!data || !data.updateUserAddress) {
            throw new Error();
          }
          await client.refetchQueries({
            include: [MeDocument], // refetch current user data to get updated address
          });
        } catch {
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ values, errors, touched, isSubmitting }) => {
        return (
          <Form className={`${containerClassName ? containerClassName : ""}`}>
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
            {error && (
              <span className="block pt-2 pb-4 text-xs text-red-500">
                {updateUserAddressErrorMessage}
              </span>
            )}
            <BaseButton
              type="submit"
              disabled={isSubmitting}
              loading={isSubmitting}
            >
              Continue
            </BaseButton>
          </Form>
        );
      }}
    </Formik>
  );
};
