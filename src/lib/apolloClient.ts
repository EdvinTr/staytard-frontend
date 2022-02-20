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
  const enhancedFetch = async (url: RequestInfo, init: RequestInit) => {
    const response = await fetch(url, {
      ...init,
      headers: {
        ...init.headers,
        "Access-Control-Allow-Origin": "*",
        Cookie: headers?.cookie ?? "", // pass cookies
      },
    });
    return response;
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
        Product: {
          keyFields: ["id", "attributes", ["sku"]],
        },
        Query: {
          fields: {
            productBrands: {
              keyArgs: false,
              read(brands) {
                return brands; // type policy for SSR to work
              },
            },
            getOneCategory: {
              keyArgs: false,
              read(category) {
                return category; // type policy for SSR to work
              },
            },
            allProductReviews: {
              keyArgs: false,
              merge(existing, incoming, { args }) {
                console.log(existing);
                if (!incoming) return existing;
                if (!existing) return incoming;
                console.log(args);

                return {
                  ...incoming,
                  items: [...existing.items, ...incoming.items],
                };
              },
            },
            publishedProductReviews: {
              keyArgs: false,
              merge(existing, incoming) {
                if (!incoming) return existing;
                if (!existing) return incoming;
                return {
                  ...incoming,
                  items: [...existing.items, ...incoming.items],
                };
              },
            },
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
