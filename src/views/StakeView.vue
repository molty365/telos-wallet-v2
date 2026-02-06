<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center gap-3">
      <button @click="router.back()" class="text-gray-500 hover:text-gray-700 text-xl">←</button>
      <h1 class="text-xl font-semibold">Stake</h1>
    </div>

    <div class="card p-8 text-center">
      <!-- Icon -->
      <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-100 flex items-center justify-center">
        <span class="text-3xl">◇</span>
      </div>

      <h2 class="text-xl font-semibold mb-2">Staking Coming Soon</h2>
      <p class="text-gray-500 text-sm mb-6">
        Earn rewards by staking your TLOS with validators on the Telos network.
      </p>

      <!-- Placeholder Stats -->
      <div class="bg-gray-50 rounded-xl p-4 space-y-3">
        <div class="flex justify-between text-sm">
          <span class="text-gray-500">Est. APY</span>
          <span class="font-medium">~12%</span>
        </div>
        <div class="flex justify-between text-sm">
          <span class="text-gray-500">Min. Stake</span>
          <span class="font-medium">1 TLOS</span>
        </div>
        <div class="flex justify-between text-sm">
          <span class="text-gray-500">Unbonding Period</span>
          <span class="font-medium">21 days</span>
        </div>
      </div>

      <button disabled class="btn-primary w-full mt-6 opacity-50 cursor-not-allowed">
        Coming Soon
      </button>
    </div>
  </div>
</template>
