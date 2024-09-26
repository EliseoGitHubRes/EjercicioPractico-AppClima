// Configuración para Next.js que permite cargar imágenes de ciertos sitios web
module.exports = {
    images: {
        // Sitio web de donde se cargarán las imágenes
      remotePatterns: [
        {
          // Protocolo de las imágenes (https)
          protocol: 'https',
          hostname: 'openweathermap.org',  // Sitio web de donde se cargarán las imágenes
        },
      ],
    },
  }