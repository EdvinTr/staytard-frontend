import { useWindowWidth } from "@react-hook/window-size";
import { ErrorMessage, Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toast";
import {
  ADMIN_PAGE_QUERY_KEY,
  ADMIN_SUB_PAGE_ROUTE,
  APP_PAGE_ROUTE,
  successToastColors,
} from "../../../../../constants";
import {
  UpdateUserInput,
  useAdminDeleteUserMutation,
  useAdminUpdateUserMutation,
  User,
} from "../../../../../lib/graphql";
import { Localized } from "../../../../../Localized";
import { updateUserValidationSchema } from "../../../../../utils/validation/userValidationSchema";
import { BaseButton } from "../../../../global/BaseButton";
import { BaseInput } from "../../../../global/BaseInput";
import { CustomInputField } from "../../../../global/CustomInputField";
import { DeleteButton } from "../../../../global/DeleteButton";
import { ConfirmDeletionModal } from "../../components/ConfirmDeletionModal";
import {
  BasicInputLabel,
  DisabledInput,
} from "../../products/edit/EditProductView";

interface EditUserViewProps {
  user: User;
}

interface FormValues extends UpdateUserInput {}

const { updateUserSuccessMessage } = Localized.page.admin;
export const EditUserView: React.FC<EditUserViewProps> = ({ user }) => {
  const [adminPassword, setAdminPassword] = useState("");
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);

  const showSuccessToast = (): void =>
    toast.success(updateUserSuccessMessage, {
      ...successToastColors,
    });
  const currentWindowWidth = useWindowWidth();
  const router = useRouter();

  const [updateUser, { error: updateUserError }] = useAdminUpdateUserMutation({
    notifyOnNetworkStatusChange: true,
  });
  const [deleteUser, { error: deleteUserError, loading: deleteUserLoading }] =
    useAdminDeleteUserMutation({ notifyOnNetworkStatusChange: true });
  return (
    <div>
      <div className="flex items-center justify-between pb-10">
        <h2 className="text-2xl font-medium">General information</h2>
        <DeleteButton
          onClick={() => setIsConfirmDeleteModalOpen(true)}
          aria-label="Open delete user confirmation modal"
        />
        <ConfirmDeletionModal
          heading={`Are you sure you want to delete "${user.firstName} ${user.lastName}"?`}
          loading={deleteUserLoading}
          onClose={() => setIsConfirmDeleteModalOpen(false)}
          show={isConfirmDeleteModalOpen}
          onDelete={async () => {
            try {
              const { data } = await deleteUser({
                variables: {
                  input: {
                    password: adminPassword,
                    userId: user.id,
                  },
                },
              });
              if (!data || !data.deleteUser) {
                throw new Error();
              }
              // navigate to users list
              const usersListRoute = `${APP_PAGE_ROUTE.ADMIN}?${ADMIN_PAGE_QUERY_KEY.SHOW}=${ADMIN_SUB_PAGE_ROUTE.USERS}`;
              router.push(usersListRoute);
            } catch {}
          }}
          error={deleteUserError?.message}
        >
          <div className="space-y-2 pb-8 lg:w-1/2">
            <BasicInputLabel htmlFor="password">Your password</BasicInputLabel>
            <BaseInput
              id="password"
              aria-label="Password"
              name="password"
              type="password"
              label="Password"
              value={adminPassword}
              hasError={false}
              onChange={(e) => setAdminPassword(e.target.value)}
              placeholder="Password"
              autoComplete="off"
            />
          </div>
        </ConfirmDeletionModal>
      </div>
      <div className="space-y-6">
        <div>
          <div className="w-full">
            <BasicInputLabel htmlFor="userId">User ID</BasicInputLabel>
            <DisabledInput name="userId" value={user.id} />
          </div>
        </div>
      </div>
      <Formik
        validationSchema={updateUserValidationSchema}
        onSubmit={async (values: FormValues, { setSubmitting }) => {
          try {
            const { data } = await updateUser({
              variables: {
                input: {
                  ...values,
                },
              },
            });
            if (!data || !data.updateUser) {
              throw new Error();
            }
            showSuccessToast();
          } catch (e) {
            console.log(e);
          } finally {
            setSubmitting(false);
            setTimeout(() => {
              toast.hideAll();
            }, 5000);
          }
        }}
        initialValues={{
          userId: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          street: user.address?.street || "",
          city: user.address?.city || "",
          postalCode: user.address?.postalCode || "",
          mobilePhoneNumber: user.mobilePhoneNumber || "",
        }}
      >
        {({ values, errors, isSubmitting, touched }) => {
          return (
            <Form>
              <div className="space-y-6 pt-6">
                <InputGroupContainer>
                  <div className="w-full space-y-2">
                    <CustomInputField
                      id="firstName"
                      aria-label="First name"
                      name="firstName"
                      type="text"
                      label="First name"
                      value={values.firstName}
                      hasError={!!errors.firstName && touched.firstName}
                      placeholder="First name"
                      autoComplete="off"
                    />
                    <ErrorMessage name="firstName">
                      {(msg) => (
                        <div className={`text-[11px] text-red-600`}>{msg}</div>
                      )}
                    </ErrorMessage>
                  </div>
                  <div className="w-full space-y-2">
                    <CustomInputField
                      id="lastName"
                      name="lastName"
                      aria-label="Last name"
                      type="text"
                      label="Last name"
                      value={values.lastName}
                      hasError={!!errors.lastName && touched.lastName}
                      placeholder="Last name"
                      autoComplete="off"
                    />
                    <ErrorMessage name="lastName">
                      {(msg) => (
                        <div className={`text-[11px] text-red-600`}>{msg}</div>
                      )}
                    </ErrorMessage>
                  </div>
                </InputGroupContainer>
                <InputGroupContainer>
                  <div className="w-full space-y-2">
                    <CustomInputField
                      id="mobilePhoneNumber"
                      name="mobilePhoneNumber"
                      aria-label="Mobile phone number"
                      type="text"
                      label="Mobile number"
                      value={values.mobilePhoneNumber}
                      hasError={
                        !!errors.mobilePhoneNumber && touched.mobilePhoneNumber
                      }
                      placeholder="Mobile number"
                      autoComplete="off"
                    />
                    <ErrorMessage name="mobilePhoneNumber">
                      {(msg) => (
                        <div className={`text-[11px] text-red-600`}>{msg}</div>
                      )}
                    </ErrorMessage>
                  </div>
                  <div className="w-full space-y-2">
                    <CustomInputField
                      id="email"
                      name="email"
                      aria-label="Email"
                      type="email"
                      label="Email"
                      value={values.email}
                      hasError={!!errors.email && touched.email}
                      placeholder="Email"
                      autoComplete="off"
                    />
                    <ErrorMessage name="email">
                      {(msg) => (
                        <div className={`text-[11px] text-red-600`}>{msg}</div>
                      )}
                    </ErrorMessage>
                  </div>
                </InputGroupContainer>
                <div>
                  <h3 className="pb-4 pt-2 text-xl font-semibold">Address</h3>
                  <div className="space-y-6">
                    <div className="w-full space-y-2">
                      <CustomInputField
                        id="street"
                        name="street"
                        aria-label="Street"
                        type="text"
                        label="Street"
                        value={values.street}
                        hasError={!!errors.street && touched.street}
                        placeholder="Street"
                        autoComplete="off"
                      />
                      <ErrorMessage name="street">
                        {(msg) => (
                          <div className={`text-[11px] text-red-600`}>
                            {msg}
                          </div>
                        )}
                      </ErrorMessage>
                    </div>
                    <InputGroupContainer>
                      <div className="w-full space-y-2">
                        <CustomInputField
                          id="postalCode"
                          name="postalCode"
                          aria-label="Postal code"
                          type="text"
                          label="ZIP Code"
                          value={values.postalCode}
                          hasError={!!errors.postalCode && touched.postalCode}
                          placeholder="ZIP Code"
                          autoComplete="off"
                        />
                        <ErrorMessage name="postalCode">
                          {(msg) => (
                            <div className={`text-[11px] text-red-600`}>
                              {msg}
                            </div>
                          )}
                        </ErrorMessage>
                      </div>
                      <div className="w-full space-y-2">
                        <CustomInputField
                          id="city"
                          name="city"
                          type="text"
                          aria-label="City"
                          label="City"
                          value={values.city}
                          hasError={!!errors.city && touched.city}
                          placeholder="City"
                          autoComplete="off"
                        />
                        <ErrorMessage name="city">
                          {(msg) => (
                            <div className={`text-[11px] text-red-600`}>
                              {msg}
                            </div>
                          )}
                        </ErrorMessage>
                      </div>
                    </InputGroupContainer>
                  </div>
                </div>
              </div>
              <div className="pt-12">
                {updateUserError && (
                  <div className="pb-4 text-xs text-red-600">
                    {updateUserError.message}
                  </div>
                )}
                <BaseButton
                  type="submit"
                  disabled={isSubmitting}
                  loading={isSubmitting}
                >
                  Save
                </BaseButton>
              </div>
            </Form>
          );
        }}
      </Formik>
      <div className="z-50">
        <ToastContainer
          position={currentWindowWidth <= 768 ? "bottom-center" : "bottom-left"}
        />
      </div>
    </div>
  );
};

const InputGroupContainer: React.FC = ({ children }) => {
  return <div className="flex w-full space-x-4">{children}</div>;
};
