import { type JSX } from 'react'

import { Page } from 'widgets/page'

import { RatingCard } from 'entities/rating'

const MainPage = (): JSX.Element => (
    <Page>
        <h1>Main Page</h1>
        <RatingCard
            title="как вам статья?"
            feedbackTitle="Оставьте отзыв о статье"
            hasFeedback
        />
    </Page>
)

export default MainPage
