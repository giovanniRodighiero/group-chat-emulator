import React from "react";

import TextInput from "../../Components/TextInput";
import MessageList from "../../Components/MessageList";
import useChat from "./useChat";

function Chat() {
    const chat = useChat(import.meta.env.VITE_PERSIST_CHAT === "true");

    return (
        <main>
            <MessageList messages={chat.logs} onDelete={chat.deleteMessage} />
            <TextInput onSend={chat.sendMessage} />
        </main>
    );
}

export default Chat;
