import fetch from 'node-fetch';

export async function safeFetch(url) {
    let response;
    try {
        response = await fetch(url);
    } catch (e) {
        response = { status: '' };
    }
    return response;
}
