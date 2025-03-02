#!/bin/bash
 
# Estructura de carpetas principal adaptada a Clean Architecture

# Capa de dominio: 
mkdir -p src/app/core/{domain/models,use-cases,interfaces,services}

# Capa de datos:  
mkdir -p src/app/data/{repositories,datasources}

# Capa de presentación
mkdir -p src/app/presentation/{pages,components,shared}
mkdir -p src/app/presentation/shared/layout/{components,containers}

# Infraestructura
mkdir -p src/app/infrastructure/{http,storage,config}

# Recursos compartidos
mkdir -p src/app/shared/{constants,utils,types}

# Archivos .gitkeep para mantener la estructura en el repositorio
touch src/app/core/domain/.gitkeep
touch src/app/core/domain/domain-models/.gitkeep
touch src/app/core/use-cases/.gitkeep
touch src/app/core/interfaces/.gitkeep
touch src/app/core/services/.gitkeep
touch src/app/data/repositories/.gitkeep
touch src/app/data/datasources/.gitkeep
touch src/app/presentation/shared/layout/components/.gitkeep
touch src/app/presentation/shared/layout/containers/.gitkeep
touch src/app/presentation/pages/.gitkeep
touch src/app/presentation/components/.gitkeep
touch src/app/presentation/shared/.gitkeep
touch src/app/infrastructure/http/.gitkeep
touch src/app/infrastructure/storage/.gitkeep
touch src/app/infrastructure/config/.gitkeep
touch src/app/shared/constants/.gitkeep
touch src/app/shared/utils/.gitkeep
touch src/app/shared/types/.gitkeep



# permisos de ejecución al script
#chmod +x create-structure.sh