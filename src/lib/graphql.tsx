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

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string, isRegisteredWithGoogle: boolean, isEmailConfirmed: boolean, isAdmin: boolean, address?: { __typename?: 'UserAddress', id: number, city: string, street: string, postalCode: string } | null | undefined } };


export const MeDocument = gql`
    query Me {
  me {
    id
    firstName
    lastName
    email
    isRegisteredWithGoogle
    isEmailConfirmed
    isAdmin
    address {
      id
      city
      street
      postalCode
    }
  }
}
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