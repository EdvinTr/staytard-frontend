import { NextPage } from "next";
import Head from "next/head";
import { Fragment, useState } from "react";
import { AppHeader } from "../components/AppHeader";
import { BaseInput } from "../components/BaseInput";
import { FormContainer } from "../components/form/FormContainer";
import { APP_NAME } from "../constants";
import { Localized } from "../Localized";

interface InputState {
  value: null | string;
  isFocused: boolean;
  error: null | string;
}
const { firstNameFieldErrorMessage } = Localized.page.register;
const RegisterPage: NextPage = () => {
  const [firstNameInput, setFirstNameInput] = useState<InputState>({
    value: null,
    isFocused: false,
    error: null,
  });
  return (
    <Fragment>
      <Head>
        <title>{APP_NAME} - Register</title>
      </Head>
      <AppHeader />
      <FormContainer className="text-center">
        <div>
          <div className="space-y-6 pt-16">
            <h1 className="text-2xl">Register</h1>
            <h2 className="text-13">
              Fill in the information below to register an account with{" "}
              {APP_NAME}.
            </h2>
          </div>
          <form className="pt-4">
            <BaseInput
              type="text"
              placeholder="First name"
              label="First name"
              errorMessage={firstNameInput.error}
              hasError={!!firstNameInput.error}
              value={firstNameInput.value || ""}
              isFocused={firstNameInput.isFocused}
              onFocus={() =>
                setFirstNameInput({ ...firstNameInput, isFocused: true })
              }
              onChange={(e) => {
                setFirstNameInput({
                  ...firstNameInput,
                  value: e.target.value,
                });
              }}
              onBlur={(e) => {
                if (e.target.value.length === 0) {
                  setFirstNameInput({
                    ...firstNameInput,
                    isFocused: false,
                    error: firstNameFieldErrorMessage,
                  });
                } else {
                  setFirstNameInput({
                    ...firstNameInput,
                    isFocused: false,
                    error: null,
                  });
                }
              }}
            />
          </form>
        </div>
      </FormContainer>
    </Fragment>
  );
};

export default RegisterPage;
