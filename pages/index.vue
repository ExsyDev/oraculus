<template>
    <div>
        <Header />
        <div class="container mx-auto">
            <div class="bg-black/35 rounded-xl py-8">
                <Status />
            <div class="my-8">
            <div class="container mx-auto px-0">
                <div class="flex justify-between gap-x-6 font-cr">
                <div class="bg-black/35">
                    <img src="/icons/Ресурс 15.svg" width="90" alt="">
                    <div class="pt-4 text-center">
                    05:12:11
                    </div>
                </div>
                <div>
                <div class="flex">
                    <div class="flex gap-x-4 mb-4 bg-black/35 py-2 px-4 w-full items-center">
                        <img src="/icons/Ресурс 11.svg" width="20" alt="">
                        My Assets
                        <div class="pl-16">
                            {{ investmentInfo.invested }} USDT
                        </div>
                    </div>
                </div>
                <div class="flex">
                    <div class="flex gap-x-4 mb-4 bg-black/35 py-2 px-4 w-full items-center">
                        <img src="/icons/Ресурс 10.svg" width="20" alt="">
                        Total Accrual
                        <div class="pl-[4.5rem]">
                            {{ investmentInfo.earn }} USDT
                        </div>
                    </div>
                </div>
                <div class="flex">
                    <div class="flex gap-x-4 bg-black/35 py-2 px-4 w-full items-center">
                        <div>
                            <img src="/icons/Ресурс 9.svg" width="20" alt="">
                        </div>
                        Available Accruals
                        <div class="pl-8">
                            {{ secondBalance }} USDT
                        </div>
                    </div>
                </div>
                </div>
                </div>
            </div>
            </div>
            <div class="flex flex-col gap-y-6 items-center mt-24">
                <span class="text-2xl" v-if="currentAmount">{{ currentAmount }}</span>
                <button class="w-[190px] h-[55px] bg-pink-500 rounded-lg text-center uppercase text-2xl" @click="handleClaim">
                    Claim
                </button>
            </div>
            <div class="mt-12">
        <div class="container px-0 mx-auto">
            <table class="font-cr mx-auto">
                <thead>
                    <tr>
                        <td class="w-[300px] bg-black/35 py-2 text-center">Name</td>
                        <td class="w-[300px] bg-black/35 py-2 text-center">Amount</td>
                        <td class="w-[300px] bg-black/35 py-2 text-center">Profit</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="loading">
                        <td colspan="5" class="text-center">Loading...</td>
                    </tr>
                    <tr v-if="error" class="text-red-500">
                        <td colspan="5" class="text-center">Error loading data: {{ error.message }}</td>
                    </tr>
                    <tr v-for="(details, slot) in investmentDetails" :key="slot">
                        <td class="w-[300px] py-4 text-center">{{ slot }}</td>
                        <td class="w-[300px] py-4 text-center">{{ details.invested_sum }} USDT</td>
                        <td class="w-[300px] py-4 text-center">{{ details.earn_today }} USDT</td>
                    </tr>
                </tbody>
            </table>
        </div>
        </div>
            </div>
        </div>

        <Footer />
        <ErrorModal v-if="showErrorModal" :message="claimError" @close="showErrorModal = false" />
    </div>
</template>

<script setup>
import { useInvestmentDetails } from '~/composables/useInvestmentDetails'
import { useInvestmentInfo } from '~/composables/useInvestmentInfo'
import { useBalances } from '~/composables/useBalances'

import { ref } from 'vue'
import { useFetch } from '#app'

const { data: transferError, loading: transferLoading, error: transferFetchError, fetch: fetchTransfer } = useFetch('https://gototest.oraculus.pro/api/open/create-transfer-balance')


const currentAmount = ref('')
const claimError = ref(null)
const showErrorModal = ref(false)

const { investmentDetails, loading, error } = useInvestmentDetails()
const { investmentInfo } = useInvestmentInfo()
const { secondBalance } = useBalances()

const handleClaim = async () => {
  try {
    const response = await fetch('https://gototest.oraculus.pro/api/open/create-transfer-balance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ sum: 10 })
    })
    const data = await response.json()

    if (data.error === 1) {
      claimError.value = data.text
      showErrorModal.value = true
    } else {
      console.log('Claim successful!')
    }
  } catch (error) {
    console.error('Error claiming:', error)
  }
}
</script>

<style scoped>
/* Add any scoped styles if necessary */
</style>
