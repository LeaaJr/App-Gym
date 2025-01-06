// src/setupProxy.js

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api', // La ruta que queremos que pase por el proxy
    createProxyMiddleware({
      target: 'https://magicloops.dev', // El servidor al que deseas hacer las solicitudes
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', // Reescribe la ruta para que coincida con la API externa
      },
    })
  );
};
