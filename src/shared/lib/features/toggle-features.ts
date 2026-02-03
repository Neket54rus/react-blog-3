import { FeatureFlags } from "shared/types/features-flags"

import { getFeatureFlag } from "./set-get-features"

interface ToggleFeaturesOptions<T> {
    name: keyof FeatureFlags
    on: () => T
    off: () => T
}

export const togglefeatures = <T>(options: ToggleFeaturesOptions<T>): T => {
    const { name, on, off } = options

    if (getFeatureFlag(name)) {
        return on()
    }

    return off()
}
