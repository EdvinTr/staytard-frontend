declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly NODE_ENV: "development" | "production" | "test";
      readonly PUBLIC_URL: string;
      readonly NEXT_PUBLIC_GRAPHQL_API_ENDPOINT: string;
      readonly NEXT_PUBLIC_GOOGLE_CLIENT_ID: string;
      readonly NEXT_PUBLIC_REST_API_ENDPOINT: string;
    }
  }
}

export {};
