import { URL } from 'url';
import { getMarkdownLinksWithLineNumber } from './markdown.js';
import { readFileString } from './files.js';
import { safeFetch } from './safeFetch.js';


export async function checkLink(url) {
    let protocol = '', status, ok = false;
    try {
        protocol = new URL(url).protocol;
    }
    catch (e) { }

    if (protocol !== 'mailto') {
        if (protocol == '')
            url = 'https://' + url; // Do we wwant to make protocol mandatory in the link?
        const response = await safeFetch(url);
        status = response.status;
        ok = response.ok;
    }
    return { status, ok, protocol };
}
export async function getLinksFromMdFile(filename) {
    const text = await readFileString(filename);
    const links = getMarkdownLinksWithLineNumber(text);
    links.forEach(link => link.filename = filename);
    return links;
}
