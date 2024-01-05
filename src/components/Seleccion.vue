<template>
    <div>
      <h2>Selecciona tu vuelo</h2>
  
      <label for="destination">Destino:</label>
      <select v-model="selectedDestination" id="destination">
        <option value="new-york">Nueva York</option>
        <option value="paris">París</option>
        <option value="tokyo">Tokyo</option>
        <!-- Agrega más opciones según tus destinos -->
      </select>
  
      <label for="flightDate">Fecha del vuelo:</label>
      <input type="date" v-model="selectedFlightDate" id="flightDate" />
  
      <label for="airline">Aerolínea:</label>
      <select v-model="selectedAirline" id="airline">
        <option value="delta">Delta Airlines</option>
        <option value="united">United Airlines</option>
        <option value="air-france">Air France</option>
        <!-- Agrega más opciones según tus aerolíneas -->
      </select>
  
      <button @click="searchFlights">Buscar Vuelos</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        selectedDestination: '',
        selectedFlightDate: '',
        selectedAirline: ''
      };
    },
    methods: {
      searchFlights() {
        // Implementa la lógica para buscar vuelos según las selecciones del usuario
        console.log('Buscando vuelos...');
        console.log('Destino:', this.selectedDestination);
        console.log('Fecha del vuelo:', this.selectedFlightDate);
        console.log('Aerolínea:', this.selectedAirline);
      }
    }
  };
  </script>
  
  <style scoped>
  /* Estilos específicos para el componente de selección de vuelos */
  /* Puedes agregar estilos según tus preferencias */
  </style>
  