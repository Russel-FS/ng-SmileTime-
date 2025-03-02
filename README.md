<div align="center">

# 🦷 SmileTime

[![Angular](https://img.shields.io/badge/Angular-16+-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![RxJS](https://img.shields.io/badge/RxJS-7.x-B7178C?style=for-the-badge&logo=reactivex&logoColor=white)](https://rxjs.dev/)
[![ESLint](https://img.shields.io/badge/ESLint-8.x-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)](https://eslint.org/)

<h3>
  Sistema moderno de gestión odontológica construido con tecnologías de última generación
</h3>

[📚 Documentación](#características) •
[🚀 Inicio Rápido](#requisitos) •
[💻 Desarrollo](#instalación) •
[🏗️ Arquitectura](#arquitectura)

---

</div>

## ⭐ Características Principales

<div align="center">

| 🔍 Búsqueda | 📅 Agenda | 📋 Historiales | 👨‍⚕️ Admin | 🔔 Notificaciones |
|------------|-----------|----------------|-----------|-----------------|
| Localización inteligente de clínicas | Sistema avanzado de citas | Gestión de historiales clínicos | Panel administrativo | Recordatorios en tiempo real |

</div>

## 🚀 Stack Tecnológico

<div align="center">

### Core Framework
[![Angular](https://img.shields.io/badge/Angular-16+-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![RxJS](https://img.shields.io/badge/RxJS-7.x-B7178C?style=for-the-badge&logo=reactivex&logoColor=white)](https://rxjs.dev/)

### UI Framework & Styling
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Angular Material](https://img.shields.io/badge/Angular_Material-16+-607D8B?style=for-the-badge&logo=material-design&logoColor=white)](https://material.angular.io/)
[![SASS](https://img.shields.io/badge/SASS-CC6699?style=for-the-badge&logo=sass&logoColor=white)](https://sass-lang.com/)

### Code Quality & Testing
[![ESLint](https://img.shields.io/badge/ESLint-8.x-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)](https://eslint.org/)
[![Prettier](https://img.shields.io/badge/Prettier-3.x-F7B93E?style=for-the-badge&logo=prettier&logoColor=black)](https://prettier.io/)
[![Jest](https://img.shields.io/badge/Jest-29.x-C21325?style=for-the-badge&logo=jest&logoColor=white)](https://jestjs.io/)

### Development Tools
[![NPM](https://img.shields.io/badge/NPM-9.x-CB3837?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/)
[![Git](https://img.shields.io/badge/Git-2.x-F05032?style=for-the-badge&logo=git&logoColor=white)](https://git-scm.com/)
[![VS Code](https://img.shields.io/badge/VS_Code-Latest-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white)](https://code.visualstudio.com/)

</div>

### Características del Stack

| Categoría | Tecnología | Propósito |
|-----------|------------|-----------|
| **Frontend Core** | Angular 16+ | Framework principal para desarrollo SPA |
| | TypeScript 5.x | Tipado estático y características modernas de ES |
| | RxJS 7.x | Programación reactiva y manejo de eventos |
| **Estilos** | Tailwind CSS | Framework CSS utilitario para diseño responsive |
| | Angular Material | Componentes Material Design pre-construidos |
| | SASS | Preprocesador CSS para estilos avanzados |
| **Calidad** | ESLint | Análisis estático de código |
| | Prettier | Formateo consistente de código |
| | Jest | Framework de testing unitario |
| **Desarrollo** | NPM | Gestor de paquetes y scripts |
| | Git | Control de versiones |
| | VS Code | Editor de código recomendado |

## 📋 Requisitos Previos

> ⚡ **IMPORTANTE**  
> Asegúrate de tener instaladas todas las herramientas necesarias

### Herramientas Requeridas

| Herramienta | Versión | Enlace de Descarga |
|-------------|---------|-------------------|
| Node.js | v16.x o superior | [📥 Descargar Node.js](https://nodejs.org/es/download/) |
| VS Code | Última versión | [📥 Descargar VS Code](https://code.visualstudio.com/download) |
| Git | v2.x o superior | [📥 Descargar Git](https://git-scm.com/downloads) |

### Verificación de Instalación

```bash
node -v     # v16.x o superior
npm -v      # v8.x o superior
git --version # v2.x o superior
```

### Instalación de Angular CLI
```bash
npm install -g @angular/cli  # Instalar Angular CLI
ng version                   # Verificar instalación
```

## 🔧 Herramientas Recomendadas

<div align="center">

### VS Code + Extensiones Esenciales

[![Angular](https://img.shields.io/badge/Angular_Language_Service-0B1123?style=for-the-badge&logo=angular)](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template)
[![Error Lens](https://img.shields.io/badge/Error_Lens-B7178C?style=for-the-badge&logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_IntelliSense-38B2AC?style=for-the-badge&logo=tailwind-css)](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
[![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint)](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

</div>

### Configuración Recomendada

Agregar al `settings.json` de VS Code:

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.updateImportsOnFileMove.enabled": "always",
  "typescript.preferences.importModuleSpecifier": "relative"
}
```

## 💫 Inicio Rápido

```bash
# Clonar e instalar
git clone https://github.com/tu-usuario/ng-SmileTime.git
cd ng-SmileTime
npm install

# Iniciar desarrollo
npm start         # http://localhost:4200
```

## 📐 Estructura del Proyecto

```
src/app/
├── core/                    # Capa de dominio
│   ├── domain/
│   │   └── models/         # Modelos de dominio
│   ├── use-cases/          # Casos de uso
│   ├── interfaces/         # Contratos/Puertos
│   └── services/           # Servicios de dominio
│
├── data/                   # Capa de datos
│   ├── repositories/       # Implementaciones
│   ├── datasources/        # Fuentes de datos
│   ├── mappers/           # Convertidores
│   └── dto/               # Objetos de transferencia
│
├── presentation/           # Capa de presentación
│   ├── pages/             # Páginas
│   ├── components/        # Componentes
│   └── shared/           
│       └── layout/        # Layouts
│           ├── components/
│           └── containers/
│
├── infrastructure/         # Capa de infraestructura
│   ├── http/              # Servicios HTTP
│   ├── storage/           # Almacenamiento
│   └── config/           # Configuraciones
│
└── shared/                # Recursos compartidos
    ├── constants/         # Constantes
    ├── utils/            # Utilidades
    └── types/            # Tipos globales
```

> 🏗️ **NOTA**  
> La estructura sigue los principios de Clean Architecture para mantener el código organizado, testeable y mantenible.

## 🌿 Flujo de Trabajo Git

> ⚠️ **ADVERTENCIA**  
> Siempre crear una rama nueva para cada feature

```bash
git checkout -b feature/nombre   # Nueva rama
git pull origin main            # Actualizar con main
```

## 🤝 Contribución

1. Crear rama feature (`git checkout -b feature/AmazingFeature`)
2. Commit cambios (`git commit -m 'Add: AmazingFeature'`)
3. Push a la rama (`git push origin feature/AmazingFeature`)
4. Abrir Pull Request

----
<div align="center">

### Construido con 💙 usando Angular

[![Stargazers](https://img.shields.io/github/stars/tu-usuario/ng-SmileTime?style=for-the-badge)](https://github.com/Russel-FS/ng-SmileTime-)
[![Forks](https://img.shields.io/github/forks/tu-usuario/ng-SmileTime?style=for-the-badge)](https://github.com/Russel-FS/ng-SmileTime-)

</div>
