/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_HUMOR_APIKEY: string;
    readonly VITE_HUMOR_INSULT_REASON: string;
    readonly VITE_HUMOR_USER_NAME: string;
    readonly VITE_LUIGI_FREQ: string;
    readonly VITE_PERSIST_CHAT: string;
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
