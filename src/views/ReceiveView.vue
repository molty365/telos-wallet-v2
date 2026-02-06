<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAccount } from '@wagmi/vue'
import QRCode from '@/components/QRCode.vue'

const router = useRouter()
const { address } = useAccount()

const copied = ref(false)

const copyAddress = async () => {
  if (!address.value) return
  try {
    await navigator.clipboard.writeText(address.value)
    copied.value = true
    setTimeout(() => copied.value = false, 2000)
  } catch (e) {
    console.error('Copy failed:', e)
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center gap-3">
      <button @click="router.back()" class="text-gray-500 hover:text-gray-700 text-xl">←</button>
      <h1 class="text-xl font-semibold">Receive</h1>
    </div>

    <div class="card p-6 text-center space-y-6">
      <!-- QR Code -->
      <div class="flex justify-center">
        <div class="bg-white p-4 rounded-2xl border border-gray-200">
          <QRCode v-if="address" :value="address" :size="6" />
        </div>
      </div>

      <!-- Info -->
      <p class="text-sm text-gray-500">
        Send TLOS or ERC-20 tokens to this address on Telos EVM.
      </p>

      <!-- Address -->
      <div 
        class="bg-gray-50 rounded-xl p-4 font-mono text-sm break-all text-gray-700 cursor-pointer hover:bg-gray-100 transition"
        @click="copyAddress"
      >
        {{ address }}
      </div>

      <!-- Copy Button -->
      <button @click="copyAddress" :class="copied ? 'bg-green-500 text-white' : 'btn-primary'" class="w-full py-4 rounded-2xl font-semibold transition">
        {{ copied ? '✓ Copied!' : 'Copy Address' }}
      </button>
    </div>
  </div>
</template>
