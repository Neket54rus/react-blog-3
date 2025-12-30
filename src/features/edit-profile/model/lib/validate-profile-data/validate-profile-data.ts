import { type Profile } from 'entities/profile'

import { ValidatePorfileError } from '../../config/profile.constants'

export const validateProfileData = (
    profile?: Profile,
): ValidatePorfileError[] => {
    if (!profile) {
        return [ValidatePorfileError.NO_DATA]
    }

    const { firstName, lastName } = profile
    const errors: ValidatePorfileError[] = []

    if (!firstName || !lastName) {
        errors.push(ValidatePorfileError.INCORRECT_USER_DATA)
    }

    return errors
}
