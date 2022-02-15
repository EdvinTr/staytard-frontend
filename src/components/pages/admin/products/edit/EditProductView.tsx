import { Form, Formik } from "formik";
import React from "react";
import { FindOneProductQuery } from "../../../../../lib/graphql";
interface EditProductViewProps {
  product: FindOneProductQuery["product"];
}

interface UpdateProductFormValues {
  name: string;
}

export const EditProductView: React.FC<EditProductViewProps> = ({
  product,
}) => {
  return (
    <div className="mx-auto max-w-2xl text-sm">
      <h2 className="pb-7 text-2xl font-medium">General information</h2>
      <div className="space-y-4 lg:flex lg:items-center lg:justify-between lg:space-x-7 lg:space-y-0">
        {/* id and brand disabled inputs */}
        <div className="w-full opacity-50">
          <BasicInputLabel htmlFor="productId">Product ID</BasicInputLabel>
          <input
            className="mt-2 block w-full border border-opacity-0 bg-blue-50"
            type="text"
            id="productId"
            name="productId"
            disabled
            value={product.id}
          />
        </div>
        <div className="w-full opacity-50">
          <BasicInputLabel htmlFor="brand">Brand name</BasicInputLabel>
          <input
            className="mt-2 block w-full border border-opacity-0 bg-blue-50"
            type="text"
            id="brand"
            name="brand"
            disabled
            value={product.brand.name}
          />
        </div>
      </div>
      <Formik initialValues={{}} onSubmit={(values) => {}}>
        <Form></Form>
      </Formik>
      {/* product name */}
      <div>
        <BasicInputLabel htmlFor="name">Display name</BasicInputLabel>
      </div>
    </div>
  );
};

interface BasicInputLabelProps
  extends React.DetailedHTMLProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  > {}
const BasicInputLabel = ({ ...props }: BasicInputLabelProps) => {
  return (
    <label {...props} className="font-medium">
      {props.children}
    </label>
  );
};
