import * as Types from './graphql';

import * as Operations from './graphql';
import { NextRouter, useRouter } from 'next/router'
import { QueryHookOptions, useQuery } from '@apollo/client';
import * as Apollo from '@apollo/client';
import type React from 'react';
import { getApolloClient } from './apolloClient';
















export async function getServerPageBasicCategories
    (options: Omit<Apollo.QueryOptions<Types.BasicCategoriesQueryVariables>, 'query'>, ctx?: any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.BasicCategoriesQuery>({ ...options, query: Operations.BasicCategoriesDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useBasicCategories = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.BasicCategoriesQuery, Types.BasicCategoriesQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.BasicCategoriesDocument, options);
};
export type PageBasicCategoriesComp = React.FC<{data?: Types.BasicCategoriesQuery, error?: Apollo.ApolloError}>;
export const ssrBasicCategories = {
      getServerPage: getServerPageBasicCategories,
      
      usePage: useBasicCategories,
    }
export async function getServerPageGetCategories
    (options: Omit<Apollo.QueryOptions<Types.GetCategoriesQueryVariables>, 'query'>, ctx?: any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.GetCategoriesQuery>({ ...options, query: Operations.GetCategoriesDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useGetCategories = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.GetCategoriesQuery, Types.GetCategoriesQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.GetCategoriesDocument, options);
};
export type PageGetCategoriesComp = React.FC<{data?: Types.GetCategoriesQuery, error?: Apollo.ApolloError}>;
export const ssrGetCategories = {
      getServerPage: getServerPageGetCategories,
      
      usePage: useGetCategories,
    }
export async function getServerPageGetOneCategory
    (options: Omit<Apollo.QueryOptions<Types.GetOneCategoryQueryVariables>, 'query'>, ctx?: any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.GetOneCategoryQuery>({ ...options, query: Operations.GetOneCategoryDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useGetOneCategory = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.GetOneCategoryQuery, Types.GetOneCategoryQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.GetOneCategoryDocument, options);
};
export type PageGetOneCategoryComp = React.FC<{data?: Types.GetOneCategoryQuery, error?: Apollo.ApolloError}>;
export const ssrGetOneCategory = {
      getServerPage: getServerPageGetOneCategory,
      
      usePage: useGetOneCategory,
    }
export async function getServerPageMyCustomerOrders
    (options: Omit<Apollo.QueryOptions<Types.MyCustomerOrdersQueryVariables>, 'query'>, ctx?: any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.MyCustomerOrdersQuery>({ ...options, query: Operations.MyCustomerOrdersDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useMyCustomerOrders = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.MyCustomerOrdersQuery, Types.MyCustomerOrdersQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.MyCustomerOrdersDocument, options);
};
export type PageMyCustomerOrdersComp = React.FC<{data?: Types.MyCustomerOrdersQuery, error?: Apollo.ApolloError}>;
export const ssrMyCustomerOrders = {
      getServerPage: getServerPageMyCustomerOrders,
      
      usePage: useMyCustomerOrders,
    }
export async function getServerPageGetProductBrands
    (options: Omit<Apollo.QueryOptions<Types.GetProductBrandsQueryVariables>, 'query'>, ctx?: any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.GetProductBrandsQuery>({ ...options, query: Operations.GetProductBrandsDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useGetProductBrands = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.GetProductBrandsQuery, Types.GetProductBrandsQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.GetProductBrandsDocument, options);
};
export type PageGetProductBrandsComp = React.FC<{data?: Types.GetProductBrandsQuery, error?: Apollo.ApolloError}>;
export const ssrGetProductBrands = {
      getServerPage: getServerPageGetProductBrands,
      
      usePage: useGetProductBrands,
    }
export async function getServerPageFindAllProductReviews
    (options: Omit<Apollo.QueryOptions<Types.FindAllProductReviewsQueryVariables>, 'query'>, ctx?: any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.FindAllProductReviewsQuery>({ ...options, query: Operations.FindAllProductReviewsDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useFindAllProductReviews = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.FindAllProductReviewsQuery, Types.FindAllProductReviewsQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.FindAllProductReviewsDocument, options);
};
export type PageFindAllProductReviewsComp = React.FC<{data?: Types.FindAllProductReviewsQuery, error?: Apollo.ApolloError}>;
export const ssrFindAllProductReviews = {
      getServerPage: getServerPageFindAllProductReviews,
      
      usePage: useFindAllProductReviews,
    }
export async function getServerPageFindOneProductReview
    (options: Omit<Apollo.QueryOptions<Types.FindOneProductReviewQueryVariables>, 'query'>, ctx?: any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.FindOneProductReviewQuery>({ ...options, query: Operations.FindOneProductReviewDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useFindOneProductReview = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.FindOneProductReviewQuery, Types.FindOneProductReviewQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.FindOneProductReviewDocument, options);
};
export type PageFindOneProductReviewComp = React.FC<{data?: Types.FindOneProductReviewQuery, error?: Apollo.ApolloError}>;
export const ssrFindOneProductReview = {
      getServerPage: getServerPageFindOneProductReview,
      
      usePage: useFindOneProductReview,
    }
export async function getServerPagePublishedProductReviews
    (options: Omit<Apollo.QueryOptions<Types.PublishedProductReviewsQueryVariables>, 'query'>, ctx?: any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.PublishedProductReviewsQuery>({ ...options, query: Operations.PublishedProductReviewsDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const usePublishedProductReviews = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.PublishedProductReviewsQuery, Types.PublishedProductReviewsQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.PublishedProductReviewsDocument, options);
};
export type PagePublishedProductReviewsComp = React.FC<{data?: Types.PublishedProductReviewsQuery, error?: Apollo.ApolloError}>;
export const ssrPublishedProductReviews = {
      getServerPage: getServerPagePublishedProductReviews,
      
      usePage: usePublishedProductReviews,
    }
export async function getServerPageFindOneProduct
    (options: Omit<Apollo.QueryOptions<Types.FindOneProductQueryVariables>, 'query'>, ctx?: any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.FindOneProductQuery>({ ...options, query: Operations.FindOneProductDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useFindOneProduct = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.FindOneProductQuery, Types.FindOneProductQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.FindOneProductDocument, options);
};
export type PageFindOneProductComp = React.FC<{data?: Types.FindOneProductQuery, error?: Apollo.ApolloError}>;
export const ssrFindOneProduct = {
      getServerPage: getServerPageFindOneProduct,
      
      usePage: useFindOneProduct,
    }
export async function getServerPageFindProductsBySkus
    (options: Omit<Apollo.QueryOptions<Types.FindProductsBySkusQueryVariables>, 'query'>, ctx?: any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.FindProductsBySkusQuery>({ ...options, query: Operations.FindProductsBySkusDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useFindProductsBySkus = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.FindProductsBySkusQuery, Types.FindProductsBySkusQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.FindProductsBySkusDocument, options);
};
export type PageFindProductsBySkusComp = React.FC<{data?: Types.FindProductsBySkusQuery, error?: Apollo.ApolloError}>;
export const ssrFindProductsBySkus = {
      getServerPage: getServerPageFindProductsBySkus,
      
      usePage: useFindProductsBySkus,
    }
export async function getServerPageSearchProducts
    (options: Omit<Apollo.QueryOptions<Types.SearchProductsQueryVariables>, 'query'>, ctx?: any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.SearchProductsQuery>({ ...options, query: Operations.SearchProductsDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useSearchProducts = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.SearchProductsQuery, Types.SearchProductsQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.SearchProductsDocument, options);
};
export type PageSearchProductsComp = React.FC<{data?: Types.SearchProductsQuery, error?: Apollo.ApolloError}>;
export const ssrSearchProducts = {
      getServerPage: getServerPageSearchProducts,
      
      usePage: useSearchProducts,
    }
export async function getServerPageFindAllUsers
    (options: Omit<Apollo.QueryOptions<Types.FindAllUsersQueryVariables>, 'query'>, ctx?: any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.FindAllUsersQuery>({ ...options, query: Operations.FindAllUsersDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useFindAllUsers = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.FindAllUsersQuery, Types.FindAllUsersQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.FindAllUsersDocument, options);
};
export type PageFindAllUsersComp = React.FC<{data?: Types.FindAllUsersQuery, error?: Apollo.ApolloError}>;
export const ssrFindAllUsers = {
      getServerPage: getServerPageFindAllUsers,
      
      usePage: useFindAllUsers,
    }
export async function getServerPageFindOneUser
    (options: Omit<Apollo.QueryOptions<Types.FindOneUserQueryVariables>, 'query'>, ctx?: any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.FindOneUserQuery>({ ...options, query: Operations.FindOneUserDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useFindOneUser = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.FindOneUserQuery, Types.FindOneUserQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.FindOneUserDocument, options);
};
export type PageFindOneUserComp = React.FC<{data?: Types.FindOneUserQuery, error?: Apollo.ApolloError}>;
export const ssrFindOneUser = {
      getServerPage: getServerPageFindOneUser,
      
      usePage: useFindOneUser,
    }
export async function getServerPageHasPassword
    (options: Omit<Apollo.QueryOptions<Types.HasPasswordQueryVariables>, 'query'>, ctx?: any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.HasPasswordQuery>({ ...options, query: Operations.HasPasswordDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useHasPassword = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.HasPasswordQuery, Types.HasPasswordQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.HasPasswordDocument, options);
};
export type PageHasPasswordComp = React.FC<{data?: Types.HasPasswordQuery, error?: Apollo.ApolloError}>;
export const ssrHasPassword = {
      getServerPage: getServerPageHasPassword,
      
      usePage: useHasPassword,
    }
export async function getServerPageMe
    (options: Omit<Apollo.QueryOptions<Types.MeQueryVariables>, 'query'>, ctx?: any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.MeQuery>({ ...options, query: Operations.MeDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useMe = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.MeQuery, Types.MeQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.MeDocument, options);
};
export type PageMeComp = React.FC<{data?: Types.MeQuery, error?: Apollo.ApolloError}>;
export const ssrMe = {
      getServerPage: getServerPageMe,
      
      usePage: useMe,
    }