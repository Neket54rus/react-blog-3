import { memo, type JSX } from 'react'
import { useTranslation } from 'react-i18next'

import { ToggleFeatures } from 'shared/lib/features'
import { Button as ButtonDeprecated } from 'shared/ui/deprecated/button'
import { Button } from 'shared/ui/redesigned/button'
import { Text } from 'shared/ui/redesigned/text'

interface LangSwitcherProps {
    className?: string
}

export const LangSwitcher = memo((props: LangSwitcherProps): JSX.Element => {
    const { className } = props

    const { t, i18n } = useTranslation()

    const onTranslate = (): void => {
        i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru')
    }

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <Button className={className} onClick={onTranslate}>
                    <Text size="size_l" weight={700}>
                        {i18n.language === 'en' ? 'EN' : 'RU'}
                    </Text>
                </Button>
            }
            off={
                <ButtonDeprecated className={className} onClick={onTranslate}>
                    {t('Язык')}
                </ButtonDeprecated>
            }
        />
    )
})
