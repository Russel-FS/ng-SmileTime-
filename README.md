# SmileTime - Sistema de Gestión Odontológica

Aplicación web para la gestión de citas odontológicas y búsqueda de clínicas dentales cercanas.

## Características Principales

- Búsqueda de clínicas dentales por ubicación
- Sistema de agenda y reserva de citas
- Gestión de historiales clínicos
- Panel administrativo para odontólogos
- Sistema de notificaciones para recordatorios de citas

## Tecnologías Utilizadas

### Core
- Angular 16+
- TypeScript 5.x
- RxJS 7.x

### Estilos
- Tailwind CSS 3.x
- Angular Material (opcional)

### Integración
- REST API
- Swagger/OpenAPI
- Axios/HttpClient

### Contenedorización
- Docker
- Docker Compose

### Testing
- Jasmine
- Karma
- Cypress (e2e)

### CI/CD
- GitHub Actions
- SonarQube

### Otras Herramientas
- ESLint
- Prettier
- Husky (git hooks)
- Commitlint

## Configuración del Entorno de Desarrollo

### Prerrequisitos

1. Node.js y npm:
   ```bash
   # Verificar si está instalado
   node --version  # Debe ser v16.x o superior
   npm --version   # Debe ser v8.x o superior

   # Si no está instalado, descarga de:
   # https://nodejs.org/es/download/
   ```

2. Angular CLI:
   ```bash
   # Instalar Angular CLI globalmente
   npm install -g @angular/cli

   # Verificar instalación
   ng version
   ```

3. Git:
   ```bash
   # Verificar instalación
   git --version

   # Si no está instalado:
   # Windows: https://git-scm.com/download/win
   # Linux: sudo apt install git
   # Mac: brew install git
   ```

### Instalación del Proyecto

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/ng-SmileTime.git
   cd ng-SmileTime
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Verificar instalación:
   ```bash
   ng serve
   ```

4. Instalación de herramientas adicionales:
   ```bash
   # Instalar Tailwind CSS
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init

   # Instalar ESLint y Prettier
   npm install -D eslint prettier eslint-config-prettier
   ```

### Desarrollo

1. Iniciar servidor de desarrollo:
```bash
ng serve
```
Navega a `http://localhost:4200/`

2. Para crear nuevos componentes:
```bash
ng generate component components/nombre-componente
```

## Flujo de Trabajo Git

1. Al iniciar una nueva funcionalidad:
```bash
git pull origin main             # Actualizar rama main local
git checkout -b feature/nombre   # Crear y cambiar a nueva rama
```

2. Antes de hacer push:
```bash
git pull origin main            # Actualizar con últimos cambios
git add .                       # Agregar cambios
git commit -m "descripción"     # Commit de cambios
git push origin feature/nombre  # Subir cambios a rama feature
```

3. Para crear Pull Request:
- Ir a GitHub
- Crear nuevo Pull Request desde tu rama feature hacia main
- Esperar revisión y aprobación

## Estructura del Proyecto

```
src/
├── app/
│   ├── core/                    # Capa de dominio
│   │   ├── domain/
│   │   │   └── models/         # Modelos de dominio
│   │   ├── use-cases/          # Casos de uso
│   │   ├── interfaces/         # Interfaces y contratos
│   │   └── services/           # Servicios de dominio
│   │
│   ├── data/                   # Capa de datos
│   │   ├── repositories/       # Implementaciones de repositorios
│   │   ├── datasources/        # Fuentes de datos
│   │   ├── mappers/           # Convertidores de datos
│   │   └── dto/               # Objetos de transferencia
│   │
│   ├── presentation/           # Capa de presentación
│   │   ├── pages/             # Páginas principales
│   │   ├── components/        # Componentes
│   │   └── shared/           
│   │       └── layout/        # Layouts compartidos
│   │
│   ├── infrastructure/         # Capa de infraestructura
│   │   ├── http/              # Servicios HTTP
│   │   ├── storage/           # Almacenamiento local
│   │   └── config/            # Configuraciones
│   │
│   └── shared/                # Recursos compartidos
│       ├── constants/         # Constantes
│       ├── utils/            # Utilidades
│       └── types/            # Tipos compartidos
```

## Scripts Disponibles

- `ng serve`: Inicia el servidor de desarrollo
- `ng build`: Compila el proyecto
- `ng test`: Ejecuta tests unitarios
- `ng lint`: Ejecuta el linter
- `ng e2e`: Ejecuta tests end-to-end

## Guías de Estilo

- Seguir [Angular Style Guide](https://angular.io/guide/styleguide)
- Usar TypeScript strict mode
- Documentar componentes y servicios principales
- Mantener tests unitarios actualizados

## Despliegue

Para construir la versión de producción:
```bash
ng build --configuration production
```

## Soporte

Para reportar problemas o sugerir mejoras, crear un issue en el repositorio.
