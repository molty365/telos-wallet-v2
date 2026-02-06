<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAccount } from '@wagmi/vue'

const router = useRouter()
const { address } = useAccount()
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center gap-3">
      <button @click="router.back()" class="text-gray-500 hover:text-gray-700 text-xl">←</button>
      <h1 class="text-xl font-semibold">History</h1>
    </div>

    <div class="card">
      <!-- Transactions would be fetched from Teloscan API -->
      <div class="p-4 space-y-1">
        <!-- Sample Transactions -->
        <div class="tx-item">
          <div class="flex items-center gap-3">
            <div class="tx-icon tx-icon-receive">↓</div>
            <div>
              <div class="font-medium text-sm">Received</div>
              <div class="text-xs text-gray-500">2 days ago</div>
            </div>
          </div>
          <div class="text-right">
            <div class="font-medium text-sm text-green-600">+10.062 TLOS</div>
          </div>
        </div>

        <div class="tx-item">
          <div class="flex items-center gap-3">
            <div class="tx-icon tx-icon-send">↑</div>
            <div>
              <div class="font-medium text-sm">Sent</div>
              <div class="text-xs text-gray-500">2 days ago</div>
            </div>
          </div>
          <div class="text-right">
            <div class="font-medium text-sm">−6.025 TLOS</div>
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
            <div class="font-medium text-sm">−3.001 TLOS</div>
          </div>
        </div>

        <div class="tx-item">
          <div class="flex items-center gap-3">
            <div class="tx-icon tx-icon-receive">↓</div>
            <div>
              <div class="font-medium text-sm">Received</div>
              <div class="text-xs text-gray-500">4 days ago</div>
            </div>
          </div>
          <div class="text-right">
            <div class="font-medium text-sm text-green-600">+10.062 TLOS</div>
          </div>
        </div>

        <div class="tx-item">
          <div class="flex items-center gap-3">
            <div class="tx-icon tx-icon-receive">↓</div>
            <div>
              <div class="font-medium text-sm">Shielding</div>
              <div class="text-xs text-gray-500">6 days ago</div>
            </div>
          </div>
          <div class="text-right">
            <div class="font-medium text-sm text-green-600">+5.062 TLOS</div>
          </div>
        </div>
      </div>

      <!-- View on Explorer -->
      <div class="p-4 border-t border-gray-100 text-center">
        <a 
          :href="`https://www.teloscan.io/address/${address}`" 
          target="_blank" 
          class="link text-sm"
        >
          View all on Teloscan →
        </a>
      </div>
    </div>
  </div>
</template>
