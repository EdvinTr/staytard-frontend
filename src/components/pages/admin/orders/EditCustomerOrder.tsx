import { Field, Form, Formik } from "formik";
import { capitalize } from "lodash";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { APP_PAGE_ROUTE } from "../../../../constants";
import { FindOneCustomerOrderQuery } from "../../../../lib/graphql";
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
interface FormValues {
  deliveryAddress: string;
  city: string;
  postalCode: string;
  orderStatus: ORDER_STATUS;
}
export const EditCustomerOrder: React.FC<EditCustomerOrderProps> = ({
  order,
}) => {
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
  return (
    <div>
      <div>
        <h2 className="text-2xl font-medium">General information</h2>
        <Formik
          initialValues={{
            deliveryAddress: deliveryAddress,
            city: city,
            postalCode: postalCode,
            orderStatus: orderStatus.status as ORDER_STATUS,
          }}
          onSubmit={(values: FormValues, { setSubmitting }) => {
            console.log(values);
            setSubmitting(false);
          }}
        >
          {({ errors, values, isSubmitting, setFieldValue, touched }) => {
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
                      <MyWrapper>
                        <div className="w-full">
                          <BasicInputLabel htmlFor="city">City</BasicInputLabel>
                          <CustomInputField
                            id="city"
                            name="city"
                            value={values.city}
                            className="mt-2"
                          />
                        </div>
                        <div className="w-full">
                          <BasicInputLabel htmlFor="deliveryAddress">
                            Delivery address
                          </BasicInputLabel>
                          <CustomInputField
                            id="deliveryAddress"
                            name="deliveryAddress"
                            value={values.deliveryAddress}
                            className="mt-2"
                          />
                        </div>
                        <div className="w-full">
                          <BasicInputLabel htmlFor="zip>">Zip</BasicInputLabel>
                          <CustomInputField
                            id="zip>"
                            name="postalCode"
                            value={values.postalCode}
                            className="mt-2"
                          />
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
        <div className="space-y-8 pt-7">
          <div>
            <h3 className="text-2xl font-medium">User details</h3>
          </div>
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
