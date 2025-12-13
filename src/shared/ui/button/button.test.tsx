import { render, screen } from '@testing-library/react'

import { Button } from './button'
import { ButtonTheme } from './constants'

describe('button', () => {
    test('render', () => {
        render(<Button>Test</Button>)
        expect(screen.getByText('Test')).toBeInTheDocument()
    })

    test('with clear theme', () => {
        render(<Button theme={ButtonTheme.CLEAR}>Test</Button>)
        expect(screen.getByText('Test')).toHaveClass('clear')
    })
})
