/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_HUMOR_APIKEY: string;
    readonly VITE_HUMOR_INSULT_REASON: string;
    readonly VITE_USER_NAME: string;
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
