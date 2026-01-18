import { type JSX } from 'react'

import { Page } from 'widgets/page'

import { ListBox } from 'shared/ui/list-box'

const MainPage = (): JSX.Element => (
    <Page>
        <h1>Main Page</h1>
        <ListBox
            items={[
                { value: '1', content: '123' },
                { value: '2', content: '213', disabled: true },
                { value: '3', content: '321' },
            ]}
        />
    </Page>
)

export default MainPage
