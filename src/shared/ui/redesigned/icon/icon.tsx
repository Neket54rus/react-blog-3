import {
    type FunctionComponent,
    type ImgHTMLAttributes,
    memo,
    type SVGAttributes,
} from 'react'

import { classNames } from 'shared/lib/class-names'

import classes from './icon.module.scss'

type SvgIcon = {
    src: FunctionComponent<SVGAttributes<SVGElement>>
    className?: string
} & Omit<SVGAttributes<SVGElement>, 'className'>

type ImgIcon = {
    src: string
    className?: string
    alt?: string
} & Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'atl' | 'className'>

type IconProps = SvgIcon | ImgIcon

export const Icon = memo((props: IconProps) => {
    if (typeof props.src === 'string') {
        const { src, className, alt, ...imgProps } = props as ImgIcon

        return (
            <img
                {...imgProps}
                className={classNames(classes.icon, {}, [className])}
                src={src}
                alt={alt ?? 'icon'}
            />
        )
    }

    const { src: Svg, className, ...svgProps } = props as SvgIcon

    return (
        <Svg
            {...svgProps}
            className={classNames(classes.icon, {}, [className])}
        />
    )
})
