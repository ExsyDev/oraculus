<!-- components/ErrorModal.vue -->
<template>
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div class="bg-black/30 p-6 rounded-lg shadow-lg">
        <p class="text-white font-cr">{{ message }}</p>
        <div class="flex justify-center">
            <button @click="close" class="mt-4 px-4 py-2 bg-red-500 text-white rounded">Close</button>
        </div>
      </div>
    </div>
</template>

<script setup>
defineProps({
message: {
    type: String,
    required: true
}
})

const emit = defineEmits(['close'])

const close = () => {
emit('close')
}
</script>
