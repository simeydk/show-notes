import checkLinks from 'check-links'
import fetch from 'node-fetch'
import {checkLink} from './checklinks.js'

const DEFAULT_URLS = [
    'https://doesntexist.com',
    'https://example.com',
    'example.com',
    'https://www.google.com',
    'http://www.google.com',
    'www.google.com',
    'google.com',
    'https://linkedin.com/in/havoc',
    'mailto:tim@apple.com',
]


const urls = process.argv.length > 2 ? process.argv.slice(2) : DEFAULT_URLS

const results = await checkLinks(urls)
console.log(results)

// Array.from(process.argv).forEach((arg, i) => console.log(`${i} - ${arg}`) )