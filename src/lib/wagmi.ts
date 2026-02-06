import { http, createConfig } from '@wagmi/vue'
import { defineChain } from 'viem'
import { injected } from '@wagmi/vue/connectors'

// Telos EVM Mainnet
export const telosEvm = defineChain({
  id: 40,
  name: 'Telos EVM',
  nativeCurrency: {
    decimals: 18,
    name: 'Telos',
    symbol: 'TLOS',
  },
  rpcUrls: {
    default: { http: ['https://rpc.telos.net'] },
  },
  blockExplorers: {
    default: { name: 'Teloscan', url: 'https://www.teloscan.io' },
  },
})

// Wagmi Configuration
export const config = createConfig({
  chains: [telosEvm],
  connectors: [
    injected({
      shimDisconnect: true,
    }),
  ],
  transports: {
    [telosEvm.id]: http('https://rpc.telos.net'),
  },
})

// Type registration
declare module '@wagmi/vue' {
  interface Register {
    config: typeof config
  }
}
