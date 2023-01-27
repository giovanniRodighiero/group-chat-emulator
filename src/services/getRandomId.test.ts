import getRandomId from "./getRandomId";

describe("getRandomId", () => {
    beforeEach(() => {
        vi.resetAllMocks();
        vi.unstubAllGlobals();
    });

    it("Should use the crypto.randomUUID if the browser supports it", () => {
        vi.stubGlobal("crypto", { randomUUID: vi.fn(() => "aaa") });
        const result = getRandomId();

        expectTypeOf(result).toBeString();
        expect(result).toBe("aaa");
        expect(crypto.randomUUID).toHaveBeenCalled();
    });

    it("Should use the Date.now() if the browser doesn't support crypto", () => {
        const spy = vi.spyOn(Date, "now");
        const result = getRandomId();

        expectTypeOf(result).toBeString();
        expect(spy).toHaveBeenCalled();
    });
});
