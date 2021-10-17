import {fileURLToPath} from 'url'

import fetch from 'node-fetch';

export async function safeFetch(url, ...args) {
    let response;
    try {
        response = await fetch(url,...args)
    } catch (e) {
        response = { status: -1, ok: false };
    }
    return response;
}


if (fileURLToPath(import.meta.url).startsWith(process.argv[1])) {
    const url = process.argv[2]
    if (url) {
        console.log(await safeFetch(url))
    }
}