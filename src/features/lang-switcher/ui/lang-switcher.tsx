import { type JSX } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from 'shared/ui/button'

interface LangSwitcherProps {
    className?: string
}

export const LangSwitcher = (props: LangSwitcherProps): JSX.Element => {
    const { className } = props

    const { t, i18n } = useTranslation()

    const onTranslate = (): void => {
        i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru')
    }

    return (
        <Button className={className} onClick={onTranslate}>
            {t('Язык')}
        </Button>
    )
}
