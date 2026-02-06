<script setup lang="ts">
import { useAccount, useDisconnect } from '@wagmi/vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const { isConnected, address } = useAccount()
const { disconnect } = useDisconnect()

const shortAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`

const handleDisconnect = () => {
  disconnect()
  router.push('/')
}
</script>

<template>
  <header class="header">
    <div class="max-w-[420px] mx-auto px-4 py-3 flex items-center justify-between">
      <!-- Logo -->
      <RouterLink to="/" class="flex items-center gap-2">
        <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
          <span class="text-white text-sm font-bold">T</span>
        </div>
        <span class="font-semibold text-lg">telos</span>
        <span class="text-gray-400">▾</span>
      </RouterLink>

      <!-- Right Side -->
      <div class="flex items-center gap-3">
        <template v-if="isConnected && address">
          <div class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100">
            <span class="status-dot"></span>
            <span class="text-sm font-mono text-gray-600">{{ shortAddress(address) }}</span>
          </div>
          <button @click="handleDisconnect" class="text-gray-400 hover:text-gray-600">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
          </button>
        </template>
      </div>
    </div>
  </header>
</template>
