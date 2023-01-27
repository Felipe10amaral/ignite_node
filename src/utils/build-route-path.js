export function buildRoutePath(path) {
    const routePatametersRegex = /:([a-zA-Z]+)/g

    console.log(Array.from(path.matchAll(routePatametersRegex)))
}