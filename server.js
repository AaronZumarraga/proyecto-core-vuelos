const mysql = require('mysql2');

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
    host: 'localhost    ',  // Cambiar por el nombre del host de tu base de datos
    user: 'root', // Cambiar por el nombre de usuario de tu base de datos
    password: 'aaron', // Cambiar por la contraseña de tu base de datos
    database: 'reserva_vuelos_bdd' // Cambiar por el nombre de tu base de datos
});

// Conectar a la base de datos
connection.connect((error) => {
    if (error) {
        console.error('Error de conexión a la base de datos:', error);
    } else {
        console.log('Conexión exitosa a la base de datos');
    }
});

module.exports = connection;

