import { memo } from 'react'

import { classNames } from 'shared/lib/class-names'
import { Avatar } from 'shared/ui/avatar'
import { Text } from 'shared/ui/text'

import { type Comment } from '../../model/types/comment.types'

import classes from './comment-card.module.scss'

interface CommentProps {
    comment: Comment
    className?: string
}

export const CommentCard = memo((props: CommentProps) => {
    const { comment, className } = props

    return (
        <div className={classNames(classes.comment, {}, [className])}>
            <div className={classes.commentHeader}>
                <Avatar size={30} src={comment.user.avatar} />
                <Text>{comment.user.username}</Text>
            </div>
            <Text>{comment.text}</Text>
        </div>
    )
})
