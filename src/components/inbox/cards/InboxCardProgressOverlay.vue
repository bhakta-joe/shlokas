<template>
  <div
    class="overlay"
    :class="{'invisible':!isVisible}"
  >
    <div v-if="isFinished">
      <span>😎</span>
      <div>
        {{ t('finished') }}
      </div>
    </div>

    <div v-else>
      <span>⏱</span>
      <div>
        {{ t('in-progress') }}
      </div>
    </div>
  </div>
</template>


<script lang="ts" setup>
import { defineProps, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  state: string,
}>()
const { t } = useI18n()
const isVisible = computed(() => !!props.state)
const isFinished = computed(() => props.state === 'finished')
</script>


<style scoped>
.invisible {
  opacity: 0;
  background-color: white;
}
.overlay {
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  font-size: 9vw;
  background-color: white;
  transition: .25s;
  text-align: center;

  border-radius: 8px;
  border: 1px solid #ddd;
}
</style>


<i18n locale="en" lang="yaml">
in-progress: In progress
finished: Add
</i18n>

<i18n locale="ru" lang="yaml">
in-progress: Ещё учу
finished: Выучил
</i18n>
