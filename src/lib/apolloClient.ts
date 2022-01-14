import {
  ApolloClient,
  Context,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { IncomingHttpHeaders } from "http";
import { useMemo } from "react";

let apolloClient: ApolloClient<NormalizedCacheObject>;

function createApolloClient(headers: IncomingHttpHeaders | null = null) {
  const enhancedFetch = (url: RequestInfo, init: RequestInit) => {
    return fetch(url, {
      ...init,
      headers: {
        ...init.headers,
        "Access-Control-Allow-Origin": "*",
        Cookie: headers?.cookie ?? "", // pass cookies
      },
    }).then((response) => response);
  };
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: createHttpLink({
      uri: process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT,
      credentials: "include",
      fetchOptions: {
        mode: "cors",
      },
      fetch: enhancedFetch,
    }),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            productBrands: {
              keyArgs: false,
              read(brands) {
                return brands; // had to add this type policy for SSR to work
              },
            },
            /*products: {
              keyArgs: false,
              merge(existing, incoming) {
                if (!incoming) return existing;
                if (!existing) return incoming; // existing will be empty the first time
                console.log(existing);
                
                const { products, ...rest } = incoming;

                let result = rest;
                result.products = [
                  ...existing.products,
                  ...products,
                ]; // Merge existing items with the items from incoming
                return result;
              },
            }, */
          },
        },
      },
    }),
  });
}

type InitialState = NormalizedCacheObject | undefined;
interface IInitializeApollo {
  headers?: IncomingHttpHeaders | null;
  initialState?: InitialState | null;
}

export function initializeApollo(
  { headers, initialState }: IInitializeApollo = {
    headers: null,
    initialState: null,
  }
) {
  const _apolloClient = apolloClient ?? createApolloClient(headers);

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();
    // Restore the cache using the data passed from getStaticProps/getServerSideProps
    // combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState: NormalizedCacheObject | null) {
  const store = useMemo(
    () => initializeApollo({ initialState }),
    [initialState]
  );
  return store;
}

export const getApolloClient = (
  ctx?: Context,
  initialState?: NormalizedCacheObject
) => {
  return initializeApollo({ initialState });
};
