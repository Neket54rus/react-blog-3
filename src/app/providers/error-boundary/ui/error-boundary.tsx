import { Component, Suspense, type ErrorInfo, type ReactNode } from 'react'

import { PageError } from 'widgets/page-error'

interface ErrorBoundaryProps {
    children: ReactNode
}

interface ErrorBoundaryState {
    hasError: boolean
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(): { hasError: boolean } {
        return { hasError: true }
    }

    componentDidCatch(error: Error, info: ErrorInfo): void {
        console.error(error, info)
    }

    render(): ReactNode {
        const { hasError } = this.state
        const { children } = this.props

        if (hasError) {
            return (
                <Suspense fallback="">
                    <PageError />
                </Suspense>
            )
        }

        return children
    }
}

export default ErrorBoundary
