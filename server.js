const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'aaron',
  database: 'reserva_vuelos_bdd',
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conexión a la base de datos exitosa');
});

// Endpoint de registro
app.post('/api/registro', (req, res) => {
  const { nombre, apellido, correo, telefono, nombreUsuario, contrasena } = req.body;

  // Insertar usuario en la base de datos
  const sql = 'INSERT INTO Pasajero (Nombre, Apellido, Correo_Electronico, Telefono, Nombre_Usuario, Contrasena) VALUES (?, ?, ?, ?, ?, ?)';
  connection.query(sql, [nombre, apellido, correo, telefono, nombreUsuario, contrasena], (err, result) => {
    if (err) {
      console.error('Error al insertar usuario en la base de datos:', err);
      res.status(500).send('Error interno del servidor');
    } else {
      console.log('Usuario registrado con éxito');
      res.status(200).send('Usuario registrado con éxito');
    }
  });
});

// Endpoint de inicio de sesión
app.post('/api/inicio-sesion', (req, res) => {
    const { nombreUsuario, contrasena } = req.body;
  
    // Verificar credenciales en la base de datos
    const sql = 'SELECT * FROM Pasajero WHERE Nombre_Usuario = ? AND Contrasena = ?';
    connection.query(sql, [nombreUsuario, contrasena], (err, results) => {
      if (err) {
        console.error('Error al verificar credenciales en la base de datos:', err);
        res.status(500).send('Error interno del servidor');
      } else {
        if (results.length > 0) {
          // Usuario autenticado correctamente
          console.log('Usuario autenticado con éxito');
          res.status(200).send('Usuario autenticado con éxito');
        } else {
          // Credenciales incorrectas
          console.log('Credenciales incorrectas. Por favor, regístrese.');
          res.status(401).send('Credenciales incorrectas. Por favor, regístrese.');
        }
      }
    });
  });  

app.listen(port, () => {
  console.log(`Servidor Node.js en ejecución en el puerto ${port}`);
});
