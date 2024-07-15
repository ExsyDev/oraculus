// composables/useUserInfo.js
import { useFetch } from '#app'

export function useUserInfo() {
    const { data: userInfo, pending: loading, error } = useFetch('https://gototest.oraculus.pro/api/open/user-info/')

    return { userInfo, loading, error }
}