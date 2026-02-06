<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
// @ts-ignore
import qr from 'qrcode-generator'

const props = defineProps<{
  value: string
  size?: number
}>()

const qrRef = ref<HTMLDivElement>()

const generateQR = () => {
  if (!props.value || !qrRef.value) return
  
  // Clear previous QR code
  qrRef.value.innerHTML = ''
  
  // Generate QR code
  const qrcode = qr(0, 'L')
  qrcode.addData(props.value)
  qrcode.make()
  
  // Create image
  const size = props.size || 8
  const img = qrcode.createImgTag(size)
  qrRef.value.innerHTML = img
}

onMounted(generateQR)
watch(() => props.value, generateQR)
</script>

<template>
  <div ref="qrRef" class="flex justify-center bg-white rounded-xl p-4"></div>
</template>