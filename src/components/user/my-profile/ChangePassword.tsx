import { useWindowWidth } from "@react-hook/window-size";
import { ErrorMessage, Form, Formik } from "formik";
import React, { Fragment, useState } from "react";
import { toast, ToastContainer } from "react-toast";
import * as Yup from "yup";
import { useSsrCompatible } from "../../../hooks/useSsrCompatible";
import {
  HasPasswordDocument,
  useHasPasswordQuery,
  useUpdatePasswordMutation,
} from "../../../lib/graphql";
import { Localized } from "../../../Localized";
import { passwordValidation } from "../../../utils/validation/userValidationSchema";
import { BaseButton } from "../../global/BaseButton";
import { CustomInputField } from "../../global/CustomInputField";
import { MyCheckbox } from "../../global/MyCheckbox";

const { passwordInputErrorMessage } = Localized.page.register;

const updatePasswordValidationSchema = Yup.object().shape({
  newPassword: passwordValidation
    .required(passwordInputErrorMessage)
    .min(8, passwordInputErrorMessage),
  confirmPassword: passwordValidation
    .required(passwordInputErrorMessage)
    .min(8, passwordInputErrorMessage),
});

const { updatePasswordSuccessMessage } = Localized.page.myProfile;

interface FormValues {
  oldPassword?: string;
  newPassword: string;
  confirmPassword: string;
}

const validateConfirmPassword = (oldPassword: string, newPassword: string) => {
  if (oldPassword === newPassword) {
    return "";
  }
  return "Your passwords are different. Try again.";
};
const showSuccessToast = () =>
  toast.success(updatePasswordSuccessMessage, {
    backgroundColor: "black",
    color: "white",
  });

export const ChangePassword = () => {
  const [toggleForm, setToggleForm] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);

  const currentWindowWidth = useSsrCompatible(useWindowWidth(), 0);
  const { data: hasPassword } = useHasPasswordQuery();
  const [updatePassword, { client, error }] = useUpdatePasswordMutation();
  return (
    <Fragment>
      <Formik
        validationSchema={updatePasswordValidationSchema}
        validateOnBlur={true}
        initialValues={{
          confirmPassword: "",
          newPassword: "",
          oldPassword: hasPassword?.hasPassword ? "" : undefined,
        }}
        onSubmit={async (
          { oldPassword, newPassword }: FormValues,
          { setSubmitting, resetForm, setFieldValue }
        ) => {
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
            setFieldValue("oldPassword", "", false);
            resetForm();
            setToggleForm(false);
          } catch {
          } finally {
            setTimeout(() => {
              toast.hideAll();
            }, 5000);
            setSubmitting(false);
          }
        }}
      >
        {({ values, errors, isSubmitting, touched }) => {
          return (
            <Form
              className={`mx-auto mt-8 max-w-3xl border px-6 py-4 shadow-sm ${
                toggleForm ? "border-t-app-yellow border-t-4" : ""
              }`}
            >
              <div className="flex items-center justify-between border-b border-black border-opacity-10 py-4">
                <div className="text-sm font-bold uppercase">Password</div>
                {!toggleForm && (
                  <BaseButton
                    variant="outline"
                    type="button"
                    onClick={() => setToggleForm(true)}
                  >
                    Update
                  </BaseButton>
                )}
              </div>
              {toggleForm && (
                <div className="mt-4">
                  <div className="border-b border-black border-opacity-10">
                    <div className="md:flex md:space-x-4">
                      {hasPassword?.hasPassword && (
                        <div className="md:w-1/3">
                          <CustomInputField
                            name="oldPassword"
                            type={isShowPassword ? "text" : "password"}
                            className={`${errors.oldPassword && "mb-2"} `}
                            placeholder="Old password"
                            label="Old password"
                            aria-label="Old password"
                            value={values.oldPassword}
                            errorMessage={errors.oldPassword}
                            hasError={
                              !!errors.oldPassword && touched.oldPassword
                            }
                          />
                        </div>
                      )}
                      <div className="md:w-1/3">
                        <CustomInputField
                          name="newPassword"
                          type={isShowPassword ? "text" : "password"}
                          className={`${errors.newPassword && "mb-2"} `}
                          placeholder="New password"
                          label="New password"
                          aria-label="New password"
                          errorMessage={errors.newPassword}
                          hasError={!!errors.newPassword && touched.newPassword}
                          value={values.newPassword}
                        />
                        <ErrorMessage name="newPassword">
                          {(msg) => (
                            <div className=" text-[11px] text-red-600">
                              {msg}
                            </div>
                          )}
                        </ErrorMessage>
                      </div>
                      <div className="md:w-1/3">
                        <CustomInputField
                          name="confirmPassword"
                          type={isShowPassword ? "text" : "password"}
                          className={`${errors.confirmPassword && "mb-2"} `}
                          placeholder="Confirm password"
                          label="Confirm password"
                          aria-label="Confirm password"
                          errorMessage={errors.confirmPassword}
                          hasError={
                            !!errors.confirmPassword && touched.confirmPassword
                          }
                          validate={(value) => {
                            return validateConfirmPassword(
                              values.newPassword,
                              value
                            );
                          }}
                          value={values.confirmPassword}
                        />
                        <ErrorMessage name="confirmPassword">
                          {(msg) => (
                            <div className=" text-[11px] text-red-600">
                              {msg}
                            </div>
                          )}
                        </ErrorMessage>
                      </div>
                    </div>
                    <div className="text-13 mt-6 flex items-center space-x-2 py-4 tracking-wide">
                      {/* show password toggle */}
                      <MyCheckbox
                        onChange={(e) => setIsShowPassword(e.target.checked)}
                        id="show-password"
                      />
                      <label
                        htmlFor="show-password"
                        className="cursor-pointer select-none  "
                      >
                        Show password
                      </label>
                    </div>
                  </div>
                  {/* server response error */}
                  {error && (
                    <div className="text-app-red pt-4 text-xs">
                      {error.message}
                    </div>
                  )}
                  {/* submit / cancel buttons */}
                  <div className="space-x-2 pt-4">
                    <BaseButton type="submit" loading={isSubmitting}>
                      Save
                    </BaseButton>
                    <BaseButton
                      type="button"
                      variant="outline"
                      onClick={() => setToggleForm(false)}
                    >
                      Cancel
                    </BaseButton>
                  </div>
                </div>
              )}
            </Form>
          );
        }}
      </Formik>
      <ToastContainer
        position={currentWindowWidth <= 768 ? "bottom-center" : "bottom-left"}
      />
    </Fragment>
  );
};
