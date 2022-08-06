<template>
  <div
    class="overlay"
    :class="{'invisible':!isVisible}"
  >
    <div
      v-if="props.grade !== 0"
      class="grade"
    >
      {{ t('grade_' + props.grade) }}
    </div>
    <div
      class="date"
    >
      {{ t('in-days', nextReviewInDays) }}
    </div>
  </div>
</template>


<script lang="ts" setup>
import { defineProps, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  grade: number,
  nextReviewInDays: number,
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
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  /* background-color: v-bind(color); */
  background-color: white;
  transition: .25s;
  text-align: center;

  border-radius: 8px;
  border: 5px solid v-bind(color);
  /* border-color: v-bind(color); */
}

.grade {
  font-size: 9vw;
}

.date {
  font-size: 3vw;
}
</style>


<i18n locale="en" lang="yaml">
grade_-2: 🤦‍♂️ Forgot
grade_-1: 👎 Forgot
grade_1: 😕 Bad
grade_2: 👍 Good
grade_3: 😎 Excellent
in-days: today | +{n} day | +{n} days
</i18n>

<i18n locale="ru" lang="yaml">
grade_-2: 🤦‍♂️ Не помню
grade_-1: 👎 Не помню
grade_1: 😕 Плохо
grade_2: 👍 Хорошо
grade_3: 😎 Отлично
in-days: сегодня | +{n} д | +{n} д
</i18n>
