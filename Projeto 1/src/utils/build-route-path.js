export function buildRoutePath(path) {
    const routePatametersRegex = /:([a-zA-Z]+)/g

    const pathWithParams = path.replaceAll(routePatametersRegex, '(?<$1>[a-z0-9\-_]+)')

    const pathRegex = new RegExp(`^${pathWithParams}`)

    return pathRegex
}