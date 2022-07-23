<template>
    <div class="root">
        <ion-img src="swipe.png" class="img" />

        <div class="text">
            You've added verse. Swipe to study it. Or click to add one more.
        </div>
    </div>
</template>

<script lang="ts" setup>
import { IonImg } from '@ionic/vue';
</script>

<style scoped>
.root {
    display: flex;

    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.text {
    margin: 14vw;
}
.img {
    width: 50%;

}
</style>