import React from "react";

interface TextInputProps {
    onSend: (content: string) => void;
}

/**
 * Chat input form
 */
function TextInput({ onSend }: TextInputProps) {
    const [content, setContent] = React.useState<string>("");

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSend(content);
        setContent("");
    };

    return (
        <div className="fixed bottom-0 left-0 w-full h-14 bg-orange-200">
            <form
                className="h-full flex items-center justify-center md:mx-auto md:max-w-3xl mx-2"
                onSubmit={onSubmit}
            >
                <input
                    required
                    type="text"
                    title="message content"
                    placeholder="Say something ..."
                    className="flex-1 px-2 py-1 rounded-lg text-lg mr-2"
                    value={content}
                    onChange={e => setContent(e.target.value)}
                />
                <button
                    type="submit"
                    className="w-12 rounded-full h-12 bg-orange-500 flex items-center justify-center"
                    aria-label="send message"
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
                        className="w-8 h-8 text-white rotate-45 -translate-x-1"
                    >
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                </button>
            </form>
        </div>
    );
}

export default TextInput;
