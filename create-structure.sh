#!/bin/bash

# Domain Layer
mkdir -p src/backend/Luftborn.Domain/{Entities,Common,Enums}

# Application Layer  
mkdir -p src/backend/Luftborn.Application/{DTOs,Interfaces,Services,Validators,Mapping}

# Infrastructure Layer
mkdir -p src/backend/Luftborn.Infrastructure/{Data,Repositories,Authentication,Migrations}

# API Layer
mkdir -p src/backend/Luftborn.Api/{Controllers,Middleware,Extensions}

# Tests
mkdir -p src/backend/Luftborn.Tests/{Unit,Integration}

# Frontend
mkdir -p src/frontend/src/{app,assets,styles}
mkdir -p src/frontend/src/app/{core,shared,features}
mkdir -p src/frontend/src/app/core/{services,guards,interceptors,models}
mkdir -p src/frontend/src/app/shared/{components,pipes,directives}
mkdir -p src/frontend/src/app/features/{products,auth,dashboard}

# Docker
mkdir -p docker

# Docs
mkdir -p docs

echo "Structure created successfully"
