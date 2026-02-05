import { memo, useState } from 'react'

import StarIcon from 'shared/assets/icons/star.svg?react'
import { classNames } from 'shared/lib/class-names'

import classes from './star-rating.module.scss'

interface StarRatingProps {
    className?: string
    size?: number
    selectedStars?: number
    onSelect?: (starCount: number) => void
}

const stars = [1, 2, 3, 4, 5]

export const StarRating = memo((props: StarRatingProps) => {
    const { className, size, selectedStars, onSelect } = props

    const [currentStarsCount, setCurrentStartCount] = useState(
        selectedStars || 0,
    )
    const [isSelected, setIsSelected] = useState(!!selectedStars)

    const onHover = (starsCount: number) => (): void => {
        if (!isSelected) {
            setCurrentStartCount(starsCount)
        }
    }

    const onLeave = (): void => {
        if (!isSelected) {
            setCurrentStartCount(0)
        }
    }

    const onClick = (starsCount: number) => (): void => {
        if (!isSelected && onSelect) {
            onSelect(starsCount)
            setCurrentStartCount(starsCount)
            setIsSelected(true)
        }
    }

    return (
        <div className={classNames(classes.starRating, {}, [className])}>
            {stars.map((starNumber) => (
                <StarIcon
                    key={starNumber}
                    className={classNames(classes.starRatingStarIcon, {
                        [classes.hovered]: currentStarsCount >= starNumber,
                        [classes.selected]: isSelected,
                    })}
                    width={size}
                    height={size}
                    onMouseLeave={onLeave}
                    onMouseEnter={onHover(starNumber)}
                    onClick={onClick(starNumber)}
                />
            ))}
        </div>
    )
})
