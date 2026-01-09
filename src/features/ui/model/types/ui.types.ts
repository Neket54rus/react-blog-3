export type ScrollSchema = Record<string, number> // <Адрес страницы, позиция скролла>

export interface UISchema {
    scroll: ScrollSchema
}
