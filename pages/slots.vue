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
                            Buy Slots
                        </button>
                        <button
                            @click="setActiveTab('withdraw')"
                            :class="['text-white rounded-lg w-[205px] h-[28px] font-semibold', activeTab === 'withdraw' ? 'bg-pink-500' : 'bg-black/35']"
                            >
                            Profit
                        </button>
                    </div>

                    <div class="content mt-4">
                        <div v-if="activeTab === 'withdraw'">
                            <div class="mt-4 -mx-6">
                                <table class="font-cr w-full">
                                    <thead>
                                        <tr>
                                            <td class="bg-black/35 py-2 text-center">Slots</td>
                                            <td class="bg-black/35 py-2 text-center">Activated</td>
                                            <td class="bg-black/35 py-2 text-center">Amount</td>
                                            <td class="bg-black/35 py-2 text-center">Hedging</td>
                                            <td class="bg-black/35 py-2 text-center">Rebalancing</td>
                                            <td class="bg-black/35 py-2 text-center">Total</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td class="py-4 text-center" colspan="6">Нет данных</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div v-else-if="activeTab === 'top-up'">
                            <!-- Content for Withdraw -->
                            <div class="mt-6">
                                <div class="flex flex-col">
                                    <div class="flex gap-x-6">
                                        <div>
                                            <select name="wallet_id" class="bg-pink-500 text-white py-1 px-4 rounded-xl font-semibold" id="wallet_id">
                                                <option value="trc20">Slot 1</option>
                                            </select>
                                        </div>
                                        <div class="rounded-lg bg-black/35 w-full px-6 py-4">
                                            <div class="flex gap-x-4 mb-4">
                                                <img src="/icons/Ресурс 12.svg" width="30" alt="13">
                                                <span class="font-cr text-lg">
                                                    100300 USDT
                                                </span>
                                            </div>
                                            <table class="w-full">
                                                <tr>
                                                    <td>ЗА НЕДЕЛЮ</td>
                                                    <td class="text-right">7.0 %</td>
                                                </tr>
                                                <tr>
                                                    <td>ПЕРИОД РАБОТЫ</td>
                                                    <td class="text-right">365 ДНЕЙ</td>
                                                </tr>
                                                <tr>
                                                    <td>ПРИБЫЛЬ</td>
                                                    <td class="text-right">338.50 %</td>
                                                </tr>
                                                <tr>
                                                    <td>РЕБАЛАНСИРОВКА</td>
                                                    <td class="text-right">10 %</td>
                                                </tr>
                                                <tr>
                                                    <td>ПОДДЕРЖКА</td>
                                                    <td class="text-right">24/7</td>
                                                </tr>
                                                <tr>
                                                    <td>ХЕДЖИРОВАНИЕ АКТИВОВ</td>
                                                    <td>
                                                        <div></div>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                    <div class="mt-3 ml-auto relative">
                                        <img class="absolute left-[-2.5rem] " src="/icons/arrow.png" alt="">
                                            <button class="bg-pink-500 block text-white h-[40px] text-center w-[150px] uppercase rounded-lg">Activate</button>
                                    </div>
                                </div>

                                <p class="mt-4">
                                    Funds will be credited to your account automatically upon confirmation by the USDT network (TRC-20). This may take up to 30 minutes.
                                </p>


                                <div class="mt-6 -mx-6">
                                    <table class="font-cr w-full">
                                        <thead>
                                            <tr>
                                                <td class="bg-black/35 py-2 text-center">Slots</td>
                                                <td class="bg-black/35 py-2 text-center">Activated</td>
                                                <td class="bg-black/35 py-2 text-center">Profit Received</td>
                                                <td class="bg-black/35 py-2 text-center">Hedging</td>
                                            </tr>
                                        </thead>
                                        <tbody v-if="Object.keys(slots).length > 0">
                                            <tr v-for="(slot, slotId) in slots" :key="slotId">
                                                <td class="text-center py-4">{{ slot.name }}</td>
                                                <td class="text-center py-4">{{ slot.start }}</td>
                                                <td class="text-center py-4">{{ slot.be_received }}</td>
                                                <td class="text-center py-4">{{ slot.hedging }}</td>
                                            </tr>
                                        </tbody>
                                        <tbody v-else>
                                            <tr>
                                                <td colspan="4" class="text-center py-6">
                                                    No Data Available
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
const slots = ref({})
const activeTab = ref('top-up')
const { topupHistory, loading, error } = useTopupHistory()
const wallet = ref('')

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
        const response = await fetch('https://gototest.oraculus.pro/api/open/all-my-slots')
        const data = await response.json()

        if (data) {
            slots.value = data
        }
    } catch (error) {
        console.error('Error fetching slots data:', error)
    }
})
</script>