<script setup lang="ts">
import { watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAccount } from '@wagmi/vue'
import ConnectButton from '@/components/ConnectButton.vue'

const router = useRouter()
const { isConnected } = useAccount()

// Redirect if already connected
watch(isConnected, (connected) => {
  if (connected) router.push('/wallet')
}, { immediate: true })
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-[80vh]">
    <div class="card p-8 w-full text-center">
      <!-- Logo -->
      <div class="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
        <span class="text-3xl font-bold text-white">T</span>
      </div>

      <!-- Title -->
      <h1 class="text-2xl font-bold mb-2">Telos Wallet</h1>
      <p class="text-gray-500 mb-8">
        The fastest EVM. Send, receive, and stake TLOS.
      </p>

      <!-- Connect Button -->
      <ConnectButton size="lg" />

      <!-- Footer -->
      <p class="text-xs text-gray-400 mt-6">
        Powered by Telos EVM
      </p>
    </div>
  </div>
</template>
