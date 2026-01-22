# Home Services - Plataforma de Servicios del Hogar

Plataforma web para contratar profesionales de servicios del hogar. Los usuarios pueden publicar ofertas de trabajo y buscar servicios como limpieza, electricistas, jardinería, plomería, entre otros.
<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin: 20px 0;">
  <img width="1057" height="1756" alt="image" src="https://github.com/user-attachments/assets/bb5d1614-48bc-4c31-994b-c9ea6b7c513e" />
  <img width="1051" height="1304" alt="image" src="https://github.com/user-attachments/assets/dd04a34f-afb2-4f6f-b535-9a73cba97c44" />
  <img width="1076" height="696" alt="image" src="https://github.com/user-attachments/assets/89c8eef5-541a-4f91-916d-ee6a4e50ba6d" />
  <img width="1073" height="864" alt="image" src="https://github.com/user-attachments/assets/e535c285-ce6d-462f-9d4f-8156269ef2d6" />
  <img width="1058" height="1199" alt="image" src="https://github.com/user-attachments/assets/03211f48-93fd-47ec-8f5c-3b836ef8c947" />
</div>






## 🚀 Tecnologías

### Frontend
- **Next.js 14** - Framework de React
- **React 18** - Biblioteca de UI
- **Tailwind CSS** - Estilos
- **Radix UI** - Componentes accesibles
- **Voiceflow** - Chatbot integrado

### Backend
- **Express.js** - Servidor API REST
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **bcryptjs** - Encriptación de contraseñas

## 📋 Requisitos Previos

- Node.js (v16 o superior)
- MongoDB (local o remoto)
- npm o yarn

## ⚙️ Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
# Puerto del servidor Express (opcional, por defecto: 4000)
PORT=4000

# URI de conexión a MongoDB
MONGO_URI=mongodb://localhost:27017/home-services
# O para MongoDB Atlas:
# MONGO_URI=mongodb+srv://usuario:password@cluster.mongodb.net/home-services?retryWrites=true&w=majority
```

## 📦 Instalación

1. Clona el repositorio:
```bash
git clone <url-del-repositorio>
cd WEB-NETX.JS-main
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno:
```bash
# Crea el archivo .env y agrega las variables necesarias
```

## 🗄️ Base de Datos

### Configuración de MongoDB

1. **MongoDB Local:**
   - Instala MongoDB en tu sistema
   - Inicia el servicio de MongoDB
   - Usa: `mongodb://localhost:27017/home-services`

2. **MongoDB Atlas (Cloud):**
   - Crea una cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Crea un cluster gratuito
   - Obtén la URI de conexión
   - Usa: `mongodb+srv://usuario:password@cluster.mongodb.net/home-services`

### Modelos de Datos

- **RegistroUsuario**: Usuarios del sistema
  - nombre, email, password (hasheado), dirección, teléfono, etc.

- **JobPosting**: Publicaciones de servicios
  - nombreApellido, provincia, costo, dirección, servicio, descripción, userId

## 🏃 Ejecución

### Desarrollo

1. **Inicia el servidor backend** (en una terminal):
```bash
npm run server
```
El servidor se ejecutará en `http://localhost:4000`

2. **Inicia el servidor frontend** (en otra terminal):
```bash
npm run dev
```
La aplicación se abrirá en `http://localhost:3000`

### Producción

1. Construye la aplicación:
```bash
npm run build
```

2. Inicia en modo producción:
```bash
npm start
```

## 📁 Estructura del Proyecto

```
WEB-NETX.JS-main/
├── src/
│   ├── app/              # Páginas de Next.js
│   │   ├── page.jsx      # Página principal
│   │   ├── servicios/   # Listado de servicios
│   │   ├── misDatos/    # Perfil de usuario
│   │   └── mipublicacion/ # Mis publicaciones
│   ├── components/      # Componentes React
│   │   ├── header.jsx
│   │   ├── Footer.jsx
│   │   ├── SigninForm.jsx
│   │   ├── SignupForm.jsx
│   │   └── FormularioPubliacion.jsx
│   ├── models/          # Modelos de MongoDB
│   │   ├── user.js
│   │   └── jobs.js
│   └── lib/             # Utilidades
│       ├── db.js         # Conexión a MongoDB
│       └── utils.js
├── server.js            # Servidor Express API
├── package.json
└── .env                 # Variables de entorno (crear)
```

## 🔌 Endpoints de la API

### Autenticación
- `POST /api/usuarios` - Registrar nuevo usuario
- `POST /api/login` - Iniciar sesión
- `GET /api/usuarios/:userId` - Obtener datos del usuario
- `PUT /api/usuarios/:userId` - Actualizar datos del usuario

### Publicaciones
- `POST /api/jobs` - Crear nueva publicación
- `GET /api/jobpostings` - Obtener todas las publicaciones
- `GET /api/jobpostings/user/:userId` - Obtener publicaciones de un usuario
- `PUT /api/jobpostings/:id` - Actualizar publicación
- `DELETE /api/jobpostings/:id` - Eliminar publicación

## 🎯 Funcionalidades

- ✅ Registro e inicio de sesión de usuarios
- ✅ Publicación de servicios (crear, editar, eliminar)
- ✅ Búsqueda y filtrado por categoría y provincia
- ✅ Gestión de perfil de usuario
- ✅ Chatbot integrado con Voiceflow
- ✅ Interfaz responsive con Tailwind CSS

## 📝 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo de Next.js
- `npm run server` - Inicia el servidor Express con nodemon
- `npm run build` - Construye la aplicación para producción
- `npm start` - Inicia la aplicación en modo producción
- `npm run lint` - Ejecuta el linter

## 🔒 Seguridad

- Las contraseñas se hashean con bcryptjs antes de guardarse
- Validación de email único en la base de datos
- CORS habilitado para comunicación frontend-backend

## 📄 Licencia

Este proyecto es privado.

---

**Desarrollado con ❤️ usando Next.js y Express**
