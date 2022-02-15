import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import React, { Fragment, useEffect, useState } from "react";
import {
  Brand_Sort_By,
  CreateProductInput,
  Sort_Direction,
  useBasicCategoriesQuery,
  useCreateProductMutation,
  useGetProductBrandsQuery,
} from "../../../../../lib/graphql";
import { BaseButton } from "../../../../global/BaseButton";
import { BaseInput } from "../../../../global/BaseInput";
import { CustomTextArea } from "../../../../global/CustomTextArea";
import { Modal } from "../../../../global/Modal";
import { ImageFieldArray } from "./ImageFieldArray";
interface CreateProductModalProps {
  show: boolean;
  onClose: () => void;
  onSuccess: () => void;
}
type FormValues = CreateProductInput;

const initialValues: FormValues = {
  attributes: [],
  brandId: 0,
  categoryId: 0,
  description: "",
  name: "",
  price: 0,
  imageUrls: [],
};

const inputClassNames =
  "border border-black border-opacity-10 focus:border-opacity-100 focus:outline-none focus:ring-0";
export const CreateProductModal: React.FC<CreateProductModalProps> = ({
  onSuccess,
  onClose,
  show,
}) => {
  const { data: brandData } = useGetProductBrandsQuery({
    variables: {
      input: {
        sortBy: Brand_Sort_By.Name,
        sortDirection: Sort_Direction.Desc,
      },
    },
  });
  const { data: categoriesData } = useBasicCategoriesQuery();

  const [createProduct, { loading: isCreateProductLoading, error }] =
    useCreateProductMutation({ fetchPolicy: "network-only" });

  const onSubmit = async (values: FormValues) => {
    try {
      const { data } = await createProduct({
        variables: {
          input: {
            ...values,
          },
        },
      });
      if (!data || !data.createProduct) {
        throw new Error();
      }
      onSuccess();
      onClose();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Modal show={show} onClose={onClose}>
      <div className="p-5 md:p-8">
        <h1 className="pb-6 text-2xl font-semibold">Create a new product</h1>
        <Formik
          initialValues={{
            ...initialValues,
          }}
          onSubmit={(values: FormValues, { resetForm }) => {
            onSubmit(values);
          }}
          validate={(values: FormValues) => {
            const errors: Partial<Record<keyof FormValues, string>> = {};
            if (!values.name) {
              errors.name = "Required";
            }
            if (values.name.length > 100) {
              errors.name = "Name must be less than 100 characters";
            }
            if (values.brandId <= 0) {
              errors.brandId = "Selected a brand";
            }
            if (values.categoryId <= 0) {
              errors.categoryId = "Selected a category";
            }
            if (!values.description) {
              errors.description = "Required";
            }
            if (values.description.length > 1000) {
              errors.description =
                "Description must be less than 1000 characters";
            }
            if (!values.price || values.price <= 0) {
              errors.price = "Price must be greater than 0";
            }
            if (values.imageUrls.length === 0) {
              errors.imageUrls = "At least one image is required";
            }
            if (values.attributes.length === 0) {
              errors.attributes = "At least one attribute is required";
            }
            return errors;
          }}
        >
          {({ errors, touched, values, setFieldValue }) => {
            return (
              <Form className="space-y-4">
                {/* <Persist name={LOCAL_STORAGE_KEY.CREATE_PRODUCT_FORM} /> */}
                <div className="">
                  {/* price input */}
                  <Field
                    className={inputClassNames + " w-1/4 "}
                    id="price"
                    type="number"
                    name="price"
                    as={BaseInput}
                    label="price"
                    min="1"
                    hasError={errors.price && touched.price}
                    value={values.price}
                    placeholder="Price"
                    aria-label="price"
                  />
                  <ErrorMessage name="price">
                    {(msg) => (
                      <div className="pt-2 text-[11px] text-red-600">{msg}</div>
                    )}
                  </ErrorMessage>
                </div>
                <div>
                  <Field
                    className={inputClassNames}
                    id="name"
                    name="name"
                    autoComplete="off"
                    as={BaseInput}
                    label="Name"
                    hasError={errors.name && touched.name}
                    value={values.name}
                    placeholder="Name"
                    aria-label="Name"
                  />
                  <ErrorMessage name="name">
                    {(msg) => (
                      <div className="pt-2 text-[11px] text-red-600">{msg}</div>
                    )}
                  </ErrorMessage>
                </div>
                <div className="text-left">
                  {/* description input */}
                  <Field
                    className={`${inputClassNames} text-13 w-full`}
                    id="description"
                    name="description"
                    as={CustomTextArea}
                    rows={5}
                    label="Description"
                    hasError={errors.description && touched.description}
                    currentValue={values.description}
                    placeholder="Description"
                    aria-label="Description"
                    autoComplete="off"
                  />
                  <ErrorMessage name="description">
                    {(msg) => (
                      <div className="pt-0 text-[11px] text-red-600">{msg}</div>
                    )}
                  </ErrorMessage>
                </div>
                <div className="flex justify-between space-x-6">
                  {brandData && (
                    <div className="w-full">
                      <label
                        htmlFor="brandId"
                        className="text-xs tracking-wider text-stone-600"
                      >
                        Brand
                      </label>
                      <Field
                        as={MyListBox}
                        name="brandId"
                        id="brandId"
                        items={brandData.productBrands.map((item) => ({
                          id: item.id,
                          name: item.name,
                        }))}
                        initialValue={brandData.productBrands.find(
                          (item) => item.id === values.brandId
                        )}
                        onChange={(value: number) => {
                          setFieldValue("brandId", value);
                        }}
                      />
                      <ErrorMessage name="brandId">
                        {(msg) => (
                          <div className="pt-2 text-[11px] text-red-600">
                            {msg}
                          </div>
                        )}
                      </ErrorMessage>
                    </div>
                  )}
                  {categoriesData && (
                    <div className="w-full">
                      <label
                        htmlFor="categoryId"
                        className="text-xs tracking-wider text-stone-600"
                      >
                        Category
                      </label>
                      <Field
                        as={MyListBox}
                        name="categoryId"
                        id="categoryId"
                        items={categoriesData.basicCategories.map((item) => ({
                          id: item.id,
                          name: item.name,
                        }))}
                        initialValue={categoriesData.basicCategories.find(
                          (item) => item.id === values.categoryId
                        )}
                        onChange={(value: number) => {
                          setFieldValue("categoryId", value);
                        }}
                      />
                      <ErrorMessage name="categoryId">
                        {(msg) => (
                          <div className="pt-2 text-[11px] text-red-600">
                            {msg}
                          </div>
                        )}
                      </ErrorMessage>
                    </div>
                  )}
                </div>

                <div className="pt-6">
                  <h2 className="pb-4 text-xl font-semibold">Images</h2>
                  <ImageFieldArray
                    imageUrls={values.imageUrls}
                    name="imageUrls"
                  />
                  {/* currently added images */}
                  <div className="flex items-center space-x-4">
                    {values.imageUrls &&
                      values.imageUrls.map((url, index) => {
                        return (
                          url.length > 0 && (
                            <img
                              key={index}
                              src={url}
                              className="mt-4 h-16 w-12 object-cover"
                            />
                          )
                        );
                      })}
                  </div>
                </div>

                <div className="pt-6">
                  <h3 className="pb-4 text-xl font-semibold">Attributes</h3>
                  {/* attributes */}
                  <FieldArray
                    name="attributes"
                    render={(arrayHelpers) => (
                      <div className="w-full space-y-7 md:space-y-4">
                        {values.attributes.length > 0 ? (
                          values.attributes.map((attribute, index) => (
                            <div
                              key={index}
                              className="w-full md:flex md:items-center md:justify-between md:space-x-0"
                            >
                              <div className="md:w-3/12">
                                <Field
                                  name={`attributes[${index}].size.value`}
                                  as={BaseInput}
                                  type="text"
                                  id={`attributes.${index}.size`}
                                  autoComplete="off"
                                  label="Size"
                                  required
                                  value={values.attributes[index].size.value}
                                  placeholder="Size"
                                  aria-label="Size"
                                />
                              </div>
                              <div className="mt-2 md:mt-0 md:w-3/12">
                                <Field
                                  name={`attributes.${index}.color.value`}
                                  as={BaseInput}
                                  type="text"
                                  id={`attributes.${index}.color`}
                                  autoComplete="off"
                                  label="Color"
                                  required
                                  value={values.attributes[index].color.value}
                                  placeholder="Color"
                                  aria-label="Color"
                                />
                              </div>
                              <div className="mt-2 md:mt-0 md:w-1/5">
                                <Field
                                  name={`attributes.${index}.quantity`}
                                  as={BaseInput}
                                  type="number"
                                  id={`attributes.${index}.quantity`}
                                  autoComplete="off"
                                  label="Quantity"
                                  min="1"
                                  value={values.attributes[index].quantity}
                                  placeholder="Quantity"
                                  aria-label="Quantity"
                                />
                              </div>

                              <div className="space-x-4 pt-2">
                                <AddRemoveButton
                                  variant="remove"
                                  type="button"
                                  aria-label="Remove attribute"
                                  onClick={() => arrayHelpers.remove(index)}
                                >
                                  -
                                </AddRemoveButton>
                                <AddRemoveButton
                                  variant="add"
                                  type="button"
                                  aria-label="Add attribute"
                                  onClick={() =>
                                    arrayHelpers.push({
                                      size: { value: "" },
                                      color: { value: "" },
                                      quantity: 0,
                                    })
                                  }
                                >
                                  +
                                </AddRemoveButton>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="flex items-center space-x-4">
                            <button
                              type="button"
                              className="bg-green-600 p-2 text-sm uppercase text-white"
                              onClick={() =>
                                arrayHelpers.push({
                                  size: { value: "" },
                                  color: { value: "" },
                                  quantity: 0,
                                })
                              }
                            >
                              Add Attributes
                            </button>
                            <ErrorMessage name="attributes">
                              {(msg) => (
                                <div className="text-[11px] text-red-600">
                                  {msg}
                                </div>
                              )}
                            </ErrorMessage>
                          </div>
                        )}
                      </div>
                    )}
                  />
                </div>
                {error && (
                  <ul className="list-disc text-xs text-red-600">
                    {error.graphQLErrors[0]?.extensions?.response?.message?.map(
                      (msg: string, idx: number) => (
                        <li key={idx}>{msg}</li>
                      )
                    )}
                  </ul>
                )}
                {error && (
                  <div className="text-sm text-red-600">{error.message}</div>
                )}
                <div className="space-x-6 pt-8">
                  <BaseButton type="submit" loading={isCreateProductLoading}>
                    Save
                  </BaseButton>
                  <BaseButton
                    type="button"
                    variant="outline"
                    onClick={() => onClose()}
                  >
                    Cancel
                  </BaseButton>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </Modal>
  );
};
interface AddRemoveButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "add" | "remove";
}
export const AddRemoveButton: React.FC<AddRemoveButtonProps> = ({
  variant,
  children,
  ...rest
}) => {
  if (variant === "remove") {
    return (
      <button {...rest} className="h-8 w-8 bg-red-600 text-white">
        {children}
      </button>
    );
  }
  return (
    <button {...rest} className="h-8 w-8 bg-green-600 text-white">
      {children}
    </button>
  );
};

type ListBoxItem = {
  id: number;
  name: string;
};
interface MyListBoxProps {
  items: ListBoxItem[];
  onChange: (id: number) => void;
  initialValue?: ListBoxItem;
}
export default function MyListBox({
  items,
  onChange,
  initialValue,
}: MyListBoxProps) {
  const [selected, setSelected] = useState<ListBoxItem>(items[0]);
  useEffect(() => {
    if (initialValue) {
      setSelected({ ...initialValue });
    }
  }, [initialValue]);
  return (
    <div className="w-full">
      <Listbox
        value={selected}
        onChange={(value) => {
          onChange(value.id);
          setSelected(value);
        }}
      >
        <div className="relative z-20 mt-1">
          <Listbox.Button className="relative w-full cursor-default border border-gray-700  bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{selected.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <SelectorIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {items.map((item, idx) => (
                <Listbox.Option
                  key={idx}
                  className={({ active }) =>
                    `${active ? "bg-amber-100 text-amber-900" : "text-gray-900"}
                            relative cursor-default select-none py-2 pl-10 pr-4`
                  }
                  value={item}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`${
                          selected ? "font-medium" : "font-normal"
                        } block truncate`}
                      >
                        {item.name}
                      </span>
                      {selected ? (
                        <span
                          className={`${
                            active ? "text-amber-600" : "text-amber-600"
                          }
                                  absolute inset-y-0 left-0 flex items-center pl-3`}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
