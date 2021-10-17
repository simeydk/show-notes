import fetch from 'node-fetch';

export async function safeFetch(url) {
    let response;
    try {
        response = await fetch(
            url,
            { headers: new Headers({ 
                "User-Agent": "Mozilla/5.0 (Windows NT x.y; Win64; x64; rv:10.0) Gecko/20100101 Firefox/10.0" }) 
            });
    } catch (e) {
        response = { status: -1, ok: false };
    }
    return response;
}
