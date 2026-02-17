const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración básica
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ============================================
// CONFIGURACIÓN DE SESIÓN (CORREGIDA)
// ============================================
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false,
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: 'lax'
    },
    name: 'connect.sid'
}));

// ============================================
// DEPURACIÓN DE SESIONES (AYUDA A VER QUÉ PASA)
// ============================================
app.use((req, res, next) => {
    console.log(`📍 [${req.method}] ${req.url}`);
    console.log('   👤 Usuario:', req.user ? req.user.displayName : 'No autenticado');
    console.log('   🍪 Sesión ID:', req.sessionID);
    next();
});

// ============================================
// INICIALIZAR PASSPORT (ORDEN CORRECTO)
// ============================================
app.use(passport.initialize());
app.use(passport.session());

// ============================================
// IMPORTAR RUTAS (DESPUÉS DE PASSPORT)
// ============================================
const authRoutes = require('./routes/auth');
app.use('/', authRoutes);

// ============================================
// RUTA PRINCIPAL
// ============================================
app.get('/', (req, res) => {
    res.render('index', { user: req.user || null });
});

// ============================================
// MANEJO DE ERRORES 404
// ============================================
app.use((req, res) => {
    res.status(404).send('Ruta no encontrada');
});

// ============================================
// INICIAR SERVIDOR
// ============================================
app.listen(PORT, () => {
    console.log(`=================================`);
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`=================================`);
    console.log('🔒 Sesión configurada correctamente');
    console.log('📋 Rutas disponibles:');
    console.log('   - / [GET] - Página principal');
    console.log('   - /auth/google [GET]');
    console.log('   - /auth/spotify [GET]');
    console.log('   - /auth/linkedin [GET]');
    console.log('   - /auth/github [GET]');
    console.log('   - /auth/discord [GET]');
    console.log('   - /profile [GET]');
    console.log('   - /logout [GET]');
    console.log(`=================================`);
});