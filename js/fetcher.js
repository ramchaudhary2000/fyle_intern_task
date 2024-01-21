import { github_bearer } from "../token.js";

export async function fetcher({uri}) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${github_bearer}`);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    try{
        const response = await fetch(`https://api.github.com/${uri}`, requestOptions);
        const result = await response.json()
        return result;
    } catch(error) {
        console.log('error: ', error)
        throw error
    }
}