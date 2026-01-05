import { memo } from 'react'

import { classNames } from 'shared/lib/class-names'
import { Skeleton } from 'shared/ui/skeleton'
import { ColorText, SizeText, Text } from 'shared/ui/text'

import type { Comment } from '../../model/types/comment.types'
import { CommentCard } from '../comment-card/comment-card'

import classes from './comments-list.module.scss'

interface CommnetsListProps {
    comments?: Comment[]
    isLoading?: boolean
    error?: string
    className?: string
}

export const CommnetsList = memo((props: CommnetsListProps) => {
    const { comments, isLoading, error, className } = props

    if (isLoading) {
        return (
            <div className={classNames(classes.commentsList, {}, [className])}>
                <Skeleton height={82} />
                <Skeleton height={82} />
                <Skeleton height={82} />
            </div>
        )
    }

    if (error) {
        return (
            <div
                className={classNames(classes.commentsList, {}, [
                    className,
                    classes.commentsListError,
                ])}
            >
                <Text size={SizeText.L} color={ColorText.ERROR}>
                    {error}
                </Text>
            </div>
        )
    }

    if (!comments) {
        return (
            <div className={className}>
                <Text>Комментариев нет</Text>
            </div>
        )
    }

    return (
        <div className={classNames(classes.commentsList, {}, [className])}>
            {comments.map((comment) => (
                <CommentCard key={comment.id} comment={comment} />
            ))}
        </div>
    )
})
