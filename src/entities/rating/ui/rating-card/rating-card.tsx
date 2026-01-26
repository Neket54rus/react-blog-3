import { memo, useCallback, useState } from 'react'

import { classNames } from 'shared/lib/class-names'
import { Button, ButtonTheme } from 'shared/ui/button'
import { Input } from 'shared/ui/input'
import { Modal } from 'shared/ui/modal/modal'
import { FlexAlign, FlexJustify, HStack, VStack } from 'shared/ui/stack'
import { StarRating } from 'shared/ui/star-rating'
import { SizeText, Text } from 'shared/ui/text'

import classes from './rating-card.module.scss'

interface RatingCardProps {
    className?: string
    title?: string
    feedbackTitle?: string
    hasFeedback?: boolean
    onCancel?: (starsCount: number) => void
    onAccept?: (starsCount: number, feedback?: string) => void
}

export const RatingCard = memo((props: RatingCardProps) => {
    const { className, title, feedbackTitle, hasFeedback, onCancel, onAccept } =
        props

    const [isModalOpen, setIsOpenModal] = useState(false)
    const [starsCount, setStarsCount] = useState(0)
    const [feedback, setFeedback] = useState('')

    const onSelectStars = useCallback(
        (selectedStarsCount: number) => {
            setStarsCount(selectedStarsCount)
            if (hasFeedback) {
                setIsOpenModal(true)
            } else {
                onAccept?.(selectedStarsCount)
            }
        },
        [hasFeedback, onAccept],
    )

    const acceptHandler = useCallback(() => {
        setIsOpenModal(false)
        onAccept?.(starsCount, feedback)
    }, [feedback, onAccept, starsCount])

    const cancelHandler = useCallback(() => {
        setIsOpenModal(false)
        onCancel?.(starsCount)
    }, [onCancel, starsCount])

    return (
        <div className={classNames(classes.ratingCard, {}, [className])}>
            <VStack align={FlexAlign.CENTER} gap={10}>
                {title && <Text size={SizeText.L}>{title}</Text>}
                <StarRating size={40} onSelect={onSelectStars} />
            </VStack>
            <Modal isOpen={isModalOpen} lazy>
                <VStack gap={10}>
                    <VStack gap={32} fullWidth>
                        {feedbackTitle && (
                            <Text size={SizeText.L}>{feedbackTitle}</Text>
                        )}
                        <Input
                            value={feedback}
                            onChange={setFeedback}
                            placeholder="Ваш отзыв"
                        />
                    </VStack>
                    <HStack gap={10} justify={FlexJustify.END}>
                        <Button onClick={cancelHandler} theme={ButtonTheme.RED}>
                            Закрыть
                        </Button>
                        <Button
                            onClick={acceptHandler}
                            theme={ButtonTheme.OUTLINE}
                        >
                            Отправить
                        </Button>
                    </HStack>
                </VStack>
            </Modal>
        </div>
    )
})
