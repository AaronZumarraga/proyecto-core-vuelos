<template>
  <nav>
    <router-link to="/">Inicio</router-link> |
    <router-link to="/Acerca de">Acerca de</router-link> |
    <router-link to="/Reservas">Reservas</router-link> |
    <router-link to="/Inicio de sesion">Inicio de sesion</router-link>
  </nav>
  <router-view />
  <Footer />
</template>

<script>
import Footer from '@/components/Footer.vue'

export default {
  name: 'App',
  components: {
    Footer
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
