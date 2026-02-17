/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.ejs", "./public/**/*.js"],
  theme: {
    extend: {
      colors: {
        google: '#1877F2',      // Azul de Google (puedes ajustar)
        spotify: '#1DB954',      // Verde oficial de Spotify
        linkedin: '#0A66C2',     // Azul de LinkedIn
        github: '#333333',       // Gris oscuro de GitHub
        discord: '#5865F2'       // Azul/púrpura de Discord
      }
    },
  },
  plugins: [],
}