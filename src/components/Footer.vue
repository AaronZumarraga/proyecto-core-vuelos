<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section">
        <h3>Contacto</h3>
        <p>Email: info@reservadevuelos.com</p>
        <p>Teléfono: +123 456 7890</p>
      </div>

      <div class="footer-section">
        <h3>Enlaces Rápidos</h3>
        <ul>
          <li><router-link to="/">Inicio</router-link></li>
          <li><router-link to="/Acerca de">Acerca de</router-link></li>
          <li><router-link to="/Reservas">Reservas</router-link></li>
          <li><router-link to="/Inicio de sesion">Iniciar Sesión</router-link></li>
        </ul>
      </div>

      <div class="footer-section">
        <h3>Redes Sociales</h3>
        <p>Síguenos en:</p>
        <div class="social-icons">
          <!-- Agrega tus íconos de redes sociales aquí -->
          <a href="#" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-twitter"></i>
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-facebook"></i>
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2023 Reserva de Vuelos. Todos los derechos reservados.</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style scoped>
.footer {
  background-color: #2c3e50;
  color: #ecf0f1;
  padding: 20px 0;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.footer-section {
  margin-bottom: 20px;
}

ul {
  list-style: none;
  padding: 0;
  font-weight: bold;
}

ul li {
  margin-bottom: 8px;
}

.social-icons a {
  color: #ecf0f1;
  margin-right: 10px;
}

.footer-bottom {
  text-align: center;
  margin-top: 20px;
}
</style>
