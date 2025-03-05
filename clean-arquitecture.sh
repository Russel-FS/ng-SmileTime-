#!/bin/bash
 
# Estructura de carpetas principal adaptada a Clean Architecture

# Capa de dominio (Core): Reglas de negocio independientes
mkdir -p src/app/core/{domain/models,use-cases,interfaces,services}

# Capa de datos: Implementación de las interfaces del dominio
mkdir -p src/app/data/{repositories,mappers,dto}

# Capa de infraestructura: Implementaciones técnicas concretas
mkdir -p src/app/infrastructure/{datasources,http,storage,config}

# Capa de presentación: UI y controladores
mkdir -p src/app/presentation/{pages,components,shared}
mkdir -p src/app/presentation/shared/layout/{components,containers}

# Recursos compartidos
mkdir -p src/app/shared/{constants,utils,types}

# Archivos .gitkeep para mantener carpetas vacías en Git
touch src/app/core/domain/models/.gitkeep
touch src/app/core/use-cases/.gitkeep
touch src/app/core/interfaces/.gitkeep
touch src/app/core/services/.gitkeep
touch src/app/data/repositories/.gitkeep
touch src/app/data/mappers/.gitkeep
touch src/app/data/dto/.gitkeep
touch src/app/infrastructure/datasources/.gitkeep
touch src/app/infrastructure/http/.gitkeep
touch src/app/infrastructure/storage/.gitkeep
touch src/app/infrastructure/config/.gitkeep
touch src/app/presentation/shared/layout/components/.gitkeep
touch src/app/presentation/shared/layout/containers/.gitkeep
touch src/app/presentation/pages/.gitkeep
touch src/app/presentation/components/.gitkeep
touch src/app/presentation/shared/.gitkeep
touch src/app/shared/constants/.gitkeep
touch src/app/shared/utils/.gitkeep
touch src/app/shared/types/.gitkeep

# Establecer permisos de ejecución
#chmod +x create-structure.sh