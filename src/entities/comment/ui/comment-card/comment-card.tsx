import { memo } from 'react'
import { Link } from 'react-router'

import { classNames } from 'shared/lib/class-names'
import { getRouteProfile } from 'shared/routes/constants'
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
            <Link
                to={getRouteProfile(comment.user.username)}
                className={classes.commentHeader}
            >
                <Avatar size={30} src={comment.user.avatar} />
                <Text>{comment.user.username}</Text>
            </Link>
            <Text>{comment.text}</Text>
        </div>
    )
})
