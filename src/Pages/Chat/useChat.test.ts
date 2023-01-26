import { renderHook, act } from "../../tools/testUtils";

import { User } from "../../types";
import useChat from "./useChat";

describe("useChat Hook", () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });
    afterEach(() => {
        vi.useRealTimers();
    });

    it("Should return an empty list by default", () => {
        const { result } = renderHook(() => useChat());

        expect(result.current.logs).toHaveLength(0);
    });

    it("Should add a new message to the chatlogs when sendMessage() is called", async () => {
        const { result } = renderHook(() => useChat());

        const firstDate = new Date(2022, 11, 11);
        vi.setSystemTime(firstDate);

        act(() => {
            result.current.sendMessage("hello world");
        });

        expect(result.current.logs).toHaveLength(1);
        expect(result.current.logs.at(0)?.content).toBe("hello world");
        expect(result.current.logs.at(0)?.user).toBe(User.EndUser);
        expect(result.current.logs.at(0)?.datetime).toBeInstanceOf(Date);
        expect(result.current.logs.at(0)?.datetime.valueOf()).toBe(
            firstDate.valueOf()
        );
        expect(result.current.logs.at(0)?.id).toBeDefined();

        const secondDate = new Date(2022, 11, 12);
        vi.setSystemTime(secondDate);
        act(() => {
            result.current.sendMessage("tell me a joke");
        });

        expect(result.current.logs).toHaveLength(2);
        expect(result.current.logs.at(1)?.content).toBe("tell me a joke");
        expect(result.current.logs.at(1)?.user).toBe(User.EndUser);
        expect(result.current.logs.at(1)?.datetime).toBeInstanceOf(Date);
        expect(result.current.logs.at(1)?.id).toBeDefined();
        expect(result.current.logs.at(1)?.datetime.valueOf()).toBe(
            secondDate.valueOf()
        );
        expect(result.current.logs.at(0)?.id).not.toBe(
            result.current.logs.at(1)?.id
        );
    });
});
