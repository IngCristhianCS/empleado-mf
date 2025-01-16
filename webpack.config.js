const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  name: 'empleado-mf', // Nombre del Micro Frontend
  exposes: {
    './routes': './src/app/app.routes.ts', // Archivo de rutas expuestas
    './core/domain/empleado.repository': './src/app/core/domain/empleado.repository.ts',
    './core/infrastructure/empleado.api.service': './src/app/core/infrastructure/empleado.api.service.ts',
  },
  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },
});
