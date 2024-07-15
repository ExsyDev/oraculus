// composables/useTopupHistory.js
import { useFetch } from '#app'

export function useTopupHistory(type = 0) {
    const formData = new FormData();
    formData.append('type', type);
    const { data: topupHistory, pending: loading, error } = useFetch('https://gototest.oraculus.pro/api/open/topup-history', {
        method: 'POST',
        body: formData
    })

    return { topupHistory, loading, error }
}
