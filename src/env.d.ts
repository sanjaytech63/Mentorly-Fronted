/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  // Add other environment variables here if needed
  // readonly VITE_ANOTHER_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
