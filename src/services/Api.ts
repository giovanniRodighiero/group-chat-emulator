import Axios, { AxiosError } from "axios";

const axiosInstance = Axios.create({
    baseURL: "https://api.humorapi.com/",
    params: {
        "api-key": import.meta.env.VITE_HUMOR_APIKEY,
    },
});

enum FALLBACK_MSGS {
    apiKeyError = `I was going to say something, but I can\'t think of anything right now :( \nYou should check your API key.`,
    outOfRequestsError = "I was going to say something, but I can't think of anything right now :( \nYou should try tomorrow or change the API Key.",
    genericError = "I was going to say something, but I can't think of anything right now :( \nI don't know what is happening.",
}

interface httpResponse {
    result: string;
}

function handleError(error: AxiosError | unknown) {
    if (Axios.isAxiosError(error)) {
        // api key is missing of invalid
        if (error.response?.status === 401)
            return { result: FALLBACK_MSGS.apiKeyError };

        // out of requests for today
        if (error.response?.status === 402)
            return { result: FALLBACK_MSGS.outOfRequestsError };
    }

    // something else
    return { result: FALLBACK_MSGS.genericError };
}

export async function getRandomJoke(): Promise<httpResponse> {
    try {
        const { data } = await axiosInstance.get<{ joke: string }>(
            "jokes/random"
        );
        return { result: data.joke };
    } catch (error) {
        return handleError(error);
    }
}

export async function getRandomInsult(): Promise<httpResponse> {
    try {
        const { data } = await axiosInstance.get<{ text: string }>("insult", {
            params: {
                name: import.meta.env.VITE_USER_NAME,
                reason: import.meta.env.VITE_HUMOR_INSULT_REASON,
            },
        });
        return { result: data.text };
    } catch (error) {
        return handleError(error);
    }
}
