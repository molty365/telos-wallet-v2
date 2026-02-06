<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAccount, useBalance, useSendTransaction, useWaitForTransactionReceipt } from '@wagmi/vue'
import { parseEther, isAddress, formatUnits } from 'viem'

const router = useRouter()
const { address } = useAccount()

const recipient = ref('')
const amount = ref('')

const { data: balance } = useBalance({ address })

const { data: hash, isPending: isSending, sendTransaction, error: sendError } = useSendTransaction()
const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

const maxAmount = computed(() => {
  if (!balance.value) return '0'
  const val = parseFloat(formatUnits(balance.value.value, 18))
  return Math.max(0, val - 0.01).toFixed(6)
})

const isValidRecipient = computed(() => recipient.value && isAddress(recipient.value))
const isValidAmount = computed(() => {
  const amt = parseFloat(amount.value)
  return amt >= 0.0001 && amt <= parseFloat(maxAmount.value)
})
const canSend = computed(() => isValidRecipient.value && isValidAmount.value && !isSending.value)

const setMax = () => { amount.value = maxAmount.value }

const handleSend = async () => {
  if (!canSend.value) return
  try {
    await sendTransaction({
      to: recipient.value as `0x${string}`,
      value: parseEther(amount.value),
    })
  } catch (e) {
    console.error('Send failed:', e)
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center gap-3">
      <button @click="router.back()" class="text-gray-500 hover:text-gray-700 text-xl">←</button>
      <h1 class="text-xl font-semibold">Send</h1>
    </div>

    <!-- Success State -->
    <div v-if="isSuccess && hash" class="card p-8 text-center">
      <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
        <span class="text-3xl text-green-600">✓</span>
      </div>
      <h2 class="text-xl font-semibold mb-2">Sent!</h2>
      <a :href="`https://www.teloscan.io/tx/${hash}`" target="_blank" class="link text-sm">
        View on Teloscan →
      </a>
      <div class="mt-6">
        <RouterLink to="/wallet" class="btn-secondary inline-block">Back to wallet</RouterLink>
      </div>
    </div>

    <!-- Send Form -->
    <div v-else class="card p-6 space-y-5">
      <!-- Recipient -->
      <div>
        <label class="block text-sm font-medium text-gray-600 mb-2">To</label>
        <input
          v-model="recipient"
          type="text"
          placeholder="Enter address..."
          class="input font-mono text-sm"
          :class="{ 'border-red-300 focus:border-red-500': recipient && !isValidRecipient }"
        />
        <p v-if="recipient && !isValidRecipient" class="text-red-500 text-xs mt-1">Invalid address</p>
      </div>

      <!-- Amount -->
      <div>
        <div class="flex items-center justify-between mb-2">
          <label class="text-sm font-medium text-gray-600">Amount</label>
          <button @click="setMax" class="link text-xs">
            Max: {{ parseFloat(maxAmount).toFixed(4) }}
          </button>
        </div>
        <div class="relative">
          <input
            v-model="amount"
            type="number"
            step="0.0001"
            min="0"
            placeholder="0.00"
            class="input pr-16"
            :class="{ 'border-red-300': amount && !isValidAmount }"
          />
          <span class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">TLOS</span>
        </div>
        <p v-if="amount && !isValidAmount" class="text-red-500 text-xs mt-1">
          <span v-if="parseFloat(amount) < 0.0001">Min: 0.0001 TLOS</span>
          <span v-else>Insufficient balance</span>
        </p>
      </div>

      <!-- Error -->
      <div v-if="sendError" class="bg-red-50 border border-red-200 rounded-xl p-3">
        <p class="text-red-600 text-sm">{{ (sendError as any).shortMessage || sendError.message }}</p>
      </div>

      <!-- Send Button -->
      <button @click="handleSend" :disabled="!canSend" class="btn-primary w-full">
        <span v-if="isSending || isConfirming">{{ isConfirming ? 'Confirming...' : 'Sending...' }}</span>
        <span v-else>Review</span>
      </button>
    </div>
  </div>
</template>
