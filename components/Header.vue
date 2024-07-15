<template>
    <header class="my-8">
      <div class="container mx-auto">
        <div class="flex justify-between">
          <div>
            <a href="/">
              <img src="/logo-light.svg" alt="oraculus" />
            </a>
          </div>
          <div class="flex gap-x-6 justify-between">
            <div>
              <div>
                <img src="/icons/Ресурс 14.svg" width="30" alt="13">
              </div>
            </div>
            <div class="flex gap-x-5 justify-between">
                <div class="space-y-4">
                    <div class="flex gap-x-4 bg-black/35 rounded-xl justify-between" v-if="balances.length > 0">
                        <div class="flex items-center gap-x-2">
                            <img src="/icons/Ресурс 13.svg" width="30" alt="13">
                            {{ balances[1].sum }}
                        </div>
                        <div>
                            <a href="">
                                <img src="/icons/Ресурс 17.svg" width="30" alt="13">
                            </a>
                        </div>
                    </div>
                    <div class="flex gap-x-4 bg-black/35 rounded-xl justify-between" v-if="balances.length > 1">
                        <div class="flex items-center gap-x-2">
                            <img src="/icons/Ресурс 12.svg" width="30" alt="13">
                            {{ balances[0].sum }}
                        </div>
                        <div>
                            <a href="">
                                <img src="/icons/Ресурс 17.svg" width="30" alt="13">
                            </a>
                        </div>
                    </div>
                    <div v-if="loading" class="text-center">Loading...</div>
                    <div v-if="error" class="text-red-500">Error: {{ error.message }}</div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  </template>

  <script setup>
  import { useBalances } from '~/composables/useBalances'

  const { balances, loading, error } = useBalances()
  </script>

  <style scoped>
  /* Add any scoped styles if necessary */
  </style>