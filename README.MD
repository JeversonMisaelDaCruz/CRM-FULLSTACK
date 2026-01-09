# CRM Kanban - Lista de Tarefas

## 1. Filtragem de Leads por Pipeline
**Descrição**: Implementar uma funcionalidade de filtragem de leads com base no pipeline ao qual eles pertencem. Dessa forma, os leads serão exibidos apenas no pipeline correspondente, de acordo com a associação deles.

### Requisitos
- [x] Adicionar um filtro automático que exiba os leads conforme o pipeline selecionado.
- [x] Garantir que os leads sejam associados de forma exclusiva ao pipeline correto.

---

## 2. Cadastro de Quadros (Pipeline Phases) Dinâmico
**Descrição**: Implementar uma funcionalidade que permita ao usuário criar quadros (ou fases) dinamicamente dentro de um pipeline específico. Cada quadro deve ser vinculado exclusivamente ao pipeline em que foi criado.

### Requisitos
- [x] Criar um botão para adicionar quadros (fases) dinamicamente.
- [x] Configurar um modal que será exibido ao clicar no botão, perguntando o nome do quadro (PhaseModal).
- [x] Garantir que o quadro criado esteja associado exclusivamente ao pipeline em que foi adicionado, aparecendo apenas nesse pipeline.
- [x] Renderizar os quadros (fases) criados na tela como colunas do Kanban (KanbanColumn component).
- [x] Atualização automática da interface ao criar nova fase.

---

## 3. Transferência do Modal de Cadastro de Leads para a Página Kanban
**Descrição**: Migrar o modal de cadastro de leads para dentro da página de visualização do Kanban. A criação de um novo lead deve estar associada obrigatoriamente a um quadro específico dentro de um pipeline.

### Requisitos
- [x] Mover o modal de cadastro de leads para a página do Kanban.
- [x] Configurar o cadastro de lead para ser associado exclusivamente ao quadro (pipeline phase) onde foi criado via preselectedPhaseId.
- [x] Garantir que, ao cadastrar um novo lead, ele apareça apenas no quadro ao qual foi vinculado.
- [x] Implementar botão de adicionar lead em cada coluna do Kanban.

---

## 4. Renderização Dinâmica de Quadros no Kanban
**Descrição**: Implementar a renderização automática dos quadros (fases) criados na interface Kanban. Toda vez que uma nova fase for adicionada, ela deve aparecer como uma nova coluna no layout Kanban.

### Requisitos
- [x] Garantir que, ao criar uma nova fase, ela seja exibida no layout Kanban sem necessidade de atualizar a página.
- [x] Associar os leads a cada quadro específico.
- [x] Configurar a interação entre leads e quadros no Kanban.
- [x] Implementar componentes modulares (KanbanColumn, LeadCard).
- [x] Adicionar overlay de loading durante carregamento de dados.

---

## 5. Melhorias de Navegação e Interface
**Descrição**: Implementar melhorias na navegação e na interface para tornar a experiência mais fluida e informativa.

### Requisitos
- [x] Na página inicial, não exibir o botão "Criar Fase".
- [x] Ao selecionar um pipeline específico, passar a referência por meio de query params na URL.
- [x] Atualizar o título da página com o nome do pipeline selecionado (exemplo: "CRM - GWD").
- [x] Na página inicial do Kanban, garantir que as informações carreguem corretamente ao selecionar um pipeline.
- [x] Transferir todo o Header para um componente e renderizar ele no vue app.
- [x] Redirecionar usuario para rota /login caso não esteja autenticado.
- [x] Separar todos os componentes em diferentes arquivos (KanbanColumn.vue, LeadCard.vue, PhaseModal.vue).
- [x] Implementar feedback visual com overlay de loading.
- [ ] Melhorar a parte estética geral da aplicação.

### MainPage Kanban
- [x] Renderizar todos os workspaces (pipelines) como quadros visuais.
- [x] Permitir que o usuário selecione um workspace clicando no quadro correspondente.
- [x] Após a seleção, carregar ou redirecionar para os dados do workspace escolhido.
- [ ] Melhorar a estética dos quadros e adicionar algum fundo à aplicação.

---

## 6. Segurança e Autenticação
**Descrição**: Implementar camadas de segurança e validações para proteger a aplicação e garantir que apenas usuários autenticados tenham acesso aos recursos.

### Requisitos Backend
- [x] Adicionar AuthGuard em todas as rotas de deals (GET, POST, PATCH, DELETE).
- [x] Adicionar AuthGuard em todas as rotas de deal_events.
- [x] Adicionar AuthGuard em todas as rotas de pipeline_phases.
- [x] Configurar criptografia com variável de ambiente (ENCRYPTION_KEY).
- [x] Refatorar EncryptIdentifierInterceptor para usar ConfigService.
- [x] Corrigir relacionamentos no repositório de deals (includes de lead, user, pipeline_phase, comments, events).
- [x] Melhorar validações nos repositórios e serviços.

### Requisitos Frontend
- [x] Implementar validação de expiração de token JWT.
- [x] Decodificar token e verificar timestamp antes de cada requisição.
- [x] Redirecionar automaticamente para /login quando token expirar ou for inválido.
- [x] Implementar logout automático em caso de sessão expirada.

---

## 7. Próximas Funcionalidades

### Funcionalidades Pendentes
- [ ] Implementar drag-and-drop de leads entre colunas do Kanban.
- [ ] Adicionar edição inline de leads nos cards.
- [ ] Implementar sistema de comentários em leads.
- [ ] Adicionar histórico de atividades (timeline) em cada lead.
- [ ] Criar dashboard com métricas e estatísticas dos pipelines.
- [ ] Implementar sistema de notificações em tempo real.
- [ ] Adicionar filtros avançados (por data, usuário responsável, status).
- [ ] Implementar busca global de leads.
- [ ] Criar sistema de permissões e roles (admin, usuário, visualizador).
- [ ] Adicionar exportação de dados (CSV, PDF).
- [ ] Implementar temas (dark mode, light mode).
- [ ] Adicionar internacionalização (i18n) para múltiplos idiomas.

### Melhorias Técnicas
- [ ] Implementar testes unitários (Jest/Vitest) no frontend.
- [ ] Adicionar testes E2E (Cypress/Playwright).
- [ ] Implementar testes unitários no backend (Jest).
- [ ] Configurar CI/CD pipeline.
- [ ] Adicionar documentação da API (Swagger/OpenAPI).
- [ ] Implementar rate limiting nas rotas da API.
- [ ] Configurar logs estruturados.
- [ ] Implementar cache Redis para otimização.
- [ ] Adicionar monitoramento de performance (APM).
- [ ] Configurar backup automático do banco de dados.

---

## Status do Projeto

### Última Atualização: Janeiro 2026

**Funcionalidades Principais Implementadas:**
- ✅ Sistema de autenticação e autorização
- ✅ Gerenciamento de pipelines e fases
- ✅ Kanban dinâmico com componentes modulares
- ✅ Cadastro e gerenciamento de leads
- ✅ Validação de token JWT com renovação automática
- ✅ Criptografia de identificadores sensíveis
- ✅ Interface responsiva com feedback visual

**Em Desenvolvimento:**
- 🔄 Melhorias de UX/UI e estética
- 🔄 Drag-and-drop de leads
- 🔄 Sistema de notificações

