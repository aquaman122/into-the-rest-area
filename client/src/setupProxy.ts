import { createProxyMiddleware } from 'http-proxy-middleware';
import { Application } from 'express';

module.exports = function(app: Application) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://apis.data.go.kr',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    })
  );
};
