<template>
    <h1 class="text-3xl font-bold">Prochain lancement SpaceX</h1>
    <div class="container mx-auto p-4">
        <div v-if="nextLaunch" class="my-8">
            <h2 class="text-xl">Prochain lancement: {{ nextLaunch.name }}</h2>
            <p class="text-lg">Date: {{ nextLaunch.date_utc }}</p>
            <p class="text-lg">Compte à rebours: {{ countdown }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import fetchNextLaunch from '../api/SpaceXAPI.ts';

const nextLaunch = ref<any>(null);
const countdown = ref(0);

onMounted(async () => {
    const launch = await fetchNextLaunch(nextLaunch.value);
    nextLaunch.value = launch;

    // Date du lancement sous forme de timestamp
    const launchDate = new Date(launch.date_utc).getTime();
    setInterval(() => {
        countdown.value = Math.max(0, Math.floor((launchDate - Date.now()) / 1000));
    }, 1000);
});
</script>