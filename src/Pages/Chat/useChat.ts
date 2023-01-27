import React from "react";

import { Message, User } from "../../types";
import getRandomId from "../../services/getRandomId";

interface useChatI {
    /** Chat's messages */
    logs: Message[];

    /** Adds a new message sent by the User */
    sendMessage: (content: string) => void;

    /** Deletes an existing message sent by the User */
    deleteMessage: (msgId: string) => void;
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
                id: getRandomId(),
            },
        ]);
    };

    const deleteMessage = (msgId: string) => {
        const logIndex = logs.findIndex(log => log.id === msgId);
        if (logIndex > -1) {
            setLogs(oldLogs => {
                const newLogs = [...oldLogs];
                newLogs.splice(logIndex, 1);
                return newLogs;
            });
        }
    };

    return {
        logs,
        sendMessage,
        deleteMessage,
    };
}

export default useChat;
