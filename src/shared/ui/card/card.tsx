import { type ElementType, type HTMLAttributeAnchorTarget, memo } from 'react'
import { Link, type To } from 'react-router'

import ViewIcon from 'shared/assets/icons/view.svg?react'
import { classNames } from 'shared/lib/class-names'

import { AppImage } from '../app-image'
import { Icon } from '../icon'
import { Text } from '../text'

import classes from './card.module.scss'

interface CardProps {
    to?: To
    image?: string
    createAt?: string
    types?: string[]
    views?: string
    title?: string
    hover?: boolean
    className?: string
    target?: HTMLAttributeAnchorTarget
}

export const Card = memo((props: CardProps) => {
    const {
        to,
        image,
        createAt,
        types,
        views,
        title,
        hover = false,
        className,
        target,
    } = props

    const Tag = (to ? Link : 'div') as ElementType
    const commonProps = {
        className: classNames(classes.card, { [classes.hover]: hover }, [
            className,
        ]),
    }
    const tagProps = to ? { ...commonProps, to, target } : commonProps

    return (
        <Tag {...tagProps}>
            <div className={classes.cardHeader}>
                {image ? (
                    <AppImage
                        className={classes.cardHeaderImage}
                        src={image}
                        alt="card icon"
                        fallback="Loading..."
                        errorFallback="Error"
                    />
                ) : (
                    <div className={classes.cardHeaderImage}>
                        <Text>No image</Text>
                    </div>
                )}
                {createAt && (
                    <Text className={classes.cardHeaderCreateAt}>
                        {createAt}
                    </Text>
                )}
            </div>
            <div className={classes.cardBody}>
                <div className={classes.cardBodyHeader}>
                    <div className={classes.cardBodyHeaderTypes}>
                        {types &&
                            types.map((type) => (
                                <Text
                                    key={type}
                                    className={classes.cardBodyHeaderTypesText}
                                >
                                    {type}
                                </Text>
                            ))}
                    </div>
                    <div className={classes.cardBodyHeaderViews}>
                        {views && (
                            <>
                                <Text>{views}</Text>
                                <Icon src={ViewIcon} />
                            </>
                        )}
                    </div>
                </div>
                {title && <Text>{title}</Text>}
            </div>
        </Tag>
    )
})
