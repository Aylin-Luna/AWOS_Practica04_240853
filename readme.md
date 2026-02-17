# 🌐 Práctica 04: Consumo de APIs de Redes Sociales con OAuth

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.x-000000?style=for-the-badge&logo=express&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Passport](https://img.shields.io/badge/Passport.js-OAuth-34E27A?style=for-the-badge&logo=passport&logoColor=white)

**Universidad Tecnoloogica de Xicotepec de Juarez**  
*Aplicaciones Web Orientadas a Servicios - Práctica 04*  
**Aylin Esteban Luna** - Matricula: 240853

</div>

## 📋 Descripción

Aplicación web educativa para implementar autenticación OAuth 2.0 con las principales redes sociales. Los estudiantes aprenderán a configurar aplicaciones de desarrollo gratuitas y consumir datos básicos de sus APIs.

### 🎯 Redes Sociales Integradas

| Red Social | Estrategia Passport | Scopes Requeridos |
|------------|---------------------|-------------------|
| Google | passport-google-oauth20 | profile, email |
| LinkedIn | passport-linkedin-oauth2 | r_liteprofile, r_emailaddress |
| Twitter (X) | passport-twitter | - |
| GitHub | passport-github2 | user:email |
| Discord | passport-discord | identify, email |

## 🚀 Tecnologías Utilizadas

- **Backend**: Node.js + Express 4.x
- **Autenticación**: Passport.js + Estrategias OAuth
- **Frontend**: EJS + Tailwind CSS 4.x
- **Sesiones**: express-session
- **Variables de entorno**: dotenv
- **Recarga automática**: Nodemon

## 📁 Estructura del Proyecto

```
AWOS_Practica04_240853/
├── .env                    # Variables de entorno (NO SUBIR A GITHUB)
├── .gitignore             # Archivos ignorados (node_modules, .env, etc.)
├── package.json           # Dependencias y scripts
├── server.js              # Servidor principal
├── tailwind.config.js     # Configuración de Tailwind
├── src/
│   └── input.css         # Estilos fuente de Tailwind
├── public/
│   ├── css/
│   │   └── output.css    # CSS compilado
│   └── images/           # Imágenes estáticas
├── routes/
│   └── auth.js           # Rutas de autenticación
└── views/
    ├── index.ejs         # Página de login con botones sociales
    └── profile.ejs       # Perfil del usuario con datos de la API
```

## ⚙️ Instalación y Configuración

### 1️⃣ Clonar el Repositorio

```bash
git clone https://github.com/Aylin-Luna/AWOS_Practica04_240853.git
cd AWOS_Practica04_240853
```

### 2️⃣ Instalar Dependencias

```bash
npm install
```

### 3️⃣ Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto (NO SE SUBE A GITHUB):

```env
# ============================================
# CONFIGURACIÓN DEL SERVIDOR
# ============================================
PORT=3000
SESSION_SECRET=tu_secreto_super_seguro_aqui  # CÁMBIALO POR UN TEXTO SEGURO

# ============================================
# GOOGLE OAUTH
# ============================================
GOOGLE_CLIENT_ID=tu_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=tu_google_client_secret

# ============================================
# LINKEDIN OAUTH
# ============================================
LINKEDIN_CLIENT_ID=tu_linkedin_client_id
LINKEDIN_CLIENT_SECRET=tu_linkedin_client_secret

# ============================================
# TWITTER (X) OAUTH
# ============================================
TWITTER_API_KEY=tu_twitter_api_key
TWITTER_API_SECRET=tu_twitter_api_secret

# ============================================
# GITHUB OAUTH
# ============================================
GITHUB_CLIENT_ID=tu_github_client_id
GITHUB_CLIENT_SECRET=tu_github_client_secret

# ============================================
# DISCORD OAUTH
# ============================================
DISCORD_CLIENT_ID=tu_discord_client_id
DISCORD_CLIENT_SECRET=tu_discord_client_secret

# ============================================
# CALLBACK URL BASE (NO MODIFICAR EN DESARROLLO)
# ============================================
CALLBACK_URL=http://localhost:3000/auth
```

### 4️⃣ Ejecutar la Aplicación

```bash
# Terminal 1: Servidor con recarga automática
npm run dev

# Terminal 2: Compilación de Tailwind CSS (modo watch)
npm run watch:css
```

Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

## 🔑 Obtención de API Keys Gratuitas

### Google
1. Visitar [Google Cloud Console](https://console.cloud.google.com/)
2. Crear proyecto nuevo → "APIs y servicios" → "Credenciales"
3. "Crear credenciales" → "ID de cliente de OAuth"
4. Tipo: "Aplicación web"
5. Orígenes autorizados: `http://localhost:3000`
6. URIs de redirección: `http://localhost:3000/auth/google/callback`

### LinkedIn
1. Acceder a [LinkedIn Developers](https://www.linkedin.com/developers/)
2. "Create app" → Completar datos básicos
3. En "Auth": Agregar URL de redirección: `http://localhost:3000/auth/linkedin/callback`
4. Solicitar productos: "Sign In with LinkedIn"

### GitHub
1. Ir a [GitHub Settings > Developer settings](https://github.com/settings/developers)
2. "New OAuth App"
3. Homepage URL: `http://localhost:3000`
4. Authorization callback URL: `http://localhost:3000/auth/github/callback`

### Discord
1. Ir a [Discord Developer Portal](https://discord.com/developers/applications)
2. "New Application"
3. Sección "OAuth2" → "Redirects": `http://localhost:3000/auth/discord/callback`
4. Guardar cambios

## 🚦 Fases del Proyecto

| Fase | Descripción | Estatus |
|------|-------------|---------|
| 1 | Configuración inicial del proyecto | ✅ Completado |
| 2 | Configuración de Tailwind CSS 4.x | ✅ Completado |
| 3 | Servidor Express y configuración de sesiones | ✅ Completado |
| 4 | Registro de aplicaciones y obtención de API keys | ✅ Completado |
| 5 | Implementación de estrategias Passport | ✅ Completado |
| 6 | Creación de vistas con Tailwind | ✅ Completado |
| 7 | Página de perfil y consumo de APIs | ✅ Completado |
| 8 | Pruebas y documentación final | ✅ Completado |

## 📱 Funcionalidades

### Página de Login
- Interfaz responsiva con Tailwind CSS
- Botones personalizados con colores institucionales de cada red
- 5 opciones de autenticación social

### Página de Perfil
- Saludo personalizado con nombre del usuario
- Foto de perfil (cuando la red social la proporciona)
- Información básica del perfil
- Área para consumo de contenido exclusivo de la API

## ⚠️ Consideraciones Importantes

### Seguridad
- **NUNCA** subir el archivo `.env` a GitHub
- Verificar que `.env` esté en `.gitignore`
- Usar `SESSION_SECRET` seguro y único
- En producción, cambiar `secure: false` a `true` en cookies

### Desarrollo Local
- Todas las URLs de callback usan `localhost:3000`
- Las API keys deben ser de desarrollo (modo testing)
- Algunas redes requieren verificación adicional

## 🧪 Pruebas de Ejecución

```bash
# Verificar que el servidor inicia
npm run dev
# Debe mostrar: "Servidor corriendo en http://localhost:3000"

# Verificar compilación de CSS
npm run watch:css
# Debe mostrar: "watching for changes..."

# Probar cada botón de login
# Cada red debe redirigir a su portal de autenticación
```

## 📚 Referencias

- [Documentación de Passport.js](http://www.passportjs.org/docs/)
- [Google OAuth 2.0](https://developers.google.com/identity/protocols/oauth2)
- [LinkedIn OAuth 2.0](https://learn.microsoft.com/en-us/linkedin/shared/authentication/authorization-code-flow)
- [GitHub OAuth](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps)
- [Discord OAuth2](https://discord.com/developers/docs/topics/oauth2)
- [Tailwind CSS 4](https://tailwindcss.com/blog/tailwindcss-v4-alpha)

## 📄 Licencia

Este proyecto es educativo y de código abierto. Puedes usarlo libremente para aprender y practicar.

---

<div align="center">

**Desarrollado por Aylin Esteban Luna**   
🔗 [GitHub](https://github.com/Aylin-Luna)

*Febrero 2026*

</div>