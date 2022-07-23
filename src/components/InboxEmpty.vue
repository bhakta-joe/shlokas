<template>
    <div class="root">
        <ion-img src="inbox-empty.png" class="img" />
        <div class="text">
            <div>Your inbox is empty.</div>
            <div>Tap to <b>add new verses</b> to your inbox.</div>
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
    margin: 20px;
}
.img {
    max-width: 50%;
}
</style>