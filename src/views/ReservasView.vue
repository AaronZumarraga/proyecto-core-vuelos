<template>
  <div>
    <h2>Reservas</h2>
    <button @click="mostrarBuscarVuelos">Buscar vuelos</button>
    <button @click="mostrarVerReservas">Ver reservas</button>
    <button @click="mostrarEstadisticas">Ver estadisticas</button>
    <button @click="mostrarUsuarios">Ver usuarios con reservas</button>
    <button @click="mostrarCalificaciones">Calificar</button>

    <!-- Contenido dinámico según la opción seleccionada -->
    <div v-if="mostrarContenido">

      <!-- Formulario de búsqueda de vuelos -->
      <section v-if="currentPage === 'buscar-vuelos'">
        <h2>Buscar Vuelos</h2>

        <!-- Formulario de búsqueda -->
        <form @submit.prevent="buscarVuelos">

          <label for="nombreUsuario">Nombre de Usuario:</label>
          <input v-model="busqueda.nombreUsuario" type="text" required />
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

          <!-- Nuevos campos para la reserva -->
          <label for="fechaReserva">Fecha de Reserva:</label>
          <input type="datetime-local" v-model="busqueda.fechaReserva" required />

          <!-- Botón para hacer la reserva -->
          <button type="button" @click="hacerReserva">Hacer Reserva</button>
        </form>
      </section>

      <!-- Sección para ver reservas -->
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

      <!-- Sección para ver aerolíneas con más reservas -->
      <section v-if="currentPage === 'ver-aerolineas-con-mas-reservas'">
        <h2>Aerolíneas con Más Reservas</h2>
        <label for="start">Fecha de Inicio:</label>
        <input type="date" v-model="fechaInicio" min="2024-01-01" max="2030-12-31" />
        <br>
        <label for="end">Fecha de Fin:</label>
        <input type="date" v-model="fechaFin" min="2024-01-01" max="2030-12-31" />
        <br>
        <button @click="mostrarAerolineasConMasReservas">Mostrar Aerolíneas</button>
        <ul>
          <li v-for="(aerolinea, index) in aerolineasConMasReservas" :key="index">
            <strong>Aerolínea:</strong> {{ aerolinea.Aerolinea }}<br>
            <strong>Total Reservas:</strong> {{ aerolinea.TotalReservas }}<br>
            <strong>Total Precio:</strong> {{ aerolinea.TotalPrecio }}<br>
            <hr>
          </li>
        </ul>
      </section>

      <!-- Sección para ver usuarios con más reservas -->
      <section v-if="currentPage === 'ver-usuarios-con-mas-reservas'">
        <h2>Usuarios con Más Reservas</h2>
        <label for="start">Fecha de inicio:</label>
        <input type="date" v-model="fechaInicio" name="start" min="2024-01-01" max="2030-12-31" />
        <label for="end">Fecha de fin:</label>
        <input type="date" v-model="fechaFin" name="end" min="2024-01-01" max="2030-12-31" />
        <button @click="mostrarUsuariosConMasReservas">Mostrar Usuarios</button>
        <li v-for="(usuario, index) in usuariosConMasReservas" :key="index">
          <strong>Usuario:</strong> {{ usuario.Nombre_Usuario }}<br>
          <strong>Total de Reservas:</strong> {{ usuario.TotalReservas }}<br>
          <hr>
        </li>
      </section>

      <!-- Sección para calificaciones y comentarios -->
      <section v-if="currentPage === 'calificaciones-comentarios'">
        <h2>Calificaciones y Comentarios</h2>

        <!-- Mostrar las calificaciones y comentarios existentes -->
        <div v-for="comentario in comentariosCalificaciones" :key="comentario.ID_ComentarioCalificacion">
          <p>Calificación: {{ comentario.Calificacion }}</p>
          <p>Comentario: {{ comentario.Comentario }}</p>
          <p>Fecha: {{ comentario.Fecha }}</p>
          <hr>
        </div>

        <!-- Formulario para agregar una nueva calificación y comentario -->
        <form @submit.prevent="agregarCalificacionComentario">
          <label for="calificacion">Calificación:</label>
          <input v-model="nuevaCalificacion" type="number" min="1" max="5" required />
          <label for="comentario">Comentario:</label>
          <textarea v-model="nuevoComentario" required></textarea>
          <button type="submit">Enviar</button>
        </form>
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
        aerolinea: '',
        fechaInicio: '',
        fechaFin: '',
        nombreUsuario: '',
        comentariosCalificaciones: [],
        nuevaCalificacion: 1,
        nuevoComentario: '',
      },
      opcionesOrigen: [],
      opcionesDestino: [],
      opcionesHora: [],
      opcionesPrecio: [],
      opcionesAerolinea: [],
      reservas: [],
      aerolineasConMasReservas: [],
      sumaTotalPrecios: [],
      usuariosConMasReservas: [],
      comentariosCalificaciones: [],
      nuevaCalificacion: 1,
      nuevoComentario: '',
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
    mostrarEstadisticas() {
      this.mostrarContenido = true;
      this.currentPage = 'ver-aerolineas-con-mas-reservas';
    },
    mostrarUsuarios() {
      this.mostrarContenido = true;
      this.currentPage = 'ver-usuarios-con-mas-reservas';
    },
    buscarVuelos() {
      console.log('Realizar búsqueda de vuelos con:', this.busqueda);
    },
    hacerReserva() {
      console.log('Hacer reserva con:', this.busqueda);
    },
    mostrarCalificaciones() {
      this.mostrarContenido = true;
      this.currentPage = 'calificaciones-comentarios';
    },
    obtenerOpcionesOrigen() {
      this.fetchOpciones('obtenerOpcionesOrigen', 'opcionesOrigen');
    },
    obtenerOpcionesDestino() {
      this.fetchOpciones('obtenerOpcionesDestino', 'opcionesDestino');
    },
    obtenerOpcionesHora() {
      this.fetchOpciones('obtenerOpcionesHora', 'opcionesHora');
    },
    obtenerOpcionesPrecio() {
      this.fetchOpciones('obtenerOpcionesPrecio', 'opcionesPrecio');
    },
    obtenerOpcionesAerolinea() {
      this.fetchOpciones('obtenerOpcionesAerolinea', 'opcionesAerolinea');
    },
    fetchOpciones(endpoint, dataProperty) {
      fetch(`http://localhost:3000/api/${endpoint}`)
        .then(response => response.json())
        .then(data => {
          this[dataProperty] = data;
        })
        .catch(error => console.error(`Error al obtener opciones de ${dataProperty}:`, error));
    },
    hacerReserva() {
      const { origen, destino, hora, precio, aerolinea, nombreUsuario } = this.busqueda;

      fetch(`http://localhost:3000/api/validarNombreUsuario?nombreUsuario=${nombreUsuario}`)
        .then(response => response.json())
        .then(data => {
          if (data.existeUsuario) {
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
              })
              .catch(error => console.error('Error al hacer reserva:', error));
          } else {
            console.log('El nombre de usuario no existe. Por favor, regístrese.');
          }
        })
        .catch(error => console.error('Error al validar nombre de usuario:', error));
    },
    verReservas() {
      fetch('http://localhost:3000/api/obtenerReservas')
        .then(response => response.json())
        .then(data => {
          this.reservas = data;
          console.log('Reservas obtenidas con éxito:', this.reservas);
        })
        .catch(error => console.error('Error al obtener reservas:', error));
    },
    mostrarAerolineasConMasReservas() {
      const { fechaInicio, fechaFin } = this;

      fetch(`http://localhost:3000/api/aerolineasConMasReservas?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`)
        .then(response => response.json())
        .then(data => {
          this.aerolineasConMasReservas = data;
          this.calcularSumaTotalPrecios();
          console.log('Aerolíneas con más reservas y sumatoria de precios obtenidas con éxito:', this.aerolineasConMasReservas, this.sumaTotalPrecios);
        })
        .catch(error => console.error('Error al obtener aerolíneas con más reservas y sumatoria de precios:', error));
    },
    mostrarUsuariosConMasReservas() {
      fetch(`http://localhost:3000/api/usuariosConMasReservas?fechaInicio=${this.fechaInicio}&fechaFin=${this.fechaFin}`)
        .then(response => response.json())
        .then(data => {
          this.usuariosConMasReservas = data;
          console.log('Usuarios con más reservas:', this.usuariosConMasReservas);
        })
        .catch(error => console.error('Error al obtener usuarios con más reservas:', error));
    },
    obtenerCalificacionesComentarios(idVuelo) {
      fetch(`http://localhost:3000/api/calificacionesComentarios/${idVuelo}`)
        .then(response => response.json())
        .then(data => {
          this.comentariosCalificaciones = data;
        })
        .catch(error => console.error('Error al obtener calificaciones y comentarios:', error));
    },
    agregarCalificacionComentario() {
      const { idVuelo, idAerolinea, idPasajero } = this.busqueda;
      const { nuevaCalificacion, nuevoComentario } = this;

      fetch('http://localhost:3000/api/calificarComentar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idVuelo,
          idAerolinea,
          idPasajero,
          calificacion: nuevaCalificacion,
          comentario: nuevoComentario,
        }),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Calificación y comentario agregados con éxito:', data);
          this.obtenerCalificacionesComentarios(idVuelo);
        })
        .catch(error => console.error('Error al agregar calificación y comentario:', error));
    },
  },
  mounted() {
    this.obtenerOpcionesOrigen();
    this.obtenerOpcionesDestino();
    this.obtenerOpcionesHora();
    this.obtenerOpcionesPrecio();
    this.obtenerOpcionesAerolinea();
    this.verReservas();
    this.mostrarAerolineasConMasReservas();
  }
}
</script>