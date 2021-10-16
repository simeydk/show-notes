export async function asyncMap(array, fn) {
    return Promise.all(array.map(fn));
}

export async function asyncForEach(array, fn) {
    await Promise.all(array.map(fn));
}