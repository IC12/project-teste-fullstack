# Projeto Teste Fullstack

Este projeto é um CRUD Fullstack que utiliza .NET ASP.NET C# no backend e Angular no frontend, além de conceitos de HTML e CSS.

## Estrutura do Projeto

O projeto é organizado na seguinte estrutura de pastas:
```
project-fullstack
│── Backend  (Projeto backend em .NET Web API)
│── Frontend (Projeto frontend em Angular)
│── project-teste-fullstack.sln (Solução do Visual Studio)
```

## Passo a Passo da Configuração

### 1. Configuração do Repositório
- Criação do repositório no GitHub e clonagem na máquina local.

### 2. Criação dos Projetos
- Criar o backend com Web API:
  ```sh
  dotnet new webapi -n Backend
  ```
- Criar o frontend com Angular:
  ```sh
  npx ng new Frontend
  ```
- O arquivo `project-teste-fullstack.sln` é criado para gerenciar múltiplos projetos na mesma solução do Visual Studio.

### 3. Tecnologias Utilizadas
- **Backend:** .NET 9.0
- **Frontend:** Angular 10.1.6

### 4. Instalação de Dependências
- No frontend, instalar dependências:
  ```sh
  npm install
  ```
- Se houver erro de `ExecutionPolicy` ao rodar o projeto, altere a política de execução:
  ```sh
  Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
  ```

### 5. Configuração do Backend
- Adicionar Swagger para documentação da API:
  ```sh
  dotnet add package Swashbuckle.AspNetCore
  ```
- Configurar Swagger no `Program.cs`.
- Configurar CORS no `Program.cs` para permitir requisições do frontend.
- Instalar Entity Framework Core:
  ```sh
  dotnet add package Microsoft.EntityFrameworkCore
  dotnet add package Microsoft.EntityFrameworkCore.InMemory
  ```
- Estrutura do backend baseada em Arquitetura de Camadas:
  - **Camada de API:** Controllers
  - **Modelos de Dados:** Models
  - **Regras de Negócio:** Services
  - **Camada de Acesso a Dados:** Repositories
  - **Contexto do Banco de Dados:** Data (banco em memória)

### 6. Configuração do Frontend
- Adicionar Angular Material:
  ```sh
  ng add @angular/material
  ```
- Configurar módulos do Angular Material no `app.module.ts`.
- Importar `HttpClientModule` no `app.module.ts` para consumir a API REST do backend.
- Criar a pasta `services` dentro de `app` para armazenar os serviços.
- Criar `api.service.ts` para centralizar as requisições HTTP e configurar a URL do backend.
- Utilizar o Prettier para formatação do código.
- Estilizar `app.component` com SCSS e HTML.
- Criar componentes `clientes` e `produtos`.

### 7. Testes de API com Postman
#### Clientes
- **GET** `http://localhost:5000/api/clientes`
- **GET** `http://localhost:5000/api/clientes/{id}`
- **POST** `http://localhost:5000/api/clientes`
- **PUT** `http://localhost:5000/api/clientes/{id}`
- **DELETE** `http://localhost:5000/api/clientes/{id}`

#### Produtos
- **GET** `http://localhost:5000/api/produtos`
- **GET** `http://localhost:5000/api/produtos/{id}`
- **POST** `http://localhost:5000/api/produtos`
- **PUT** `http://localhost:5000/api/produtos/{id}`
- **DELETE** `http://localhost:5000/api/produtos/{id}`

### 8. Execução do Projeto
- Rodar o backend:
  ```sh
  dotnet run
  ```
- Rodar o frontend:
  ```sh
  ng serve
  ```

### 9. Acesso ao Projeto
- Acessar a documentação das APIs via Swagger:
  ```
  http://localhost:5000
  ```
- Acessar o frontend:
  ```
  http://localhost:4300/
  ```

### 10. Funcionalidades do Projeto
- CRUD completo para **clientes** e **produtos**.
- Exibição de dados com `mat-table` do Angular Material, permitindo **filtro, ordenação e paginação**.
- Backend baseado em **Arquitetura de Camadas**.
- API REST integrada ao frontend.

