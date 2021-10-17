import { safeFetch } from './utils/safeFetch.js'

// const wrappedFetch = catchWrapper(fetch, () => {status: '???'})

main()

async function main() {
    const url = 'https://example.coma'
    const x = await safeFetch(url)
    // const x = await wrappedFetch(url)
    console.log(x)
}