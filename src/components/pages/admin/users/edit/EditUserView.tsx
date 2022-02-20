import { useWindowWidth } from "@react-hook/window-size";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toast";
import { User } from "../../../../../lib/graphql";
import { updateProductReviewValidationSchema } from "../../../../../utils/validation/productReviewValidationSchema";
import { BaseButton } from "../../../../global/BaseButton";
import { DeleteButton } from "../../../../global/DeleteButton";
import { ConfirmDeletionModal } from "../../components/ConfirmDeletionModal";

interface EditUserViewProps {
  user: User;
}

interface FormValues {}

export const EditUserView: React.FC<EditUserViewProps> = ({ user }) => {
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

      <div className="space-y-2 py-6"></div>
      <Formik
        validationSchema={updateProductReviewValidationSchema}
        onSubmit={async (values: FormValues, { setSubmitting }) => {
          try {
          } catch (e) {
            console.log(e);
          } finally {
            setSubmitting(false);
            setTimeout(() => {
              toast.hideAll();
            }, 8000);
          }
        }}
        initialValues={{}}
      >
        {({ values, errors, isSubmitting, touched }) => {
          return (
            <Form>
              <div className="space-y-6"></div>

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
