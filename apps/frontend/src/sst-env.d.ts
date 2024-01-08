/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_NODE_API_URL: string
  readonly VITE_PYTHON_API_URL: string
  readonly VITE_REGION: string
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}