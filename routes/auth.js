const router = require('express').Router();
const passport = require('passport');

// ============================================
// ESTRATEGIA: GOOGLE
// ============================================
const GoogleStrategy = require('passport-google-oauth20').Strategy;
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.CALLBACK_URL}/google/callback`,
    scope: ['profile', 'email']
  },
  (accessToken, refreshToken, profile, done) => {
    profile.provider = 'google';
    profile.accessToken = accessToken;
    return done(null, profile);
  }
));

// ============================================
// ESTRATEGIA: LINKEDIN
// ============================================
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
passport.use(new LinkedInStrategy({
    clientID: process.env.LINKEDIN_CLIENT_ID,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    callbackURL: `${process.env.CALLBACK_URL}/linkedin/callback`,
    scope: ['r_liteprofile', 'r_emailaddress']
  },
  (accessToken, refreshToken, profile, done) => {
    profile.provider = 'linkedin';
    profile.accessToken = accessToken;
    return done(null, profile);
  }
));

// ============================================
// ESTRATEGIA: TWITTER (X)
// ============================================
const TwitterStrategy = require('passport-twitter').Strategy;
passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_API_KEY,
    consumerSecret: process.env.TWITTER_API_SECRET,
    callbackURL: `${process.env.CALLBACK_URL}/twitter/callback`,
    includeEmail: true
  },
  (token, tokenSecret, profile, done) => {
    profile.provider = 'twitter';
    profile.accessToken = token;
    profile.tokenSecret = tokenSecret;
    return done(null, profile);
  }
));

// ============================================
// ESTRATEGIA: GITHUB
// ============================================
const GitHubStrategy = require('passport-github2').Strategy;
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: `${process.env.CALLBACK_URL}/github/callback`,
    scope: ['user:email']
  },
  (accessToken, refreshToken, profile, done) => {
    profile.provider = 'github';
    profile.accessToken = accessToken;
    return done(null, profile);
  }
));

// ============================================
// ESTRATEGIA: DISCORD
// ============================================
const DiscordStrategy = require('passport-discord').Strategy;
passport.use(new DiscordStrategy({
    clientID: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    callbackURL: `${process.env.CALLBACK_URL}/discord/callback`,
    scope: ['identify', 'email']
  },
  (accessToken, refreshToken, profile, done) => {
    profile.provider = 'discord';
    profile.accessToken = accessToken;
    return done(null, profile);
  }
));

// ============================================
// SERIALIZACIÓN DE USUARIO
// ============================================
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
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
    res.redirect('/profile');
  }
);

// ============================================
// RUTAS DE AUTENTICACIÓN - LINKEDIN
// ============================================
router.get('/auth/linkedin',
  passport.authenticate('linkedin', { state: true })
);

router.get('/auth/linkedin/callback',
  passport.authenticate('linkedin', { 
    failureRedirect: '/',
    failureMessage: true 
  }),
  (req, res) => {
    res.redirect('/profile');
  }
);

// ============================================
// RUTAS DE AUTENTICACIÓN - TWITTER
// ============================================
router.get('/auth/twitter',
  passport.authenticate('twitter')
);

router.get('/auth/twitter/callback',
  passport.authenticate('twitter', { 
    failureRedirect: '/',
    failureMessage: true 
  }),
  (req, res) => {
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
    res.redirect('/profile');
  }
);

// ============================================
// RUTA DE CIERRE DE SESIÓN
// ============================================
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error('Error al cerrar sesión:', err);
    }
    res.redirect('/');
  });
});

// ============================================
// MIDDLEWARE PARA VERIFICAR AUTENTICACIÓN
// ============================================
const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
};

// ============================================
// RUTA DE PERFIL (PROTEGIDA)
// ============================================
router.get('/profile', ensureAuthenticated, (req, res) => {
  res.render('profile', { 
    user: req.user,
    title: 'Mi Perfil'
  });
});

module.exports = router;