import { memo, useCallback } from 'react'

import CopyIcon from 'shared/assets/icons/copy.svg?react'
import { classNames } from 'shared/lib/class-names'

import { Button } from '../button'

import classes from './code.module.scss'

interface CodeProps {
    text: string
    className?: string
}

export const Code = memo((props: CodeProps) => {
    const { text, className } = props

    const onCopy = useCallback(() => {
        navigator.clipboard.writeText(text)
    }, [text])

    return (
        <pre className={classNames(classes.code, {}, [className])}>
            <Button className={classes.codeCopy} onClick={onCopy}>
                <CopyIcon className={classes.codeCopyIcon} />
            </Button>
            <code>{text}</code>
        </pre>
    )
})
