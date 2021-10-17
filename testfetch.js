import { safeFetch } from './utils/safeFetch.js'

// const wrappedFetch = catchWrapper(fetch, () => {status: '???'})

main()

async function main() {
    const url = 'https://example.com'
    // const url = 'https://linkedin.com/in/havoc'
    const x = await safeFetch(url)
    // const x = await wrappedFetch(url)
    console.log(x.status, x.ok)
}