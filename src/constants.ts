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
  CONFIRMATION = "/confirmation",
  CHECKOUT = "/checkout",
  ADMIN = "/admin",
}

export enum ADMIN_SUB_PAGE_ROUTE {
  PRODUCTS = "products",
  ORDERS = "orders",
  REVIEWS = "reviews",
  USERS = "users",
}

export enum ADMIN_PAGE_QUERY_KEY {
  PAGE = "page",
  SHOW = "show",
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

export const MAX_PRODUCT_LIMIT = 50;

export const APP_NAME = "Staytard";
