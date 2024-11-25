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
- [x] Configurar um modal que será exibido ao clicar no botão, perguntando o nome do quadro.
- [x] Garantir que o quadro criado esteja associado exclusivamente ao pipeline em que foi adicionado, aparecendo apenas nesse pipeline.
- [ ] Renderizar os quadros (fases) criados na tela como colunas do Kanban.

---

## 3. Transferência do Modal de Cadastro de Leads para a Página Kanban
**Descrição**: Migrar o modal de cadastro de leads para dentro da página de visualização do Kanban. A criação de um novo lead deve estar associada obrigatoriamente a um quadro específico dentro de um pipeline.

### Requisitos
- [ ] Mover o modal de cadastro de leads para a página do Kanban.
- [ ] Configurar o cadastro de lead para ser associado exclusivamente ao quadro (pipeline phase) onde foi criado.
- [ ] Garantir que, ao cadastrar um novo lead, ele apareça apenas no quadro ao qual foi vinculado.

---

## 4. Renderização Dinâmica de Quadros no Kanban
**Descrição**: Implementar a renderização automática dos quadros (fases) criados na interface Kanban. Toda vez que uma nova fase for adicionada, ela deve aparecer como uma nova coluna no layout Kanban.

### Requisitos
- [ ] Garantir que, ao criar uma nova fase, ela seja exibida no layout Kanban sem necessidade de atualizar a página.
- [ ] Associar os leads a cada quadro específico.
- [ ] Configurar a interação entre leads e quadros no Kanban.

---

## 5. Melhorias de Navegação e Interface
**Descrição**: Implementar melhorias na navegação e na interface para tornar a experiência mais fluida e informativa.

### Requisitos
- [x] Na página inicial, não exibir o botão "Criar Fase".
- [x] Ao selecionar um pipeline específico, passar a referência por meio de query params na URL.
- [x] Atualizar o título da página com o nome do pipeline selecionado (exemplo: "CRM - GWD").
- [ ] Na página inicial do Kanban, garantir que as informações carreguem corretamente ao selecionar um pipeline.
- [x] Transferir todo o Header para um componente e renderizar ele no vue app
- [x] Redirecionar usuario para rota /login caso não esteja autenticado
- [ ] melhorar a parte estetica
- [ ] Separar todos os componentes diferentes arquivos e apenas chamar os mesmos da pagina
- [ ]
### MainPage Kanban  
- [x] Renderizar todos os workspaces (pipelines) como quadros visuais.  
- [x] Permitir que o usuário selecione um workspace clicando no quadro correspondente.  
- [x] Após a seleção, carregar ou redirecionar para os dados do workspace escolhido.  
- [ ] Melhorar a estetica dos quadros e adicionar algum fundo a aplicação

