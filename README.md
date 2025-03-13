API Documentation

📌 Descripción

Esta API proporciona servicios y funcionalidades basadas en Neo4j. Es necesario configurar un archivo .env.development para su correcto funcionamiento.

🚀 Instalación

1️⃣ Clonar el repositorio

git clone <URL_DEL_REPOSITORIO>
cd <NOMBRE_DEL_PROYECTO>

2️⃣ Instalar dependencias

npm install

⚙️ Configuración del Entorno

Antes de ejecutar la API, es necesario crear un archivo .env.development en la raíz del proyecto con las siguientes variables de entorno:

PORT=3325
SECRET_KEY=clave
NEO4J_URI=bolt://localhost:7685
NEO4J_USER=neo4j
NEO4J_PASSWORD=@Qwert454

⚠ Nota: Cambia los valores según sea necesario para tu entorno de desarrollo.

▶️ Ejecución

Para ejecutar la API en modo desarrollo:

npm run dev

Para ejecutar en producción:

npm start

📡 Endpoints Principales

Método

Endpoint

Descripción

GET

/api/status

Verifica el estado de la API

POST

/api/login

Autenticación de usuario

GET

/api/data

Obtiene datos de la base de datos

🛠 Tecnologías Utilizadas

Node.js - Entorno de ejecución

Express - Framework para servidores HTTP

Neo4j - Base de datos orientada a grafos
