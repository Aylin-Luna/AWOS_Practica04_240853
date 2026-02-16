# 🌐 Práctica 04: Consumo de APIs de Redes Sociales con OAuth

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.x-000000?style=for-the-badge&logo=express&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Passport](https://img.shields.io/badge/Passport.js-OAuth-34E27A?style=for-the-badge&logo=passport&logoColor=white)

</div>

## 📋 Descripción

Aplicación web educativa para aprender a implementar autenticación OAuth 2.0 con las principales redes sociales. Los estudiantes podrán configurar aplicaciones de desarrollo gratuitas en cada plataforma y consumir datos básicos de sus APIs.

### 🎯 Redes Sociales Integradas

| Red Social | Estrategia Passport | Scopes Requeridos |
|------------|---------------------|-------------------|
| Facebook | passport-facebook | email, public_profile |
| LinkedIn | passport-linkedin-oauth2 | r_liteprofile, r_emailaddress |
| Twitter (X) | passport-twitter | - |
| GitHub | passport-github2 | user:email |
| Discord | passport-discord | identify, email |

## 🚀 Tecnologías Utilizadas

- **Backend**: Node.js + Express
- **Autenticación**: Passport.js + Estrategias OAuth
- **Frontend**: EJS + Tailwind CSS 4.x
- **Sesiones**: express-session
- **Variables de entorno**: dotenv

## 📁 Estructura del Proyecto

```
AWOS_Practica04_240853/
├── .env                    # Variables de entorno (NO SUBIR)
├── .gitignore             # Archivos ignorados
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
    ├── partials/
    │   ├── header.ejs
    │   └── footer.ejs
    ├── index.ejs         # Página de login
    └── profile.ejs       # Perfil del usuario
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

Crea un archivo `.env` en la raíz del proyecto:

```env
# Puerto y sesión
PORT=3000
SESSION_SECRET=tu_secreto_super_seguro_cambiame

# Facebook
FACEBOOK_APP_ID=tu_app_id_aqui
FACEBOOK_APP_SECRET=tu_app_secret_aqui

# LinkedIn
LINKEDIN_CLIENT_ID=tu_client_id_aqui
LINKEDIN_CLIENT_SECRET=tu_client_secret_aqui

# Twitter/X
TWITTER_API_KEY=tu_api_key_aqui
TWITTER_API_SECRET=tu_api_secret_aqui

# GitHub
GITHUB_CLIENT_ID=tu_github_client_id_aqui
GITHUB_CLIENT_SECRET=tu_github_client_secret_aqui

# Discord
DISCORD_CLIENT_ID=tu_discord_client_id_aqui
DISCORD_CLIENT_SECRET=tu_discord_client_secret_aqui

# Callback URL base
CALLBACK_URL=http://localhost:3000/auth
```

### 4️⃣ Ejecutar la Aplicación

```bash
# Terminal 1: Servidor con recarga automática
npm run dev

# Terminal 2: Compilación de Tailwind CSS
npm run watch:css
```

Abrir [http://localhost:3000](http://localhost:3000)

## 🔑 Obtención de API Keys Gratuitas

### Facebook Developer
1. Visitar [developers.facebook.com](https://developers.facebook.com)
2. Crear aplicación → "Consumer"
3. Configurar "Facebook Login" → "Website"
4. URL: `http://localhost:3000`
5. URI de redirección: `http://localhost:3000/auth/facebook/callback`

### LinkedIn Developer
1. Acceder a [developer.linkedin.com](https://developer.linkedin.com)
2. Crear aplicación → Datos básicos
3. Redirect URL: `http://localhost:3000/auth/linkedin/callback`
4. Activar "Sign In with LinkedIn"

### Twitter (X) Developer
1. Ir a [developer.twitter.com](https://developer.twitter.com)
2. Solicitar cuenta de desarrollador (gratis)
3. Crear proyecto y aplicación
4. URL de callback: `http://localhost:3000/auth/twitter/callback`

### GitHub Developer
1. Acceder a [github.com/settings/developers](https://github.com/settings/developers)
2. "New OAuth App"
3. Homepage: `http://localhost:3000`
4. Callback: `http://localhost:3000/auth/github/callback`

### Discord Developer
1. Visitar [discord.com/developers/applications](https://discord.com/developers/applications)
2. "New Application"
3. OAuth2 → Redirects: `http://localhost:3000/auth/discord/callback`

## 🚦 Fases del Proyecto

| Fase | Descripción | Estatus |
|------|-------------|---------|
| 1 | Configuración inicial del proyecto | ⏳ |
| 2 | Configuración de Tailwind CSS | ⏳ |
| 3 | Servidor Express y sesiones |  |
| 4 | Registro de API keys | ⏳ |
| 5 | Implementación de Passport | ⏳ |
| 6 | Creación de vistas | ⏳ |
| 7 | Página de perfil y consumo de API | ⏳ |
| 8 | Pruebas y documentación | ⏳ |

## 📱 Capturas de Pantalla

*(Aquí puedes agregar capturas de tu aplicación funcionando)*

## 🤝 Contribución

Este es un proyecto educativo. Las contribuciones son bienvenidas:

1. Fork el proyecto
2. Crea tu rama (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -m 'Agrega nueva funcionalidad'`)
4. Push (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## ✨ Autor

**Aylin Luna** - [@Aylin-Luna](https://github.com/Aylin-Luna)

---

<div align="center">

**Universidad Tecnologica de Xicotepec de Juarez**  
*Aplicaciones Web Orientadas a Servicios - Práctica 04*  
📅 Febrero 2026

</div>