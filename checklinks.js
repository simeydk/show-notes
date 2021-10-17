import { URL } from 'url';

import { getMarkdownLinksWithLineNumber } from './utils/markdown.js';
import { glob, readFileString} from './utils/files.js';
import { asyncForEach, asyncMap} from './utils/asyncArray.js'
import { safeFetch } from './utils/safeFetch.js';


if (process.argv[1] === fileURLToPath(import.meta.url)) {
    Array.from(process.argv).forEach((arg, i) => console.log(`${i} - ${arg}`) )
main()
}

async function main() {
    const filenames = await glob('**/*.md')
    const links = await asyncMap(filenames, getLinks).then(arr => arr.flat())
    const brokenLinks = links.filter(x => !x.ok)
    console.log(brokenLinks.map(({filename, status, link}) => `${status} ${filename}  ${link}`).join('\n'))
    console.log(brokenLinks.length , links.length )
}

async function getLinks(filename) {
    const text = await readFileString(filename)
    const links = getMarkdownLinksWithLineNumber(text)
    await asyncForEach(links, async link => {
        link.filename = filename
        try {
        link.protocol = new URL(link.link).protocol
        }
        catch {
            link.protocol = ''
        }

        if (link.protocol !== 'mailto') {
            const response = await safeFetch(link.link)
            link.status = response.status
            link.ok = response.ok
        }
        return link
    })
    return links
}