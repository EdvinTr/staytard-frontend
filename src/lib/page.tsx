import * as Types from './graphql';

import * as Operations from './graphql';
import { NextRouter, useRouter } from 'next/router'
import { QueryHookOptions, useQuery } from '@apollo/client';
import * as Apollo from '@apollo/client';
import type React from 'react';
import { getApolloClient } from './apolloClient';










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
export async function getServerPageCustomerOrders
    (options: Omit<Apollo.QueryOptions<Types.CustomerOrdersQueryVariables>, 'query'>, ctx?: any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.CustomerOrdersQuery>({ ...options, query: Operations.CustomerOrdersDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useCustomerOrders = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.CustomerOrdersQuery, Types.CustomerOrdersQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.CustomerOrdersDocument, options);
};
export type PageCustomerOrdersComp = React.FC<{data?: Types.CustomerOrdersQuery, error?: Apollo.ApolloError}>;
export const ssrCustomerOrders = {
      getServerPage: getServerPageCustomerOrders,
      
      usePage: useCustomerOrders,
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
export async function getServerPageProductReviews
    (options: Omit<Apollo.QueryOptions<Types.ProductReviewsQueryVariables>, 'query'>, ctx?: any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.ProductReviewsQuery>({ ...options, query: Operations.ProductReviewsDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useProductReviews = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.ProductReviewsQuery, Types.ProductReviewsQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.ProductReviewsDocument, options);
};
export type PageProductReviewsComp = React.FC<{data?: Types.ProductReviewsQuery, error?: Apollo.ApolloError}>;
export const ssrProductReviews = {
      getServerPage: getServerPageProductReviews,
      
      usePage: useProductReviews,
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