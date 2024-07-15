// composables/useBalances.js
import { useFetch } from '#app'

export function useBalances() {
    const { data: balancesData, pending: loading, error } = useFetch('https://gototest.oraculus.pro/api/open/balance-info/')
    const balances = computed(() => balancesData.value?.balances || [])
    const secondBalance = computed(() => balances.value.length >= 2 ? balances.value[1].sum : 0)

    return { balances, secondBalance, loading, error }
}
