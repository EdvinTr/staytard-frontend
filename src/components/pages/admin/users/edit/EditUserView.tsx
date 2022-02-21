import { useWindowWidth } from "@react-hook/window-size";
import { ErrorMessage, FieldAttributes, Form, Formik, useField } from "formik";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toast";
import { editInputClassNames } from "../../../../../constants";
import { UpdateUserInput, User } from "../../../../../lib/graphql";
import { updateUserValidationSchema } from "../../../../../utils/validation/userValidationSchema";
import { BaseButton } from "../../../../global/BaseButton";
import { BaseInput, BaseInputProps } from "../../../../global/BaseInput";
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

type CustomTextFieldProps = BaseInputProps & FieldAttributes<{}>;
const CustomTextField: React.FC<CustomTextFieldProps> = ({
  label,
  id,
  value,
  ...props
}) => {
  const [field, meta] = useField(props);
  return (
    <BaseInput
      {...field}
      {...props}
      className={`${editInputClassNames} text-13`}
      id={id}
      name={field.name}
      type="text"
      label={label}
      hasError={!!meta.error && meta.touched}
      value={value}
    />
  );
};

export const EditUserView: React.FC<EditUserViewProps> = ({ user }) => {
  const [activeField, setActiveField] = useState("");
  const currentWindowWidth = useWindowWidth();
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);
  return (
    <div>
      <div className="flex items-center justify-between pb-10">
        <h2 className="text-2xl font-medium">General information</h2>
        <DeleteButton
          // onClick={() => setIsConfirmDeleteModalOpen(true)}
          aria-label="Open delete user confirmation modal"
        />
        <ConfirmDeletionModal
          heading={`Are you sure you want to delete this user?`}
          loading={false}
          onClose={() => setIsConfirmDeleteModalOpen(false)}
          show={isConfirmDeleteModalOpen}
          onDelete={async () => {
            try {
            } catch (err) {
              console.log(err);
            }
          }}
          error={undefined}
        />
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
            console.log(values);
          } catch (e) {
            console.log(e);
          } finally {
            setSubmitting(false);
            setTimeout(() => {
              toast.hideAll();
            }, 8000);
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
                <div className="flex w-full space-x-8">
                  <div className="w-full space-y-2">
                    <BasicInputLabel htmlFor="firstName">
                      First name
                    </BasicInputLabel>
                    <CustomTextField
                      id="firstName"
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
                    <BasicInputLabel htmlFor="lastName">
                      Last name
                    </BasicInputLabel>
                    <CustomTextField
                      id="lastName"
                      name="lastName"
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
                </div>
              </div>

              <div className="pt-12">
                {/*   {updateReviewError && (
                        <div className="pb-4 text-xs text-red-600">
                          {updateReviewError.message}
                        </div>
                      )} */}

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
