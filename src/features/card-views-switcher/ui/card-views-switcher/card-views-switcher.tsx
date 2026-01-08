import { memo } from 'react'

import { ArticleView } from 'entities/article'

import CardViewBig from 'shared/assets/icons/card-view-big.svg?react'
import CardViewSmall from 'shared/assets/icons/card-view-small.svg?react'
import { Button } from 'shared/ui/button'
import { Icon } from 'shared/ui/icon'
import { Text } from 'shared/ui/text'

interface CardViewsSwitcherProps {
    view?: ArticleView
    onClick?: () => void
    className?: string
}

export const CardViewsSwitcher = memo((props: CardViewsSwitcherProps) => {
    const { view, onClick, className } = props

    if (!view) {
        return (
            <div className={className}>
                <Text>Отсутсвуют варианты переключения вида</Text>
            </div>
        )
    }

    return (
        <Button className={className} onClick={onClick}>
            {view === ArticleView.BIG ? (
                <Icon src={CardViewBig} />
            ) : (
                <Icon src={CardViewSmall} />
            )}
        </Button>
    )
})
