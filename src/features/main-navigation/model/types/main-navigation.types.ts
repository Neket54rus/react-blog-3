import type { FunctionComponent, SVGAttributes } from 'react'

export interface MainNavigationItem {
    to: string
    text: string
    Icon: FunctionComponent<SVGAttributes<SVGElement>>
    authOnly?: boolean
}
