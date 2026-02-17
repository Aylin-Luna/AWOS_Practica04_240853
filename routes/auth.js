const router = require('express').Router();
const passport = require('passport');
const axios = require('axios');
const qs = require('qs');

// ============================================
// ESTRATEGIA: GOOGLE
// ============================================
const GoogleStrategy = require('passport-google-oauth20').Strategy;
passport.use('google', new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.CALLBACK_URL}/google/callback`,
    scope: ['profile', 'email']
  },
  (accessToken, refreshToken, profile, done) => {
    console.log('✅ Google profile received:', profile.id);
    
    const userProfile = {
        id: profile.id,
        provider: 'google',
        displayName: profile.displayName || `${profile.name?.givenName || ''} ${profile.name?.familyName || ''}`.trim(),
        emails: profile.emails || [],
        photos: profile.photos || [],
        accessToken: accessToken
    };
    
    return done(null, userProfile);
  }
));

// ============================================
// ESTRATEGIA: SPOTIFY
// ============================================
const SpotifyStrategy = require('passport-spotify').Strategy;
passport.use('spotify', new SpotifyStrategy({
    clientID: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    callbackURL: `${process.env.CALLBACK_URL}/spotify/callback`,
    scope: ['user-read-email', 'user-read-private']
  },
  (accessToken, refreshToken, expires_in, profile, done) => {
    console.log('✅ Spotify profile received:', profile.id);
    
    const userProfile = {
        id: profile.id,
        provider: 'spotify',
        displayName: profile.displayName || profile.username,
        username: profile.username,
        emails: profile.emails ? profile.emails : (profile.email ? [{ value: profile.email }] : []),
        photos: profile.photos && profile.photos.length > 0 ? profile.photos : 
                (profile.avatar ? [{ value: profile.avatar }] : []),
        accessToken: accessToken,
        refreshToken: refreshToken,
        profileUrl: profile.profileUrl,
        product: profile.product
    };
    
    return done(null, userProfile);
  }
));

// ============================================
// ESTRATEGIA: LINKEDIN - IMPLEMENTACIÓN MANUAL (FUNCIONAL 2026)
// ============================================
router.get('/auth/linkedin', (req, res) => {
    const params = qs.stringify({
        response_type: 'code',
        client_id: process.env.LINKEDIN_CLIENT_ID,
        redirect_uri: `${process.env.CALLBACK_URL}/linkedin/callback`,
        scope: 'openid profile email',
        state: Math.random().toString(36).substring(7)
    });
    
    res.redirect(`https://www.linkedin.com/oauth/v2/authorization?${params}`);
});

router.get('/auth/linkedin/callback', async (req, res) => {
    try {
        const { code } = req.query;
        
        if (!code) {
            console.error('❌ No se recibió código de autorización de LinkedIn');
            return res.redirect('/');
        }
        
        console.log('📌 Código de LinkedIn recibido, intercambiando por token...');
        
        const tokenResponse = await axios.post('https://www.linkedin.com/oauth/v2/accessToken', 
            qs.stringify({
                grant_type: 'authorization_code',
                code: code,
                client_id: process.env.LINKEDIN_CLIENT_ID,
                client_secret: process.env.LINKEDIN_CLIENT_SECRET,
                redirect_uri: `${process.env.CALLBACK_URL}/linkedin/callback`
            }), {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }
        );
        
        const accessToken = tokenResponse.data.access_token;
        console.log('✅ Token de acceso de LinkedIn obtenido');
        
        const userInfoResponse = await axios.get('https://api.linkedin.com/v2/userinfo', {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });
        
        const userInfo = userInfoResponse.data;
        console.log('✅ Información de usuario de LinkedIn obtenida:', userInfo.sub);
        
        const userProfile = {
            id: userInfo.sub,
            provider: 'linkedin',
            displayName: userInfo.name || `${userInfo.given_name || ''} ${userInfo.family_name || ''}`.trim(),
            emails: userInfo.email ? [{ value: userInfo.email }] : [],
            photos: userInfo.picture ? [{ value: userInfo.picture }] : [],
            accessToken: accessToken
        };
        
        req.login(userProfile, (err) => {
            if (err) {
                console.error('❌ Error en req.login de LinkedIn:', err);
                return res.redirect('/');
            }
            console.log('✅ Autenticación de LinkedIn exitosa');
            res.redirect('/profile');
        });
        
    } catch (error) {
        console.error('❌ Error en autenticación LinkedIn:');
        if (error.response) {
            console.error('  - Status:', error.response.status);
            console.error('  - Data:', error.response.data);
        } else {
            console.error('  - Mensaje:', error.message);
        }
        res.redirect('/');
    }
});

// ============================================
// ESTRATEGIA: GITHUB
// ============================================
const GitHubStrategy = require('passport-github2').Strategy;
passport.use('github', new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: `${process.env.CALLBACK_URL}/github/callback`,
    scope: ['user:email']
  },
  (accessToken, refreshToken, profile, done) => {
    console.log('✅ GitHub profile received:', profile.id);
    
    const userProfile = {
        id: profile.id,
        provider: 'github',
        displayName: profile.displayName || profile.username,
        username: profile.username,
        emails: profile.emails || [],
        photos: profile.photos || [],
        accessToken: accessToken
    };
    
    return done(null, userProfile);
  }
));

// ============================================
// ESTRATEGIA: DISCORD
// ============================================
const DiscordStrategy = require('passport-discord').Strategy;
passport.use('discord', new DiscordStrategy({
    clientID: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    callbackURL: `${process.env.CALLBACK_URL}/discord/callback`,
    scope: ['identify', 'email']
  },
  (accessToken, refreshToken, profile, done) => {
    console.log('✅ Discord profile received:', profile.id);
    
    const userProfile = {
        id: profile.id,
        provider: 'discord',
        displayName: profile.username,
        emails: profile.email ? [{ value: profile.email }] : [],
        photos: profile.avatar ? [{ value: `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png` }] : [],
        accessToken: accessToken
    };
    
    return done(null, userProfile);
  }
));

// ============================================
// SERIALIZACIÓN DE USUARIO
// ============================================
passport.serializeUser((user, done) => {
    console.log('📝 Serializando usuario:', user.id, '- Proveedor:', user.provider);
    const userToSerialize = {
        id: user.id,
        provider: user.provider,
        displayName: user.displayName,
        emails: user.emails,
        photos: user.photos,
        accessToken: user.accessToken
    };
    done(null, userToSerialize);
});

passport.deserializeUser((user, done) => {
    console.log('📝 Deserializando usuario:', user.id, '- Proveedor:', user.provider);
    done(null, user);
});

// ============================================
// RUTAS DE AUTENTICACIÓN - GOOGLE
// ============================================
router.get('/auth/google', 
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/auth/google/callback',
  passport.authenticate('google', { 
    failureRedirect: '/',
    failureMessage: true 
  }),
  (req, res) => {
    console.log('✅ Google authentication successful');
    res.redirect('/profile');
  }
);

// ============================================
// RUTAS DE AUTENTICACIÓN - SPOTIFY
// ============================================
router.get('/auth/spotify',
  passport.authenticate('spotify', { 
    scope: ['user-read-email', 'user-read-private'],
    showDialog: true
  })
);

router.get('/auth/spotify/callback',
  passport.authenticate('spotify', { 
    failureRedirect: '/',
    failureMessage: true 
  }),
  (req, res) => {
    console.log('✅ Spotify authentication successful');
    res.redirect('/profile');
  }
);

// ============================================
// RUTAS DE AUTENTICACIÓN - GITHUB
// ============================================
router.get('/auth/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

router.get('/auth/github/callback',
  passport.authenticate('github', { 
    failureRedirect: '/',
    failureMessage: true 
  }),
  (req, res) => {
    console.log('✅ GitHub authentication successful');
    res.redirect('/profile');
  }
);

// ============================================
// RUTAS DE AUTENTICACIÓN - DISCORD
// ============================================
router.get('/auth/discord',
  passport.authenticate('discord')
);

router.get('/auth/discord/callback',
  passport.authenticate('discord', { 
    failureRedirect: '/',
    failureMessage: true 
  }),
  (req, res) => {
    console.log('✅ Discord authentication successful');
    res.redirect('/profile');
  }
);

// ============================================
// RUTA DE CIERRE DE SESIÓN (VERSIÓN ULTRA SIMPLE QUE FUNCIONA)
// ============================================
router.get('/logout', (req, res) => {
    console.log('🚪 Intentando cerrar sesión...');
    console.log('👤 Usuario antes de logout:', req.user ? req.user.displayName : 'No autenticado');
    
    // Destruir la sesión primero (método más efectivo)
    req.session.destroy((err) => {
        if (err) {
            console.error('❌ Error al destruir sesión:', err);
            return res.redirect('/');
        }
        
        // Limpiar la cookie
        res.clearCookie('connect.sid');
        
        // También hacer logout de passport
        req.logout(() => {
            console.log('✅ Sesión cerrada correctamente');
            res.redirect('/');
        });
    });
});

// Ruta POST también por si acaso
router.post('/logout', (req, res) => {
    res.redirect('/logout');
});

// ============================================
// MIDDLEWARE PARA VERIFICAR AUTENTICACIÓN
// ============================================
const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    console.log('⚠️ Intento de acceso no autorizado a perfil');
    res.redirect('/');
};

// ============================================
// RUTA DE PERFIL (PROTEGIDA)
// ============================================
router.get('/profile', ensureAuthenticated, (req, res) => {
    console.log('👤 Mostrando perfil para:', req.user.displayName);
    res.render('profile', { 
        user: req.user,
        title: 'Mi Perfil'
    });
});

module.exports = router;

// ============================================
// LOGS DE VERIFICACIÓN
// ============================================
console.log('✅ auth.js cargado correctamente');
console.log('📌 Estrategias de Passport: google, spotify, github, discord');
console.log('📌 Rutas manuales: /auth/linkedin, /auth/linkedin/callback');
console.log('📌 Rutas definidas:');
console.log('   - /auth/google');
console.log('   - /auth/google/callback');
console.log('   - /auth/spotify');
console.log('   - /auth/spotify/callback');
console.log('   - /auth/linkedin (manual)');
console.log('   - /auth/linkedin/callback (manual)');
console.log('   - /auth/github');
console.log('   - /auth/github/callback');
console.log('   - /auth/discord');
console.log('   - /auth/discord/callback');
console.log('   - /logout (GET)');
console.log('   - /profile');
console.log('🔗 URLs de callback configuradas:');
console.log(`   - Google: ${process.env.CALLBACK_URL}/google/callback`);
console.log(`   - Spotify: ${process.env.CALLBACK_URL}/spotify/callback`);
console.log(`   - LinkedIn: ${process.env.CALLBACK_URL}/linkedin/callback (manual)`);
console.log(`   - GitHub: ${process.env.CALLBACK_URL}/github/callback`);
console.log(`   - Discord: ${process.env.CALLBACK_URL}/discord/callback`);