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

  const sql = 'SELECT * FROM Pasajero WHERE Nombre_Usuario = ? AND Contrasena = ?';
  connection.query(sql, [nombreUsuario, contrasena], (err, results) => {
    if (err) {
      console.error('Error al verificar credenciales en la base de datos:', err);
      res.status(500).send('Error interno del servidor');
    } else {
      if (results.length > 0) {
        console.log('Usuario autenticado con éxito');
        res.status(200).send('Usuario autenticado con éxito');
      } else {
        console.log('Credenciales incorrectas. Por favor, regístrese.');
        res.status(401).send('Credenciales incorrectas. Por favor, regístrese.');
      }
    }
  });
});

app.get('/api/obtenerOpcionesOrigen', (req, res) => {
  const query = 'SELECT DISTINCT Origen FROM Vuelo';

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error al obtener opciones de origen:', error);
      res.status(500).send('Error al obtener opciones de origen');
    } else {
      const opcionesOrigen = results.map(result => result.Origen);
      res.json(opcionesOrigen);
    }
  });
});

app.get('/api/obtenerOpcionesDestino', (req, res) => {
  const query = 'SELECT DISTINCT Destino FROM Vuelo';

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error al obtener opciones de destino:', error);
      res.status(500).send('Error al obtener opciones de destino');
    } else {
      const opcionesDestino = results.map(result => result.Destino);
      res.json(opcionesDestino);
    }
  });
});

app.get('/api/obtenerOpcionesHora', (req, res) => {
  const query = 'SELECT DISTINCT DATE_FORMAT(Hora, "%H:%i") AS Hora FROM Vuelo';

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error al obtener opciones de hora:', error);
      res.status(500).send('Error al obtener opciones de hora');
    } else {
      const opcionesHora = results.map(result => result.Hora);
      res.json(opcionesHora);
    }
  });
});

app.get('/api/obtenerOpcionesPrecio', (req, res) => {
  const query = 'SELECT DISTINCT Precio FROM Vuelo';

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error al obtener opciones de precio:', error);
      res.status(500).send('Error al obtener opciones de precio');
    } else {
      const opcionesPrecio = results.map(result => result.Precio);
      res.json(opcionesPrecio);
    }
  });
});

app.get('/api/obtenerOpcionesAerolinea', (req, res) => {
  const query = 'SELECT DISTINCT Nombre FROM Aerolinea';

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error al obtener opciones de nombre de Aerolínea:', error);
      res.status(500).send('Error al obtener opciones de nombre de Aerolínea');
    } else {
      const opcionesAerolinea = results.map(result => result.Nombre);
      res.json(opcionesAerolinea);
    }
  });
});

app.post('/api/hacerReserva', (req, res) => {
  const { origen, destino, hora, precio, aerolinea, nombreUsuario } = req.body;

  const sql = 'INSERT INTO Reserva (Origen, Destino, Hora, Precio, Aerolinea, Nombre_Usuario, Fecha) VALUES (?, ?, ?, ?, ?, ?, NOW())';
  connection.query(sql, [origen, destino, hora, precio, aerolinea, nombreUsuario], (err, result) => {
    if (err) {
      console.error('Error al hacer reserva:', err);
      res.status(500).send('Error al hacer reserva');
    } else {
      console.log('Reserva realizada con éxito');
      res.status(200).json({ message: 'Reserva realizada con éxito' });
    }
  });
});

app.get('/api/validarNombreUsuario', (req, res) => {
  const { nombreUsuario } = req.query;

  const sql = 'SELECT COUNT(*) as existeUsuario FROM Pasajero WHERE Nombre_Usuario = ?';

  connection.query(sql, [nombreUsuario], (err, results) => {
    if (err) {
      console.error('Error al validar nombre de usuario:', err);
      res.status(500).send('Error al validar nombre de usuario');
    } else {
      res.json({ existeUsuario: results[0].existeUsuario > 0 });
    }
  });
});

app.get('/api/obtenerReservas', (req, res) => {
  const sql = 'SELECT * FROM Reserva';

  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error al obtener reservas:', err);
      res.status(500).send('Error al obtener reservas');
    } else {
      res.json(results);
    }
  });
});

app.get('/api/aerolineasConMasReservas', (req, res) => {
  const { fechaInicio, fechaFin } = req.query;

  // Validar que las fechas estén definidas y en el formato adecuado
  if (!fechaInicio || !fechaFin) {
    return res.status(400).json({ error: 'Fechas no proporcionadas correctamente' });
  }

  const sql = `
    SELECT Aerolinea, COUNT(*) AS TotalReservas, SUM(Precio) AS TotalPrecio
    FROM Reserva
    WHERE Fecha BETWEEN ? AND ?
    GROUP BY Aerolinea
    ORDER BY TotalReservas DESC
    LIMIT 5;
  `;

  connection.query(sql, [fechaInicio, fechaFin], (err, results) => {
    if (err) {
      console.error('Error al obtener aerolíneas con más reservas y sumatoria de precios:', err);
      res.status(500).send('Error al obtener aerolíneas con más reservas y sumatoria de precios');
    } else {
      res.json(results);
    }
  });
});

app.get('/api/usuariosConMasReservas', (req, res) => {
  const { fechaInicio, fechaFin } = req.query;

  const sql = `
    SELECT Nombre_Usuario, COUNT(*) as TotalReservas
    FROM Reserva
    WHERE Fecha BETWEEN ? AND ?
    GROUP BY Nombre_Usuario
    ORDER BY TotalReservas DESC
    LIMIT 5;
  `;

  connection.query(sql, [fechaInicio, fechaFin], (err, results) => {
    if (err) {
      console.error('Error al obtener usuarios con más reservas:', err);
      res.status(500).send('Error al obtener usuarios con más reservas');
    } else {
      res.json(results);
    }
  });
});

// En el endpoint para agregar calificación y comentario
app.post('/api/calificarComentar', (req, res) => {
  const { idVuelo, idPasajero, calificacion, comentario, aerolinea } = req.body;

  connection.query(
    'INSERT INTO CalificacionesComentarios (idVuelo, idPasajero, Calificacion, Comentario, Fecha, Aerolinea) VALUES (?, ?, ?, ?, NOW(), ?)',
    [idVuelo, idPasajero, calificacion, comentario, aerolinea],
    (error, results) => {
      if (error) {
        console.error('Error al agregar calificación y comentario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
      } else {
        res.json({ mensaje: 'Calificación y comentario agregados con éxito' });
      }
    }
  );
});

// Actualiza la consulta para obtener calificaciones y comentarios
app.get('/api/calificacionesComentarios/:idVuelo', (req, res) => {
  const idVuelo = req.params.idVuelo;

  connection.query('SELECT * FROM CalificacionesComentarios WHERE idVuelo = ?', [idVuelo], (error, results) => {
    if (error) {
      console.error('Error al obtener calificaciones y comentarios:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      res.json(results);
    }
  });
});

// Asegúrate de agregar esto en tu servidor Node.js
app.get('/api/calificacionesComentariosExistente', (req, res) => {
  connection.query('SELECT * FROM CalificacionesComentarios', (error, results) => {
    if (error) {
      console.error('Error al obtener calificaciones y comentarios existentes:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      res.json(results);
    }
  });
});

app.get('/api/obtenerCalificacionesComentarios', (req, res) => {
  const sql = 'SELECT * FROM CalificacionesComentarios';

  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error al obtener calificaciones y comentarios:', err);
      res.status(500).send('Error al obtener calificaciones y comentarios');
    } else {
      res.json(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor Node.js en ejecución en el puerto ${port}`);
});
