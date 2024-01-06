<template>
  <div>
    <!-- Página de Inicio -->
    <section v-if="currentPage === 'inicio'">
      <h1>Bienvenido a nuestro sistema de reservas de vuelos</h1>
      <!-- Opciones principales -->
      <a @click="cambiarPagina('buscar-vuelos')">Buscar Vuelos</a>
      <a @click="cambiarPagina('ver-reservas')">Ver Reservas</a>
    </section>

    <!-- Página de Buscar Vuelos -->
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

        <!-- Otros campos según tus necesidades -->

        <!-- Botón para reservar -->
        <button @click="mostrarFormularioReserva">Reservar</button>

        <!-- Formulario de reserva (oculto inicialmente) -->
        <form @submit.prevent="realizarReserva" v-if="mostrarFormulario">
          <!-- Campos del formulario de reserva -->
          <label for="nombre-pasajero">Nombre del Pasajero:</label>
          <input type="text" v-model="reserva.nombrePasajero" required>

          <!-- Otros campos del formulario de reserva -->

          <button type="submit">Confirmar Reserva</button>
        </form>
      </form>
    </section>

    <!-- Página de Ver Reservas -->
    <section v-if="currentPage === 'ver-reservas'">
      <h2>Ver Reservas</h2>
      <!-- Lista de reservas -->
      <ul>
        <!-- Detalles de cada reserva -->
        <li v-for="(reserva, index) in reservas" :key="index">
          <strong>Reserva #{{ index + 1 }}</strong>
          <ul>
            <li>ID Vuelo: {{ reserva.idVuelo }}</li>
            <li>ID Pasajero: {{ reserva.idPasajero }}</li>
            <li>Fecha: {{ reserva.fecha }}</li>
            <li>Monto Pagado: ${{ reserva.montoPagado }}</li>
            <li>Origen: {{ reserva.origen }}</li>
            <li>Destino: {{ reserva.destino }}</li>
            <li>Aerolínea: {{ reserva.aerolinea }}</li>
            <li>Contacto Aerolínea: {{ reserva.contactoAerolinea }}</li>
          </ul>
        </li>
        <!-- Puedes generar dinámicamente estas listas desde tu backend -->
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 'inicio',
      busqueda: {
        origen: '',
        destino: '',
        fechaSalida: '',
        precio: 0,
        asientosDisponibles: 1,
        aerolinea: '',
        contacto: ''
      },
      mostrarFormulario: false,
      reserva: {
        nombrePasajero: ''
        // Otros campos del formulario de reserva
      },
      reservas: [
        // Datos de ejemplo, reemplazar con datos reales del backend
        {
          idVuelo: 123,
          idPasajero: 456,
          fecha: 'XX/XX/XXXX',
          montoPagado: 500.00,
          origen: 'Ciudad Origen',
          destino: 'Ciudad Destino',
          aerolinea: 'Nombre de Aerolínea',
          contactoAerolinea: 'Contacto'
        },
        {
          idVuelo: 789,
          idPasajero: 101,
          fecha: 'XX/XX/XXXX',
          montoPagado: 600.00,
          origen: 'Otra Ciudad Origen',
          destino: 'Otra Ciudad Destino',
          aerolinea: 'Otra Aerolínea',
          contactoAerolinea: 'Otro Contacto'
        }
      ]
    };
  },
  methods: {
    cambiarPagina(pagina) {
      this.currentPage = pagina;
    },
    buscarVuelos() {
      // Lógica para buscar vuelos en el backend según los criterios de búsqueda
      // Actualizar this.reservas con los resultados obtenidos
    },
    mostrarFormularioReserva() {
      this.mostrarFormulario = true;
    },
    realizarReserva() {
      // Lógica para realizar la reserva en el backend
      // Actualizar this.reservas con la nueva reserva
      this.mostrarFormulario = false;
    }
  }
};
</script>

<style>
/* Estilos específicos de la vista de vuelos */
</style>
