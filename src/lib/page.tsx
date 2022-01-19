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
export async function getServerPageFindProducts
    (options: Omit<Apollo.QueryOptions<Types.FindProductsQueryVariables>, 'query'>, ctx?: any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.FindProductsQuery>({ ...options, query: Operations.FindProductsDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useFindProducts = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.FindProductsQuery, Types.FindProductsQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.FindProductsDocument, options);
};
export type PageFindProductsComp = React.FC<{data?: Types.FindProductsQuery, error?: Apollo.ApolloError}>;
export const ssrFindProducts = {
      getServerPage: getServerPageFindProducts,
      
      usePage: useFindProducts,
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