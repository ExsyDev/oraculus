<template>
    <div>
        <Header />

        <div class="my-8">
            <div class="container mx-auto">
                <div class="bg-black/35 rounded-xl px-6 py-8">
                    <div class="flex justify-center gap-x-6 font-pr">
                        <button
                            @click="setActiveTab('top-up')"
                            :class="['text-white rounded-lg w-[205px] h-[28px] font-semibold', activeTab === 'top-up' ? 'bg-pink-500' : 'bg-black/35']"
                            >
                            Top Up
                        </button>
                        <button
                            @click="setActiveTab('withdraw')"
                            :class="['text-white rounded-lg w-[205px] h-[28px] font-semibold', activeTab === 'withdraw' ? 'bg-pink-500' : 'bg-black/35']"
                            >
                            Withdraw
                        </button>
                    </div>

                    <div class="content mt-4">
                        <div v-if="activeTab === 'withdraw'">
                            <div class="flex gap-x-6 justify-between">
                                <div class="w-full">
                                    <label for="amount" class="block uppercase">Amount</label>
                                    <input type="number" class="w-full uppercase px-4 bg-black/35 rounded-lg py-4 mt-2" id="amount">
                                </div>
                                <div class="w-full">
                                    <label for="google_fa" class="block uppercase">Google 2FA</label>
                                    <input type="text" class="w-full uppercase px-4 bg-black/35 rounded-lg py-4 mt-2" id="google_fa">
                                </div>
                            </div>
                            <div class="my-4">
                                <label for="wallet" class="block uppercase">Wallet</label>
                                <input type="text" class="w-full uppercase px-4 bg-black/35 rounded-lg py-4 mt-2" id="wallet">
                            </div>
                            <div class="space-y-2 text-sm">
                                <div class="flex justify-between">
                                    <span>Transaction Fees(300%)</span>
                                    <span>
                                        3.00 USDT
                                    </span>
                                </div>
                                <div class="flex justify-between">
                                    <span>Amount to be received</span>
                                    <span>
                                        97.00 USDT
                                    </span>
                                </div>
                            </div>
                            <div class="mt-3">
                                <button class="bg-pink-500 text-white h-[40px] text-center uppercase w-full rounded-lg">Confirm</button>
                            </div>
                            <div class="space-y-2 mt-3">
                                <div class="flex justify-between">
                                    <span>Period of funds receipt:</span>
                                    <span>
                                        48 hours
                                    </span>
                                </div>
                                <div class="flex justify-between">
                                    <span>Minimum to withdraw:</span>
                                    <span>
                                        00 USDT
                                    </span>
                                </div>
                            </div>
                            <div class="mt-4 -mx-6">
                                <table class="font-cr w-full">
                                    <thead>
                                        <tr>
                                            <td colspan="5"  class="bg-black/35 py-2 text-center">Amount</td>
                                            <td colspan="5"  class="bg-black/35 py-2 text-center">Date</td>
                                            <td class="bg-black/35 py-2 text-center">TxID</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="operation in topupHistory.operations" :key="operation.id">
                                            <td colspan="5" class="text-center">{{ operation.amount }} USDT</td>
                                            <td colspan="5" class="text-center">{{ operation.date }}</td>
                                            <td class="py-4 text-center">
                                                <a :href="`https://tronscan.org/#/transaction/${operation.comment}`" target="_blank" class="flex justify-center">
                                                <img src="/icons/icowal.png" width="15" alt="Transaction ID">
                                                </a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div v-else-if="activeTab === 'top-up'">
                            <!-- Content for Withdraw -->
                            <div class="mt-6">
                                <div class="flex gap-x-6">
                                    <div>
                                        <select name="wallet_id" class="bg-pink-500 text-white py-1 px-4 rounded-xl font-semibold" id="wallet_id">
                                            <option value="trc20">USDT TRC20</option>
                                        </select>
                                    </div>
                                    <div v-if="QR" class="qr-code">
                                        <img :src="QR" width="120" alt="QR Code">
                                    </div>
                                </div>

                                <p class="mt-4">
                                    To top up your balance, send at least 1 USDT (TRC-20) to the following wallet:
                                </p>

                                <div class="mt-4 mb-6">
                                    <div class="relative">
                                        <input type="text" readonly class="w-full cursor-pointer uppercase px-4 bg-black/35 rounded-lg py-4 pr-3" :value="wallet" @click="copyWallet">
                                        <div class="copy absolute top-3 right-3">
                                            <img src="/icons/copy.png" alt="copy">
                                        </div>
                                    </div>
                                </div>

                                <p>
                                    Funds will be credited to your account automatically upon confirmation by the USDT network (TRC-20). This may take up to 30 minutes.
                                </p>

                                <div class="mt-6 -mx-6">
                                    <table class="font-cr w-full">
                                        <thead>
                                            <tr>
                                                <td colspan="5"  class="bg-black/35 py-2 text-center">Amount</td>
                                                <td colspan="5"  class="bg-black/35 py-2 text-center">Date</td>
                                                <td class="bg-black/35 py-2 text-center">TxID</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="operation in topupHistory.operations" :key="operation.id">
                                                <td colspan="5" class="text-center">{{ operation.amount }} USDT</td>
                                                <td colspan="5" class="text-center">{{ operation.date }}</td>
                                                <td class="py-4 text-center">
                                                    <a :href="`https://tronscan.org/#/transaction/${operation.comment}`" target="_blank" class="flex justify-center">
                                                    <img src="/icons/icowal.png" width="15" alt="Transaction ID">
                                                    </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Footer />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useTopupHistory } from '~/composables/useTopupHistory'

const activeTab = ref('top-up')
const { topupHistory, loading, error } = useTopupHistory()
const wallet = ref('')
const QR = ref('')

const setActiveTab = (tab) => {
    activeTab.value = tab
    if (tab === 'top-up') {
        // Refresh top-up history
        const { topupHistory: newTopupHistory, loading: newLoading, error: newError } = useTopupHistory(1)
        topupHistory.value = newTopupHistory.value
        loading.value = newLoading.value
        error.value = newError.value
    } else if (tab === 'withdraw') {
        // Assuming withdraw history type is 2
        const { topupHistory: newTopupHistory, loading: newLoading, error: newError } = useTopupHistory(2)
        topupHistory.value = newTopupHistory.value
        loading.value = newLoading.value
        error.value = newError.value
    }
}

onMounted(async () => {
    try {
        const response = await fetch('https://gototest.oraculus.pro/api/open/stat-page-balance/')
        const data = await response.json()

        if (data) {
            wallet.value = data[0].wallet
            QR.value = data[0].QR
        }
    } catch (error) {
        console.error('Error fetching wallet and QR data:', error)
    }
})

// Function to copy wallet value to clipboard
const copyWallet = () => {
    const input = document.createElement('input')
    input.value = wallet.value
    document.body.appendChild(input)
    input.select()
    wallet.value = 'Copied!'
    document.execCommand('copy')
    document.body.removeChild(input)
}
</script>