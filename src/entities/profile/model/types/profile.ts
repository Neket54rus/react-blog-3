import { type Currency } from 'entities/currency'

import { type Country } from 'shared/constants/country'

export interface Profile {
    firstName?: string
    lastName?: string
    age?: number
    currency?: Currency
    country?: Country
    city?: string
    username?: string
    avatar?: string
}

export interface ProfileSchema {
    data?: Profile
    isLoading: boolean
    error?: string
}
