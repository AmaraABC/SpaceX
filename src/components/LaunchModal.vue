<!-- Définition d'un modal pour détailler chaque lancement en profondeur -->
<template>
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded-lg">
        <h2>{{ launch.name }}</h2>
        <p>{{ new Date(launch.date_utc).toLocaleDateString() }}</p>
        <p>{{ launch.details }}</p>
        <img :src="launch.links.patch.small" alt="Launch Image" />
        <p>
            <a :href="launch.links.article" target="_blank" rel="noopener noreferrer">En savoir plus</a>
        </p>
        
        <div>
          <input type="checkbox" v-model="showVideo" /> Afficher la vidéo
          <div v-if="showVideo">
            <iframe :src="'https://www.youtube.com/embed/' + launch.links.youtube_id"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                    class="w-full h-64 mt-4"></iframe>
          </div>
        </div>
        
        <p>Site du lancement: {{ launch.launch_site.site_name }}</p>
        
        <div>
          <p v-for="payload in launch.payloads" :key="payload.id">Charge explosive: {{ payload.name }}</p>
          <p v-for="customer in launch.customers" :key="customer">Clients: {{ customer }}</p>
        </div>
        
        <button @click="closeModal" class="mt-4 p-2 bg-red-500 text-white rounded">Close</button>
      </div>
    </div>
  </template>
  
<script setup lang="ts">
import { ref } from 'vue';
  
interface LaunchLinks {
    patch: { small: string };
    article: string;
    youtube_id: string;
}
  
interface LaunchSite {
    site_name: string;
}
  
interface LaunchPayload {
    id: string;
    name: string;
}
  
interface LaunchProps {
    name: string;
    date_utc: string;
    details: string;
    links: LaunchLinks;
    launch_site: LaunchSite;
    payloads: LaunchPayload[];
    customers: string[];
}
  
const props = defineProps<{
    launch: LaunchProps; // Type explicite pour 'launch'
    showModal: Boolean;
}>();
  
const showVideo = ref(false);
  
const closeModal = () => {
    emit('close'); // Émet l'événement pour fermer le modal
};
  
const emit = defineEmits(['close']);
</script>
  
  
  
  