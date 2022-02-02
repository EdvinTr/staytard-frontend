import React, { FormEvent, useState } from "react";
import { MeDocument, useUpdateUserAddressMutation } from "../../../lib/graphql";
import { Localized } from "../../../Localized";
import { BaseButton } from "../../global/BaseButton";
import {
  AddressInputField,
  CityInputField,
  ZipCodeInputField,
} from "../../register-form/RegisterForm";
import { InputState } from "../../register-form/types";

const { updateUserAddressErrorMessage } = Localized.page.checkout;

export const UpdateUserAddressInputGroup = () => {
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
  const [addressInput, setAddressInput] = useState<InputState>({
    value: "",
    isFocused: false,
    error: null,
  });
  const hasFieldErrors = () => {
    return [zipCodeInput, cityInput, addressInput].some((input) => input.error);
  };
  const [updateUserAddress, { loading: updateUserAddressLoading, client }] =
    useUpdateUserAddressMutation();

  const [isShowErrorMessage, setIsShowErrorMessage] = useState(false);

  const handleUpdateUserAddressSubmit = async (e: FormEvent) => {
    setIsShowErrorMessage(false);
    e.preventDefault();
    if (updateUserAddressLoading || hasFieldErrors()) {
      return;
    }
    try {
      const { data } = await updateUserAddress({
        variables: {
          input: {
            city: cityInput.value,
            postalCode: zipCodeInput.value,
            street: addressInput.value,
          },
        },
      });
      if (!data || !data.updateUserAddress) {
        throw new Error();
      }
      await client.refetchQueries({
        include: [MeDocument], // refetch current user data to get updated address
      });
    } catch (err) {
      setIsShowErrorMessage(true);
      console.log("Update user address error:", err);
    }
  };

  return (
    <form onSubmit={handleUpdateUserAddressSubmit} className="pt-4">
      <AddressInputField onChange={(state) => setAddressInput(state)} />

      <div className="grid grid-cols-2 gap-x-3 ">
        <div>
          <ZipCodeInputField onChange={(state) => setZipCodeInput(state)} />
        </div>
        <div>
          <CityInputField onChange={(state) => setCityInput(state)} />
        </div>
      </div>
      {isShowErrorMessage && (
        <span className="text-red-500 text-xs">
          {updateUserAddressErrorMessage}
        </span>
      )}
      <BaseButton type="submit" loading={updateUserAddressLoading}>
        Continue
      </BaseButton>
    </form>
  );
};
