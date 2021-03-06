import * as Apollo from "@apollo/client";
import { gql } from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type AttributeValueType = {
  value: Scalars["String"];
};

export enum Brand_Sort_By {
  Id = "ID",
  Name = "NAME",
}

export type BasicCategory = {
  __typename?: "BasicCategory";
  id: Scalars["Float"];
  name: Scalars["String"];
};

export enum Customer_Order_Sort_By {
  CreatedAt = "CREATED_AT",
  GrandTotal = "GRAND_TOTAL",
  Id = "ID",
  Status = "STATUS",
}

export enum Customer_Order_Status {
  Cancelled = "CANCELLED",
  Completed = "COMPLETED",
  Failed = "FAILED",
  OnHold = "ON_HOLD",
  Pending = "PENDING",
  Processing = "PROCESSING",
  Refunded = "REFUNDED",
  Shipped = "SHIPPED",
}

export type CreateOrGetOrderWithStripeOutput = {
  __typename?: "CreateOrGetOrderWithStripeOutput";
  order: CustomerOrder;
  user?: Maybe<User>;
  wasCreated: Scalars["Boolean"];
};

export type CreateProductAttributeInput = {
  color: AttributeValueType;
  quantity: Scalars["Float"];
  size: AttributeValueType;
};

export type CreateProductInput = {
  attributes: Array<CreateProductAttributeInput>;
  brandId: Scalars["Float"];
  categoryId: Scalars["Float"];
  description: Scalars["String"];
  imageUrls: Array<Scalars["String"]>;
  name: Scalars["String"];
  price: Scalars["Float"];
};

export type CreateProductReviewInput = {
  content: Scalars["String"];
  email: Scalars["String"];
  nickname: Scalars["String"];
  productId: Scalars["Float"];
  rating: Scalars["Float"];
  title: Scalars["String"];
  wouldRecommend: Scalars["Boolean"];
};

export type CustomerOrder = {
  __typename?: "CustomerOrder";
  city: Scalars["String"];
  createdAt: Scalars["DateTime"];
  deliveryAddress: Scalars["String"];
  grandTotal: Scalars["Float"];
  id: Scalars["Float"];
  orderItems: Array<CustomerOrderItem>;
  orderNumber: Scalars["String"];
  orderStatus: CustomerOrderStatus;
  orderStatusId: Scalars["Float"];
  paymentType: Scalars["String"];
  postalCode: Scalars["String"];
  purchaseCurrency: Scalars["String"];
  shippingCost: Scalars["Float"];
  stripeSessionId?: Maybe<Scalars["String"]>;
  totalAmount: Scalars["Float"];
  updatedAt: Scalars["DateTime"];
  userId: Scalars["String"];
};

export type CustomerOrderFilter = {
  orderStatusFilter?: InputMaybe<Array<Customer_Order_Status>>;
};

export type CustomerOrderItem = {
  __typename?: "CustomerOrderItem";
  orderId: Scalars["Float"];
  product: Product;
  productId: Scalars["Float"];
  quantity: Scalars["Float"];
  sku: Scalars["String"];
};

export type CustomerOrderStatus = {
  __typename?: "CustomerOrderStatus";
  id: Scalars["Float"];
  status: Scalars["String"];
};

export type DeleteUserInput = {
  password: Scalars["String"];
  userId: Scalars["String"];
};

export type FindAllCustomerOrdersInput = {
  filters?: InputMaybe<CustomerOrderFilter>;
  limit: Scalars["Float"];
  offset: Scalars["Float"];
  q?: InputMaybe<Scalars["String"]>;
  sortBy?: InputMaybe<Customer_Order_Sort_By>;
  sortDirection?: InputMaybe<Sort_Direction>;
};

export type FindAllProductReviewsInput = {
  filter?: InputMaybe<ProductReviewsFilterInput>;
  limit: Scalars["Float"];
  offset: Scalars["Float"];
  q?: InputMaybe<Scalars["String"]>;
  sortBy?: InputMaybe<Product_Review_Sort_By>;
  sortDirection?: InputMaybe<Sort_Direction>;
};

export type FindAllUsersInput = {
  limit: Scalars["Float"];
  offset: Scalars["Float"];
  q?: InputMaybe<Scalars["String"]>;
  sortBy?: InputMaybe<User_Sort_By>;
  sortDirection?: InputMaybe<Sort_Direction>;
};

export type FindMyCustomerOrdersInput = {
  limit: Scalars["Float"];
  offset: Scalars["Float"];
  sortBy?: InputMaybe<Customer_Order_Sort_By>;
  sortDirection?: InputMaybe<Sort_Direction>;
};

export type FindOneCustomerOrderOutput = {
  __typename?: "FindOneCustomerOrderOutput";
  isEditable: Scalars["Boolean"];
  order: CustomerOrder;
  user?: Maybe<User>;
};

export type FindProductBrandsInput = {
  sortBy?: InputMaybe<Brand_Sort_By>;
  sortDirection?: InputMaybe<Sort_Direction>;
};

export type FindProductsBySkusInput = {
  limit: Scalars["Float"];
  offset: Scalars["Float"];
  skus: Array<Scalars["String"]>;
};

export type FindProductsInput = {
  categoryPath: Scalars["String"];
  limit: Scalars["Float"];
  offset: Scalars["Float"];
  sortBy?: InputMaybe<Product_Sort_By>;
  sortDirection?: InputMaybe<Sort_Direction>;
};

export type FindPublishedProductReviewsInput = {
  limit: Scalars["Float"];
  offset: Scalars["Float"];
  productId: Scalars["Float"];
  sortBy?: InputMaybe<Product_Review_Sort_By>;
  sortDirection?: InputMaybe<Sort_Direction>;
};

export type LoginUserDto = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  authenticateWithGoogle: UserWithTokensDto;
  createOrGetCustomerOrderWithStripe: CreateOrGetOrderWithStripeOutput;
  createProduct: Product;
  createProductReview: ProductReview;
  deleteProduct: Scalars["Boolean"];
  deleteProductReview: Scalars["Boolean"];
  deleteUser: Scalars["Boolean"];
  login: UserWithTokensDto;
  logout: Scalars["Boolean"];
  registerUser: UserWithTokensDto;
  updateCustomerOrder: Scalars["Boolean"];
  updatePassword: Scalars["Boolean"];
  updateProduct: Product;
  updateProductReview: ProductReview;
  updateUser: User;
  updateUserAddress: User;
};

export type MutationAuthenticateWithGoogleArgs = {
  googleAuthToken: Scalars["String"];
};

export type MutationCreateOrGetCustomerOrderWithStripeArgs = {
  stripeSessionId: Scalars["String"];
};

export type MutationCreateProductArgs = {
  input: CreateProductInput;
};

export type MutationCreateProductReviewArgs = {
  input: CreateProductReviewInput;
};

export type MutationDeleteProductArgs = {
  id: Scalars["Float"];
};

export type MutationDeleteProductReviewArgs = {
  id: Scalars["Float"];
};

export type MutationDeleteUserArgs = {
  input: DeleteUserInput;
};

export type MutationLoginArgs = {
  input: LoginUserDto;
};

export type MutationRegisterUserArgs = {
  input: RegisterUserDto;
};

export type MutationUpdateCustomerOrderArgs = {
  input: UpdateCustomerOrderInput;
};

export type MutationUpdatePasswordArgs = {
  input: UpdateUserPasswordInput;
};

export type MutationUpdateProductArgs = {
  input: UpdateProductInput;
};

export type MutationUpdateProductReviewArgs = {
  input: UpdateProductReviewInput;
};

export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

export type MutationUpdateUserAddressArgs = {
  input: UpdateUserAddressInput;
};

export enum Product_Review_Filter {
  IsPublished = "IS_PUBLISHED",
}

export enum Product_Review_Sort_By {
  CreatedAt = "CREATED_AT",
  Id = "ID",
}

export enum Product_Sort_By {
  CurrentPrice = "CURRENT_PRICE",
  Id = "ID",
  Name = "NAME",
}

export type PaginatedCustomerOrdersOutput = {
  __typename?: "PaginatedCustomerOrdersOutput";
  hasMore: Scalars["Boolean"];
  items: Array<CustomerOrder>;
  totalCount: Scalars["Float"];
};

export type PaginatedUsersOutput = {
  __typename?: "PaginatedUsersOutput";
  hasMore: Scalars["Boolean"];
  items: Array<User>;
  totalCount: Scalars["Float"];
};

/** The permissions of the user */
export enum Permission {
  CreateProduct = "CREATE_PRODUCT",
  DeleteProduct = "DELETE_PRODUCT",
  DeleteProductReview = "DELETE_PRODUCT_REVIEW",
  DeleteUser = "DELETE_USER",
  ReadCustomerOrder = "READ_CUSTOMER_ORDER",
  ReadProductReview = "READ_PRODUCT_REVIEW",
  ReadUser = "READ_USER",
  UpdateCustomerOrder = "UPDATE_CUSTOMER_ORDER",
  UpdateProduct = "UPDATE_PRODUCT",
  UpdateProductReview = "UPDATE_PRODUCT_REVIEW",
  UpdateUser = "UPDATE_USER",
}

export type Product = {
  __typename?: "Product";
  attributes: Array<ProductAttribute>;
  brand: ProductBrand;
  brandId: Scalars["Float"];
  categoryId: Scalars["Float"];
  createdAt: Scalars["DateTime"];
  currentPrice: Scalars["Float"];
  currentPriceLabel: Scalars["String"];
  description: Scalars["String"];
  id: Scalars["Float"];
  images: Array<ProductImage>;
  isDiscontinued: Scalars["Boolean"];
  name: Scalars["String"];
  originalPrice: Scalars["Float"];
  updatedAt: Scalars["DateTime"];
};

export type ProductAttribute = {
  __typename?: "ProductAttribute";
  color: ProductColor;
  quantity: Scalars["Float"];
  size: ProductSize;
  sku: Scalars["String"];
};

export type ProductBrand = {
  __typename?: "ProductBrand";
  id: Scalars["Float"];
  name: Scalars["String"];
  path: Scalars["String"];
};

export type ProductCategory = {
  __typename?: "ProductCategory";
  children?: Maybe<Array<ProductCategory>>;
  createdAt: Scalars["DateTime"];
  description: Scalars["String"];
  id: Scalars["Float"];
  name: Scalars["String"];
  parent?: Maybe<ProductCategory>;
  path: Scalars["String"];
  slug: Scalars["String"];
  updatedAt: Scalars["DateTime"];
};

export type ProductColor = {
  __typename?: "ProductColor";
  id: Scalars["Float"];
  value: Scalars["String"];
};

export type ProductImage = {
  __typename?: "ProductImage";
  id: Scalars["Float"];
  imageUrl: Scalars["String"];
};

export type ProductReview = {
  __typename?: "ProductReview";
  content: Scalars["String"];
  createdAt: Scalars["DateTime"];
  id: Scalars["Float"];
  isPublished: Scalars["Boolean"];
  nickname: Scalars["String"];
  productId: Scalars["Float"];
  publishedAt?: Maybe<Scalars["DateTime"]>;
  rating: Scalars["Float"];
  title: Scalars["String"];
  updatedAt: Scalars["DateTime"];
  wouldRecommend: Scalars["Boolean"];
};

export type ProductReviewsFilterInput = {
  applied: Scalars["Boolean"];
  type: Product_Review_Filter;
};

export type ProductSize = {
  __typename?: "ProductSize";
  id: Scalars["Float"];
  value: Scalars["String"];
};

export type PublishedProductReviewsOutput = {
  __typename?: "PublishedProductReviewsOutput";
  averageRating: Scalars["Float"];
  hasMore: Scalars["Boolean"];
  items: Array<ProductReview>;
  totalCount: Scalars["Float"];
};

export type Query = {
  __typename?: "Query";
  allProductReviews: QueryAllProductReviewsOutput;
  basicCategories: Array<BasicCategory>;
  categories: Array<ProductCategory>;
  customerOrders: PaginatedCustomerOrdersOutput;
  getOneCategory: ProductCategory;
  hasPassword: Scalars["Boolean"];
  me: User;
  myOrders: PaginatedCustomerOrdersOutput;
  oneCustomerOrder: FindOneCustomerOrderOutput;
  oneProductReview: ProductReview;
  product: Product;
  productBrands: Array<ProductBrand>;
  products: QueryProductsOutput;
  productsBySku: QueryProductsOutput;
  publishedProductReviews: PublishedProductReviewsOutput;
  searchProducts: Array<Product>;
  user: User;
  users: PaginatedUsersOutput;
};

export type QueryAllProductReviewsArgs = {
  input: FindAllProductReviewsInput;
};

export type QueryCustomerOrdersArgs = {
  input: FindAllCustomerOrdersInput;
};

export type QueryGetOneCategoryArgs = {
  path: Scalars["String"];
};

export type QueryMyOrdersArgs = {
  input: FindMyCustomerOrdersInput;
};

export type QueryOneCustomerOrderArgs = {
  id: Scalars["Float"];
};

export type QueryOneProductReviewArgs = {
  id: Scalars["Float"];
};

export type QueryProductArgs = {
  id: Scalars["Float"];
};

export type QueryProductBrandsArgs = {
  input: FindProductBrandsInput;
};

export type QueryProductsArgs = {
  input: FindProductsInput;
};

export type QueryProductsBySkuArgs = {
  input: FindProductsBySkusInput;
};

export type QueryPublishedProductReviewsArgs = {
  input: FindPublishedProductReviewsInput;
};

export type QuerySearchProductsArgs = {
  input: SearchProductsInput;
};

export type QueryUserArgs = {
  id: Scalars["String"];
};

export type QueryUsersArgs = {
  input: FindAllUsersInput;
};

export type QueryAllProductReviewsOutput = {
  __typename?: "QueryAllProductReviewsOutput";
  hasMore: Scalars["Boolean"];
  items: Array<ProductReview>;
  totalCount: Scalars["Float"];
};

export type QueryProductsOutput = {
  __typename?: "QueryProductsOutput";
  hasMore: Scalars["Boolean"];
  items: Array<Product>;
  totalCount: Scalars["Float"];
};

export type RegisterUserDto = {
  city: Scalars["String"];
  email: Scalars["String"];
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  mobilePhoneNumber: Scalars["String"];
  password: Scalars["String"];
  postalCode: Scalars["String"];
  street: Scalars["String"];
};

export enum Sort_Direction {
  Asc = "ASC",
  Desc = "DESC",
}

export type SearchProductsInput = {
  resultLimit: Scalars["Float"];
  searchTerm: Scalars["String"];
};

export enum User_Sort_By {
  Id = "ID",
  IsAdmin = "IS_ADMIN",
}

export type UpdateCustomerOrderInput = {
  city: Scalars["String"];
  deliveryAddress: Scalars["String"];
  orderId: Scalars["Float"];
  orderStatus: Customer_Order_Status;
  postalCode: Scalars["String"];
};

export type UpdateProductInput = {
  attributes: Array<CreateProductAttributeInput>;
  currentPrice: Scalars["Float"];
  description: Scalars["String"];
  imageUrls: Array<Scalars["String"]>;
  isDiscontinued: Scalars["Boolean"];
  name: Scalars["String"];
  productId: Scalars["Float"];
};

export type UpdateProductReviewInput = {
  content: Scalars["String"];
  isPublished: Scalars["Boolean"];
  reviewId: Scalars["Float"];
  title: Scalars["String"];
};

export type UpdateUserAddressInput = {
  city: Scalars["String"];
  postalCode: Scalars["String"];
  street: Scalars["String"];
};

export type UpdateUserInput = {
  city: Scalars["String"];
  email: Scalars["String"];
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  mobilePhoneNumber: Scalars["String"];
  postalCode: Scalars["String"];
  street: Scalars["String"];
  userId: Scalars["String"];
};

export type UpdateUserPasswordInput = {
  newPassword: Scalars["String"];
  oldPassword?: InputMaybe<Scalars["String"]>;
};

export type User = {
  __typename?: "User";
  address?: Maybe<UserAddress>;
  createdAt: Scalars["DateTime"];
  deletedAt?: Maybe<Scalars["DateTime"]>;
  email: Scalars["String"];
  firstName: Scalars["String"];
  id: Scalars["String"];
  isAdmin: Scalars["Boolean"];
  isEmailConfirmed: Scalars["Boolean"];
  isRegisteredWithGoogle: Scalars["Boolean"];
  lastName: Scalars["String"];
  mobilePhoneNumber?: Maybe<Scalars["String"]>;
  permissions: Array<Permission>;
  updatedAt: Scalars["DateTime"];
};

export type UserAddress = {
  __typename?: "UserAddress";
  city: Scalars["String"];
  id: Scalars["Float"];
  postalCode: Scalars["String"];
  street: Scalars["String"];
};

export type UserWithTokensDto = {
  __typename?: "UserWithTokensDto";
  accessToken: Scalars["String"];
  refreshToken: Scalars["String"];
  user: User;
};

export type CoreCategoryFieldsFragment = {
  __typename?: "ProductCategory";
  id: number;
  name: string;
  path: string;
  slug: string;
};

export type CoreCustomerOrderFieldsFragment = {
  __typename?: "CustomerOrder";
  id: number;
  orderNumber: string;
  deliveryAddress: string;
  city: string;
  postalCode: string;
  totalAmount: number;
  shippingCost: number;
  grandTotal: number;
  purchaseCurrency: string;
  paymentType: string;
  createdAt: any;
  updatedAt: any;
  orderStatus: { __typename?: "CustomerOrderStatus"; status: string };
};

export type CoreAttributeFieldsFragment = {
  __typename?: "ProductAttribute";
  sku: string;
  quantity: number;
  size: { __typename?: "ProductSize"; id: number; value: string };
  color: { __typename?: "ProductColor"; id: number; value: string };
};

export type CoreProductFieldsFragment = {
  __typename?: "Product";
  id: number;
  name: string;
  originalPrice: number;
  currentPrice: number;
  currentPriceLabel: string;
  isDiscontinued: boolean;
  brand: {
    __typename?: "ProductBrand";
    id: number;
    name: string;
    path: string;
  };
  images: Array<{ __typename?: "ProductImage"; id: number; imageUrl: string }>;
};

export type CoreProductReviewFieldsFragment = {
  __typename?: "ProductReview";
  id: number;
  title: string;
  rating: number;
  wouldRecommend: boolean;
  content: string;
  isPublished: boolean;
  nickname: string;
  createdAt: any;
  productId: number;
  publishedAt?: any | null | undefined;
  updatedAt: any;
};

export type ProductReviewPartsFragment = {
  __typename?: "ProductReview";
  id: number;
  title: string;
  rating: number;
  wouldRecommend: boolean;
  isPublished: boolean;
  nickname: string;
  createdAt: any;
  productId: number;
  publishedAt?: any | null | undefined;
};

export type CoreAddressFieldsFragment = {
  __typename?: "UserAddress";
  id: number;
  city: string;
  street: string;
  postalCode: string;
};

export type CoreUserFieldsFragment = {
  __typename?: "User";
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobilePhoneNumber?: string | null | undefined;
  isRegisteredWithGoogle: boolean;
  isEmailConfirmed: boolean;
  isAdmin: boolean;
};

export type UpdateCustomerOrderMutationVariables = Exact<{
  input: UpdateCustomerOrderInput;
}>;

export type UpdateCustomerOrderMutation = {
  __typename?: "Mutation";
  updateCustomerOrder: boolean;
};

export type CreateProductReviewMutationVariables = Exact<{
  input: CreateProductReviewInput;
}>;

export type CreateProductReviewMutation = {
  __typename?: "Mutation";
  createProductReview: {
    __typename?: "ProductReview";
    id: number;
    title: string;
    rating: number;
    wouldRecommend: boolean;
    content: string;
    isPublished: boolean;
    nickname: string;
    createdAt: any;
    productId: number;
    publishedAt?: any | null | undefined;
    updatedAt: any;
  };
};

export type DeleteProductReviewMutationVariables = Exact<{
  id: Scalars["Float"];
}>;

export type DeleteProductReviewMutation = {
  __typename?: "Mutation";
  deleteProductReview: boolean;
};

export type UpdateProductReviewMutationVariables = Exact<{
  input: UpdateProductReviewInput;
}>;

export type UpdateProductReviewMutation = {
  __typename?: "Mutation";
  updateProductReview: { __typename?: "ProductReview"; id: number };
};

export type CreateProductMutationVariables = Exact<{
  input: CreateProductInput;
}>;

export type CreateProductMutation = {
  __typename?: "Mutation";
  createProduct: {
    __typename?: "Product";
    id: number;
    attributes: Array<{
      __typename?: "ProductAttribute";
      sku: string;
      quantity: number;
      size: { __typename?: "ProductSize"; id: number; value: string };
      color: { __typename?: "ProductColor"; id: number; value: string };
    }>;
  };
};

export type DeleteProductMutationVariables = Exact<{
  id: Scalars["Float"];
}>;

export type DeleteProductMutation = {
  __typename?: "Mutation";
  deleteProduct: boolean;
};

export type UpdateProductMutationVariables = Exact<{
  input: UpdateProductInput;
}>;

export type UpdateProductMutation = {
  __typename?: "Mutation";
  updateProduct: {
    __typename?: "Product";
    id: number;
    name: string;
    originalPrice: number;
    currentPrice: number;
    currentPriceLabel: string;
    isDiscontinued: boolean;
    attributes: Array<{
      __typename?: "ProductAttribute";
      sku: string;
      quantity: number;
      size: { __typename?: "ProductSize"; id: number; value: string };
      color: { __typename?: "ProductColor"; id: number; value: string };
    }>;
    brand: {
      __typename?: "ProductBrand";
      id: number;
      name: string;
      path: string;
    };
    images: Array<{
      __typename?: "ProductImage";
      id: number;
      imageUrl: string;
    }>;
  };
};

export type CreateOrGetCustomerOrderWithStripeMutationVariables = Exact<{
  stripeSessionId: Scalars["String"];
}>;

export type CreateOrGetCustomerOrderWithStripeMutation = {
  __typename?: "Mutation";
  createOrGetCustomerOrderWithStripe: {
    __typename?: "CreateOrGetOrderWithStripeOutput";
    wasCreated: boolean;
    order: {
      __typename?: "CustomerOrder";
      stripeSessionId?: string | null | undefined;
      orderNumber: string;
      grandTotal: number;
      paymentType: string;
      purchaseCurrency: string;
    };
    user?: { __typename?: "User"; email: string } | null | undefined;
  };
};

export type AdminDeleteUserMutationVariables = Exact<{
  input: DeleteUserInput;
}>;

export type AdminDeleteUserMutation = {
  __typename?: "Mutation";
  deleteUser: boolean;
};

export type AdminUpdateUserMutationVariables = Exact<{
  input: UpdateUserInput;
}>;

export type AdminUpdateUserMutation = {
  __typename?: "Mutation";
  updateUser: { __typename?: "User"; id: string };
};

export type AuthenticateWithGoogleMutationVariables = Exact<{
  googleAuthToken: Scalars["String"];
}>;

export type AuthenticateWithGoogleMutation = {
  __typename?: "Mutation";
  authenticateWithGoogle: {
    __typename?: "UserWithTokensDto";
    accessToken: string;
    refreshToken: string;
  };
};

export type LoginUserMutationVariables = Exact<{
  input: LoginUserDto;
}>;

export type LoginUserMutation = {
  __typename?: "Mutation";
  login: {
    __typename?: "UserWithTokensDto";
    accessToken: string;
    refreshToken: string;
  };
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: "Mutation"; logout: boolean };

export type RegisterUserMutationVariables = Exact<{
  input: RegisterUserDto;
}>;

export type RegisterUserMutation = {
  __typename?: "Mutation";
  registerUser: {
    __typename?: "UserWithTokensDto";
    accessToken: string;
    refreshToken: string;
    user: { __typename?: "User"; id: string };
  };
};

export type UpdatePasswordMutationVariables = Exact<{
  input: UpdateUserPasswordInput;
}>;

export type UpdatePasswordMutation = {
  __typename?: "Mutation";
  updatePassword: boolean;
};

export type UpdateUserAddressMutationVariables = Exact<{
  input: UpdateUserAddressInput;
}>;

export type UpdateUserAddressMutation = {
  __typename?: "Mutation";
  updateUserAddress: { __typename?: "User"; id: string };
};

export type BasicCategoriesQueryVariables = Exact<{ [key: string]: never }>;

export type BasicCategoriesQuery = {
  __typename?: "Query";
  basicCategories: Array<{
    __typename?: "BasicCategory";
    id: number;
    name: string;
  }>;
};

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never }>;

export type GetCategoriesQuery = {
  __typename?: "Query";
  categories: Array<{
    __typename?: "ProductCategory";
    id: number;
    name: string;
    path: string;
    slug: string;
    children?:
      | Array<{
          __typename?: "ProductCategory";
          id: number;
          name: string;
          path: string;
          slug: string;
        }>
      | null
      | undefined;
  }>;
};

export type GetOneCategoryQueryVariables = Exact<{
  path: Scalars["String"];
}>;

export type GetOneCategoryQuery = {
  __typename?: "Query";
  getOneCategory: {
    __typename?: "ProductCategory";
    id: number;
    name: string;
    path: string;
    description: string;
    children?:
      | Array<{
          __typename?: "ProductCategory";
          id: number;
          name: string;
          path: string;
          slug: string;
        }>
      | null
      | undefined;
  };
};

export type FindAllCustomerOrdersQueryVariables = Exact<{
  input: FindAllCustomerOrdersInput;
}>;

export type FindAllCustomerOrdersQuery = {
  __typename?: "Query";
  customerOrders: {
    __typename?: "PaginatedCustomerOrdersOutput";
    hasMore: boolean;
    totalCount: number;
    items: Array<{
      __typename?: "CustomerOrder";
      stripeSessionId?: string | null | undefined;
      id: number;
      orderNumber: string;
      grandTotal: number;
      purchaseCurrency: string;
      userId: string;
      createdAt: any;
      shippingCost: number;
      paymentType: string;
      totalAmount: number;
      orderStatus: { __typename?: "CustomerOrderStatus"; status: string };
    }>;
  };
};

export type FindOneCustomerOrderQueryVariables = Exact<{
  id: Scalars["Float"];
}>;

export type FindOneCustomerOrderQuery = {
  __typename?: "Query";
  oneCustomerOrder: {
    __typename?: "FindOneCustomerOrderOutput";
    isEditable: boolean;
    user?:
      | {
          __typename?: "User";
          id: string;
          firstName: string;
          lastName: string;
          deletedAt?: any | null | undefined;
        }
      | null
      | undefined;
    order: {
      __typename?: "CustomerOrder";
      stripeSessionId?: string | null | undefined;
      id: number;
      orderNumber: string;
      deliveryAddress: string;
      city: string;
      postalCode: string;
      totalAmount: number;
      shippingCost: number;
      grandTotal: number;
      purchaseCurrency: string;
      paymentType: string;
      createdAt: any;
      updatedAt: any;
      orderItems: Array<{
        __typename?: "CustomerOrderItem";
        quantity: number;
        sku: string;
        product: {
          __typename?: "Product";
          id: number;
          name: string;
          currentPrice: number;
          brand: { __typename?: "ProductBrand"; name: string };
          images: Array<{ __typename?: "ProductImage"; imageUrl: string }>;
          attributes: Array<{ __typename?: "ProductAttribute"; sku: string }>;
        };
      }>;
      orderStatus: { __typename?: "CustomerOrderStatus"; status: string };
    };
  };
};

export type MyCustomerOrdersQueryVariables = Exact<{
  input: FindMyCustomerOrdersInput;
}>;

export type MyCustomerOrdersQuery = {
  __typename?: "Query";
  myOrders: {
    __typename?: "PaginatedCustomerOrdersOutput";
    totalCount: number;
    hasMore: boolean;
    items: Array<{
      __typename?: "CustomerOrder";
      id: number;
      orderNumber: string;
      deliveryAddress: string;
      city: string;
      postalCode: string;
      grandTotal: number;
      purchaseCurrency: string;
      createdAt: any;
      orderStatus: { __typename?: "CustomerOrderStatus"; status: string };
    }>;
  };
};

export type FindProductBrandsQueryVariables = Exact<{
  input: FindProductBrandsInput;
}>;

export type FindProductBrandsQuery = {
  __typename?: "Query";
  productBrands: Array<{
    __typename?: "ProductBrand";
    id: number;
    name: string;
    path: string;
  }>;
};

export type FindAllProductReviewsQueryVariables = Exact<{
  input: FindAllProductReviewsInput;
}>;

export type FindAllProductReviewsQuery = {
  __typename?: "Query";
  allProductReviews: {
    __typename?: "QueryAllProductReviewsOutput";
    hasMore: boolean;
    totalCount: number;
    items: Array<{
      __typename?: "ProductReview";
      id: number;
      title: string;
      rating: number;
      wouldRecommend: boolean;
      isPublished: boolean;
      nickname: string;
      createdAt: any;
      productId: number;
      publishedAt?: any | null | undefined;
    }>;
  };
};

export type FindOneProductReviewQueryVariables = Exact<{
  id: Scalars["Float"];
}>;

export type FindOneProductReviewQuery = {
  __typename?: "Query";
  oneProductReview: {
    __typename?: "ProductReview";
    id: number;
    title: string;
    rating: number;
    wouldRecommend: boolean;
    content: string;
    isPublished: boolean;
    nickname: string;
    createdAt: any;
    productId: number;
    publishedAt?: any | null | undefined;
    updatedAt: any;
  };
};

export type PublishedProductReviewsQueryVariables = Exact<{
  input: FindPublishedProductReviewsInput;
}>;

export type PublishedProductReviewsQuery = {
  __typename?: "Query";
  publishedProductReviews: {
    __typename?: "PublishedProductReviewsOutput";
    totalCount: number;
    hasMore: boolean;
    averageRating: number;
    items: Array<{
      __typename?: "ProductReview";
      id: number;
      title: string;
      rating: number;
      wouldRecommend: boolean;
      content: string;
      isPublished: boolean;
      nickname: string;
      createdAt: any;
      productId: number;
      publishedAt?: any | null | undefined;
      updatedAt: any;
    }>;
  };
};

export type FindOneProductQueryVariables = Exact<{
  id: Scalars["Float"];
}>;

export type FindOneProductQuery = {
  __typename?: "Query";
  product: {
    __typename?: "Product";
    description: string;
    id: number;
    name: string;
    originalPrice: number;
    currentPrice: number;
    currentPriceLabel: string;
    isDiscontinued: boolean;
    attributes: Array<{
      __typename?: "ProductAttribute";
      sku: string;
      quantity: number;
      size: { __typename?: "ProductSize"; id: number; value: string };
      color: { __typename?: "ProductColor"; id: number; value: string };
    }>;
    brand: {
      __typename?: "ProductBrand";
      id: number;
      name: string;
      path: string;
    };
    images: Array<{
      __typename?: "ProductImage";
      id: number;
      imageUrl: string;
    }>;
  };
};

export type FindProductsBySkusQueryVariables = Exact<{
  input: FindProductsBySkusInput;
}>;

export type FindProductsBySkusQuery = {
  __typename?: "Query";
  productsBySku: {
    __typename?: "QueryProductsOutput";
    totalCount: number;
    hasMore: boolean;
    items: Array<{
      __typename?: "Product";
      id: number;
      name: string;
      originalPrice: number;
      currentPrice: number;
      currentPriceLabel: string;
      isDiscontinued: boolean;
      attributes: Array<{
        __typename?: "ProductAttribute";
        sku: string;
        quantity: number;
        size: { __typename?: "ProductSize"; id: number; value: string };
        color: { __typename?: "ProductColor"; id: number; value: string };
      }>;
      brand: {
        __typename?: "ProductBrand";
        id: number;
        name: string;
        path: string;
      };
      images: Array<{
        __typename?: "ProductImage";
        id: number;
        imageUrl: string;
      }>;
    }>;
  };
};

export type FindProductsQueryVariables = Exact<{
  input: FindProductsInput;
}>;

export type FindProductsQuery = {
  __typename?: "Query";
  products: {
    __typename?: "QueryProductsOutput";
    totalCount: number;
    hasMore: boolean;
    items: Array<{
      __typename?: "Product";
      id: number;
      name: string;
      originalPrice: number;
      currentPrice: number;
      currentPriceLabel: string;
      isDiscontinued: boolean;
      attributes: Array<{
        __typename?: "ProductAttribute";
        sku: string;
        quantity: number;
        size: { __typename?: "ProductSize"; id: number; value: string };
        color: { __typename?: "ProductColor"; id: number; value: string };
      }>;
      brand: {
        __typename?: "ProductBrand";
        id: number;
        name: string;
        path: string;
      };
      images: Array<{
        __typename?: "ProductImage";
        id: number;
        imageUrl: string;
      }>;
    }>;
  };
};

export type SearchProductsQueryVariables = Exact<{
  input: SearchProductsInput;
}>;

export type SearchProductsQuery = {
  __typename?: "Query";
  searchProducts: Array<{ __typename?: "Product"; id: number; name: string }>;
};

export type FindAllUsersQueryVariables = Exact<{
  input: FindAllUsersInput;
}>;

export type FindAllUsersQuery = {
  __typename?: "Query";
  users: {
    __typename?: "PaginatedUsersOutput";
    totalCount: number;
    hasMore: boolean;
    items: Array<{
      __typename?: "User";
      createdAt: any;
      updatedAt: any;
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      mobilePhoneNumber?: string | null | undefined;
      isRegisteredWithGoogle: boolean;
      isEmailConfirmed: boolean;
      isAdmin: boolean;
    }>;
  };
};

export type FindOneUserQueryVariables = Exact<{
  id: Scalars["String"];
}>;

export type FindOneUserQuery = {
  __typename?: "Query";
  user: {
    __typename?: "User";
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    mobilePhoneNumber?: string | null | undefined;
    isRegisteredWithGoogle: boolean;
    isEmailConfirmed: boolean;
    isAdmin: boolean;
    address?:
      | {
          __typename?: "UserAddress";
          id: number;
          city: string;
          street: string;
          postalCode: string;
        }
      | null
      | undefined;
  };
};

export type HasPasswordQueryVariables = Exact<{ [key: string]: never }>;

export type HasPasswordQuery = { __typename?: "Query"; hasPassword: boolean };

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: "Query";
  me: {
    __typename?: "User";
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    mobilePhoneNumber?: string | null | undefined;
    isRegisteredWithGoogle: boolean;
    isEmailConfirmed: boolean;
    isAdmin: boolean;
    address?:
      | {
          __typename?: "UserAddress";
          id: number;
          city: string;
          street: string;
          postalCode: string;
        }
      | null
      | undefined;
  };
};

export const CoreCategoryFieldsFragmentDoc = gql`
  fragment CoreCategoryFields on ProductCategory {
    id
    name
    path
    slug
  }
`;
export const CoreCustomerOrderFieldsFragmentDoc = gql`
  fragment CoreCustomerOrderFields on CustomerOrder {
    id
    orderNumber
    deliveryAddress
    city
    postalCode
    totalAmount
    shippingCost
    grandTotal
    purchaseCurrency
    paymentType
    createdAt
    updatedAt
    orderStatus {
      status
    }
  }
`;
export const CoreAttributeFieldsFragmentDoc = gql`
  fragment CoreAttributeFields on ProductAttribute {
    sku
    quantity
    size {
      id
      value
    }
    color {
      id
      value
    }
  }
`;
export const CoreProductFieldsFragmentDoc = gql`
  fragment CoreProductFields on Product {
    id
    name
    originalPrice
    currentPrice
    currentPriceLabel
    isDiscontinued
    brand {
      id
      name
      path
    }
    images {
      id
      imageUrl
    }
  }
`;
export const CoreProductReviewFieldsFragmentDoc = gql`
  fragment CoreProductReviewFields on ProductReview {
    id
    title
    rating
    wouldRecommend
    content
    isPublished
    nickname
    createdAt
    productId
    publishedAt
    updatedAt
  }
`;
export const ProductReviewPartsFragmentDoc = gql`
  fragment ProductReviewParts on ProductReview {
    id
    title
    rating
    wouldRecommend
    isPublished
    nickname
    createdAt
    productId
    publishedAt
  }
`;
export const CoreAddressFieldsFragmentDoc = gql`
  fragment CoreAddressFields on UserAddress {
    id
    city
    street
    postalCode
  }
`;
export const CoreUserFieldsFragmentDoc = gql`
  fragment CoreUserFields on User {
    id
    firstName
    lastName
    email
    mobilePhoneNumber
    isRegisteredWithGoogle
    isEmailConfirmed
    isAdmin
  }
`;
export const UpdateCustomerOrderDocument = gql`
  mutation UpdateCustomerOrder($input: UpdateCustomerOrderInput!) {
    updateCustomerOrder(input: $input)
  }
`;
export type UpdateCustomerOrderMutationFn = Apollo.MutationFunction<
  UpdateCustomerOrderMutation,
  UpdateCustomerOrderMutationVariables
>;

/**
 * __useUpdateCustomerOrderMutation__
 *
 * To run a mutation, you first call `useUpdateCustomerOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCustomerOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCustomerOrderMutation, { data, loading, error }] = useUpdateCustomerOrderMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCustomerOrderMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateCustomerOrderMutation,
    UpdateCustomerOrderMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateCustomerOrderMutation,
    UpdateCustomerOrderMutationVariables
  >(UpdateCustomerOrderDocument, options);
}
export type UpdateCustomerOrderMutationHookResult = ReturnType<
  typeof useUpdateCustomerOrderMutation
>;
export type UpdateCustomerOrderMutationResult =
  Apollo.MutationResult<UpdateCustomerOrderMutation>;
export type UpdateCustomerOrderMutationOptions = Apollo.BaseMutationOptions<
  UpdateCustomerOrderMutation,
  UpdateCustomerOrderMutationVariables
>;
export const CreateProductReviewDocument = gql`
  mutation CreateProductReview($input: CreateProductReviewInput!) {
    createProductReview(input: $input) {
      ...CoreProductReviewFields
    }
  }
  ${CoreProductReviewFieldsFragmentDoc}
`;
export type CreateProductReviewMutationFn = Apollo.MutationFunction<
  CreateProductReviewMutation,
  CreateProductReviewMutationVariables
>;

/**
 * __useCreateProductReviewMutation__
 *
 * To run a mutation, you first call `useCreateProductReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductReviewMutation, { data, loading, error }] = useCreateProductReviewMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateProductReviewMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateProductReviewMutation,
    CreateProductReviewMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateProductReviewMutation,
    CreateProductReviewMutationVariables
  >(CreateProductReviewDocument, options);
}
export type CreateProductReviewMutationHookResult = ReturnType<
  typeof useCreateProductReviewMutation
>;
export type CreateProductReviewMutationResult =
  Apollo.MutationResult<CreateProductReviewMutation>;
export type CreateProductReviewMutationOptions = Apollo.BaseMutationOptions<
  CreateProductReviewMutation,
  CreateProductReviewMutationVariables
>;
export const DeleteProductReviewDocument = gql`
  mutation DeleteProductReview($id: Float!) {
    deleteProductReview(id: $id)
  }
`;
export type DeleteProductReviewMutationFn = Apollo.MutationFunction<
  DeleteProductReviewMutation,
  DeleteProductReviewMutationVariables
>;

/**
 * __useDeleteProductReviewMutation__
 *
 * To run a mutation, you first call `useDeleteProductReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProductReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProductReviewMutation, { data, loading, error }] = useDeleteProductReviewMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteProductReviewMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteProductReviewMutation,
    DeleteProductReviewMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteProductReviewMutation,
    DeleteProductReviewMutationVariables
  >(DeleteProductReviewDocument, options);
}
export type DeleteProductReviewMutationHookResult = ReturnType<
  typeof useDeleteProductReviewMutation
>;
export type DeleteProductReviewMutationResult =
  Apollo.MutationResult<DeleteProductReviewMutation>;
export type DeleteProductReviewMutationOptions = Apollo.BaseMutationOptions<
  DeleteProductReviewMutation,
  DeleteProductReviewMutationVariables
>;
export const UpdateProductReviewDocument = gql`
  mutation UpdateProductReview($input: UpdateProductReviewInput!) {
    updateProductReview(input: $input) {
      id
    }
  }
`;
export type UpdateProductReviewMutationFn = Apollo.MutationFunction<
  UpdateProductReviewMutation,
  UpdateProductReviewMutationVariables
>;

/**
 * __useUpdateProductReviewMutation__
 *
 * To run a mutation, you first call `useUpdateProductReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProductReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProductReviewMutation, { data, loading, error }] = useUpdateProductReviewMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateProductReviewMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateProductReviewMutation,
    UpdateProductReviewMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateProductReviewMutation,
    UpdateProductReviewMutationVariables
  >(UpdateProductReviewDocument, options);
}
export type UpdateProductReviewMutationHookResult = ReturnType<
  typeof useUpdateProductReviewMutation
>;
export type UpdateProductReviewMutationResult =
  Apollo.MutationResult<UpdateProductReviewMutation>;
export type UpdateProductReviewMutationOptions = Apollo.BaseMutationOptions<
  UpdateProductReviewMutation,
  UpdateProductReviewMutationVariables
>;
export const CreateProductDocument = gql`
  mutation CreateProduct($input: CreateProductInput!) {
    createProduct(input: $input) {
      id
      attributes {
        ...CoreAttributeFields
      }
    }
  }
  ${CoreAttributeFieldsFragmentDoc}
`;
export type CreateProductMutationFn = Apollo.MutationFunction<
  CreateProductMutation,
  CreateProductMutationVariables
>;

/**
 * __useCreateProductMutation__
 *
 * To run a mutation, you first call `useCreateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductMutation, { data, loading, error }] = useCreateProductMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateProductMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateProductMutation,
    CreateProductMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateProductMutation,
    CreateProductMutationVariables
  >(CreateProductDocument, options);
}
export type CreateProductMutationHookResult = ReturnType<
  typeof useCreateProductMutation
>;
export type CreateProductMutationResult =
  Apollo.MutationResult<CreateProductMutation>;
export type CreateProductMutationOptions = Apollo.BaseMutationOptions<
  CreateProductMutation,
  CreateProductMutationVariables
>;
export const DeleteProductDocument = gql`
  mutation DeleteProduct($id: Float!) {
    deleteProduct(id: $id)
  }
`;
export type DeleteProductMutationFn = Apollo.MutationFunction<
  DeleteProductMutation,
  DeleteProductMutationVariables
>;

/**
 * __useDeleteProductMutation__
 *
 * To run a mutation, you first call `useDeleteProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProductMutation, { data, loading, error }] = useDeleteProductMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteProductMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteProductMutation,
    DeleteProductMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteProductMutation,
    DeleteProductMutationVariables
  >(DeleteProductDocument, options);
}
export type DeleteProductMutationHookResult = ReturnType<
  typeof useDeleteProductMutation
>;
export type DeleteProductMutationResult =
  Apollo.MutationResult<DeleteProductMutation>;
export type DeleteProductMutationOptions = Apollo.BaseMutationOptions<
  DeleteProductMutation,
  DeleteProductMutationVariables
>;
export const UpdateProductDocument = gql`
  mutation UpdateProduct($input: UpdateProductInput!) {
    updateProduct(input: $input) {
      ...CoreProductFields
      attributes {
        ...CoreAttributeFields
      }
    }
  }
  ${CoreProductFieldsFragmentDoc}
  ${CoreAttributeFieldsFragmentDoc}
`;
export type UpdateProductMutationFn = Apollo.MutationFunction<
  UpdateProductMutation,
  UpdateProductMutationVariables
>;

/**
 * __useUpdateProductMutation__
 *
 * To run a mutation, you first call `useUpdateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProductMutation, { data, loading, error }] = useUpdateProductMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateProductMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateProductMutation,
    UpdateProductMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateProductMutation,
    UpdateProductMutationVariables
  >(UpdateProductDocument, options);
}
export type UpdateProductMutationHookResult = ReturnType<
  typeof useUpdateProductMutation
>;
export type UpdateProductMutationResult =
  Apollo.MutationResult<UpdateProductMutation>;
export type UpdateProductMutationOptions = Apollo.BaseMutationOptions<
  UpdateProductMutation,
  UpdateProductMutationVariables
>;
export const CreateOrGetCustomerOrderWithStripeDocument = gql`
  mutation CreateOrGetCustomerOrderWithStripe($stripeSessionId: String!) {
    createOrGetCustomerOrderWithStripe(stripeSessionId: $stripeSessionId) {
      wasCreated
      order {
        stripeSessionId
        orderNumber
        grandTotal
        paymentType
        purchaseCurrency
      }
      user {
        email
      }
    }
  }
`;
export type CreateOrGetCustomerOrderWithStripeMutationFn =
  Apollo.MutationFunction<
    CreateOrGetCustomerOrderWithStripeMutation,
    CreateOrGetCustomerOrderWithStripeMutationVariables
  >;

/**
 * __useCreateOrGetCustomerOrderWithStripeMutation__
 *
 * To run a mutation, you first call `useCreateOrGetCustomerOrderWithStripeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrGetCustomerOrderWithStripeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrGetCustomerOrderWithStripeMutation, { data, loading, error }] = useCreateOrGetCustomerOrderWithStripeMutation({
 *   variables: {
 *      stripeSessionId: // value for 'stripeSessionId'
 *   },
 * });
 */
export function useCreateOrGetCustomerOrderWithStripeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateOrGetCustomerOrderWithStripeMutation,
    CreateOrGetCustomerOrderWithStripeMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateOrGetCustomerOrderWithStripeMutation,
    CreateOrGetCustomerOrderWithStripeMutationVariables
  >(CreateOrGetCustomerOrderWithStripeDocument, options);
}
export type CreateOrGetCustomerOrderWithStripeMutationHookResult = ReturnType<
  typeof useCreateOrGetCustomerOrderWithStripeMutation
>;
export type CreateOrGetCustomerOrderWithStripeMutationResult =
  Apollo.MutationResult<CreateOrGetCustomerOrderWithStripeMutation>;
export type CreateOrGetCustomerOrderWithStripeMutationOptions =
  Apollo.BaseMutationOptions<
    CreateOrGetCustomerOrderWithStripeMutation,
    CreateOrGetCustomerOrderWithStripeMutationVariables
  >;
export const AdminDeleteUserDocument = gql`
  mutation AdminDeleteUser($input: DeleteUserInput!) {
    deleteUser(input: $input)
  }
`;
export type AdminDeleteUserMutationFn = Apollo.MutationFunction<
  AdminDeleteUserMutation,
  AdminDeleteUserMutationVariables
>;

/**
 * __useAdminDeleteUserMutation__
 *
 * To run a mutation, you first call `useAdminDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminDeleteUserMutation, { data, loading, error }] = useAdminDeleteUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAdminDeleteUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AdminDeleteUserMutation,
    AdminDeleteUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    AdminDeleteUserMutation,
    AdminDeleteUserMutationVariables
  >(AdminDeleteUserDocument, options);
}
export type AdminDeleteUserMutationHookResult = ReturnType<
  typeof useAdminDeleteUserMutation
>;
export type AdminDeleteUserMutationResult =
  Apollo.MutationResult<AdminDeleteUserMutation>;
export type AdminDeleteUserMutationOptions = Apollo.BaseMutationOptions<
  AdminDeleteUserMutation,
  AdminDeleteUserMutationVariables
>;
export const AdminUpdateUserDocument = gql`
  mutation AdminUpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      id
    }
  }
`;
export type AdminUpdateUserMutationFn = Apollo.MutationFunction<
  AdminUpdateUserMutation,
  AdminUpdateUserMutationVariables
>;

/**
 * __useAdminUpdateUserMutation__
 *
 * To run a mutation, you first call `useAdminUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminUpdateUserMutation, { data, loading, error }] = useAdminUpdateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAdminUpdateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AdminUpdateUserMutation,
    AdminUpdateUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    AdminUpdateUserMutation,
    AdminUpdateUserMutationVariables
  >(AdminUpdateUserDocument, options);
}
export type AdminUpdateUserMutationHookResult = ReturnType<
  typeof useAdminUpdateUserMutation
>;
export type AdminUpdateUserMutationResult =
  Apollo.MutationResult<AdminUpdateUserMutation>;
export type AdminUpdateUserMutationOptions = Apollo.BaseMutationOptions<
  AdminUpdateUserMutation,
  AdminUpdateUserMutationVariables
>;
export const AuthenticateWithGoogleDocument = gql`
  mutation AuthenticateWithGoogle($googleAuthToken: String!) {
    authenticateWithGoogle(googleAuthToken: $googleAuthToken) {
      accessToken
      refreshToken
    }
  }
`;
export type AuthenticateWithGoogleMutationFn = Apollo.MutationFunction<
  AuthenticateWithGoogleMutation,
  AuthenticateWithGoogleMutationVariables
>;

/**
 * __useAuthenticateWithGoogleMutation__
 *
 * To run a mutation, you first call `useAuthenticateWithGoogleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthenticateWithGoogleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authenticateWithGoogleMutation, { data, loading, error }] = useAuthenticateWithGoogleMutation({
 *   variables: {
 *      googleAuthToken: // value for 'googleAuthToken'
 *   },
 * });
 */
export function useAuthenticateWithGoogleMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AuthenticateWithGoogleMutation,
    AuthenticateWithGoogleMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    AuthenticateWithGoogleMutation,
    AuthenticateWithGoogleMutationVariables
  >(AuthenticateWithGoogleDocument, options);
}
export type AuthenticateWithGoogleMutationHookResult = ReturnType<
  typeof useAuthenticateWithGoogleMutation
>;
export type AuthenticateWithGoogleMutationResult =
  Apollo.MutationResult<AuthenticateWithGoogleMutation>;
export type AuthenticateWithGoogleMutationOptions = Apollo.BaseMutationOptions<
  AuthenticateWithGoogleMutation,
  AuthenticateWithGoogleMutationVariables
>;
export const LoginUserDocument = gql`
  mutation LoginUser($input: LoginUserDto!) {
    login(input: $input) {
      accessToken
      refreshToken
    }
  }
`;
export type LoginUserMutationFn = Apollo.MutationFunction<
  LoginUserMutation,
  LoginUserMutationVariables
>;

/**
 * __useLoginUserMutation__
 *
 * To run a mutation, you first call `useLoginUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginUserMutation, { data, loading, error }] = useLoginUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginUserMutation,
    LoginUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LoginUserMutation, LoginUserMutationVariables>(
    LoginUserDocument,
    options
  );
}
export type LoginUserMutationHookResult = ReturnType<
  typeof useLoginUserMutation
>;
export type LoginUserMutationResult = Apollo.MutationResult<LoginUserMutation>;
export type LoginUserMutationOptions = Apollo.BaseMutationOptions<
  LoginUserMutation,
  LoginUserMutationVariables
>;
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`;
export type LogoutMutationFn = Apollo.MutationFunction<
  LogoutMutation,
  LogoutMutationVariables
>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LogoutMutation,
    LogoutMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument,
    options
  );
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<
  LogoutMutation,
  LogoutMutationVariables
>;
export const RegisterUserDocument = gql`
  mutation RegisterUser($input: RegisterUserDto!) {
    registerUser(input: $input) {
      user {
        id
      }
      accessToken
      refreshToken
    }
  }
`;
export type RegisterUserMutationFn = Apollo.MutationFunction<
  RegisterUserMutation,
  RegisterUserMutationVariables
>;

/**
 * __useRegisterUserMutation__
 *
 * To run a mutation, you first call `useRegisterUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerUserMutation, { data, loading, error }] = useRegisterUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RegisterUserMutation,
    RegisterUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    RegisterUserMutation,
    RegisterUserMutationVariables
  >(RegisterUserDocument, options);
}
export type RegisterUserMutationHookResult = ReturnType<
  typeof useRegisterUserMutation
>;
export type RegisterUserMutationResult =
  Apollo.MutationResult<RegisterUserMutation>;
export type RegisterUserMutationOptions = Apollo.BaseMutationOptions<
  RegisterUserMutation,
  RegisterUserMutationVariables
>;
export const UpdatePasswordDocument = gql`
  mutation UpdatePassword($input: UpdateUserPasswordInput!) {
    updatePassword(input: $input)
  }
`;
export type UpdatePasswordMutationFn = Apollo.MutationFunction<
  UpdatePasswordMutation,
  UpdatePasswordMutationVariables
>;

/**
 * __useUpdatePasswordMutation__
 *
 * To run a mutation, you first call `useUpdatePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePasswordMutation, { data, loading, error }] = useUpdatePasswordMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePasswordMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdatePasswordMutation,
    UpdatePasswordMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdatePasswordMutation,
    UpdatePasswordMutationVariables
  >(UpdatePasswordDocument, options);
}
export type UpdatePasswordMutationHookResult = ReturnType<
  typeof useUpdatePasswordMutation
>;
export type UpdatePasswordMutationResult =
  Apollo.MutationResult<UpdatePasswordMutation>;
export type UpdatePasswordMutationOptions = Apollo.BaseMutationOptions<
  UpdatePasswordMutation,
  UpdatePasswordMutationVariables
>;
export const UpdateUserAddressDocument = gql`
  mutation UpdateUserAddress($input: UpdateUserAddressInput!) {
    updateUserAddress(input: $input) {
      id
    }
  }
`;
export type UpdateUserAddressMutationFn = Apollo.MutationFunction<
  UpdateUserAddressMutation,
  UpdateUserAddressMutationVariables
>;

/**
 * __useUpdateUserAddressMutation__
 *
 * To run a mutation, you first call `useUpdateUserAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserAddressMutation, { data, loading, error }] = useUpdateUserAddressMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserAddressMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateUserAddressMutation,
    UpdateUserAddressMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateUserAddressMutation,
    UpdateUserAddressMutationVariables
  >(UpdateUserAddressDocument, options);
}
export type UpdateUserAddressMutationHookResult = ReturnType<
  typeof useUpdateUserAddressMutation
>;
export type UpdateUserAddressMutationResult =
  Apollo.MutationResult<UpdateUserAddressMutation>;
export type UpdateUserAddressMutationOptions = Apollo.BaseMutationOptions<
  UpdateUserAddressMutation,
  UpdateUserAddressMutationVariables
>;
export const BasicCategoriesDocument = gql`
  query BasicCategories {
    basicCategories {
      id
      name
    }
  }
`;

/**
 * __useBasicCategoriesQuery__
 *
 * To run a query within a React component, call `useBasicCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useBasicCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBasicCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useBasicCategoriesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    BasicCategoriesQuery,
    BasicCategoriesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<BasicCategoriesQuery, BasicCategoriesQueryVariables>(
    BasicCategoriesDocument,
    options
  );
}
export function useBasicCategoriesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    BasicCategoriesQuery,
    BasicCategoriesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    BasicCategoriesQuery,
    BasicCategoriesQueryVariables
  >(BasicCategoriesDocument, options);
}
export type BasicCategoriesQueryHookResult = ReturnType<
  typeof useBasicCategoriesQuery
>;
export type BasicCategoriesLazyQueryHookResult = ReturnType<
  typeof useBasicCategoriesLazyQuery
>;
export type BasicCategoriesQueryResult = Apollo.QueryResult<
  BasicCategoriesQuery,
  BasicCategoriesQueryVariables
>;
export function refetchBasicCategoriesQuery(
  variables?: BasicCategoriesQueryVariables
) {
  return { query: BasicCategoriesDocument, variables: variables };
}
export const GetCategoriesDocument = gql`
  query GetCategories {
    categories {
      ...CoreCategoryFields
      children {
        ...CoreCategoryFields
      }
    }
  }
  ${CoreCategoryFieldsFragmentDoc}
`;

/**
 * __useGetCategoriesQuery__
 *
 * To run a query within a React component, call `useGetCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCategoriesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetCategoriesQuery,
    GetCategoriesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(
    GetCategoriesDocument,
    options
  );
}
export function useGetCategoriesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCategoriesQuery,
    GetCategoriesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(
    GetCategoriesDocument,
    options
  );
}
export type GetCategoriesQueryHookResult = ReturnType<
  typeof useGetCategoriesQuery
>;
export type GetCategoriesLazyQueryHookResult = ReturnType<
  typeof useGetCategoriesLazyQuery
>;
export type GetCategoriesQueryResult = Apollo.QueryResult<
  GetCategoriesQuery,
  GetCategoriesQueryVariables
>;
export function refetchGetCategoriesQuery(
  variables?: GetCategoriesQueryVariables
) {
  return { query: GetCategoriesDocument, variables: variables };
}
export const GetOneCategoryDocument = gql`
  query GetOneCategory($path: String!) {
    getOneCategory(path: $path) {
      id
      name
      path
      description
      children {
        id
        name
        path
        slug
      }
    }
  }
`;

/**
 * __useGetOneCategoryQuery__
 *
 * To run a query within a React component, call `useGetOneCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOneCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOneCategoryQuery({
 *   variables: {
 *      path: // value for 'path'
 *   },
 * });
 */
export function useGetOneCategoryQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetOneCategoryQuery,
    GetOneCategoryQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetOneCategoryQuery, GetOneCategoryQueryVariables>(
    GetOneCategoryDocument,
    options
  );
}
export function useGetOneCategoryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetOneCategoryQuery,
    GetOneCategoryQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetOneCategoryQuery, GetOneCategoryQueryVariables>(
    GetOneCategoryDocument,
    options
  );
}
export type GetOneCategoryQueryHookResult = ReturnType<
  typeof useGetOneCategoryQuery
>;
export type GetOneCategoryLazyQueryHookResult = ReturnType<
  typeof useGetOneCategoryLazyQuery
>;
export type GetOneCategoryQueryResult = Apollo.QueryResult<
  GetOneCategoryQuery,
  GetOneCategoryQueryVariables
>;
export function refetchGetOneCategoryQuery(
  variables: GetOneCategoryQueryVariables
) {
  return { query: GetOneCategoryDocument, variables: variables };
}
export const FindAllCustomerOrdersDocument = gql`
  query FindAllCustomerOrders($input: FindAllCustomerOrdersInput!) {
    customerOrders(input: $input) {
      hasMore
      totalCount
      items {
        stripeSessionId
        id
        orderNumber
        grandTotal
        purchaseCurrency
        userId
        createdAt
        shippingCost
        paymentType
        totalAmount
        orderStatus {
          status
        }
      }
    }
  }
`;

/**
 * __useFindAllCustomerOrdersQuery__
 *
 * To run a query within a React component, call `useFindAllCustomerOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllCustomerOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllCustomerOrdersQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFindAllCustomerOrdersQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindAllCustomerOrdersQuery,
    FindAllCustomerOrdersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    FindAllCustomerOrdersQuery,
    FindAllCustomerOrdersQueryVariables
  >(FindAllCustomerOrdersDocument, options);
}
export function useFindAllCustomerOrdersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindAllCustomerOrdersQuery,
    FindAllCustomerOrdersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FindAllCustomerOrdersQuery,
    FindAllCustomerOrdersQueryVariables
  >(FindAllCustomerOrdersDocument, options);
}
export type FindAllCustomerOrdersQueryHookResult = ReturnType<
  typeof useFindAllCustomerOrdersQuery
>;
export type FindAllCustomerOrdersLazyQueryHookResult = ReturnType<
  typeof useFindAllCustomerOrdersLazyQuery
>;
export type FindAllCustomerOrdersQueryResult = Apollo.QueryResult<
  FindAllCustomerOrdersQuery,
  FindAllCustomerOrdersQueryVariables
>;
export function refetchFindAllCustomerOrdersQuery(
  variables: FindAllCustomerOrdersQueryVariables
) {
  return { query: FindAllCustomerOrdersDocument, variables: variables };
}
export const FindOneCustomerOrderDocument = gql`
  query FindOneCustomerOrder($id: Float!) {
    oneCustomerOrder(id: $id) {
      isEditable
      user {
        id
        firstName
        lastName
        deletedAt
      }
      order {
        ...CoreCustomerOrderFields
        stripeSessionId
        orderItems {
          quantity
          sku
          product {
            id
            name
            currentPrice
            brand {
              name
            }
            images {
              imageUrl
            }
            attributes {
              sku
            }
          }
        }
      }
    }
  }
  ${CoreCustomerOrderFieldsFragmentDoc}
`;

/**
 * __useFindOneCustomerOrderQuery__
 *
 * To run a query within a React component, call `useFindOneCustomerOrderQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindOneCustomerOrderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindOneCustomerOrderQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFindOneCustomerOrderQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindOneCustomerOrderQuery,
    FindOneCustomerOrderQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    FindOneCustomerOrderQuery,
    FindOneCustomerOrderQueryVariables
  >(FindOneCustomerOrderDocument, options);
}
export function useFindOneCustomerOrderLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindOneCustomerOrderQuery,
    FindOneCustomerOrderQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FindOneCustomerOrderQuery,
    FindOneCustomerOrderQueryVariables
  >(FindOneCustomerOrderDocument, options);
}
export type FindOneCustomerOrderQueryHookResult = ReturnType<
  typeof useFindOneCustomerOrderQuery
>;
export type FindOneCustomerOrderLazyQueryHookResult = ReturnType<
  typeof useFindOneCustomerOrderLazyQuery
>;
export type FindOneCustomerOrderQueryResult = Apollo.QueryResult<
  FindOneCustomerOrderQuery,
  FindOneCustomerOrderQueryVariables
>;
export function refetchFindOneCustomerOrderQuery(
  variables: FindOneCustomerOrderQueryVariables
) {
  return { query: FindOneCustomerOrderDocument, variables: variables };
}
export const MyCustomerOrdersDocument = gql`
  query MyCustomerOrders($input: FindMyCustomerOrdersInput!) {
    myOrders(input: $input) {
      totalCount
      hasMore
      items {
        id
        orderNumber
        deliveryAddress
        city
        postalCode
        grandTotal
        purchaseCurrency
        createdAt
        orderStatus {
          status
        }
      }
    }
  }
`;

/**
 * __useMyCustomerOrdersQuery__
 *
 * To run a query within a React component, call `useMyCustomerOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyCustomerOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyCustomerOrdersQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMyCustomerOrdersQuery(
  baseOptions: Apollo.QueryHookOptions<
    MyCustomerOrdersQuery,
    MyCustomerOrdersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MyCustomerOrdersQuery, MyCustomerOrdersQueryVariables>(
    MyCustomerOrdersDocument,
    options
  );
}
export function useMyCustomerOrdersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    MyCustomerOrdersQuery,
    MyCustomerOrdersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    MyCustomerOrdersQuery,
    MyCustomerOrdersQueryVariables
  >(MyCustomerOrdersDocument, options);
}
export type MyCustomerOrdersQueryHookResult = ReturnType<
  typeof useMyCustomerOrdersQuery
>;
export type MyCustomerOrdersLazyQueryHookResult = ReturnType<
  typeof useMyCustomerOrdersLazyQuery
>;
export type MyCustomerOrdersQueryResult = Apollo.QueryResult<
  MyCustomerOrdersQuery,
  MyCustomerOrdersQueryVariables
>;
export function refetchMyCustomerOrdersQuery(
  variables: MyCustomerOrdersQueryVariables
) {
  return { query: MyCustomerOrdersDocument, variables: variables };
}
export const FindProductBrandsDocument = gql`
  query FindProductBrands($input: FindProductBrandsInput!) {
    productBrands(input: $input) {
      id
      name
      path
    }
  }
`;

/**
 * __useFindProductBrandsQuery__
 *
 * To run a query within a React component, call `useFindProductBrandsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindProductBrandsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindProductBrandsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFindProductBrandsQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindProductBrandsQuery,
    FindProductBrandsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    FindProductBrandsQuery,
    FindProductBrandsQueryVariables
  >(FindProductBrandsDocument, options);
}
export function useFindProductBrandsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindProductBrandsQuery,
    FindProductBrandsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FindProductBrandsQuery,
    FindProductBrandsQueryVariables
  >(FindProductBrandsDocument, options);
}
export type FindProductBrandsQueryHookResult = ReturnType<
  typeof useFindProductBrandsQuery
>;
export type FindProductBrandsLazyQueryHookResult = ReturnType<
  typeof useFindProductBrandsLazyQuery
>;
export type FindProductBrandsQueryResult = Apollo.QueryResult<
  FindProductBrandsQuery,
  FindProductBrandsQueryVariables
>;
export function refetchFindProductBrandsQuery(
  variables: FindProductBrandsQueryVariables
) {
  return { query: FindProductBrandsDocument, variables: variables };
}
export const FindAllProductReviewsDocument = gql`
  query FindAllProductReviews($input: FindAllProductReviewsInput!) {
    allProductReviews(input: $input) {
      hasMore
      totalCount
      items {
        ...ProductReviewParts
      }
    }
  }
  ${ProductReviewPartsFragmentDoc}
`;

/**
 * __useFindAllProductReviewsQuery__
 *
 * To run a query within a React component, call `useFindAllProductReviewsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllProductReviewsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllProductReviewsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFindAllProductReviewsQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindAllProductReviewsQuery,
    FindAllProductReviewsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    FindAllProductReviewsQuery,
    FindAllProductReviewsQueryVariables
  >(FindAllProductReviewsDocument, options);
}
export function useFindAllProductReviewsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindAllProductReviewsQuery,
    FindAllProductReviewsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FindAllProductReviewsQuery,
    FindAllProductReviewsQueryVariables
  >(FindAllProductReviewsDocument, options);
}
export type FindAllProductReviewsQueryHookResult = ReturnType<
  typeof useFindAllProductReviewsQuery
>;
export type FindAllProductReviewsLazyQueryHookResult = ReturnType<
  typeof useFindAllProductReviewsLazyQuery
>;
export type FindAllProductReviewsQueryResult = Apollo.QueryResult<
  FindAllProductReviewsQuery,
  FindAllProductReviewsQueryVariables
>;
export function refetchFindAllProductReviewsQuery(
  variables: FindAllProductReviewsQueryVariables
) {
  return { query: FindAllProductReviewsDocument, variables: variables };
}
export const FindOneProductReviewDocument = gql`
  query FindOneProductReview($id: Float!) {
    oneProductReview(id: $id) {
      ...CoreProductReviewFields
    }
  }
  ${CoreProductReviewFieldsFragmentDoc}
`;

/**
 * __useFindOneProductReviewQuery__
 *
 * To run a query within a React component, call `useFindOneProductReviewQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindOneProductReviewQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindOneProductReviewQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFindOneProductReviewQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindOneProductReviewQuery,
    FindOneProductReviewQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    FindOneProductReviewQuery,
    FindOneProductReviewQueryVariables
  >(FindOneProductReviewDocument, options);
}
export function useFindOneProductReviewLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindOneProductReviewQuery,
    FindOneProductReviewQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FindOneProductReviewQuery,
    FindOneProductReviewQueryVariables
  >(FindOneProductReviewDocument, options);
}
export type FindOneProductReviewQueryHookResult = ReturnType<
  typeof useFindOneProductReviewQuery
>;
export type FindOneProductReviewLazyQueryHookResult = ReturnType<
  typeof useFindOneProductReviewLazyQuery
>;
export type FindOneProductReviewQueryResult = Apollo.QueryResult<
  FindOneProductReviewQuery,
  FindOneProductReviewQueryVariables
>;
export function refetchFindOneProductReviewQuery(
  variables: FindOneProductReviewQueryVariables
) {
  return { query: FindOneProductReviewDocument, variables: variables };
}
export const PublishedProductReviewsDocument = gql`
  query PublishedProductReviews($input: FindPublishedProductReviewsInput!) {
    publishedProductReviews(input: $input) {
      totalCount
      hasMore
      averageRating
      items {
        ...CoreProductReviewFields
      }
    }
  }
  ${CoreProductReviewFieldsFragmentDoc}
`;

/**
 * __usePublishedProductReviewsQuery__
 *
 * To run a query within a React component, call `usePublishedProductReviewsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePublishedProductReviewsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePublishedProductReviewsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePublishedProductReviewsQuery(
  baseOptions: Apollo.QueryHookOptions<
    PublishedProductReviewsQuery,
    PublishedProductReviewsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    PublishedProductReviewsQuery,
    PublishedProductReviewsQueryVariables
  >(PublishedProductReviewsDocument, options);
}
export function usePublishedProductReviewsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PublishedProductReviewsQuery,
    PublishedProductReviewsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    PublishedProductReviewsQuery,
    PublishedProductReviewsQueryVariables
  >(PublishedProductReviewsDocument, options);
}
export type PublishedProductReviewsQueryHookResult = ReturnType<
  typeof usePublishedProductReviewsQuery
>;
export type PublishedProductReviewsLazyQueryHookResult = ReturnType<
  typeof usePublishedProductReviewsLazyQuery
>;
export type PublishedProductReviewsQueryResult = Apollo.QueryResult<
  PublishedProductReviewsQuery,
  PublishedProductReviewsQueryVariables
>;
export function refetchPublishedProductReviewsQuery(
  variables: PublishedProductReviewsQueryVariables
) {
  return { query: PublishedProductReviewsDocument, variables: variables };
}
export const FindOneProductDocument = gql`
  query FindOneProduct($id: Float!) {
    product(id: $id) {
      ...CoreProductFields
      description
      attributes {
        ...CoreAttributeFields
      }
    }
  }
  ${CoreProductFieldsFragmentDoc}
  ${CoreAttributeFieldsFragmentDoc}
`;

/**
 * __useFindOneProductQuery__
 *
 * To run a query within a React component, call `useFindOneProductQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindOneProductQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindOneProductQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFindOneProductQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindOneProductQuery,
    FindOneProductQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FindOneProductQuery, FindOneProductQueryVariables>(
    FindOneProductDocument,
    options
  );
}
export function useFindOneProductLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindOneProductQuery,
    FindOneProductQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FindOneProductQuery, FindOneProductQueryVariables>(
    FindOneProductDocument,
    options
  );
}
export type FindOneProductQueryHookResult = ReturnType<
  typeof useFindOneProductQuery
>;
export type FindOneProductLazyQueryHookResult = ReturnType<
  typeof useFindOneProductLazyQuery
>;
export type FindOneProductQueryResult = Apollo.QueryResult<
  FindOneProductQuery,
  FindOneProductQueryVariables
>;
export function refetchFindOneProductQuery(
  variables: FindOneProductQueryVariables
) {
  return { query: FindOneProductDocument, variables: variables };
}
export const FindProductsBySkusDocument = gql`
  query FindProductsBySkus($input: FindProductsBySkusInput!) {
    productsBySku(input: $input) {
      totalCount
      hasMore
      items {
        ...CoreProductFields
        attributes {
          ...CoreAttributeFields
        }
      }
    }
  }
  ${CoreProductFieldsFragmentDoc}
  ${CoreAttributeFieldsFragmentDoc}
`;

/**
 * __useFindProductsBySkusQuery__
 *
 * To run a query within a React component, call `useFindProductsBySkusQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindProductsBySkusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindProductsBySkusQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFindProductsBySkusQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindProductsBySkusQuery,
    FindProductsBySkusQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    FindProductsBySkusQuery,
    FindProductsBySkusQueryVariables
  >(FindProductsBySkusDocument, options);
}
export function useFindProductsBySkusLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindProductsBySkusQuery,
    FindProductsBySkusQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FindProductsBySkusQuery,
    FindProductsBySkusQueryVariables
  >(FindProductsBySkusDocument, options);
}
export type FindProductsBySkusQueryHookResult = ReturnType<
  typeof useFindProductsBySkusQuery
>;
export type FindProductsBySkusLazyQueryHookResult = ReturnType<
  typeof useFindProductsBySkusLazyQuery
>;
export type FindProductsBySkusQueryResult = Apollo.QueryResult<
  FindProductsBySkusQuery,
  FindProductsBySkusQueryVariables
>;
export function refetchFindProductsBySkusQuery(
  variables: FindProductsBySkusQueryVariables
) {
  return { query: FindProductsBySkusDocument, variables: variables };
}
export const FindProductsDocument = gql`
  query FindProducts($input: FindProductsInput!) {
    products(input: $input) {
      items {
        ...CoreProductFields
        attributes {
          ...CoreAttributeFields
        }
      }
      totalCount
      hasMore
    }
  }
  ${CoreProductFieldsFragmentDoc}
  ${CoreAttributeFieldsFragmentDoc}
`;

/**
 * __useFindProductsQuery__
 *
 * To run a query within a React component, call `useFindProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindProductsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFindProductsQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindProductsQuery,
    FindProductsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FindProductsQuery, FindProductsQueryVariables>(
    FindProductsDocument,
    options
  );
}
export function useFindProductsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindProductsQuery,
    FindProductsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FindProductsQuery, FindProductsQueryVariables>(
    FindProductsDocument,
    options
  );
}
export type FindProductsQueryHookResult = ReturnType<
  typeof useFindProductsQuery
>;
export type FindProductsLazyQueryHookResult = ReturnType<
  typeof useFindProductsLazyQuery
>;
export type FindProductsQueryResult = Apollo.QueryResult<
  FindProductsQuery,
  FindProductsQueryVariables
>;
export function refetchFindProductsQuery(
  variables: FindProductsQueryVariables
) {
  return { query: FindProductsDocument, variables: variables };
}
export const SearchProductsDocument = gql`
  query SearchProducts($input: SearchProductsInput!) {
    searchProducts(input: $input) {
      id
      name
    }
  }
`;

/**
 * __useSearchProductsQuery__
 *
 * To run a query within a React component, call `useSearchProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchProductsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSearchProductsQuery(
  baseOptions: Apollo.QueryHookOptions<
    SearchProductsQuery,
    SearchProductsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SearchProductsQuery, SearchProductsQueryVariables>(
    SearchProductsDocument,
    options
  );
}
export function useSearchProductsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SearchProductsQuery,
    SearchProductsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SearchProductsQuery, SearchProductsQueryVariables>(
    SearchProductsDocument,
    options
  );
}
export type SearchProductsQueryHookResult = ReturnType<
  typeof useSearchProductsQuery
>;
export type SearchProductsLazyQueryHookResult = ReturnType<
  typeof useSearchProductsLazyQuery
>;
export type SearchProductsQueryResult = Apollo.QueryResult<
  SearchProductsQuery,
  SearchProductsQueryVariables
>;
export function refetchSearchProductsQuery(
  variables: SearchProductsQueryVariables
) {
  return { query: SearchProductsDocument, variables: variables };
}
export const FindAllUsersDocument = gql`
  query FindAllUsers($input: FindAllUsersInput!) {
    users(input: $input) {
      totalCount
      hasMore
      items {
        ...CoreUserFields
        createdAt
        updatedAt
      }
    }
  }
  ${CoreUserFieldsFragmentDoc}
`;

/**
 * __useFindAllUsersQuery__
 *
 * To run a query within a React component, call `useFindAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllUsersQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFindAllUsersQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindAllUsersQuery,
    FindAllUsersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FindAllUsersQuery, FindAllUsersQueryVariables>(
    FindAllUsersDocument,
    options
  );
}
export function useFindAllUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindAllUsersQuery,
    FindAllUsersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FindAllUsersQuery, FindAllUsersQueryVariables>(
    FindAllUsersDocument,
    options
  );
}
export type FindAllUsersQueryHookResult = ReturnType<
  typeof useFindAllUsersQuery
>;
export type FindAllUsersLazyQueryHookResult = ReturnType<
  typeof useFindAllUsersLazyQuery
>;
export type FindAllUsersQueryResult = Apollo.QueryResult<
  FindAllUsersQuery,
  FindAllUsersQueryVariables
>;
export function refetchFindAllUsersQuery(
  variables: FindAllUsersQueryVariables
) {
  return { query: FindAllUsersDocument, variables: variables };
}
export const FindOneUserDocument = gql`
  query FindOneUser($id: String!) {
    user(id: $id) {
      ...CoreUserFields
      address {
        ...CoreAddressFields
      }
    }
  }
  ${CoreUserFieldsFragmentDoc}
  ${CoreAddressFieldsFragmentDoc}
`;

/**
 * __useFindOneUserQuery__
 *
 * To run a query within a React component, call `useFindOneUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindOneUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindOneUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFindOneUserQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindOneUserQuery,
    FindOneUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FindOneUserQuery, FindOneUserQueryVariables>(
    FindOneUserDocument,
    options
  );
}
export function useFindOneUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindOneUserQuery,
    FindOneUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FindOneUserQuery, FindOneUserQueryVariables>(
    FindOneUserDocument,
    options
  );
}
export type FindOneUserQueryHookResult = ReturnType<typeof useFindOneUserQuery>;
export type FindOneUserLazyQueryHookResult = ReturnType<
  typeof useFindOneUserLazyQuery
>;
export type FindOneUserQueryResult = Apollo.QueryResult<
  FindOneUserQuery,
  FindOneUserQueryVariables
>;
export function refetchFindOneUserQuery(variables: FindOneUserQueryVariables) {
  return { query: FindOneUserDocument, variables: variables };
}
export const HasPasswordDocument = gql`
  query HasPassword {
    hasPassword
  }
`;

/**
 * __useHasPasswordQuery__
 *
 * To run a query within a React component, call `useHasPasswordQuery` and pass it any options that fit your needs.
 * When your component renders, `useHasPasswordQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHasPasswordQuery({
 *   variables: {
 *   },
 * });
 */
export function useHasPasswordQuery(
  baseOptions?: Apollo.QueryHookOptions<
    HasPasswordQuery,
    HasPasswordQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<HasPasswordQuery, HasPasswordQueryVariables>(
    HasPasswordDocument,
    options
  );
}
export function useHasPasswordLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    HasPasswordQuery,
    HasPasswordQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<HasPasswordQuery, HasPasswordQueryVariables>(
    HasPasswordDocument,
    options
  );
}
export type HasPasswordQueryHookResult = ReturnType<typeof useHasPasswordQuery>;
export type HasPasswordLazyQueryHookResult = ReturnType<
  typeof useHasPasswordLazyQuery
>;
export type HasPasswordQueryResult = Apollo.QueryResult<
  HasPasswordQuery,
  HasPasswordQueryVariables
>;
export function refetchHasPasswordQuery(variables?: HasPasswordQueryVariables) {
  return { query: HasPasswordDocument, variables: variables };
}
export const MeDocument = gql`
  query Me {
    me {
      ...CoreUserFields
      address {
        ...CoreAddressFields
      }
    }
  }
  ${CoreUserFieldsFragmentDoc}
  ${CoreAddressFieldsFragmentDoc}
`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(
  baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export function useMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export function refetchMeQuery(variables?: MeQueryVariables) {
  return { query: MeDocument, variables: variables };
}
