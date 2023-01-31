import React from "react";

import { Message, User } from "../../types";
import getRandomId from "../../services/getRandomId";
import * as Api from "../../services/Api";

/** How much time should Luigi wait before his next insult */
const LUIGI_INTERVAL = parseInt(import.meta.env.VITE_LUIGI_FREQ); //ms

const LOCALSTORAGE_KEY = "@chat";

interface useChatI {
    /** Chat's messages */
    logs: Message[];

    /** Adds a new message sent by the User */
    sendMessage: (content: string) => void;

    /** Deletes an existing message */
    deleteMessage: (msgId: string) => void;
}

/**
 * The hook that manages the chat's state
 */
function useChat(persistChat = false): useChatI {
    const [logs, setLogs] = React.useState<Message[]>([]);
    const intervalRef = React.useRef<NodeJS.Timer | null>(null);

    React.useEffect(() => {
        if (persistChat) loadChatLogs();

        intervalRef.current = setInterval(sendMessageFromLuigi, LUIGI_INTERVAL);

        return function cleanUseChat() {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    React.useEffect(() => {
        sendMessageFromMario();
    }, [logs.length]);

    /** Mario replies with a joke to every user message */
    const sendMessageFromMario = async () => {
        if (!logs.length) return;

        const lastMsg = logs[logs.length - 1];
        if (lastMsg.user === User.EndUser && !lastMsg.replied) {
            setLogs(prev => {
                const newLogs = [...prev];
                newLogs[newLogs.length - 1].replied = true;
                return newLogs;
            });

            const { result } = await Api.getRandomJoke();
            sendMessage(result, User.Mario);
        }
    };

    /** Luigi just sends random insults xD */
    const sendMessageFromLuigi = async () => {
        const { result } = await Api.getRandomInsult();
        sendMessage(result, User.Luigi);
    };

    const sendMessage = (content: string, user: User = User.EndUser) => {
        setLogs(prev => {
            const newLogs = [
                ...prev,
                {
                    content,
                    datetime: new Date().toISOString(),
                    user,
                    id: getRandomId(),
                },
            ];
            if (persistChat) saveChatLogs(newLogs);
            return newLogs;
        });
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

    const loadChatLogs = () => {
        try {
            const logsAsString = localStorage.getItem(LOCALSTORAGE_KEY);
            if (!!logsAsString) {
                const logsAsJson = JSON.parse(logsAsString);
                setLogs(logsAsJson);
            }
        } catch (error) {
            console.warn("Logs cannot be transformed to a valid json.");
        }
    };
    const saveChatLogs = (newLogs: Message[]) => {
        try {
            const logsAsString = JSON.stringify(newLogs);
            localStorage.setItem(LOCALSTORAGE_KEY, logsAsString);
        } catch (error) {
            console.warn("Logs cannot be transformed to a valid string.");
        }
    };

    return {
        logs,
        sendMessage,
        deleteMessage,
    };
}

export default useChat;
