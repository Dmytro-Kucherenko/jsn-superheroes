/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_DEVELOPMENT_PORT: string;
  readonly VITE_APP_API_ORIGIN_URL: string;
  readonly VITE_APP_PROXY_SERVER_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
