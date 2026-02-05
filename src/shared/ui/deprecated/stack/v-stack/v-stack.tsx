import { memo } from 'react'

import { Flex, type FlexProps } from '../flex/flex'
import { FlexDirection } from '../flex/flex.constants'

type VStackProps = Omit<FlexProps, 'direction'>

export const VStack = memo((props: VStackProps) => (
    <Flex direction={FlexDirection.COLUMN} {...props} />
))
