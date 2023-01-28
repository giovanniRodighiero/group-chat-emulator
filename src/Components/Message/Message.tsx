import React from "react";
import clsx from "clsx";

import { Message as MessageI, User } from "../../types";

interface MessageProps {
    message: MessageI;
    onDelete: (msgId: string) => void;
}

const NAMES = {
    [User.EndUser]: "you",
    [User.Mario]: "Mario",
    [User.Luigi]: "Luigi",
};

function Message({ message, onDelete }: MessageProps) {
    const elRef = React.useRef<HTMLLIElement>(null);

    const datetime = React.useMemo(() => {
        const { datetime } = message;
        const date = datetime.toDateString();
        const time = datetime
            .toLocaleTimeString()
            .split(":")
            .slice(0, 2)
            .join(":");
        return `${date}, ${time}`;
    }, [message.datetime]);

    const containerStyle = clsx({
        "justify-end": message.user === User.EndUser,
    });
    const btnStyle = clsx({
        "right-0 translate-x-1/2": message.user !== User.EndUser,
        "left-0 -translate-x-1/2": message.user === User.EndUser,
    });
    const usernameStyle = clsx({
        "text-right text-cyan-500": message.user === User.EndUser,
        "text-pink-500": message.user === User.Mario,
        "text-lime-500": message.user === User.Luigi,
    });

    React.useEffect(() => {
        elRef.current?.scrollIntoView();
    }, []);

    return (
        <li className={`my-2 flex first:mt-auto ${containerStyle}`} ref={elRef}>
            <div className="group relative max-w-sm rounded-xl bg-slate-50 py-1 px-2">
                <button
                    aria-label="delete message"
                    className={`absolute top-0 z-10 flex h-10 w-10  -translate-y-1/2 scale-0 items-center justify-center rounded-full border border-white bg-red-500 opacity-0 transition-transform  focus:scale-100 focus:opacity-100  group-hover:scale-100 group-hover:opacity-100 ${btnStyle}`}
                    onClick={() => onDelete(message.id)}
                >
                    <svg
                        aria-hidden
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6 text-white"
                    >
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                </button>
                <span className={`block font-bold capitalize ${usernameStyle}`}>
                    {NAMES[message.user]}
                </span>
                <p className="text-lg">{message.content}</p>
                <span className="mt-1  block text-right text-sm text-slate-500">
                    {datetime}
                </span>
            </div>
        </li>
    );
}

export default React.memo(Message);
