# **CRM Fullstack - Documentação do Banco de Dados**

---

## **Índice**

1. [Visão Geral](#visão-geral)
2. [Schema Prisma](#schema-prisma)
3. [Modelos Principais](#modelos-principais)
   - [User](#user)
   - [Token](#token)
   - [Pipeline & Pipeline_Phase](#pipeline--pipeline_phase)
   - [Pipeline_User (Tabela de Junção)](#pipeline_user-tabela-de-junção)
   - [Lead](#lead)
   - [Deal](#deal)
   - [DealEvent](#dealevent)
   - [DealComment](#dealcomment)
4. [Enumerações (Enums)](#enumerações-enums)
5. [Relacionamentos Entre Tabelas](#relacionamentos-entre-tabelas)
6. [Fluxo de Dados (Lead → Deal)](#fluxo-de-dados-lead--deal)
7. [Considerações Finais](#considerações-finais)

---

## **Visão Geral**

O objetivo deste schema de banco de dados é oferecer uma solução completa para gerenciar:

- **Usuários** e suas autenticações.
- **Leads** (potenciais clientes).
- **Pipelines** (funis de vendas) e **fases** (etapas do funil).
- **Negociações (Deals)** associadas aos leads, com eventos e comentários.

A arquitetura proposta permite que cada usuário tenha acesso controlado aos pipelines em que participa, registre leads nas diferentes fases e acompanhe negociações por meio de eventos e comentários.

---

## **Schema Prisma**

A seguir está o conteúdo do arquivo `schema.prisma` (simplificado), que pode ser usado em projetos com Prisma. Ele inclui todos os modelos e relacionamentos necessários:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id          String          @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid()
  created_at  DateTime        @default(now())
  updated_at  DateTime        @default(now()) @updatedAt
  name        String          @db.VarChar(100)
  identifier  String          @unique @db.VarChar(12)
  email       String          @unique @db.VarChar(60)
  password    String          @db.VarChar(200)
  leads       Lead[]
  tokens      Token[]
  pipelines   Pipeline_User[]
  Deal        Deal[]
  DealComment DealComment[]
  DealEvent   DealEvent[]

  @@map("users")
}

model Token {
  id           String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid()
  created_at   DateTime @default(now())
  updated_at   DateTime @default(now()) @updatedAt
  access_token String
  is_revoked   Boolean  @default(false)
  type         String   @default("login")
  user         User?    @relation(fields: [user_id], references: [id], onDelete: SetNull)
  user_id      String?  @db.Uuid()

  @@map("tokens")
}

model Pipeline {
  id         String           @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid()
  name       String           @db.VarChar(100)
  created_at DateTime         @default(now())
  updated_at DateTime         @default(now()) @updatedAt
  phases     Pipeline_Phase[]
  users      Pipeline_User[]

  @@map("pipelines")
}

model Pipeline_User {
  id          String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid()
  created_at  DateTime @default(now())
  updated_at  DateTime @default(now()) @updatedAt
  user_id     String   @db.Uuid()
  pipeline_id String   @db.Uuid()

  user     User     @relation(fields: [user_id], references: [id], onDelete: Cascade)
  pipeline Pipeline @relation(fields: [pipeline_id], references: [id], onDelete: Cascade)

  @@unique([user_id, pipeline_id])
  @@map("pipeline_users")
}

model Pipeline_Phase {
  id          String    @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid()
  created_at  DateTime  @default(now())
  updated_at  DateTime  @default(now()) @updatedAt
  name        String    @db.VarChar(100)
  pipeline    Pipeline? @relation(fields: [pipeline_id], references: [id], onDelete: SetNull)
  pipeline_id String?   @db.Uuid()
  leads       Lead[]
  Deal        Deal[]

  @@map("pipeline_phases")
}

model Lead {
  id                String          @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid()
  created_at        DateTime        @default(now())
  updated_at        DateTime        @default(now()) @updatedAt
  name              String          @db.VarChar(100)
  phone             String          @db.VarChar(20)
  email             String          @db.VarChar(60)
  user              User?           @relation(fields: [user_id], references: [id], onDelete: SetNull)
  user_id           String?         @db.Uuid()
  pipeline_phase    Pipeline_Phase? @relation(fields: [pipeline_phase_id], references: [id], onDelete: SetNull)
  pipeline_phase_id String?         @db.Uuid()
  deal              Deal[]

  @@map("leads")
}

//Nos cadastramos o lead que é contato do cliente; este contato pode ter várias negociações
//Portanto criamos a tabela Deal. As subtabelas DealEvent e DealComment são para registrar
//eventos associados à negociação e comentários feitos pelo usuário.

model Deal {
  id                String          @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid()
  created_at        DateTime        @default(now())
  updated_at        DateTime        @default(now()) @updatedAt
  title             String          @db.Text()
  description       String          @db.Text()
  status            DealStatus      @default(pending)
  archived          Boolean         @default(false)
  due_date          DateTime?
  user              User?           @relation(fields: [user_id], references: [id], onDelete: SetNull)
  user_id           String?         @db.Uuid()
  pipeline_phase    Pipeline_Phase? @relation(fields: [pipeline_phase_id], references: [id], onDelete: SetNull)
  pipeline_phase_id String?         @db.Uuid()
  lead_id           String?         @db.Uuid()
  lead              Lead?           @relation(fields: [lead_id], references: [id], onDelete: SetNull)
  comments          DealComment[]
  events            DealEvent[]

  @@map("deals")
}

enum DealStatus {
  go
  nogo
  pending
}

model DealEvent {
  id         String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid()
  created_at DateTime @default(now())
  updated_at DateTime @default(now()) @updatedAt
  message    String   @db.Text()
  date       DateTime
  done       Boolean  @default(false)
  deal       Deal?    @relation(fields: [deal_id], references: [id], onDelete: SetNull)
  deal_id    String?  @db.Uuid()
  user       User?    @relation(fields: [user_id], references: [id], onDelete: SetNull)
  user_id    String?  @db.Uuid()
}

model DealComment {
  id         String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid()
  created_at DateTime @default(now())
  updated_at DateTime @default(now()) @updatedAt
  content    String   @db.Text()
  user       User?    @relation(fields: [user_id], references: [id], onDelete: SetNull)
  user_id    String?  @db.Uuid()
  deal       Deal?    @relation(fields: [deal_id], references: [id], onDelete: SetNull)
  deal_id    String?  @db.Uuid()
}

Modelos Principais

User
	•	Tabela: users
	•	Campos:
	•	id: String @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid()
Identificador único do usuário (UUID).
	•	created_at / updated_at: Datas de criação e atualização do registro.
	•	name: Nome do usuário (máx. 100 chars).
	•	identifier: Uma string única, com 12 chars (ex.: CPF truncado, matrícula).
	•	email: E-mail único do usuário.
	•	password: Senha (hash) do usuário.
	•	Relacionamentos:
	•	leads: Um usuário pode ter vários leads.
	•	tokens: Um usuário pode ter vários tokens.
	•	pipelines: Relacionamento N:N via Pipeline_User.
	•	Deal: Negociações criadas ou associadas ao usuário.
	•	DealComment & DealEvent: Comentários e eventos feitos pelo usuário.

Token
	•	Tabela: tokens
	•	Campos:
	•	id: Identificador único (UUID).
	•	access_token: Token em si (string).
	•	is_revoked: Indica se o token já foi invalidado.
	•	type: Tipo do token (ex.: “login”).
	•	Relacionamentos:
	•	user: Relacionamento opcional com User (um usuário pode ter vários tokens).

Pipeline & Pipeline_Phase

Pipeline
	•	Tabela: pipelines
	•	Campos: id, name, created_at, updated_at.
	•	Relacionamentos:
	•	phases: Um pipeline pode ter muitas fases (Pipeline_Phase).
	•	users: Relacionamento N:N com User via Pipeline_User.

Pipeline_Phase
	•	Tabela: pipeline_phases
	•	Campos: id, name, created_at, updated_at.
	•	Relacionamentos:
	•	pipeline: Cada fase pertence a um pipeline (opcional se for excluído, onDelete: SetNull).
	•	leads: Uma fase pode ter vários leads.
	•	Deal: Uma fase pode ter várias negociações (Deals).

Pipeline_User (Tabela de Junção)
	•	Tabela: pipeline_users
	•	Campos: id, user_id, pipeline_id.
	•	Finalidade: Relacionamento N:N entre User e Pipeline.
Cada registro em pipeline_users indica que um usuário participa de determinado pipeline.

Lead
	•	Tabela: leads
	•	Campos:
	•	id: UUID.
	•	name: Nome do lead (máx. 100 chars).
	•	phone: Telefone do lead (máx. 20 chars).
	•	email: E-mail do lead (máx. 60 chars).
	•	Relacionamentos:
	•	user: O lead pode ter sido criado ou capturado por um usuário específico.
	•	pipeline_phase: O lead pode estar em uma fase específica do pipeline.
	•	deal: Várias negociações podem estar associadas a esse lead.

Deal
	•	Tabela: deals
	•	Campos:
	•	id: UUID.
	•	title & description: Informações textuais sobre a negociação.
	•	status: Usa o enum DealStatus (go, nogo, pending).
	•	archived: Indica se a negociação foi arquivada (boolean).
	•	due_date: Data limite ou prevista para concluir a negociação.
	•	Relacionamentos:
	•	user: O usuário responsável ou dono dessa negociação.
	•	pipeline_phase: A fase do pipeline em que a negociação se encontra.
	•	lead: Lead associado a essa negociação.
	•	comments: Comentários (DealComment).
	•	events: Eventos (DealEvent) associados à negociação.

DealEvent
	•	Tabela: deal_events
	•	Campos:
	•	id: UUID.
	•	message: Descrição do evento (texto).
	•	date: Data do evento (DateTime).
	•	done: Indica se o evento foi concluído (boolean).
	•	Relacionamentos:
	•	deal: Negociação à qual o evento se refere.
	•	user: Usuário que criou o evento (opcional).

DealComment
	•	Tabela: deal_comments
	•	Campos:
	•	id: UUID.
	•	content: Texto do comentário.
	•	Relacionamentos:
	•	user: Usuário que fez o comentário (opcional).
	•	deal: Negociação à qual o comentário se refere.

Enumerações (Enums)

DealStatus

Enum criado para gerenciar o status de uma negociação:

enum DealStatus {
  go      // Negociação concluída com sucesso
  nogo    // Negociação concluída sem sucesso
  pending // Negociação em aberto
}

Relacionamentos Entre Tabelas
	1.	User ↔ Lead
	•	1:N — Um usuário pode ter vários leads. Um lead só pode ter (opcionalmente) um usuário.
	2.	User ↔ Pipeline
	•	N:N — Vários usuários podem participar do mesmo pipeline, e um usuário pode participar de vários pipelines, via tabela Pipeline_User.
	3.	Pipeline ↔ Pipeline_Phase
	•	1:N — Um pipeline pode ter várias fases; cada fase pertence a um pipeline.
	4.	Pipeline_Phase ↔ Lead
	•	1:N — Uma fase pode ter vários leads; um lead está em uma única fase (opcionalmente).
	5.	Pipeline_Phase ↔ Deal
	•	1:N — Uma fase pode ter várias negociações; uma negociação está vinculada a uma única fase (opcionalmente).
	6.	Lead ↔ Deal
	•	1:N — Um lead pode ter várias negociações (Deals); uma negociação está atrelada a um único lead (opcionalmente).
	7.	Deal ↔ DealEvent / DealComment
	•	1:N — Cada negociação pode ter vários eventos e comentários; cada evento/comentário se refere a apenas uma negociação.
	8.	User ↔ DealEvent / DealComment
	•	1:N (opcional) — Um usuário pode criar vários comentários ou eventos, mas cada comentário/evento pertence a um único usuário.

Fluxo de Dados (Lead → Deal)
	1.	Cadastro do Lead
Um usuário cria um Lead com dados de contato (nome, telefone, e-mail) e o associa a uma fase do pipeline.
	2.	Conversão em Negociação (Deal)
Quando há interesse em avançar com o lead, cria-se uma Deal (negociação).
	•	A Deal é vinculada ao Lead e a uma fase do pipeline (Pipeline_Phase).
	•	Define-se um status inicial (pending).
	3.	Eventos / Comentários
Durante a negociação, podem ser registrados DealEvents (ex.: “Proposta enviada”, “Reunião realizada”) e DealComments (observações gerais).
	4.	Finalização da Negociação
O campo status pode ser alterado para go (ganho) ou nogo (perdido). Em seguida, a negociação pode ser arquivada (archived = true) se necessário.

Considerações Finais
	•	Enums: Para status (go, nogo, pending), o uso de enum facilita a manutenção e a validação.
	•	Validações de Campo: É recomendável implementar validações em nível de aplicação (ex.: usando class-validator no NestJS) para limitar tamanho de texto (title, description, content) ou usar @db.VarChar() com tamanho determinado.
	•	Soft Delete ou Exclusão Real? Se desejar apenas marcar um registro como inativo ou excluído, considere uma coluna is_deleted ao invés de remover efetivamente o registro do banco.
	•	Boas Práticas de Segurança: Tokens devem ser armazenados de forma segura e as senhas do usuário devem ser hash + salt (ex.: bcrypt, argon2).



```
