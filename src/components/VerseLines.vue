<template>
    <div v-for="line, idx in lines" :key="idx">
        {{ line }}
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
const props = defineProps<{
    text: string
}>()
const lines = props.text.split("\n")
</script>
