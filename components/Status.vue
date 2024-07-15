<template>
    <div class="container mx-auto">
        <div class="flex items-center justify-between">
        <a href="/slots" class="bg-pink-500 block text-center rounded-lg w-[137px] h-[27px] font-cr text-lg">Buy Slots</a>
        <div>
            <span class="uppercase">Your Status:</span>
            <span class="text-sm ml-4 px-6 py-2 rounded-xl bg-black/35 font-cr">{{ userInfo.career_status || 'Loading...' }}</span>
        </div>
        </div>
    </div>
</template>

<script setup>
import { useUserInfo } from '~/composables/useUserInfo'

const { userInfo, loading, error } = useUserInfo()
</script>
