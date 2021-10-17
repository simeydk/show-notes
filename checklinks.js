import { URL, fileURLToPath } from 'url';

import { getMarkdownLinksWithLineNumber } from './utils/markdown.js';
import { glob, readFileString} from './utils/files.js';
import { asyncForEach, asyncMap} from './utils/asyncArray.js'
import { safeFetch } from './utils/safeFetch.js';

if (fileURLToPath(import.meta.url).startsWith(process.argv[1])) {
    const pattern = process.argv[2] || '**/*.md'
    main(pattern)
}

async function main(globPattern = '**/*.md') {

    const filenames = await glob(globPattern)
    console.log('Running the following files:')
    console.log('----------------------------')
    console.log(filenames.join('\n') + '\n')
    const links = await asyncMap(filenames, getLinksFromMdFile).then(arr => arr.flat())
    await asyncForEach(links, async link => Object.assign(link, await checkLink(link.url)))
    const brokenLinks = links.filter(x => !x.ok)
    console.log(brokenLinks.map(({filename, status, url}) => `${status} ${filename}  ${url}`).join('\n'))
    console.log(brokenLinks.length , links.length )
}

export async function checkLink(url) {
    let protocol = '', status, ok = false
    try {
        protocol = new URL(url).protocol
    }
    catch (e) {}

    if (protocol !== 'mailto') {
        if (protocol == '') url = 'https://' + url // Do we wwant to make protocol mandatory in the link?
        const response = await safeFetch(url)
        status = response.status
        ok = response.ok
    }
    return {status, ok, protocol}
}

async function getLinksFromMdFile(filename) {
    const text = await readFileString(filename)
    const links = getMarkdownLinksWithLineNumber(text)
    links.forEach(link => link.filename = filename)
    return links
}