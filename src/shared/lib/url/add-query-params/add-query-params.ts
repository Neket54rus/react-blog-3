export const getQueryParams = (
    params: OptionalRecord<string, string>,
): string => {
    const searchParams = new URLSearchParams(window.location.search)
    Object.entries(params).forEach(([name, value]) => {
        if (value !== undefined) {
            searchParams.set(name, value)
        }
    })

    return `?${searchParams.toString()}`
}

/**
 * Функция добавляет параметры в адресную строку браузера.
 * @param params
 */
export const addQueryParams = (
    params: OptionalRecord<string, string>,
): void => {
    window.history.pushState(null, '', getQueryParams(params))
}
