# 🚀 Prueba Técnica Frontend - Vue 3 SPA

Aplicación de Single Page Application (SPA) desarrollada para la evaluación técnica full stack, enfocada en un frontend robusto con **Vue 3 (Composition API)**, **Pinia**, **Vue Router** y **Tailwind CSS**.

---

## 📋 Tabla de Contenido
1. [Requisitos](#requisitos)
2. [Instalación](#instalación)
3. [Docker](#docker)
4. [Migración aplicada](#migración-aplicada)
5. [Optimización realizada](#optimización-realizada)
6. [Pruebas](#pruebas)
7. [Decisiones técnicas](#decisiones-técnicas)

---

## 1. Requisitos
Para levantar el proyecto, asegúrate de contar con lo siguiente en tu entorno local:
* **Node.js** (Versión 18.x o superior recomendada)
* **npm** o **pnpm**
* **Docker y Docker Compose** (Opcional, para ejecución contenerizada del flujo frontend).

---

## 2. Instalación
Pasos detallados desde la clonación hasta la ejecución completa en local:

1. Clonar el repositorio y acceder a la carpeta del proyecto:
   ```bash
   cd frontend-vue3
2. Instalar las dependencias del proyecto:   
   npm install
3. Ejecutar el entorno de desarrollo:
   npm run dev

## 3. Docker
El proyecto incluye soporte para contenedores Docker facilitando su portabilidad:

Servicios: Contenedor basado en Nginx/Node para servir la aplicación SPA de Vue.

Comandos útiles:

1. Construir y levantar contenedores:
    docker-compose up --build -d
2. Detener contenedores:
    docker-compose down

Troubleshooting básico: Si el puerto 5173 o 80 está ocupado en tu máquina local, verifica el mapeo de puertos en el archivo docker-compose.yml.

## 4. Migración aplicada
1. Versión inicial: Estructura clásica de Vue 2 con Options API y gestión de estado fragmentada.

2. Versión final: Migrado a Vue 3 (Composition API con <script setup>), utilizando Pinia como store global unificado.

3. Dependencias actualizadas: Vue Router v4, Pinia v2, Axios, Tailwind CSS v3 y Vite como empaquetador de alto rendimiento.

4. Problemas encontrados y solución: Inconsistencias de reactividad al sincronizar el stock con los módulos cruzados, resueltas mediante acciones centralizadas en Pinia y propiedades computadas con tipado estricto.

## 5. Optimización realizada
1. Paginación y renderizado: Implementación de paginación local (4 ítems por página) en la tabla de productos para evitar sobrecarga visual del DOM con listas extensas.

2. Búsqueda reactiva: Filtrado optimizado mediante propiedades computadas con caché nativa de Vue (computed).

3. Sincronización eficiente: Comunicación directa entre stores para evitar consultas repetitivas o renderizados innecesarios en el Dashboard.

## 6. Pruebas
1. npm run test

2. Qué cubren: Validación de flujos críticos de autenticación (guards de navegación), integridad de datos en los CRUD de Productos/Categorías y consistencia numérica en los contadores del Dashboard.

## 7. Decisiones técnicas

1. Uso de Pinia sobre Vuex: Seleccionado por su soporte nativo superior para TypeScript, menor tamaño de empaquetado y una API de composición más limpia (defineStore).

2. Manejo de estado en memoria: Se integró un conjunto de datos iniciales en los stores para permitir al evaluador probar de inmediato todas las vistas, métricas y filtros sin depender de una API externa activa.

3. Credenciales de acceso (Modo Demo):

    Correo: admin@example.com

    Contraseña: 123456