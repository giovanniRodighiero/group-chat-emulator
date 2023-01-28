import { renderHook, act } from "../../tools/testUtils";

import { User } from "../../types";
import useChat from "./useChat";
import getRandomId from "../../services/getRandomId";

vi.mock("../../services/getRandomId", () => ({
    default: vi.fn(() => "aaa"),
}));

describe("useChat Hook", () => {
    beforeEach(() => {
        vi.useFakeTimers();
        vi.clearAllMocks();
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
        vi.mocked(getRandomId).mockImplementation(() => "aaa");
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
        expect(result.current.logs.at(0)?.id).toBe("aaa");
        expect(vi.mocked(getRandomId)).toHaveBeenCalledTimes(1);

        const secondDate = new Date(2022, 11, 12);
        vi.setSystemTime(secondDate);
        vi.mocked(getRandomId).mockImplementation(() => "bbb");
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
        expect(result.current.logs.at(1)?.id).toBe("bbb");
        expect(vi.mocked(getRandomId)).toHaveBeenCalledTimes(2);
    });

    it("Should delete an existing message from the chatlogs when deleteMessage() is called with valid id", async () => {
        const { result } = renderHook(() => useChat());

        const firstDate = new Date(2022, 11, 11);
        vi.setSystemTime(firstDate);
        vi.mocked(getRandomId).mockImplementation(() => "aaa");
        act(() => {
            result.current.sendMessage("hello world");
        });

        const secondDate = new Date(2022, 11, 12);
        vi.setSystemTime(secondDate);
        vi.mocked(getRandomId).mockImplementation(() => "bbb");
        act(() => {
            result.current.sendMessage("tell me a joke");
        });

        expect(result.current.logs).toHaveLength(2);

        act(() => {
            result.current.deleteMessage("aaa");
        });

        expect(result.current.logs).toHaveLength(1);
        expect(result.current.logs.at(0)?.content).toBe("tell me a joke");
        expect(result.current.logs.at(0)?.user).toBe(User.EndUser);
        expect(result.current.logs.at(0)?.datetime).toBeInstanceOf(Date);
        expect(result.current.logs.at(0)?.id).toBeDefined();
        expect(result.current.logs.at(0)?.datetime.valueOf()).toBe(
            secondDate.valueOf()
        );
        expect(result.current.logs.at(0)?.id).toBe("bbb");
        expect(vi.mocked(getRandomId)).toHaveBeenCalledTimes(2);
    });

    it("Should do nothing when deleteMessage() is called without a valid id", async () => {
        const { result } = renderHook(() => useChat());

        const firstDate = new Date(2022, 11, 11);
        vi.setSystemTime(firstDate);
        vi.mocked(getRandomId).mockImplementation(() => "aaa");
        act(() => {
            result.current.sendMessage("hello world");
        });

        const secondDate = new Date(2022, 11, 12);
        vi.setSystemTime(secondDate);
        vi.mocked(getRandomId).mockImplementation(() => "bbb");
        act(() => {
            result.current.sendMessage("tell me a joke");
        });

        expect(result.current.logs).toHaveLength(2);

        act(() => {
            result.current.deleteMessage("ccc");
        });

        expect(result.current.logs).toHaveLength(2);
    });
});
