import proxy from 'http-proxy-middleware';

export default function (app: any) {
  app.use(proxy('/api', { target: 'http://localhost:5000/' }));
};