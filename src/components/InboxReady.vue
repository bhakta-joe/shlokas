<template>
    <div class="root">
        <ion-img src="inbox-ready.png" class="img" />
        <div class="text">
            <div>You have added new verses.</div>
            <div><b>Swipe</b> left and right to review.</div>
            <div><b>Tick</b> cards that you memorized.</div>
            <div>Tap to add new verses.</div>
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