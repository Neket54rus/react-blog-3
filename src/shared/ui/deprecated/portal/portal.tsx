import { type JSX, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

interface PortalProps {
    children: ReactNode
    container?: HTMLElement
}

/**
 * @deprecated
 */
export const Portal = (props: PortalProps): JSX.Element => {
    const { children, container = document.body } = props

    return createPortal(children, container)
}
