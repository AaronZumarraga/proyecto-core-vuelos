<template>
  <div class="login-container">
    <form @submit.prevent="login" v-if="!registerMode">
      <!-- Formulario de inicio de sesión -->
      <h2>Iniciar Sesión</h2>

      <div class="form-group">
        <label for="username">Nombre de usuario:</label>
        <input v-model="username" type="text" id="username" required />
      </div>

      <div class="form-group">
        <label for="password">Contraseña:</label>
        <input v-model="password" type="password" id="password" required />
      </div>

      <div class="form-group">
        <button type="submit">Iniciar Sesión</button>
      </div>

      <p>
        ¿No tienes una cuenta? <a href="#" @click.prevent="toggleRegisterMode">Regístrate</a>
      </p>
    </form>

    <form v-else @submit.prevent="register">
      <!-- Formulario de registro -->
      <h2>Registro</h2>

      <div class="form-group">
        <label for="newName">Nombre:</label>
        <input v-model="newName" type="text" id="newName" required />
      </div>

      <div class="form-group">
        <label for="newLastName">Apellido:</label>
        <input v-model="newLastName" type="text" id="newLastName" required />
      </div>

      <div class="form-group">
        <label for="newEmail">Correo Electrónico:</label>
        <input v-model="newEmail" type="email" id="newEmail" required />
      </div>

      <div class="form-group">
        <label for="newPhone">Teléfono:</label>
        <input v-model="newPhone" type="tel" id="newPhone" required />
      </div>

      <div class="form-group">
        <label for="newUsername">Nombre de usuario:</label>
        <input v-model="newUsername" type="text" id="newUsername" required />
      </div>

      <div class="form-group">
        <label for="newPassword">Contraseña:</label>
        <input v-model="newPassword" type="password" id="newPassword" required />
      </div>
      

      <div class="form-group">
        <button type="submit">Registrarse</button>
      </div>

      <p>
        ¿Ya tienes una cuenta? <a href="#" @click.prevent="toggleRegisterMode">Iniciar Sesión</a>
      </p>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      // Propiedades para el formulario de inicio de sesión
      username: "",
      password: "",
      
      // Propiedades para el formulario de registro
      newName: "",
      newLastName: "",
      newEmail: "",
      newPhone: "",
      newUsername: "",
      newPassword: "",

      // Otras propiedades
      registerMode: false,
    };
  },
  methods: {
    // Método para manejar el inicio de sesión
    login() {
      // Lógica para procesar la autenticación
      console.log("Iniciando sesión con:", this.username);
    },
    // Método para manejar el registro
    register() {
      // Construye el objeto del nuevo usuario con los datos del formulario
      const nuevoUsuario = {
        nombre: this.newName,
        apellido: this.newLastName,
        correo: this.newEmail,
        telefono: this.newPhone,
        nombreUsuario: this.newUsername,
        contrasena: this.newPassword
      };

      // Envia la información al backend
      axios.post('http://localhost:3000/api/registro', nuevoUsuario)
        .then(response => {
          console.log('Usuario registrado exitosamente:', response.data);
          // Aquí puedes redirigir o hacer cualquier acción adicional después del registro exitoso
        })
        .catch(error => {
          console.error('Error al registrar usuario:', error);
          // Aquí puedes manejar errores, como mostrar un mensaje al usuario
        });
    },
    // Método para alternar entre los modos de inicio de sesión y registro
    toggleRegisterMode() {
      this.registerMode = !this.registerMode;
    },
  },
};
</script>

<style scoped>
/* Estilos específicos para el formulario de inicio de sesión y registro */
/* Puedes agregar estilos según tus preferencias */
</style>
