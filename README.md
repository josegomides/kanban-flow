## Andamento do projeto

O Kanban Flow é feito apenas com HTML e CSS, sem JavaScript. A página tem um quadro de tarefas para cada grupo, com um menu de âncoras para ir até o quadro desejado, e um formulário de nova etapa com validação nativa do navegador. Cada cartão mostra o responsável e a prioridade (baixa, média ou alta).

Como não há JavaScript, as tarefas são escritas diretamente no `kanban.html`: para adicionar, mover ou remover uma tarefa, edite o cartão (`<li class="cartao">`) na coluna certa e atualize os contadores do grupo.

As próximas melhorias estão listadas abaixo. Vamos atualizar o andamento conforme cada uma for desenvolvida e integrada ao projeto.

## Próximas tarefas da equipe

### José Antônio — coordenação e melhorias do quadro
- [ ] Criar a busca por tarefas.
- [ ] Revisar a visualização do quadro em celulares.
- [ ] Integrar e revisar as alterações da equipe.

### Mateus Martins — acesso e cadastro
- [ ] Criar a tela inicial com as opções “Sou Aluno” e “Sou Professor”.
- [ ] Montar os formulários de identificação.
- [ ] Validar os campos obrigatórios e ajustar as telas para celulares e tablets.

### Yuri — edição e organização das tarefas
- [ ] Criar a opção de editar uma tarefa sem duplicar o cartão.
- [ ] Permitir escolher o responsável entre os alunos cadastrados.
- [ ] Mostrar avisos quando uma tarefa for criada, editada ou removida.