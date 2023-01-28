import React from "react";
import { screen, render, userEvent } from "../../tools/testUtils";

import { Message as MessageI, User } from "../../types";
import Message from "./Message";

const mockProps: MessageI = {
    id: 'id',
    content: 'sent message',
    user: User.EndUser,
    datetime: new Date(2022, 11, 12),
};
const scrollIntoViewMock = vi.fn();

describe("<Message />", () => {
    beforeAll(() => {
        Element.prototype.scrollIntoView = scrollIntoViewMock;
    });

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("Should display the message informations", () => {
        render(<Message message={mockProps} onDelete={vi.fn()} />);

        expect(screen.getByText('sent message')).toBeInTheDocument();
        expect(screen.getByText('you')).toBeInTheDocument();
        expect(screen.getByText('Mon Dec 12 2022, 00:00')).toBeInTheDocument();
    });

    it("Should scroll to the element on mount", () => {
        render(<Message message={mockProps} onDelete={vi.fn()} />);

        expect(scrollIntoViewMock).toHaveBeenCalled();
    });

    it("Should call the onDelete callback", async () => {
        const onDeleteSpy = vi.fn();
        const user = userEvent.setup();

        render(<Message message={mockProps} onDelete={onDeleteSpy} />);

        await user.click(screen.getByLabelText('delete message'));
        expect(onDeleteSpy).toHaveBeenCalledWith('id');
    });
});
