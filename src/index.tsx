import { createRoot } from 'react-dom/client'

import { App } from 'app/App'
import { ErrorBoundary } from 'app/providers/error-boundary'
import { StoreProvider } from 'app/providers/store'

import { ThemeProvider } from 'shared/lib/theme'

import './app/styles/index.scss'
import './shared/config/i18n/i18n'

const rootElement = document.getElementById('root')

if (!rootElement) {
    document.body.innerHTML =
        '<h1 style="color: red">root element is not defined</h1>'
} else {
    const root = createRoot(rootElement)
    root.render(
        <StoreProvider>
            <ThemeProvider>
                <ErrorBoundary>
                    <App />
                </ErrorBoundary>
            </ThemeProvider>
        </StoreProvider>,
    )
}
