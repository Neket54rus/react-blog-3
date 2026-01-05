import { memo } from 'react'

import { Skeleton } from 'shared/ui/skeleton'

import classes from './article-info-skeleton.module.scss'

export const ArticleInfoSkeleton = memo(() => (
    <div className={classes.articleInfoSekeleton}>
        <Skeleton
            className={classes.articleInfoSekeletonHeader}
            width={200}
            height={200}
            border="100%"
        />
        <Skeleton
            className={classes.articleInfoSekeletonTitle}
            width="60%"
            height={30}
        />
        <Skeleton
            className={classes.articleInfoSekeletonSubTitle}
            width="40%"
            height={30}
        />
        <Skeleton className={classes.articleInfoSekeletonText} height={230} />
        <Skeleton height={230} />
    </div>
))
