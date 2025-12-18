## Parcial 1 – API REST de Alergias e Intolerancias Alimentarias

- **Alumnos**: Gamero Gustavo, Espasandin Gonzalo, Gamero Facundo  
- **Materia**: Aplicaciones Híbridas  
- **Docente**: Cruz Jonathan Emanuel  
- **Comisión**: DWAN4AV  

### Descripción

Esta carpeta contiene la **API REST** que da soporte a la SPA del parcial 2.  
Permite gestionar usuarios, intolerancias/alergias, alimentos, recetas e historial de consultas para responder a la pregunta:  
**“¿Puedo consumir este alimento según mi alergia/intolerancia?”**.

### Tecnologías

- Node.js + Express
- MongoDB + Mongoose
- JWT (Json Web Token)
- Bcrypt (encriptación de contraseñas)
- CORS
- Dotenv

### Funcionalidades principales

- **Usuarios (`/api/users`)**
  - Registro de usuario.
  - Inicio de sesión con email/contraseña y generación de JWT.
  - Listado de usuarios (requiere token).
  - Obtención, actualización y eliminación de usuario por ID.
  - Actualización de la alergia/intolerancia del usuario, devolviendo un **nuevo token** con los datos actualizados.

- **Intolerancias / Alergias (`/api/intolerances`)**
  - Alta de intolerancia/alergia con:
    - Nombre, tipo (intolerancia/alergia), severidad, síntomas, ingredientes restringidos, etc.
  - Edición y eliminación por ID.
  - Listado completo de intolerancias.
  - Búsqueda por ID y por nombre normalizado.

- **Alimentos (`/api/food`)**
  - Alta, edición y eliminación de alimentos.
  - Manejo de:
    - Código de barras, nombre, ingredientes, trazas, marca, categoría, origen, información nutricional, etc.
  - Búsquedas:
    - Por ID.
    - Por nombre normalizado.
    - Por ingrediente.
    - **Alimentos aptos** para una intolerancia/alergia (`/allergen/:allergen`): devuelve alimentos que **no contienen** los ingredientes restringidos ni el alérgeno normalizado, acotado a un máximo de resultados.

- **Recetas (`/api/recipes`)**
  - Alta, edición y eliminación de recetas.
  - Manejo de:
    - Nombre, descripción, ingredientes, pasos, tiempo de preparación, porciones.
  - Búsquedas:
    - Por ID.
    - Por nombre.
    - Por ingrediente (recetas que no incluyan determinado ingrediente).

- **Historial de consultas (`/api/history`)**
  - Registro del historial de compatibilidad alimento–usuario:
    - `id_usuario`, `id_alimento`, resultado y fecha.
  - Listado de todo el historial.
  - Obtención y eliminación de un registro por ID.
  - Obtención y eliminación del historial **de un usuario específico**.

> La mayoría de los endpoints (excepto registro/login de usuario y algunas consultas públicas de intolerancias) requieren un **token JWT válido** enviado en los headers, según el middleware de autenticación.

### Puesta en marcha

1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Crear un archivo `.env` en la carpeta `parcial-1` con al menos:
   ```env
   PORT=3000
   URI_DB=<cadena-de-conexion-a-mongodb>
   SECRET_KEY=<clave-secreta-para-jwt>
   ```
3. Levantar el servidor:
   ```bash
   npm start
   ```
4. La API quedará escuchando en `http://localhost:PORT` y expondrá los endpoints bajo el prefijo `/api`.
