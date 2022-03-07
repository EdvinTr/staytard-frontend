export enum LOCAL_STORAGE_KEY {
  ACCESS_TOKEN = "access_token",
  REFRESH_TOKEN = "refresh_token",
}

export enum APP_PAGE_ROUTE {
  INDEX = "/",
  LOGIN = "/login",
  REGISTER = "/register",
  MY_PROFILE = "/my-profile",
  MY_ORDERS = "/my-orders",
  MY_OFFERS = "/my-offers",
  PRODUCT = "/product",
  CHECKOUT = "/checkout",
  ADMIN = "/admin",
  ORDER = "/order",
  ORDER_SUCCESS = "/order/success",
  STRIPE_ORDER_SUCCESS = "/order/stripe/success",
  BRAND = "/brand",
  NOT_FOUND = "/404",
}

export enum ADMIN_SUB_PAGE_ROUTE {
  PRODUCTS = "products",
  ORDERS = "orders",
  REVIEWS = "reviews",
  USERS = "users",
  EDIT_PRODUCT = "/edit/product",
  EDIT_PRODUCT_REVIEW = "/edit/review",
  EDIT_USER = "/edit/user",
  EDIT_ORDER = "/edit/order",
}

export enum ADMIN_PAGE_QUERY_KEY {
  PAGE = "page",
  SHOW = "show",
  Q = "q",
}

export enum COOKIE_NAME {
  ACCESS_TOKEN = "access_token",
  REFRESH_TOKEN = "refresh_token",
}

export enum QUERY_PARAM_KEY {
  SORT_BY = "sortBy",
  SORT_DIRECTION = "sortDirection",
}

export enum LOCAL_STORAGE_KEY {
  CART = "cart",
  PRODUCT_REVIEW_FORM = "product-review-form",
  CREATE_PRODUCT_FORM = "create-product-form",
}
export enum ORDER_STATUS {
  PENDING = "Pending",
  PROCESSING = "Processing",
  SHIPPED = "Shipped",
  COMPLETED = "Completed",
  CANCELLED = "Cancelled",
  REFUNDED = "Refunded",
  FAILED = "Failed",
  ON_HOLD = "On-Hold",
}

export const orderStatusColors: Record<string, string> = {
  [ORDER_STATUS.PROCESSING]: "text-yellow-700",
  [ORDER_STATUS.SHIPPED]: "text-blue-700",
  [ORDER_STATUS.ON_HOLD]: "text-purple-700",
  [ORDER_STATUS.COMPLETED]: "text-green-700",
  [ORDER_STATUS.CANCELLED]: "text-red-600",
  [ORDER_STATUS.FAILED]: "text-red-700",
  [ORDER_STATUS.REFUNDED]: "text-orange-700",
  [ORDER_STATUS.PENDING]: "text-yellow-700",
};

export const successToastColors = {
  backgroundColor: "black",
  color: "white",
};

export const MAX_PRODUCT_LIMIT = 50;

export const APP_NAME = "Staytard";

export const editInputClassNames =
  "border border-black border-opacity-10 focus:border-opacity-100 focus:outline-none focus:ring-0";
