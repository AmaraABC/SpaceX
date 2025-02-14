<template>
    <div class="container mx-auto p-6">
      <h1 class="text-3xl font-bold mb-6">Liste des lancements SpaceX</h1>
      
      <!-- Sélecteur de statut -->
      <div class="mb-6">
        <label for="launchFilter" class="font-semibold"></label>
        <select
          id="launchFilter"
          v-model="launchFilter"
          class="border p-2 rounded"
        >
          <option value="all">Tous les lancements</option>
          <option value="success">Lancements réussis</option>
          <option value="failure">Lancements échoués</option>
        </select>
      </div>
  
      <!-- Liste des lancements filtrés -->
      <div v-if="filteredLaunches.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="launch in filteredLaunches"
          :key="launch.id"
          class="bg-white p-4 rounded-lg shadow-lg"
        >
          <h3 class="font-semibold">{{ launch.name }}</h3>
          <p>{{ new Date(launch.date_utc).toLocaleDateString() }}</p>
          <button
            @click="openModal(launch)"
            class="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Voir les détails
          </button>
        </div>
      </div>
  
      <!-- Modal de lancement -->
      <LaunchModal
        v-if="showModal"
        :launch="selectedLaunch"
        :showModal="showModal"
        @close="closeModal"
      />
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import axios from 'axios';
  import LaunchModal from '../components/LaunchModal.vue';

  // Définition des types pour les données de chaque lancement
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
    id: string;
    name: string;
    date_utc: string;
    details: string;
    // Ajout de l'attribut 'status' pour savoir si un lancement est considéré comme réussi ou échoué
    status: string;
    links: LaunchLinks;
    launch_site: LaunchSite;
    payloads: LaunchPayload[];
    customers: string[];
  }
  
  // Déclaration des variables réactives
  const launches = ref<LaunchProps[]>([]);
  const selectedLaunch = ref<LaunchProps | null>(null);
  const showModal = ref(false);
  const launchFilter = ref<string>('all'); // Valeur par défaut est 'all'
  
  const fetchAllLaunches = async () => {
    try {
      const response = await axios.get('https://api.spacexdata.com/v5/launches');
      launches.value = response.data;
    } catch (error) {
      console.error('Erreur lors du chargement des lancements', error);
    }
  };
  
  // Ouvrir le modal avec les détails du lancement
  const openModal = (launch: LaunchProps) => {
    selectedLaunch.value = launch;
    showModal.value = true;
  };
  
  const closeModal = () => {
    showModal.value = false;
    selectedLaunch.value = null;
  };
  
  // Filtrer les lancements en fonction du statut
  const filteredLaunches = computed(() => {
    switch (launchFilter.value) {
      case 'success':
        return launches.value.filter(launch => launch.status === 'success');
      case 'failure':
        return launches.value.filter(launch => launch.status === 'failure');
      default:
        return launches.value;
    }
  });
  
  onMounted(() => {
    fetchAllLaunches();
  });
  </script>
  