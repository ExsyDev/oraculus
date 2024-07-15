// composables/useInvestmentInfo.js
import { useFetch } from '#app'

export function useInvestmentInfo() {
    const { data: investmentInfo, pending: loading, error } = useFetch('https://gototest.oraculus.pro/api/open/investment-info')

    return { investmentInfo, loading, error }
}
