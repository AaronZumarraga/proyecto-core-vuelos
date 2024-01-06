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
          <select v-model="busqueda.origen" required>
            <option v-for="option in opcionesOrigen" :key="option" :value="option">
              {{ option }}
            </option>
          </select>

          <label for="destino">Destino:</label>
          <select v-model="busqueda.destino" required>
            <option v-for="option in opcionesDestino" :key="option" :value="option">
              {{ option }}
            </option>
          </select>

          <label for="hora">Hora:</label>
          <select v-model="busqueda.hora" required>
            <option v-for="option in opcionesHora" :key="option" :value="option">
              {{ option }}
            </option>
          </select>

          <label for="precio">Precio:</label>
          <select v-model="busqueda.precio" required>
            <option v-for="option in opcionesPrecio" :key="option" :value="option">
              {{ option }}
            </option>
          </select>

          <label for="aerolinea">Aerolínea:</label>
          <select v-model="busqueda.aerolinea" required>
            <option v-for="option in opcionesAerolinea" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
          <!-- Botón para hacer la reserva -->
          <button type="button" @click="hacerReserva">Hacer Reserva</button>
        </form>
      </section>

      <section v-if="currentPage === 'ver-reservas'">
        <h2>Ver Reservas</h2>
        <ul>
          <li v-for="(reserva, index) in reservas" :key="index">
            <strong>Origen:</strong> {{ reserva.Origen }}<br>
            <strong>Destino:</strong> {{ reserva.Destino }}<br>
            <strong>Hora:</strong> {{ reserva.Hora }}<br>
            <strong>Precio:</strong> {{ reserva.Precio }}<br>
            <strong>Aerolínea:</strong> {{ reserva.Aerolinea }}<br>
            <strong>Nombre de Usuario:</strong> {{ reserva.Nombre_Usuario }}<br>
            <hr>
          </li>
        </ul>
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
      currentPage: '',
      busqueda: {
        origen: '',
        destino: '',
        hora: '',
        precio: '',
        aerolinea: ''
      },
      opcionesOrigen: [],
      opcionesDestino: [],
      opcionesHora: [],
      opcionesPrecio: [],
      opcionesAerolinea: [],
      reservas: [],
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
    },

    hacerReserva() {
      // Lógica para manejar la acción de hacer reserva
      console.log('Hacer reserva con:', this.busqueda);
    },
    obtenerOpcionesOrigen() {
      fetch('http://localhost:3000/api/obtenerOpcionesOrigen') // Actualiza la URL según tu configuración del servidor
        .then(response => response.json())
        .then(data => {
          this.opcionesOrigen = data;
        })
        .catch(error => console.error('Error al obtener opciones de origen:', error));
    },
    obtenerOpcionesDestino() {
      fetch('http://localhost:3000/api/obtenerOpcionesDestino') // Actualiza la URL según tu configuración del servidor
        .then(response => response.json())
        .then(data => {
          this.opcionesDestino = data;
        })
        .catch(error => console.error('Error al obtener opciones de destino:', error));
    },
    obtenerOpcionesHora() {
      fetch('http://localhost:3000/api/obtenerOpcionesHora') // Actualiza la URL según tu configuración del servidor
        .then(response => response.json())
        .then(data => {
          this.opcionesHora = data;
        })
        .catch(error => console.error('Error al obtener opciones de hora:', error));
    },
    obtenerOpcionesPrecio() {
      fetch('http://localhost:3000/api/obtenerOpcionesPrecio') // Actualiza la URL según tu configuración del servidor
        .then(response => response.json())
        .then(data => {
          this.opcionesPrecio = data;
        })
        .catch(error => console.error('Error al obtener opciones de precio:', error));
    },
    obtenerOpcionesAerolinea() {
      fetch('http://localhost:3000/api/obtenerOpcionesAerolinea') // Actualiza la URL según tu configuración del servidor
        .then(response => response.json())
        .then(data => {
          this.opcionesAerolinea = data;
        })
        .catch(error => console.error('Error al obtener opciones de nombre de Aerolínea:', error));
    },
    hacerReserva() {
      const { origen, destino, hora, precio, aerolinea } = this.busqueda;

      // Aquí puedes agregar la lógica para obtener el nombre de usuario del sistema de registro
      const nombreUsuario = 'NombreDeUsuarioTemporal'; // Reemplaza con la lógica real para obtener el nombre de usuario

      // Realizar la llamada a la API para insertar la reserva
      fetch('http://localhost:3000/api/hacerReserva', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          origen,
          destino,
          hora,
          precio,
          aerolinea,
          nombreUsuario,
        }),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Reserva realizada con éxito:', data);
          // Aquí puedes agregar lógica adicional si es necesario, como mostrar un mensaje de éxito al usuario
        })
        .catch(error => console.error('Error al hacer reserva:', error));
    },



    verReservas() {
      // Realizar la llamada a la API para obtener las reservas
      fetch('http://localhost:3000/api/obtenerReservas')
        .then(response => response.json())
        .then(data => {
          this.reservas = data;
          console.log('Reservas obtenidas con éxito:', this.reservas);
          // Puedes agregar lógica adicional si es necesario
        })
        .catch(error => console.error('Error al obtener reservas:', error));
    },





  },
  mounted() {
    // Llamada al método para obtener las opciones de origen al cargar el componente
    this.obtenerOpcionesOrigen();
    this.obtenerOpcionesDestino();
    this.obtenerOpcionesHora();
    this.obtenerOpcionesPrecio();
    this.obtenerOpcionesAerolinea();
    this.verReservas();
  }
}
</script>
