# Tarefas para Projeto CRM

## Autenticação e Redirecionamento
- [ ] Armazenar o token JWT no local storage ao fazer login.
- [ ] Redirecionar automaticamente para a página `/leads` após o login bem-sucedido.

## Modal de Cadastro de Lead
- [ ] Consultar os status de lead no banco de dados e disponibilizá-los para seleção no modal de cadastro.
- [ ] Renderizar os status disponíveis como opções no modal de cadastro de lead.
- [ ] Enviar os dados do lead juntamente com o status selecionado ao salvar o novo lead.

## Quadro Kanban
- [ ] **Decisão**: Definir se será necessário um botão para adicionar novos quadros de status ou se será deixado um padrão fixo.
- [ ] Criar o quadro Kanban com, no mínimo, 5 colunas para os diferentes status de leads.
- [ ] Permitir a atualização do status dos leads diretamente no Kanban:
  - Exemplo: Poder abrir um lead, alterar seu status e salvar a mudança.
- [ ] Implementar a funcionalidade para arrastar e soltar (drag-and-drop) os leads entre os quadros do Kanban (opcional, caso haja tempo).

## Observações
- Revisar a lógica de atualização de status para garantir que mudanças de estado sejam registradas corretamente no banco de dados.