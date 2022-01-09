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

export type LoginUserDto = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  login: UserWithTokensDto;
  logout: Scalars['Boolean'];
  registerUser: UserWithTokensDto;
};


export type MutationLoginArgs = {
  input: LoginUserDto;
};


export type MutationRegisterUserArgs = {
  input: RegisterUserDto;
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
  me: User;
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

export type User = {
  __typename?: 'User';
  address?: Maybe<UserAddress>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['String'];
  isAdmin: Scalars['Boolean'];
  isEmailConfirmed: Scalars['Boolean'];
  isRegisteredWithGoogle: Scalars['Boolean'];
  lastName: Scalars['String'];
  mobilePhoneNumber: Scalars['String'];
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

export type CoreAddressFieldsFragment = { __typename?: 'UserAddress', id: number, city: string, street: string, postalCode: string };

export type CoreUserFieldsFragment = { __typename?: 'User', id: string, firstName: string, lastName: string, email: string, isRegisteredWithGoogle: boolean, isEmailConfirmed: boolean, isAdmin: boolean };

export type LoginUserMutationVariables = Exact<{
  input: LoginUserDto;
}>;


export type LoginUserMutation = { __typename?: 'Mutation', login: { __typename?: 'UserWithTokensDto', accessToken: string, refreshToken: string } };

export type RegisterUserMutationVariables = Exact<{
  input: RegisterUserDto;
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', registerUser: { __typename?: 'UserWithTokensDto', accessToken: string, refreshToken: string, user: { __typename?: 'User', id: string } } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string, isRegisteredWithGoogle: boolean, isEmailConfirmed: boolean, isAdmin: boolean, address?: { __typename?: 'UserAddress', id: number, city: string, street: string, postalCode: string } | null | undefined } };

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