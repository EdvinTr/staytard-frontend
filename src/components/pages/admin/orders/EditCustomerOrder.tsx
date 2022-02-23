import { ErrorMessage, Field, Form, Formik } from "formik";
import { capitalize } from "lodash";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import * as Yup from "yup";
import { ADMIN_SUB_PAGE_ROUTE, APP_PAGE_ROUTE } from "../../../../constants";
import {
  Customer_Order_Status,
  FindOneCustomerOrderQuery,
  UpdateCustomerOrderInput,
  useUpdateCustomerOrderMutation,
} from "../../../../lib/graphql";
import {
  addressValidationGenerator,
  cityValidation,
  postalCodeValidation,
} from "../../../../utils/validation/userValidationSchema";
import { BaseButton } from "../../../global/BaseButton";
import { ORDER_STATUS } from "../../../user/my-orders/CustomerOrderTableRow";
import { CustomInputField } from "../components/CustomInputField";
import { MyListBox } from "../products/components/CreateProductModal";
import {
  BasicInputLabel,
  DisabledInput,
} from "../products/edit/EditProductView";
import { MyWrapper } from "../reviews/edit/EditProductReview";
interface EditCustomerOrderProps {
  order: FindOneCustomerOrderQuery;
}

const validationSchema = Yup.object().shape({
  ...cityValidation,
  ...addressValidationGenerator(
    "deliveryAddress",
    "Use only letters and numbers. Max 36 characters."
  ),
  ...postalCodeValidation,
});
export const EditCustomerOrder: React.FC<EditCustomerOrderProps> = ({
  order,
}) => {
  const { user } = order.oneCustomerOrder;
  const {
    id: orderId,
    orderNumber,
    shippingCost,
    totalAmount,
    grandTotal,
    purchaseCurrency,
    paymentType,
    createdAt,
    deliveryAddress,
    postalCode,
    city,
    updatedAt,
    orderStatus,
    orderItems,
  } = order.oneCustomerOrder.order;
  const orderStatusItems = [
    ...Object.values(ORDER_STATUS).map((status, idx) => ({
      id: idx,
      name: status,
    })),
  ];
  const [updateOrder, { data, error }] = useUpdateCustomerOrderMutation();
  return (
    <div>
      <div>
        <h2 className="text-2xl font-medium">General information</h2>
        <Formik
          validationSchema={validationSchema}
          initialValues={{
            orderId: orderId,
            deliveryAddress: deliveryAddress,
            city: city,
            postalCode: postalCode,
            orderStatus: orderStatus.status as Customer_Order_Status,
          }}
          onSubmit={(values: UpdateCustomerOrderInput, { setSubmitting }) => {
            console.log(values);
            setSubmitting(false);
          }}
        >
          {({
            errors,
            values,
            isSubmitting,
            setFieldValue,
            touched,
            isValid,
          }) => {
            return (
              <Form>
                <div>
                  <div className="space-y-6 pt-6">
                    <MyWrapper>
                      <div className="w-full">
                        <BasicInputLabel htmlFor="orderId">
                          Order ID
                        </BasicInputLabel>
                        <DisabledInput
                          id="orderId"
                          name="orderId"
                          value={orderId}
                        />
                      </div>
                      <div className="w-full">
                        <BasicInputLabel htmlFor="orderNumber">
                          Order number
                        </BasicInputLabel>
                        <DisabledInput
                          id="orderNumber"
                          name="orderNumber"
                          value={orderNumber}
                        />
                      </div>
                    </MyWrapper>
                    <MyWrapper>
                      <div className="w-full">
                        <BasicInputLabel htmlFor="purchaseCurrency">
                          Purchase currency
                        </BasicInputLabel>
                        <DisabledInput
                          id="purchaseCurrency"
                          name="purchaseCurrency"
                          value={purchaseCurrency.toUpperCase()}
                        />
                      </div>
                      <div className="w-full">
                        <BasicInputLabel htmlFor="paymentType">
                          Payment type
                        </BasicInputLabel>
                        <DisabledInput
                          id="paymentType"
                          name="paymentType"
                          value={capitalize(paymentType)}
                        />
                      </div>
                    </MyWrapper>
                    <MyWrapper>
                      <div className="w-full">
                        <BasicInputLabel htmlFor="shippingCost">
                          Shipping cost
                        </BasicInputLabel>
                        <DisabledInput
                          id="shippingCost"
                          name="shippingCost"
                          value={shippingCost + " " + purchaseCurrency}
                        />
                      </div>
                      <div className="w-full">
                        <BasicInputLabel htmlFor="totalAmount">
                          Total amount
                        </BasicInputLabel>
                        <DisabledInput
                          id="totalAmount"
                          name="totalAmount"
                          value={totalAmount + " " + purchaseCurrency}
                        />
                      </div>
                      <div className="w-full">
                        <BasicInputLabel htmlFor="grandTotal">
                          Grand total
                        </BasicInputLabel>
                        <DisabledInput
                          id="grandTotal"
                          name="grandTotal"
                          value={grandTotal + " " + purchaseCurrency}
                        />
                      </div>
                    </MyWrapper>
                    <MyWrapper>
                      <MyWrapper className={`${isValid ? "" : "pb-4"}`}>
                        <div className="w-full space-y-2">
                          <BasicInputLabel htmlFor="city">City</BasicInputLabel>
                          <CustomInputField
                            id="city"
                            name="city"
                            type="text"
                            placeholder="City"
                            value={values.city}
                            hasError={!!touched.city && !!errors.city}
                            autoComplete="off"
                          />
                          <ErrorMessage name="city">
                            {(msg) => (
                              <span className="absolute pt-0 text-[11px] text-red-600">
                                {msg}
                              </span>
                            )}
                          </ErrorMessage>
                        </div>
                        <div className="w-full space-y-2">
                          <BasicInputLabel htmlFor="deliveryAddress">
                            Delivery address
                          </BasicInputLabel>
                          <CustomInputField
                            id="deliveryAddress"
                            name="deliveryAddress"
                            placeholder="Delivery address"
                            value={values.deliveryAddress}
                            autoComplete="off"
                            hasError={
                              !!touched.deliveryAddress &&
                              !!errors.deliveryAddress
                            }
                          />
                          <ErrorMessage name="deliveryAddress">
                            {(msg) => (
                              <span className="absolute pt-0 text-[11px] text-red-600">
                                {msg}
                              </span>
                            )}
                          </ErrorMessage>
                        </div>
                        <div className="w-full space-y-2">
                          <BasicInputLabel htmlFor="postalCode">
                            Postal code
                          </BasicInputLabel>
                          <CustomInputField
                            id="postalCode"
                            name="postalCode"
                            placeholder="Postal code"
                            value={values.postalCode}
                            autoComplete="off"
                            hasError={
                              !!touched.postalCode && !!errors.postalCode
                            }
                          />
                          <ErrorMessage name="postalCode">
                            {(msg) => (
                              <span className="absolute pt-0 text-[11px] text-red-600">
                                {msg}
                              </span>
                            )}
                          </ErrorMessage>
                        </div>
                      </MyWrapper>
                    </MyWrapper>
                    <MyWrapper>
                      {/* dates */}
                      <div className="w-full">
                        <BasicInputLabel htmlFor="createdAt">
                          Created
                        </BasicInputLabel>
                        <DisabledInput
                          id="createdAt"
                          name="createdAt"
                          value={new Date(createdAt).toLocaleString()}
                        />
                      </div>
                      <div className="w-full">
                        <BasicInputLabel htmlFor="updatedAt">
                          Updated
                        </BasicInputLabel>
                        <DisabledInput
                          id="updatedAt"
                          name="updatedAt"
                          value={new Date(updatedAt).toLocaleString()}
                        />
                      </div>
                      <div className="w-full space-y-2">
                        <BasicInputLabel htmlFor="status" className="">
                          Status
                        </BasicInputLabel>
                        <Field
                          as={MyListBox}
                          name="orderStatus"
                          id="orderStatus"
                          items={orderStatusItems}
                          initialValue={{
                            id: Math.random(),
                            name: values.orderStatus,
                          }}
                          onChange={(id: number) => {
                            setFieldValue(
                              "orderStatus",
                              orderStatusItems.find((v) => v.id === id)?.name
                            );
                          }}
                        />
                        {/*  <ErrorMessage name="orderStatus">
                        {(msg) => (
                          <div className="pt-2 text-[11px] text-red-600">
                            {msg}
                          </div>
                        )}
                      </ErrorMessage> */}
                      </div>
                    </MyWrapper>
                    <BaseButton
                      loading={isSubmitting}
                      disabled={isSubmitting}
                      type="submit"
                    >
                      Save
                    </BaseButton>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
        <div className="space-y-16 pt-16">
          <section>
            <h3 className="text-2xl font-medium">Customer</h3>
            <div className="pt-4">
              {user && !user.deletedAt ? (
                <div>
                  <Link
                    href={`${APP_PAGE_ROUTE.ADMIN}${ADMIN_SUB_PAGE_ROUTE.EDIT_USER}/${user.id}`}
                  >
                    <a className="text-blue-600 hover:underline">
                      <span>
                        {user.firstName} {user.lastName}
                      </span>
                    </a>
                  </Link>
                </div>
              ) : (
                <div className="text-xl text-red-600">
                  This user's account has been deleted.
                </div>
              )}
            </div>
          </section>
          <ProductSectionDisplay
            orderItems={orderItems}
            purchaseCurrency={purchaseCurrency}
          />
        </div>
      </div>
    </div>
  );
};

interface ProductSectionDisplayProps {
  orderItems: FindOneCustomerOrderQuery["oneCustomerOrder"]["order"]["orderItems"];
  purchaseCurrency: string;
}
const ProductSectionDisplay = ({
  orderItems,
  purchaseCurrency,
}: ProductSectionDisplayProps) => {
  return (
    <section>
      <h4 className="text-2xl font-medium">Products</h4>
      <div className="space-y-4 pt-4">
        {orderItems.map((item, idx) => {
          const product = item.product;
          return (
            <article key={idx} className="relative bg-gray-50">
              <div className="py-4 md:p-4 ">
                <div className="flex space-x-4">
                  <Image
                    src={item.product.images[0].imageUrl.replace(
                      "{size}",
                      "150"
                    )}
                    objectFit="contain"
                    width={100}
                    height={150}
                    alt={`${product.brand.name} - ${product.name}`}
                  />
                  <div>
                    <h5>
                      <span className="text-xl font-bold">
                        {item.quantity}x{" "}
                      </span>
                      <Link href={APP_PAGE_ROUTE.PRODUCT + `/${product.id}`}>
                        <a className="hover:underline">
                          <span className="text-base font-medium">
                            {product.name}
                          </span>
                        </a>
                      </Link>
                    </h5>
                    <h6 className="text-sm">{product.brand.name}</h6>
                    <div className="pt-4">
                      <div>
                        SKU: <span className="font-medium">{item.sku}</span>
                      </div>
                    </div>
                    <div className="absolute bottom-4">
                      <span className="text-base font-bold">
                        {" "}
                        {item.quantity * product.currentPrice}{" "}
                        {purchaseCurrency.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
