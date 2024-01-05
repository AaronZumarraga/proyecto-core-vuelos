<template>
    <div class="login-container">
      <form @submit.prevent="login" v-if="!registerMode">
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
      <h2>Registro</h2>

      <div class="form-group">
        <label for="newUsername">Nombre de usuario:</label>
        <input v-model="newUsername" type="text" id="newUsername" required />
      </div>

      <div class="form-group">
        <label for="newPassword">Contraseña:</label>
        <input v-model="newPassword" type="password" id="newPassword" required />
      </div>

      <!-- Nuevos campos para el registro -->
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
      <!-- Fin de nuevos campos -->

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
  export default {
    data() {
      return {
        username: "",
        password: "",
        newUsername: "",
        newPassword: "",
        registerMode: false,
      };
    },
    methods: {
      login() {
        // Lógica para procesar la autenticación
        console.log("Iniciando sesión con:", this.username);
      },
      register() {
        // Lógica para procesar el registro
        console.log("Registrando nuevo usuario:", this.newUsername);
        // Puedes enviar la información al backend para manejar el registro
      },
      toggleRegisterMode() {
        // Alternar entre los modos de inicio de sesión y registro
        this.registerMode = !this.registerMode;
      },
    },
  };
  </script>
  
  <style scoped>
  /* Estilos específicos para el formulario de inicio de sesión y registro */
  /* Puedes agregar estilos según tus preferencias */
  </style>
  