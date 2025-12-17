import type { Country } from 'shared/constants/country'
import type { Currency } from 'shared/constants/currency'

export interface Profile {
    firstName: string
    lastName: string
    age: number
    currency: Currency
    country: Country
    city: string
    username: string
    avatar: string
}

export interface ProfileSchema {
    data?: Profile
    isLoading: boolean
    error?: string
    readonly: boolean
}
