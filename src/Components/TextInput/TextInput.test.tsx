import React from "react";

import { render, screen, userEvent } from "../../tools/testUtils";

import TextInput from "./TextInput";

const mockProps = {
    onSend: vi.fn(),
};

describe("<TextInput />", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("Should display an input field with a button", () => {
        render(<TextInput {...mockProps} />);

        const $input = screen.getByRole("textbox");
        expect($input).toBeInTheDocument();
        expect($input).toHaveAccessibleName("message content");
        expect($input).toBeRequired();

        const $btn = screen.getByRole("button", { name: "send message" });
        expect($btn).toBeInTheDocument();
    });

    it("Should call the onSend callback when the form is submitted", async () => {
        const user = userEvent.setup();
        render(<TextInput {...mockProps} />);

        const $input = screen.getByRole("textbox");
        await user.type($input, "hello world!");
        await user.click(screen.getByRole("button", { name: "send message" }));

        expect(mockProps.onSend).toHaveBeenCalledWith("hello world!");
    });
});
