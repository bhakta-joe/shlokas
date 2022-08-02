<template>
    <div class="root">
        <ion-img src="brahma.svg" class="img" />
        <div class="text">
            <div>{{ t('empty') }}</div>
            <div>{{ t('tap-to-add') }}</div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { IonImg } from '@ionic/vue';
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<style scoped>
.root {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}

.text {
    margin: 20px;
    text-align: center;
}

.img {
    max-width: 50%;
}
</style>

<i18n locale="en" lang="yaml">
empty: Your inbox is empty.
tap-to-add: Tap to add new verses to your inbox.
</i18n>

<i18n locale="ru" lang="yaml">
empty: Ты полон пустоты.
tap-to-add: Жмакни чтобы добавить.
</i18n>