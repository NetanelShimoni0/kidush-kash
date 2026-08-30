/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** כתובת הבסיס של Realtime Database. ריק = עבודה מקומית בדפדפן בלבד. */
  readonly VITE_RTDB_URL?: string
  readonly VITE_BASE?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
