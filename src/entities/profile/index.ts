export type { Profile, ProfileSchema } from './model/types/profile'
export { ProfileInfo } from './ui/profile-info/profile-info'
export { getProfileState } from './model/selectors/get-profile-state/get-profile-state'
export { fetchProfileData } from './model/services/fetch-profile-data/fetch-profile-data'
export {
    profileAction,
    profileReducer,
    profileSlice,
} from './model/slice/profile-slice'
