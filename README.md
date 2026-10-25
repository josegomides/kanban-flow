📋 Kanban Flow — Gestão de Trabalhos em Grupo

Plataforma web para organização de etapas, tarefas e entregas de trabalhos acadêmicos em equipe.

👥 Integrantes da Equipe

José Antônio (Líder Técnico / Responsável pela Base do Protótipo)

Mateus Martins

Yuri

📌 Histórico do Projeto e Desenvolvimento Inicial

Nota de autoria: Toda a arquitetura inicial, estrutura de dados, estilização responsiva e implementação das funcionalidades base descritas abaixo foram idealizadas e desenvolvidas integralmente por José Antônio.

✅ Funcionalidades já entregues por José Antônio:

Interface Base Semântica (kanban.html): Estrutura acessível com semântica HTML5, janelas de diálogo nativas (<dialog>), acessibilidade para leitores de tela e layout adaptado para dispositivos móveis.

Identidade Visual e Responsividade (style.css): Design system em CSS puro (variáveis CSS, flexbox e CSS grid), indicadores visuais de status, estados vazios e layout responsivo para smartphones e desktops.

Motor de Dados e Lógica de Negócios (script.js):

CRUD básico com criação e exclusão de tarefas em tempo real.

Persistência de dados local via localStorage.

Controle e alternância dinâmica entre grupos com filtros de tarefas.

Painel de métricas e contadores em tempo real (total de tarefas, a fazer, concluídas).

Verificação e formatação automática de prazos com destaque visual para entregas em atraso.

🚀 Próxima Etapa: Módulo de Acesso (Professor x Aluno)

Para evoluir o protótipo para um sistema acadêmico completo, a equipe implementará uma camada de identificação de perfis com cadastro de nome e matrícula, além de melhorias de usabilidade no quadro.

📋 Divisão de Tarefas e Passo a Passo (Backlog da Equipe)

Cada integrante será responsável por uma frente específica de desenvolvimento para complementar a base existente:

👤 1. José Antônio (Coordenação, Arquitetura e Fluxo de Autenticação)

[ ] Fluxo de Sessão e Estado Global:

Criar o modelo de dados de sessão no localStorage para persistir o usuário ativo (tipo: 'aluno' | 'professor', nome, matricula, grupoId).

Implementar a alternância entre a tela de boas-vindas/login e o painel principal do Kanban.

[ ] Cabeçalho de Sessão e Permissões:

Exibir no topo da página o perfil ativo (Ex.: "Conectado como: Prof. Carlos (Matrícula: 12345)").

Inserir botão de "Sair / Trocar de Perfil" que limpa a sessão ativa.

Regra de negócio: Se o usuário for Professor, liberar a visualização de todos os grupos; se for Aluno, fixar a visualização no seu respectivo grupo.

[ ] Code Review & Integração: Revisar e aprovar os pull requests dos colegas garantindo a integridade do código.

👤 2. Mateus Martins (Interface da Tela de Acesso e Modal de Cadastro)

[ ] Desenvolvimento da Tela de Boas-Vindas:

Criar a interface de seleção inicial no kanban.html com duas opções em destaque: "Sou Aluno" e "Sou Professor".

[ ] Formulário de Cadastro / Identificação:

Campos para Aluno: Nome completo, Matrícula institucional e seleção do Grupo ao qual pertence.

Campos para Professor: Nome completo e Matrícula/Registro funcional.

Validações de campos obrigatórios e máscaras básicas no formulário.

[ ] Estilização Visual (style.css):

Aplicar estilos coerentes com o padrão visual criado para botões, inputs, foco e transições da tela inicial.

Garantir responsividade total para celulares e tablets.

👤 3. Yuri (Evolução do Quadro: Edição de Tarefas e Atribuição Inteligente)

[ ] Edição de Tarefas Existentes (Update):

Adicionar o botão "Editar" em cada cartão de tarefa (criarCartao).

Reutilizar o modal <dialog id="janela-tarefa"> preenchendo os campos com as informações da tarefa selecionada.

Tratar a ação de salvar para atualizar a tarefa sem gerar duplicatas.

[ ] Integração do Responsável com Alunos Cadastrados:

Ajustar o campo "Responsável" no formulário de tarefa para sugerir o aluno atualmente logado ou listar os integrantes do grupo em um <select>.

[ ] Refinamento de Feedback ao Usuário:

Adicionar alertas visuais (toasts ou avisos acessíveis) ao cadastrar, editar ou remover tarefas do quadro.

🛠️ Tecnologias Utilizadas

HTML5: Marcação semântica e acessível (WAI-ARIA, tags nativas).

CSS3: Variáveis nativas, CSS Grid, Flexbox e Mobile-first.

JavaScript (ES6+): Manipulação de DOM nativa, eventos, persistência com Web Storage API (localStorage).

💻 Como Rodar o Projeto Localmente

Clone o repositório:

git clone https://github.com/SEU-USUARIO/kanban-flow.git


Acesse a pasta do projeto:

cd kanban-flow


Abra o arquivo kanban.html diretamente em seu navegador ou utilize a extensão Live Server no VS Code.

🌿 Padrão de Commits e Branches

Para manter a organização do repositório, utilize o seguinte fluxo de branches:

main: Versão estável do projeto.

feature/auth-perfis: Tarefas do Mateus e José Antônio (tela de login e autenticação).

feature/edicao-tarefas: Tarefas do Yuri (edição de tarefas e refinamentos).
