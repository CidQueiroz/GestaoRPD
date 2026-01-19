# GestaoRPD - Trello Board

## 📋 Épicos (Epics)

- [X] **Módulo de Autenticação e Usuários**: Gerenciamento completo do ciclo de vida do usuário.
- [ ] **Módulo de Produtividade Pessoal**: Ferramentas para desenvolvimento pessoal e acompanhamento de hábitos.
- [ ] **Módulo de Gestão Simplificada**: Ferramentas para controle de vendas e estoque para pequenos empreendedores.
- [X] **Infraestrutura e Deploy**: Configuração de ambiente e pipelines de CI/CD.

## Backend (API Django)

### Lista de Tarefas (To-Do)
- [ ] **Models**: Revisar e adicionar validações nos modelos.
- [ ] **Serializers**: Otimizar serializadores para performance.
- [ ] **Views**: Implementar filtros e ordenação genéricos.
- [ ] **Tests**: Aumentar a cobertura de testes para 90%.

### Em Andamento (In Progress)
- [ ] **Auth**: Refatorar o sistema de autenticação para usar `simple-jwt`. (Substituído por Firebase JIT)

### Concluído (Done)
- [X] **Setup**: Configuração inicial do projeto Django.
- [X] **Models**: Primeira versão dos modelos.
- [X] **Views**: Viewsets básicos para CRUD.
- [X] **Serializers**: Serializadores básicos para todos os modelos.
- [X] **URLs**: Rotas da API registradas no `DefaultRouter`.
- [X] **DB Oracle Connection**: Conexão do backend com Oracle Cloud Database estabelecida e funcional.
- [X] **Firebase JIT Provisioning**: Implementação de autenticação Firebase com provisionamento Just-in-Time de usuários no Django.
- [X] **Backend Pagination**: Implementação de paginação para `EstoqueViewSet`, `AtividadeViewSet`, `DiarioBordoViewSet`, `RPDViewSet`, `LogPODDiarioViewSet`.
- [X] **Static Files in Admin**: Configuração do servidor Django para servir arquivos estáticos do Admin em desenvolvimento.
- [X] **Admin Model Registration**: Registro de todos os modelos do app `api` na interface do Django Admin.
- [X] **Superuser Access**: Concessão de permissões de superusuário para `cdkteck@gmail.com`.
- [X] **Data Population**: Criação e execução do comando `popular_banco` para popular o BD Oracle.
- [X] **CI/CD Backend Staging**: Criação e configuração do `docker-compose.yml` e `deploy-staging-oci.yml` (trigger, secrets, `.env` remoto, Docker Compose no VM).
- [X] **CI/CD Backend Production**: Criação e configuração do `deploy-production-oci.yml` (gatilho manual, secrets, `.env` remoto, Docker Compose no VM).

## Frontend (React App)

### Lista de Tarefas (To-Do)
- [ ] **Componentes**: Criar componentes reutilizáveis (Button, Input, Card, etc.).
- [ ] **Estoque**: Implementar edição inline na tabela de estoque.
- [ ] **RPD**: Adicionar gráficos para visualização da evolução das emoções.
- [ ] **Dashboard**: Criar um dashboard mais interativo com gráficos.
- [ ] **Testes**: Configurar e escrever testes unitários e de integração.

### Em Andamento (In Progress)
- [ ] **Vendas**: Desenvolvimento da página de `RegistrarVendaPage`.

### Concluído (Done)
- [X] **Setup**: Configuração inicial do projeto React com Vite.
- [X] **Estrutura de Pastas**: Organização em `pages`, `components`, `context`, etc.
- [X] **Páginas**: Criação dos arquivos de página iniciais.
- [X] **Login Page**: Layout estático da página de login.
- [X] **Auth Context Refactor**: Refatoração de `AuthContext.jsx` e `api.js` para usar Firebase ID Token no backend.
- [X] **Estoque Page UI**: Implementação de tabela paginada e uso de componentes `cdkteiroz/cdkteck-ui` em `EstoquePage.jsx`.
- [X] **Atividades Page UI**: Implementação de tabela paginada e uso de componentes `cdkteiroz/cdkteck-ui` em `AtividadesPage.jsx`.
- [X] **Diário de Bordo Page UI**: Implementação de tabela paginada e uso de componentes `cdkteiroz/cdkteck-ui` em `DiarioBordoPage.jsx`.
- [X] **RPD Page UI**: Implementação de tabela paginada e uso de componentes `cdkteiroz/cdkteck-ui` em `RPDPage.jsx`.
- [X] **Log POD Diário Page UI**: Implementação de tabela paginada e uso de componentes `cdkteiroz/cdkteck-ui` em `LogPODDiarioPage.jsx`.

## 🐞 Bugs
- [ ] **Backend**: A venda de um item de estoque com quantidade insuficiente retorna um `ValidationError` genérico. O erro deveria ser mais específico e tratado no frontend.
- [ ] **Frontend**: Não há tratamento de erros para falhas de API.
- [X] **Frontend**: O diretório `components` contém um arquivo `curriculo.pdf` ao invés de componentes React. (Assumido como resolvido, pois não foi mais mencionado).