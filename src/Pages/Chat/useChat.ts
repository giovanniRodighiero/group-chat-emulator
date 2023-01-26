import React from "react";

import { Message, User } from "../../types";

interface useChatI {
    /** Chat's messages */
    logs: Message[];

    /** Adds a new message from the User */
    sendMessage: (content: string) => void;
}

/**
 * The hook that manages the chat's state
 */
function useChat(): useChatI {
    const [logs, setLogs] = React.useState<Message[]>([]);

    const sendMessage = (content: string) => {
        setLogs(prev => [
            ...prev,
            {
                content,
                datetime: new Date(),
                user: User.EndUser,
                id: Date.now().toString(),
            },
        ]);
    };

    return {
        logs,
        sendMessage,
    };
}

export default useChat;
