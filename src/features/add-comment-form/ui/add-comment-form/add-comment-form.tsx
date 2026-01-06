import { memo, useCallback } from 'react'
import { useSelector } from 'react-redux'

import { addCommentFormActions } from 'features/add-comment-form/model/slice/add-comment-form-slice'

import { classNames } from 'shared/lib/class-names'
import { useAppDispatch } from 'shared/lib/store/use-app-dispatch'
import { Button, ButtonTheme } from 'shared/ui/button'
import { Input } from 'shared/ui/input'
import { Spinner } from 'shared/ui/spinner'

import { getCommentFormState } from '../../model/selectors/get-commetn-form-state'

import classes from './add-comment-form.module.scss'

interface AddCommentFormProps {
    className?: string
    onSendComment?: (text: string) => void
}

export const AddCommentForm = memo((props: AddCommentFormProps) => {
    const { className, onSendComment } = props

    const dispatch = useAppDispatch()

    const { text, isLoading } = useSelector(getCommentFormState)

    const onCommentTextChange = useCallback(
        (value: string) => {
            dispatch(addCommentFormActions.setText(value))
        },
        [dispatch],
    )

    const onSandHandler = useCallback(() => {
        if (onSendComment && text) {
            onSendComment(text)
            dispatch(addCommentFormActions.setText(''))
        }
    }, [dispatch, onSendComment, text])

    return (
        <div className={classNames(classes.addCommentForm, {}, [className])}>
            <Input
                placeholder="Введите текст комментария"
                value={text}
                onChange={onCommentTextChange}
                clearTheme
            />
            {isLoading ? (
                <Spinner />
            ) : (
                <Button theme={ButtonTheme.OUTLINE} onClick={onSandHandler}>
                    Отправить
                </Button>
            )}
        </div>
    )
})
