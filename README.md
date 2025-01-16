# Microfrontend de Empleados (empleado-mf)

Este **Microfrontend de Empleados** es una aplicación remota diseñada para gestionar datos de empleados como parte de una arquitectura de microfrontends. Se integra con una aplicación host utilizando **Webpack Module Federation** y proporciona funcionalidades CRUD para la gestión de empleados.

## Tabla de Contenidos

- [Descripción General](#descripción-general)
- [Características](#características)
- [Servidor de Desarrollo](#servidor-de-desarrollo)
- [Construcción](#construcción)
- [Configuración del Microfrontend](#configuración-del-microfrontend)
- [Tecnologías Usadas](#tecnologías-usadas)

## Descripción General

El microfrontend `empleado-mf` proporciona funcionalidades para la gestión de empleados, incluyendo la creación, actualización, eliminación y visualización de registros de empleados. Está construido con **Angular CLI 19.0.7** e integrado de manera fluida con una aplicación host.

## Características

- **Gestión Dinámica de Empleados**: Crear, actualizar, eliminar y ver empleados. Validación de formularios para campos como `nombre`, `apellido paterno`, `CURP` y `teléfono`.
- **Manejo de Errores**: Muestra mensajes detallados de errores del backend, incluyendo `uuid`, `statusCode` y `message`.
- **Integración con Host**: Configurado como una aplicación remota utilizando **Webpack Module Federation**. Expone componentes clave para la integración dinámica.
- **Integración con SweetAlert2**: Alertas intuitivas para retroalimentación de éxito y errores.
- **UI con Angular Material**: Diseño moderno y responsivo con un tema consistente.

## Servidor de Desarrollo

Para iniciar el servidor de desarrollo local, ejecuta:

```bash
ng serve

## Construcción

Para construir el proyecto, ejecuta:

```bash
ng build

## Configuración del Microfrontend

La aplicación `empleado-mf` está configurada como un remoto en **Webpack Module Federation**.

### Configuración de Webpack

En `webpack.config.js`, el microfrontend expone sus componentes:

```javascript
const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  name: 'empleado-mf', // Name of the Microfrontend
  exposes: {
    './routes': './src/app/app.routes.ts', // Exposed routes
    './core/domain/empleado.repository': './src/app/core/domain/empleado.repository.ts',
    './core/infrastructure/empleado.api.service': './src/app/core/infrastructure/empleado.api.service.ts',
  },
  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },
});

El remoto es accesible en [http://localhost:4201/remoteEntry.js](http://localhost:4201/remoteEntry.js).

## Tecnologías Usadas

- **Angular CLI 19.0.7**: Framework para construir el microfrontend.
- **Webpack Module Federation**: Para la arquitectura de microfrontends y carga dinámica.
- **Angular Material**: Proporciona componentes de UI y un sistema de temas.
- **SweetAlert2**: Para diálogos de alerta dinámicos y fáciles de usar.
- **RxJS**: Programación reactiva para operaciones asíncronas.
- **TypeScript**: Lenguaje de tipado estricto para mejorar el mantenimiento del código.
