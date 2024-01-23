import { github_bearer } from "../token.js";
let abortController

export async function fetcher({ uri }, useAbortController=true) {
    // If there's an existing AbortController, abort the previous request
    if (abortController) {
        abortController.abort();
    }

    // Create a new AbortController for the current request
    abortController = useAbortController ? new AbortController() : null;
    const signal = abortController?.signal;
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer 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`);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
        signal
    };

    try {
        const response = await fetch(`https://api.github.com/${uri}`, requestOptions);
        const result = await response.json()
        if(!response.ok){
            throw new Error(result.message)
        }
        return result;
    } catch (error) {
        throw error
    }
}