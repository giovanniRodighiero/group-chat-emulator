import React from "react";

import TextInput from "../../Components/TextInput";
import useChat from "./useChat";

function Chat() {
    const chat = useChat();

    return (
        <main className="relative">
            <ul>
                {chat.logs.map(log => (
                    <li key={log.id}>{log.content}</li>
                ))}
            </ul>
            <TextInput onSend={chat.sendMessage} />
        </main>
    );
}

export default Chat;
