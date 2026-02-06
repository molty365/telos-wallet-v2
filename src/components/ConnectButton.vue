<script setup lang="ts">
import { ref } from 'vue'
import { useConnect, useAccount } from '@wagmi/vue'
import { useRouter } from 'vue-router'

defineProps<{
  size?: 'sm' | 'md' | 'lg'
}>()

const router = useRouter()
const { connectors, connect, isPending } = useConnect()
const { isConnected } = useAccount()

const showModal = ref(false)
const error = ref<string | null>(null)

const handleConnect = async () => {
  error.value = null
  const connector = connectors[0]
  
  if (!connector) {
    error.value = 'No wallet detected. Please install Rabby or MetaMask.'
    return
  }

  try {
    await connect({ connector })
    showModal.value = false
    router.push('/wallet')
  } catch (e: any) {
    if (e.message?.includes('User rejected')) {
      error.value = 'Connection cancelled'
    } else {
      error.value = e.shortMessage || e.message || 'Connection failed'
    }
  }
}

const sizeClasses = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3',
  lg: 'w-full py-4 text-lg',
}
</script>

<template>
  <div>
    <!-- Connect Button -->
    <button
      v-if="!isConnected"
      @click="showModal = true"
      :disabled="isPending"
      :class="['btn-primary', sizeClasses[size || 'md']]"
    >
      {{ isPending ? 'Connecting...' : 'Connect Wallet' }}
    </button>

    <!-- Modal -->
    <Teleport to="body">
      <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
        <div class="modal-content">
          <!-- Header -->
          <div class="text-center mb-6">
            <div class="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <span class="text-2xl">🔗</span>
            </div>
            <h2 class="text-xl font-semibold">Connect Wallet</h2>
            <p class="text-gray-500 text-sm mt-1">Select your wallet to continue</p>
          </div>

          <!-- Wallet Option -->
          <button
            @click="handleConnect"
            :disabled="isPending"
            class="wallet-option mb-4"
          >
            <div class="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
              <span class="text-xl">🦊</span>
            </div>
            <div class="flex-1 text-left">
              <div class="font-medium">Browser Wallet</div>
              <div class="text-sm text-gray-500">Rabby, MetaMask, or Coinbase</div>
            </div>
            <span v-if="isPending" class="text-gray-400 animate-spin">⟳</span>
            <span v-else class="text-gray-400">→</span>
          </button>

          <!-- Error -->
          <div v-if="error" class="bg-red-50 border border-red-200 rounded-xl p-3 mb-4">
            <p class="text-red-600 text-sm text-center">{{ error }}</p>
          </div>

          <!-- Cancel -->
          <button
            @click="showModal = false"
            class="w-full text-center py-3 text-gray-500 hover:text-gray-700"
          >
            Cancel
          </button>
        </div>
      </div>
    </Teleport>
  </div>
</template>
