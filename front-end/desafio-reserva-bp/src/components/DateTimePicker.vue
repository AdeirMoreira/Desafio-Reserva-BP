<template>
  <flat-pickr v-model="datePicker" :config="config" placeholder="DD/MM/AAAA HH:MM" name="date" />
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'

// import this component
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
// theme is optional
// try more themes at - https://flatpickr.js.org/themes/
import 'flatpickr/dist/themes/material_blue.css'
// localization is optional
import { Portuguese } from 'flatpickr/dist/l10n/pt.js'

const { date } = defineProps(['date'])

const datePicker = ref(date)

defineEmits(['update:datePicker'])

// Read more at https://flatpickr.js.org/options/
const config = ref({
  altFormat: 'd/m/Y H:i',
  altInput: true,
  enableTime: true,
  dateFormat: 'Y-m-d\\TH:i:ss',
  time_24hr: true,
  locale: Portuguese // locale for this instance only
})
</script>


