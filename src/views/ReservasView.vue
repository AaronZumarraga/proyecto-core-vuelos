<template>
  <div>
    <h2>Reservas</h2>
    <button @click="mostrarBuscarVuelos">Buscar vuelos</button>
    <button @click="mostrarVerReservas">Ver reservas</button>

    <!-- Contenido dinámico según la opción seleccionada -->
    <div v-if="mostrarContenido">
      <!-- Formulario de búsqueda de vuelos -->
      <section v-if="currentPage === 'buscar-vuelos'">
        <h2>Buscar Vuelos</h2>
        <!-- Formulario de búsqueda -->
        <form @submit.prevent="buscarVuelos">
          <!-- Campos de búsqueda -->
          <label for="origen">Origen:</label>
          <input type="text" v-model="busqueda.origen" required>

          <label for="destino">Destino:</label>
          <input type="text" v-model="busqueda.destino" required>

          <label for="fecha-salida">Fecha de Salida:</label>
          <input type="date" v-model="busqueda.fechaSalida" required>

          <!-- Nuevos campos -->
          <label for="precio">Precio Máximo:</label>
          <input type="number" v-model="busqueda.precio" min="0">

          <label for="asientos-disponibles">Asientos Disponibles:</label>
          <input type="number" v-model="busqueda.asientosDisponibles" min="1">

          <label for="aerolinea">Aerolínea:</label>
          <input type="text" v-model="busqueda.aerolinea">

          <label for="contacto">Contacto Aerolínea:</label>
          <input type="text" v-model="busqueda.contacto">

          <!-- Botón para enviar el formulario -->
          <button type="submit">Buscar</button>
          <button type="submit">Reservar</button>
        </form>
      </section>

      <!-- Sección para mostrar las reservas -->
      <section v-else-if="currentPage === 'ver-reservas'">
        <!-- Lógica para mostrar las reservas -->
        <h2>Ver Reservas</h2>
        <!-- Puedes agregar aquí la lógica y presentación para ver las reservas -->
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Reservas',
  data() {
    return {
      mostrarContenido: false,
      currentPage: '', // Variable para mantener el estado de la página actual
      busqueda: {
        origen: '',
        destino: '',
        fechaSalida: '',
        precio: 0,
        asientosDisponibles: 1,
        aerolinea: '',
        contacto: ''
      }
    };
  },
  methods: {
    mostrarBuscarVuelos() {
      this.mostrarContenido = true;
      this.currentPage = 'buscar-vuelos';
    },
    mostrarVerReservas() {
      this.mostrarContenido = true;
      this.currentPage = 'ver-reservas';
    },
    buscarVuelos() {
      // Lógica para manejar la búsqueda de vuelos
      console.log('Realizar búsqueda de vuelos con:', this.busqueda);
    }
  }
}
</script>
