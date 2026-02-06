import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useWalletStore = defineStore('wallet', () => {
  // State
  const address = ref<string | null>(null)
  const isConnected = ref(false)
  const chainId = ref<number | null>(null)
  const balance = ref<string>('0')
  const tokens = ref<TokenBalance[]>([])
  
  // Getters
  const shortAddress = computed(() => {
    if (!address.value) return ''
    return `${address.value.slice(0, 6)}...${address.value.slice(-4)}`
  })
  
  const formattedBalance = computed(() => {
    const bal = parseFloat(balance.value)
    return bal.toLocaleString(undefined, { 
      minimumFractionDigits: 2,
      maximumFractionDigits: 4 
    })
  })
  
  // Actions
  function setConnected(addr: string, chain: number) {
    address.value = addr
    chainId.value = chain
    isConnected.value = true
  }
  
  function disconnect() {
    address.value = null
    chainId.value = null
    isConnected.value = false
    balance.value = '0'
    tokens.value = []
  }
  
  function setBalance(bal: string) {
    balance.value = bal
  }
  
  function setTokens(tokenList: TokenBalance[]) {
    tokens.value = tokenList
  }
  
  return {
    // State
    address,
    isConnected,
    chainId,
    balance,
    tokens,
    // Getters
    shortAddress,
    formattedBalance,
    // Actions
    setConnected,
    disconnect,
    setBalance,
    setTokens,
  }
})

export interface TokenBalance {
  address: string
  symbol: string
  name: string
  decimals: number
  balance: string
  logoURI?: string
}
