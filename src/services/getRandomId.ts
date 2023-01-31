/**
 * Generates a random string id. That usually happens in the Backend side, but this will do for a prototype.
 */
function getRandomId(): string {
    const randomUUID = window.crypto.randomUUID as
        | typeof window.crypto.randomUUID
        | undefined;

    if (randomUUID) {
        return crypto.randomUUID();
    } else {
        // fallback for older browsers
        return Date.now().toString();
    }
}

export default getRandomId;
