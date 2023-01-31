import React from "react";

import { Message as MessageI } from "../../types";
import Message from "../Message";

interface MessageProps {
    messages: MessageI[];
    onDelete: (msgId: string) => void;
}

function MessageList({ messages, onDelete }: MessageProps) {
    return (
        <section className="flex h-[calc(100vh-theme(spacing.14))] flex-col bg-gradient-to-b from-orange-200 to-orange-400 px-2">
            {!!messages.length && (
                <ul className="flex flex-1 flex-col  overflow-y-auto">
                    {messages.map(message => (
                        <Message
                            message={{
                                ...message,
                                datetime: new Date(message.datetime),
                            }}
                            onDelete={onDelete}
                            key={message.id}
                        />
                    ))}
                </ul>
            )}
        </section>
    );
}

export default MessageList;
