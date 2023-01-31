/**
 * Author of a message, according to specs (and to simplify) only these three are supported.
 */
export enum User {
    Mario,
    Luigi,
    EndUser,
}

/**
 * The chat log entity, represents one message.
 */
export interface Message {
    id: string;
    content: string;
    user: User;
    datetime: string;
    replied?: boolean;
}
