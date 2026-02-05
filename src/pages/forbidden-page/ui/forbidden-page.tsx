import { memo } from 'react'

import { Page } from 'widgets/page'

import { FlexJustify, HStack } from 'shared/ui/deprecated/stack'
import { ColorText, SizeText, Text } from 'shared/ui/deprecated/text'

interface ForbiddenPageProps {
    className?: string
}

const ForbiddenPage = memo((props: ForbiddenPageProps) => {
    const { className } = props

    return (
        <Page className={className}>
            <HStack justify={FlexJustify.CENTER}>
                <Text color={ColorText.ERROR} size={SizeText.L}>
                    У вас нет доступа к этой странице!
                </Text>
            </HStack>
        </Page>
    )
})

export default ForbiddenPage
