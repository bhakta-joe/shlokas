<template>
    <div class="root">
        <ion-img src="empty-inbox.png" class="img" />

        <div class="text">
            You have no verses yet, please add one to learn
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