Gestión de Usuarios y Registros de Personas
Este proyecto es una aplicación web desarrollada con Node.js , que permite a los usuarios registrarse, iniciar sesión y gestionar registros de personas.

Características principales
Autenticación y Autorización:

Registro de nuevos usuarios con contraseñas cifradas.
Inicio y cierre de sesión seguro.
Autorización para garantizar que los usuarios solo accedan a sus propios datos.
Gestión de Registros de Personas:

Crear nuevos registros con nombre, apellido y edad.
Editar registros y Eliminar registros de forma permanente.
Listar los registros asociados a cada usuario.

Mensajes Flash:
Retroalimentación visual para acciones exitosas o errores (por ejemplo, credenciales incorrectas o datos incompletos).

Diseño responsivo:
Interfaz construida con Bootstrap 5 para garantizar la accesibilidad en dispositivos móviles y de escritorio.

Tecnologías utilizadas:
Backend
Node.js: Plataforma de JavaScript del lado del servidor.
Express.js: Framework minimalista para crear aplicaciones web.
bcrypt: Hashing seguro de contraseñas.
express-validator: Validación de datos en formularios.
dotenv: Manejo de variables de entorno.
express-session: Gestión de sesiones para usuarios autenticados.
connect-flash: Retroalimentación mediante mensajes flash.

Interfaz
Bootstrap 5: Framework de diseño frontend para una interfaz moderna y responsiva.
Hbs: Motor de plantillas para generar vistas dinámicas.
Base de datos
MySQL: Base de datos relacionales para almacenar usuarios y registros de personas.


¡Por supuesto! Aquí tienes un ejemplo de un archivo README.mdque documenta tu proyecto de manera clara y profesional:

Gestión de Usuarios y Registros de Personas
Este proyecto es una aplicación web desarrollada con Node.js , que permite a los usuarios registrarse, iniciar sesión y gestionar registros de personas. La aplicación utiliza tecnologías modernas para garantizar una experiencia de usuario segura, fluida y

Características principales
Autenticación y Autorización:

Registro de nuevos usuarios con contraseñas cifradas.
Inicio y cierre de sesión seguro.
Autorización para garantizar que los usuarios solo accedan a sus propios datos.
Gestión de Registros de Personas:

Crear nuevos registros con nombre, apellido y edad.
Editar registros y
Eliminar registros de forma permanente.
Listar los registros asociados a cada usuario.
Mensajes Flash:

Retroalimentación visual para acciones exitosas o errores (por ejemplo, credenciales incorrectas o datos incompletos).
Diseño responsivo:

Interfaz construida con Bootstrap 5 para garantizar la accesibilidad en dispositivos móviles y de escritorio.
Tecnologías utilizadas
Backend
Node.js: Plataforma de JavaScript del lado del servidor.
Express.js: Framework minimalista para crear aplicaciones web.
bcrypt: Hashing seguro de contraseñas.
express-validator: Validación de datos en formularios.
dotenv: Manejo de variables de entorno.
express-session: Gestión de sesiones para usuarios autenticados.
connect-flash: Retroalimentación mediante mensajes flash.
Interfaz
Bootstrap 5: Framework de diseño frontend para una interfaz moderna y responsiva.
Manillar: Motor de plantillas para generar vistas dinámicas.
Base de datos
MySQL: Base de datos relacionales para almacenar usuarios y registros de personas.
Instalación
Clonar el repositorio:
git clone https://github.com/usuario/proyecto-node-gestor-personas.git
cd proyecto-node-gestor-personas
Instalar las dependencias:
npm install
Configure las variables de entorno:
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=nombre_base_de_datos
SESSION_SECRET=clave_secreta
PORT=3000
Crea la base de datos en MySQL:
CREATE DATABASE gestion_usuarios;

USE gestion_usuarios;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE personas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    age INT,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
Iniciar el servidor:
npm run dev

:)
