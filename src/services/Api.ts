enum FALLBACK_MSGS {
    apiKeyError = `I was going to say something, but I can\'t think of anything right now :( \nYou should check your API key.`,
    genericError = "I was going to say something, but I can't think of anything right now :( \nYou should try later.",
}

interface httpResponse {
    result: string;
}

export async function getRandomJoke(): Promise<httpResponse> {
    try {
        await new Promise(r => setTimeout(r, 2000));
        return { result: "jokeee" };
    } catch (error) {
        return { result: FALLBACK_MSGS.apiKeyError };
    }
}

export async function getRandomInsult(): Promise<httpResponse> {
    try {
        await new Promise(r => setTimeout(r, 2000));
        return { result: "insult" };
    } catch (error) {
        return { result: FALLBACK_MSGS.apiKeyError };
    }
}
