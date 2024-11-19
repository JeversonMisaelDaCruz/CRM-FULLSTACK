
---

# **Documentação**

## **Índice**

1. [Descrição do Projeto](#descrição-do-projeto)
2. [Tecnologias Utilizadas](#tecnologias-utilizadas)
3. [Estrutura de Diretórios](#estrutura-de-diretórios)
4. [Funcionalidades Implementadas](#funcionalidades-implementadas)
5. [Fluxo de Trabalho](#fluxo-de-trabalho)
6. [Guia de Instalação](#guia-de-instalação)
7. [Componentes Principais](#componentes-principais)
8. [APIs e Integração com Backend](#apis-e-integração-com-backend)
9. [Próximos Passos](#próximos-passos)

---

## **Descrição do Projeto**

Este projeto é um sistema de gerenciamento de relacionamento com clientes (CRM) com funcionalidade Kanban. Ele permite que os usuários:

- Criem e gerenciem pipelines.
- Adicionem fases (quadros) dinamicamente dentro dos pipelines.
- Gerenciem leads vinculados a cada fase de um pipeline.

O backend foi desenvolvido utilizando **NestJS** com **Prisma ORM** para interações com o banco de dados e **Jest** para testes automatizados.

---

## **Tecnologias Utilizadas**

### **Frontend**

- **Framework**: Vue.js
- **Biblioteca de Componentes**: Vuetify
- **Gerenciamento de Estado**: Pinia
- **Requisições HTTP**: Axios

### **Backend**

- **Framework**: NestJS
- **ORM**: Prisma
- **Banco de Dados**: PostgreSQL
- **Autenticação**: JWT
- **Testes**: Jest

---

## **Estrutura de Diretórios**

### **Frontend**

```
.
├── src
│   ├── components
│   │   ├── CreatePipelineModal.vue
│   │   ├── CreatePipelinePhaseModal.vue
│   │   └── LeadCard.vue
│   ├── views
│   │   └── Kanban.vue
│   ├── store
│   │   ├── pipeline.js
│   │   ├── pipelinesPhases.js
│   ├── services
│   │   ├── Http.js
│   │   ├── Pipeline.js
│   │   ├── PipelinePhase.js
│   │   └── API.js
│   ├── App.vue
│   ├── main.js
│   └── router.js
```

### **Backend**

```
.
├── src
│   ├── modules
│   │   ├── pipeline
│   │   │   ├── pipeline.controller.ts
│   │   │   ├── pipeline.service.ts
│   │   │   ├── pipeline.module.ts
│   │   │   └── dto
│   │   │       ├── create-pipeline.dto.ts
│   │   │       └── update-pipeline.dto.ts
│   │   ├── pipeline-phase
│   │   │   ├── pipeline-phase.controller.ts
│   │   │   ├── pipeline-phase.service.ts
│   │   │   ├── pipeline-phase.module.ts
│   │   │   └── dto
│   │   │       ├── create-pipeline-phase.dto.ts
│   │   │       └── update-pipeline-phase.dto.ts
│   ├── prisma
│   │   ├── prisma.module.ts
│   │   └── prisma.service.ts
│   ├── auth
│   │   ├── auth.module.ts
│   │   ├── auth.service.ts
│   │   ├── auth.controller.ts
│   │   └── strategies
│   │       └── jwt.strategy.ts
│   └── tests
│       ├── e2e
│       │   ├── pipeline.e2e-spec.ts
│       │   ├── pipeline-phase.e2e-spec.ts
│       └── unit
│           ├── pipeline.service.spec.ts
│           └── pipeline-phase.service.spec.ts
├── prisma
│   ├── schema.prisma
│   ├── migrations
├── .env
├── package.json
```

---

## **Funcionalidades Implementadas**

### 1. **Gerenciamento de Pipelines**

- Criação de pipelines.
- Visualização de pipelines na lista lateral.
- Seleção de um pipeline para exibir suas fases e leads associados.

### 2. **Cadastro de Fases (Pipeline Phases)**

- Criação dinâmica de fases dentro de um pipeline.
- Visualização das fases em um layout Kanban.

### 3. **Filtragem de Fases**

- As fases exibidas são filtradas automaticamente com base no pipeline selecionado.

### 4. **Modal de Cadastro**

- Modais para criar pipelines e fases, com validação de entrada.

### 5. **Testes Automatizados**

- **Unitários**: Testam a lógica dos serviços.
- **E2E**: Validam as integrações entre controladores e banco de dados.

---

## **Fluxo de Trabalho**

1. O usuário seleciona um pipeline na lista lateral.
2. As fases associadas ao pipeline selecionado são exibidas.
3. O botão "Criar Fase" só é exibido após a seleção de um pipeline.
4. Leads podem ser associados e visualizados em fases específicas.

---

## **Guia de Instalação**

### **Pré-requisitos**

- Node.js v16 ou superior.
- PostgreSQL.
- Gerenciador de pacotes (npm ou yarn).

### **Passos**

#### **Backend**

1. Clone o repositório:

   ```bash
   git clone <seu-repositorio-url>
   cd <diretorio-do-backend>
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure o arquivo `.env`:

   ```
   DATABASE_URL=postgresql://<user>:<password>@localhost:5432/<database>
   JWT_SECRET=your-secret-key
   ```

4. Execute as migrações do banco de dados:

   ```bash
   npx prisma migrate dev
   ```

5. Inicie o servidor:
   ```bash
   npm run start:dev
   ```

#### **Frontend**

1. Entre no diretório do frontend:

   ```bash
   cd <diretorio-do-frontend>
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

4. Acesse a aplicação em `http://localhost:3000`.

---

## **Componentes Principais**

### **Frontend**

1. **CreatePipelineModal.vue**: Modal para criar pipelines.
2. **CreatePipelinePhaseModal.vue**: Modal para criar fases (quadros) dentro de um pipeline.
3. **Kanban.vue**: Página principal do Kanban, com botões para gerenciar pipelines e fases.

### **Backend**

1. **Pipeline Module**: Gerencia pipelines.
2. **Pipeline Phase Module**: Gerencia fases de pipelines.
3. **Auth Module**: Gerencia autenticação e autorização.

---

## **APIs e Integração com Backend**

### **Endpoints Principais**

#### **Pipeline**

- **GET** `/pipeline`: Retorna todos os pipelines.
- **POST** `/pipeline`: Cria um novo pipeline.
- **PATCH** `/pipeline/:id`: Atualiza um pipeline existente.
- **DELETE** `/pipeline/:id`: Exclui um pipeline.

#### **Pipeline Phase**

- **GET** `/pipeline-phase`: Retorna todas as fases.
- **POST** `/pipeline-phase`: Cria uma nova fase.
- **PATCH** `/pipeline-phase/:id`: Atualiza uma fase existente.
- **DELETE** `/pipeline-phase/:id`: Exclui uma fase.

---

## **Próximos Passos**

1. Implementar cadastro e visualização de leads em fases específicas.
2. Adicionar testes E2E para validar a funcionalidade de leads.
3. Otimizar a UI para melhor experiência do usuário.

---

