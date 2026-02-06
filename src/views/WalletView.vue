<script setup lang="ts">
import { computed } from 'vue'
import { useAccount, useBalance } from '@wagmi/vue'
import { formatUnits } from 'viem'

const { address, isConnected } = useAccount()

const { data: balance, isLoading, error, refetch } = useBalance({
  address: address,
})

const formattedBalance = computed(() => {
  if (!balance.value) return '0.00'
  const val = parseFloat(formatUnits(balance.value.value, balance.value.decimals))
  return val.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: val < 1 ? 4 : 2,
  })
})

const usdValue = computed(() => {
  if (!balance.value) return '$0.00'
  const tlosPrice = 0.25
  const val = parseFloat(formatUnits(balance.value.value, balance.value.decimals))
  return `$${(val * tlosPrice).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
})
</script>

<template>
  <div v-if="isConnected" class="space-y-6">
    <!-- Balance Section -->
    <div class="card p-6 text-center">
      <!-- Balance -->
      <div class="mb-6">
        <div class="flex items-center justify-center gap-1 mb-1">
          <span class="text-lg text-gray-500">₮</span>
          <span v-if="isLoading" class="balance-amount animate-pulse">--</span>
          <span v-else class="balance-amount">{{ formattedBalance }}</span>
        </div>
        <div class="balance-secondary">{{ usdValue }}</div>
      </div>

      <!-- Error State -->
      <div v-if="error" class="bg-red-50 rounded-xl p-3 mb-4">
        <p class="text-red-600 text-sm">Failed to load balance</p>
        <button @click="() => refetch()" class="link text-sm mt-1">Retry</button>
      </div>

      <!-- Action Buttons -->
      <div class="flex justify-center gap-6">
        <RouterLink to="/receive" class="action-btn">
          <div class="action-btn-circle">↓</div>
          <span class="action-btn-label">Receive</span>
        </RouterLink>

        <RouterLink to="/send" class="action-btn">
          <div class="action-btn-circle">↑</div>
          <span class="action-btn-label">Send</span>
        </RouterLink>

        <RouterLink to="/stake" class="action-btn">
          <div class="action-btn-circle">◇</div>
          <span class="action-btn-label">Stake</span>
        </RouterLink>

        <RouterLink to="/history" class="action-btn">
          <div class="action-btn-circle">⋯</div>
          <span class="action-btn-label">More</span>
        </RouterLink>
      </div>
    </div>

    <!-- Transactions -->
    <div class="card">
      <div class="p-4 flex items-center justify-between border-b border-gray-100">
        <h2 class="font-semibold">Transactions</h2>
        <RouterLink to="/history" class="link text-sm">See all →</RouterLink>
      </div>

      <div class="p-4 space-y-1">
        <!-- Sample Transaction -->
        <div class="tx-item">
          <div class="flex items-center gap-3">
            <div class="tx-icon tx-icon-receive">↓</div>
            <div>
              <div class="font-medium text-sm">Received</div>
              <div class="text-xs text-gray-500">2 days ago</div>
            </div>
          </div>
          <div class="text-right">
            <div class="font-medium text-sm text-green-600">+10.00 TLOS</div>
          </div>
        </div>

        <div class="tx-item">
          <div class="flex items-center gap-3">
            <div class="tx-icon tx-icon-send">↑</div>
            <div>
              <div class="font-medium text-sm">Sent</div>
              <div class="text-xs text-gray-500">3 days ago</div>
            </div>
          </div>
          <div class="text-right">
            <div class="font-medium text-sm">−5.00 TLOS</div>
          </div>
        </div>

        <!-- Empty State -->
        <div class="py-6 text-center text-gray-400 text-sm">
          Recent activity will appear here
        </div>
      </div>
    </div>
  </div>

  <!-- Not Connected -->
  <div v-else class="text-center py-12">
    <p class="text-gray-500">Connect wallet to view balance</p>
  </div>
</template>
