import { type JSX, memo, type ReactNode } from "react";

import { type FeatureFlags } from "shared/types/features-flags";

import { getFeatureFlag } from "../set-get-features";

interface ToggleFeaturesProps {
    feature: keyof FeatureFlags
    on: ReactNode
    off: ReactNode
}

export const ToggleFeatures = memo((props: ToggleFeaturesProps): JSX.Element => {
    const { feature, on, off } = props

    if (getFeatureFlag(feature)) {
        return <>{on}</>
    }

    return <>{off}</>
})

