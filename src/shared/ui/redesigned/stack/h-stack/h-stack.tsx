import { memo } from 'react'

import { Flex, type FlexProps } from '../flex/flex'
import { FlexDirection } from '../flex/flex.constants'

type HStackProps = Omit<FlexProps, 'direction'>

export const HStack = memo((props: HStackProps) => (
    <Flex direction={FlexDirection.ROW} {...props} />
))
