// composables/useInvestmentDetails.js
import { useFetch } from '#app'

export function useInvestmentDetails() {
    const { data: investmentDetails, pending: loading, error } = useFetch('https://gototest.oraculus.pro/api/open/investment-details')

    return { investmentDetails, loading, error }
}
