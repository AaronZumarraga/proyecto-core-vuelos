# Proyecto reserva de vuelos

## Acerca del proyecto
Este proyecto es sobre un sistema que permite al usuario hacer reserva de vuelos. Permite escoger la aerolinea, el precio, entre otras caracteristicas. Ademas se puede visualizar una lista de aerolineas con mas reservas y otra de usuarios con mas reservas.

A continuacion te presento las tecnologias y herramientas con las que fue desarrollada esta solucion.

### Tecnologias
Frontend
- Vuejs (Framework)
- HTML
- CSS
- Javascript

Middleware 
- Nodejs
- Expressjs

Backend y Capa de datos
- MySQL

### Herramientas
- VS Code
- MySQL
- MySQL Workbench
- Git
- Node.js
    - Npm
		- body-parser@1.20.2
		- cors@2.8.5
		- express@4.18.2
		- mssql@10.0.1
	    - mysql2@3.6.2
- Vue@CLI

## Instrucciones para creacion del proyecto
Para empezar debemos tener abierto vscode, el terminal y mysql.

Desde el terminal vamos a ir a donde queremos guardar el proyecto. Ahi pondremos el siguiente comando:

vue create "nombre del proyecto"

Luego escogeremos que queremos usar vuejs3. una vez hecho esto tendremos creado nuestro proyecto. Para poder correr y ver lo que creo ponemos el siguiente comando:

cd "nombre del proyecto"

npm run sever 

Ahora podremos editarlo a nuestro gusto, con los campos e informacion sobre nuestro proyecto.

Para hacer la conexion con la base de datos mysql debemos primero hacer un nuevo archivo en la raiz de nuestro proyecto llamado:

server.js

En este archivo ira el codigo que establece la conexion con la base de datos. Una vez hecho esto debemos iniciar el servidor npm con el siguiente comando:

npm start

Con el programa escrito y estos servicios arriba podremos ver como se guarda la informacion en la base de datos.

La base del proyecto en carpetas y archivos se ve algo similar a esto:

my-vue-project/
- public/
   - index.html
- src/
   - assets/
      - logo.png
   - components/
      - HelloWorld.vue
   - views/
      - Home.vue
   - App.vue
   - main.js
- package.json
- README.md

### Enlaces de ayuda
Ver [Documentacion Vuejs](https://vuejs.org/guide/introduction.html).

Ver [Repositorio Github](https://github.com/AaronZumarraga/proyecto-core-vuelos.git).


Ver [Enlace al proyecto desplegado]


Ver [Enlace al video de demostracion]


Contactos:
aaron.zumarraga@udla.edu.ec
aaron.zumarraga@hotmail.com


### Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```