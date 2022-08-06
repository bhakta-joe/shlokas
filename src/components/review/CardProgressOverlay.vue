<template>
  <div
    class="overlay"
    :class="{'invisible':!isVisible}"
  >
    <span v-if="props.grade !== 0">
      {{ t('grade_' + props.grade) }}
    </span>
  </div>
</template>


<script lang="ts" setup>
import { defineProps, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  grade: number,
}>()
const { t } = useI18n()
const isVisible = computed(() => props.grade !== 0)

const color = computed(function() {
  if (props.grade < -1) return "darkred"
  if (props.grade < 0) return "red"
  if (props.grade > 2) return "lime"
  if (props.grade > 1) return "yellow"
  if (props.grade > 0) return "orange"
  if (props.grade == 1) return "darkorange"

  return "white"
})
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
  /* background-color: v-bind(color); */
  background-color: white;
  transition: .25s;
  text-align: center;

  border-radius: 8px;
  border: 5px solid v-bind(color);
  /* border-color: v-bind(color); */
}
</style>


<i18n locale="en" lang="yaml">
grade_-2: 🤦‍♂️ Фиаско
grade_-1: 👎 Лошара
grade_1: 😕 Так себе
grade_2: 👍 Хорошо
grade_3: 😎 Отлично
</i18n>

<i18n locale="ru" lang="yaml">
grade_-2: 🤦‍♂️ Фиаско
grade_-1: 👎 Лошара
grade_1: 😕 Так себе
grade_2: 👍 Хорошо
grade_3: 😎 Отлично
</i18n>
