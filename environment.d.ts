declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly NODE_ENV: "development" | "production" | "test";
      readonly PUBLIC_URL: string;
      readonly NEXT_PUBLIC_GRAPHQL_API_ENDPOINT: string;
    }
  }
}
