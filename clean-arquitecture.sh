#!/bin/bash

# estructura de carpetas principal
mkdir -p src/app/core/{domain,use-cases,interfaces,services}
mkdir -p src/app/data/{repositories,datasources,models}
mkdir -p src/app/presentation/{pages,components,shared}
mkdir -p src/app/presentation/shared/layout/{components,containers}
mkdir -p src/app/infrastructure/{http,storage,config}
mkdir -p src/app/shared/{constants,utils,types}


# archivos .gitkeep 
touch src/app/core/domain/.gitkeep
touch src/app/core/use-cases/.gitkeep
touch src/app/core/interfaces/.gitkeep
touch src/app/core/services/.gitkeep
touch src/app/data/repositories/.gitkeep
touch src/app/data/datasources/.gitkeep
touch src/app/data/models/.gitkeep
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