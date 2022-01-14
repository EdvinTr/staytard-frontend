import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
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

export type GetProductBrandsInput = {
  sortBy?: InputMaybe<SortBy>;
  sortDirection?: InputMaybe<SortDirection>;
};

export type LoginUserDto = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  authenticateWithGoogle: UserWithTokensDto;
  login: UserWithTokensDto;
  logout: Scalars['Boolean'];
  registerUser: UserWithTokensDto;
};


export type MutationAuthenticateWithGoogleArgs = {
  googleAuthToken: Scalars['String'];
};


export type MutationLoginArgs = {
  input: LoginUserDto;
};


export type MutationRegisterUserArgs = {
  input: RegisterUserDto;
};

export type ProductBrand = {
  __typename?: 'ProductBrand';
  id: Scalars['Float'];
  name: Scalars['String'];
  path: Scalars['String'];
};

export type ProductCategory = {
  __typename?: 'ProductCategory';
  children?: Maybe<Array<ProductCategory>>;
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['Float'];
  name: Scalars['String'];
  parent?: Maybe<ProductCategory>;
  path: Scalars['String'];
  slug: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Query = {
  __typename?: 'Query';
  getCategories: Array<ProductCategory>;
  getOneCategory: ProductCategory;
  me: User;
  productBrands: Array<ProductBrand>;
};


export type QueryGetOneCategoryArgs = {
  slug: Scalars['String'];
};


export type QueryProductBrandsArgs = {
  input: GetProductBrandsInput;
};

export type RegisterUserDto = {
  city: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  mobilePhoneNumber: Scalars['String'];
  password: Scalars['String'];
  postalCode: Scalars['String'];
  street: Scalars['String'];
};

/** Field to sort the result by */
export enum SortBy {
  Id = 'ID',
  Name = 'NAME'
}

/** The basic directions */
export enum SortDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type User = {
  __typename?: 'User';
  address?: Maybe<UserAddress>;
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['String'];
  isAdmin: Scalars['Boolean'];
  isEmailConfirmed: Scalars['Boolean'];
  isRegisteredWithGoogle: Scalars['Boolean'];
  lastName: Scalars['String'];
  mobilePhoneNumber: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type UserAddress = {
  __typename?: 'UserAddress';
  city: Scalars['String'];
  id: Scalars['Float'];
  postalCode: Scalars['String'];
  street: Scalars['String'];
};

export type UserWithTokensDto = {
  __typename?: 'UserWithTokensDto';
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
  user: User;
};

export type CoreCategoryFieldsFragment = { __typename?: 'ProductCategory', id: number, name: string, path: string, slug: string };

export type CoreAddressFieldsFragment = { __typename?: 'UserAddress', id: number, city: string, street: string, postalCode: string };

export type CoreUserFieldsFragment = { __typename?: 'User', id: string, firstName: string, lastName: string, email: string, isRegisteredWithGoogle: boolean, isEmailConfirmed: boolean, isAdmin: boolean };

export type AuthenticateWithGoogleMutationVariables = Exact<{
  googleAuthToken: Scalars['String'];
}>;


export type AuthenticateWithGoogleMutation = { __typename?: 'Mutation', authenticateWithGoogle: { __typename?: 'UserWithTokensDto', accessToken: string, refreshToken: string } };

export type LoginUserMutationVariables = Exact<{
  input: LoginUserDto;
}>;


export type LoginUserMutation = { __typename?: 'Mutation', login: { __typename?: 'UserWithTokensDto', accessToken: string, refreshToken: string } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterUserMutationVariables = Exact<{
  input: RegisterUserDto;
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', registerUser: { __typename?: 'UserWithTokensDto', accessToken: string, refreshToken: string, user: { __typename?: 'User', id: string } } };

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesQuery = { __typename?: 'Query', getCategories: Array<{ __typename?: 'ProductCategory', id: number, name: string, path: string, slug: string, children?: Array<{ __typename?: 'ProductCategory', id: number, name: string, path: string, slug: string }> | null | undefined }> };

export type GetProductBrandsQueryVariables = Exact<{
  input: GetProductBrandsInput;
}>;


export type GetProductBrandsQuery = { __typename?: 'Query', productBrands: Array<{ __typename?: 'ProductBrand', id: number, name: string, path: string }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string, isRegisteredWithGoogle: boolean, isEmailConfirmed: boolean, isAdmin: boolean, address?: { __typename?: 'UserAddress', id: number, city: string, street: string, postalCode: string } | null | undefined } };

export const CoreCategoryFieldsFragmentDoc = gql`
    fragment CoreCategoryFields on ProductCategory {
  id
  name
  path
  slug
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
  isRegisteredWithGoogle
  isEmailConfirmed
  isAdmin
}
    `;
export const AuthenticateWithGoogleDocument = gql`
    mutation AuthenticateWithGoogle($googleAuthToken: String!) {
  authenticateWithGoogle(googleAuthToken: $googleAuthToken) {
    accessToken
    refreshToken
  }
}
    `;
export type AuthenticateWithGoogleMutationFn = Apollo.MutationFunction<AuthenticateWithGoogleMutation, AuthenticateWithGoogleMutationVariables>;

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
export function useAuthenticateWithGoogleMutation(baseOptions?: Apollo.MutationHookOptions<AuthenticateWithGoogleMutation, AuthenticateWithGoogleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AuthenticateWithGoogleMutation, AuthenticateWithGoogleMutationVariables>(AuthenticateWithGoogleDocument, options);
      }
export type AuthenticateWithGoogleMutationHookResult = ReturnType<typeof useAuthenticateWithGoogleMutation>;
export type AuthenticateWithGoogleMutationResult = Apollo.MutationResult<AuthenticateWithGoogleMutation>;
export type AuthenticateWithGoogleMutationOptions = Apollo.BaseMutationOptions<AuthenticateWithGoogleMutation, AuthenticateWithGoogleMutationVariables>;
export const LoginUserDocument = gql`
    mutation LoginUser($input: LoginUserDto!) {
  login(input: $input) {
    accessToken
    refreshToken
  }
}
    `;
export type LoginUserMutationFn = Apollo.MutationFunction<LoginUserMutation, LoginUserMutationVariables>;

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
export function useLoginUserMutation(baseOptions?: Apollo.MutationHookOptions<LoginUserMutation, LoginUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginUserMutation, LoginUserMutationVariables>(LoginUserDocument, options);
      }
export type LoginUserMutationHookResult = ReturnType<typeof useLoginUserMutation>;
export type LoginUserMutationResult = Apollo.MutationResult<LoginUserMutation>;
export type LoginUserMutationOptions = Apollo.BaseMutationOptions<LoginUserMutation, LoginUserMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

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
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
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
export type RegisterUserMutationFn = Apollo.MutationFunction<RegisterUserMutation, RegisterUserMutationVariables>;

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
export function useRegisterUserMutation(baseOptions?: Apollo.MutationHookOptions<RegisterUserMutation, RegisterUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterUserMutation, RegisterUserMutationVariables>(RegisterUserDocument, options);
      }
export type RegisterUserMutationHookResult = ReturnType<typeof useRegisterUserMutation>;
export type RegisterUserMutationResult = Apollo.MutationResult<RegisterUserMutation>;
export type RegisterUserMutationOptions = Apollo.BaseMutationOptions<RegisterUserMutation, RegisterUserMutationVariables>;
export const GetCategoriesDocument = gql`
    query GetCategories {
  getCategories {
    ...CoreCategoryFields
    children {
      ...CoreCategoryFields
    }
  }
}
    ${CoreCategoryFieldsFragmentDoc}`;

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
export function useGetCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
      }
export function useGetCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
        }
export type GetCategoriesQueryHookResult = ReturnType<typeof useGetCategoriesQuery>;
export type GetCategoriesLazyQueryHookResult = ReturnType<typeof useGetCategoriesLazyQuery>;
export type GetCategoriesQueryResult = Apollo.QueryResult<GetCategoriesQuery, GetCategoriesQueryVariables>;
export function refetchGetCategoriesQuery(variables?: GetCategoriesQueryVariables) {
      return { query: GetCategoriesDocument, variables: variables }
    }
export const GetProductBrandsDocument = gql`
    query GetProductBrands($input: GetProductBrandsInput!) {
  productBrands(input: $input) {
    id
    name
    path
  }
}
    `;

/**
 * __useGetProductBrandsQuery__
 *
 * To run a query within a React component, call `useGetProductBrandsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductBrandsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductBrandsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetProductBrandsQuery(baseOptions: Apollo.QueryHookOptions<GetProductBrandsQuery, GetProductBrandsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductBrandsQuery, GetProductBrandsQueryVariables>(GetProductBrandsDocument, options);
      }
export function useGetProductBrandsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductBrandsQuery, GetProductBrandsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductBrandsQuery, GetProductBrandsQueryVariables>(GetProductBrandsDocument, options);
        }
export type GetProductBrandsQueryHookResult = ReturnType<typeof useGetProductBrandsQuery>;
export type GetProductBrandsLazyQueryHookResult = ReturnType<typeof useGetProductBrandsLazyQuery>;
export type GetProductBrandsQueryResult = Apollo.QueryResult<GetProductBrandsQuery, GetProductBrandsQueryVariables>;
export function refetchGetProductBrandsQuery(variables: GetProductBrandsQueryVariables) {
      return { query: GetProductBrandsDocument, variables: variables }
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
${CoreAddressFieldsFragmentDoc}`;

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
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export function refetchMeQuery(variables?: MeQueryVariables) {
      return { query: MeDocument, variables: variables }
    }