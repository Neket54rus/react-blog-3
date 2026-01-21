export { userReducer, userActions } from './model/slice/user-slice'
export type { User, UserSchema } from './model/types/user'
export {
    USER_LOCAL_STORAGE_KEY,
    UserRole,
} from './model/constants/user.constants'
export { getUserAuthData } from './model/selectors/get-user-auth-data'
export { getUserInited } from './model/selectors/get-user-auth-inited'
export { isUserAdmin } from './model/selectors/is-user-admin'
