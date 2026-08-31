/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CINEMATIC_VIDEO_DESKTOP?: string;
  readonly VITE_CINEMATIC_VIDEO_MOBILE?: string;
  readonly VITE_CINEMATIC_POSTER?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
