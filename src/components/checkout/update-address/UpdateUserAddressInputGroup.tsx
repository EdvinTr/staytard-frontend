import React, { FormEvent, useState } from "react";
import { MeDocument, useUpdateUserAddressMutation } from "../../../lib/graphql";
import { BaseButton } from "../../global/BaseButton";
import {
  AddressInputField,
  CityInputField,
  ZipCodeInputField,
} from "../../register-form/RegisterForm";
import { InputState } from "../../register-form/types";

interface UpdateUserAddressInputGroupProps {}

export const UpdateUserAddressInputGroup: React.FC<
  UpdateUserAddressInputGroupProps
> = ({}) => {
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

  const handleUpdateUserAddressSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (updateUserAddressLoading || hasFieldErrors()) {
      return;
    }
    try {
      await updateUserAddress({
        variables: {
          input: {
            city: cityInput.value,
            postalCode: zipCodeInput.value,
            street: addressInput.value,
          },
        },
      });
      await client.refetchQueries({
        include: [MeDocument],
      });
    } catch (err) {
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
      <BaseButton type="submit" loading={updateUserAddressLoading}>
        Continue
      </BaseButton>
    </form>
  );
};
