/*
 * Kanban Flow — lógica de interação do protótipo.
 * Os comentários explicam as partes principais para facilitar o aprendizado.
 */

// Identifica a versão e o nome usados para guardar os dados no navegador.
const CHAVE_DADOS = "kanban-flow-v1";

// Define as etapas disponíveis e os rótulos que aparecem na tela.
const ETAPAS = [
  { id: "fazer", nome: "A Fazer" },
  { id: "andamento", nome: "Em Andamento" },
  { id: "concluido", nome: "Concluído" }
];

// Cria cinco grupos iniciais de demonstração; os temas podem ser ajustados depois.
const gruposIniciais = Array.from({ length: 5 }, (_, indice) => ({
  id: `grupo-${indice + 1}`,
  nome: `Grupo ${indice + 1}`
}));

// Tarefas de exemplo ajudam a entender o funcionamento ao abrir a página.
const tarefasIniciais = [
{ id: "exemplo-1", grupoId: "grupo-1", titulo: "Pesquisar fontes confiáveis", descricao: "Encontrar materiais para começar o trabalho.", responsavel: "Ana", prazo: "", prioridade: "media", status: "fazer" },
{ id: "exemplo-2", grupoId: "grupo-1", titulo: "Organizar as ideias", descricao: "Separar os pontos principais para a apresentação.", responsavel: "Lucas", prazo: "", prioridade: "media", status: "andamento" },
{ id: "exemplo-3", grupoId: "grupo-2", titulo: "Definir as partes do trabalho", descricao: "Combinar as primeiras atividades entre os integrantes.", responsavel: "Marina", prazo: "", prioridade: "media", status: "fazer" }
];

// Carrega dados salvos; se for a primeira visita, usa os exemplos iniciais.
function carregarDados() {
  try {
    const dadosSalvos = localStorage.getItem(CHAVE_DADOS);
    if (!dadosSalvos) return { grupos: gruposIniciais, tarefas: tarefasIniciais };

    const dados = JSON.parse(dadosSalvos);
    // Confere o formato mínimo antes de usar conteúdo vindo do armazenamento.
    if (!Array.isArray(dados.grupos) || !Array.isArray(dados.tarefas)) {
      return { grupos: gruposIniciais, tarefas: tarefasIniciais };
    }
    return dados;
  } catch (erro) {
    // Se o navegador não puder ler os dados, a página continua com exemplos.
    console.warn("Não foi possível carregar os dados salvos.", erro);
    return { grupos: gruposIniciais, tarefas: tarefasIniciais };
  }
}

// Mantém os grupos e tarefas disponíveis durante o uso da página.
let dados = carregarDados();
let grupoAtualId = dados.grupos[0]?.id ?? "grupo-1";

// Guarda a seleção do grupo junto com as tarefas no armazenamento local.
function salvarDados() {
  try {
    localStorage.setItem(CHAVE_DADOS, JSON.stringify(dados));
  } catch (erro) {
    // A aplicação ainda funciona, mas sem persistência, se o armazenamento falhar.
    console.warn("Não foi possível salvar os dados neste navegador.", erro);
  }
}

// Localiza um elemento da página pelo seu identificador.
function elemento(id) {
  return document.getElementById(id);
}

// Insere texto com segurança, sem interpretar o conteúdo como HTML.
function adicionarTexto(pai, tag, texto, classe) {
  const filho = document.createElement(tag);
  if (classe) filho.className = classe;
  filho.textContent = texto;
  pai.append(filho);
  return filho;
}

// Cria as opções de grupo usando os dados atuais.
function desenharSeletorDeGrupos() {
  const seletor = elemento("seletor-grupo");
  seletor.replaceChildren();

  dados.grupos.forEach((grupo) => {
    const opcao = document.createElement("option");
    opcao.value = grupo.id;
    opcao.textContent = grupo.nome;
    opcao.selected = grupo.id === grupoAtualId;
    seletor.append(opcao);
  });
}

// Converte uma data no formato AAAA-MM-DD para uma apresentação local legível.
function formatarPrazo(data) {
  if (!data) return "";
  const [ano, mes, dia] = data.split("-");
  return `${dia}/${mes}/${ano}`;
}

// Verifica se um prazo já passou sem marcar tarefas concluídas como atrasadas.
function prazoEstaAtrasado(tarefa) {
  if (!tarefa.prazo || tarefa.status === "concluido") return false;
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  const prazo = new Date(`${tarefa.prazo}T00:00:00`);
  return prazo < hoje;
}

// Monta o cartão de uma tarefa e suas opções de movimentação.
function criarCartao(tarefa) {
  const cartao = document.createElement("li");
  cartao.className = "cartao";

  adicionarTexto(cartao, "h3", tarefa.titulo);
  if (tarefa.descricao) adicionarTexto(cartao, "p", tarefa.descricao, "cartao__descricao");

  // Exibe responsável, prazo e prioridade somente quando foram informados.
  if (tarefa.responsavel || tarefa.prazo || tarefa.prioridade) {
    const detalhes = document.createElement("div");
    detalhes.className = "cartao__detalhes";

    if (tarefa.responsavel) {
      adicionarTexto(detalhes, "span", tarefa.responsavel, "cartao__responsavel");
    }

    if (tarefa.prazo) {
      const prazo = adicionarTexto(detalhes, "span", formatarPrazo(tarefa.prazo), "cartao__prazo");
      if (prazoEstaAtrasado(tarefa)) prazo.classList.add("cartao__prazo--atrasado");
    }

    if (tarefa.prioridade) {
      adicionarTexto(detalhes, "span", `Prioridade: ${tarefa.prioridade}`, "cartao__prioridade");
    }

    cartao.append(detalhes);
  }

  // O menu permite mudar a tarefa de coluna sem arrastar o cartão.
  const rodape = document.createElement("div");
  rodape.className = "cartao__rodape";
  const seletorStatus = document.createElement("select");
  seletorStatus.className = "cartao__status";
  seletorStatus.setAttribute("aria-label", `Mover ${tarefa.titulo} para outra etapa`);
  ETAPAS.forEach((etapa) => {
    const opcao = document.createElement("option");
    opcao.value = etapa.id;
    opcao.textContent = `Mover para: ${etapa.nome}`;
    opcao.selected = tarefa.status === etapa.id;
    seletorStatus.append(opcao);
  });
  seletorStatus.addEventListener("change", () => {
    tarefa.status = seletorStatus.value;
    salvarDados();
    desenharQuadro();
  });

  // Permite remover uma tarefa, pedindo confirmação antes.
  const botaoExcluir = document.createElement("button");
  botaoExcluir.type = "button";
  botaoExcluir.className = "cartao__excluir";
  botaoExcluir.textContent = "Excluir";
  botaoExcluir.addEventListener("click", () => {
    const confirmar = window.confirm(`Excluir a tarefa “${tarefa.titulo}”?`);
    if (!confirmar) return;
    dados.tarefas = dados.tarefas.filter((item) => item.id !== tarefa.id);
    salvarDados();
    desenharQuadro();
  });

  rodape.append(seletorStatus, botaoExcluir);
  cartao.append(rodape);
  return cartao;
}

// Atualiza os cartões, contadores e resumo apenas para o grupo escolhido.
function desenharQuadro() {
  const tarefasDoGrupo = dados.tarefas.filter((tarefa) => tarefa.grupoId === grupoAtualId);

  ETAPAS.forEach((etapa) => {
    const lista = elemento(`lista-${etapa.id}`);
    const tarefasDaEtapa = tarefasDoGrupo.filter((tarefa) => tarefa.status === etapa.id);
    lista.replaceChildren();
    elemento(`contador-${etapa.id}`).textContent = tarefasDaEtapa.length;

    if (tarefasDaEtapa.length === 0) {
      const vazio = document.createElement("li");
      vazio.className = "estado-vazio";
      vazio.textContent = "Nenhuma tarefa nesta etapa. Adicione uma nova ou mova uma tarefa para cá.";
      lista.append(vazio);
      return;
    }

    tarefasDaEtapa.forEach((tarefa) => lista.append(criarCartao(tarefa)));
  });

  elemento("total-tarefas").textContent = tarefasDoGrupo.length;
  elemento("tarefas-pendentes").textContent = tarefasDoGrupo.filter((tarefa) => tarefa.status === "fazer").length;
  elemento("tarefas-concluidas").textContent = tarefasDoGrupo.filter((tarefa) => tarefa.status === "concluido").length;
}

// Abre a janela de criação e posiciona o foco no primeiro campo.
function abrirFormulario() {
  elemento("janela-tarefa").showModal();
  elemento("titulo-tarefa").focus();
}

// Fecha a janela e limpa os dados digitados que não foram salvos.
function fecharFormulario() {
  elemento("janela-tarefa").close();
  elemento("formulario-tarefa").reset();
}

// Recebe os campos preenchidos e cria uma tarefa para o grupo selecionado.
elemento("formulario-tarefa").addEventListener("submit", (evento) => {
  evento.preventDefault();
  const formulario = new FormData(evento.currentTarget);
  const titulo = String(formulario.get("titulo") ?? "").trim();
  if (!titulo) return;

dados.tarefas.push({
  id: globalThis.crypto?.randomUUID?.() ?? `tarefa-${Date.now()}`,
  grupoId: grupoAtualId,
  titulo,
  descricao: String(formulario.get("descricao") ?? "").trim(),
  responsavel: String(formulario.get("responsavel") ?? "").trim(),
  prazo: String(formulario.get("prazo") ?? ""),
  prioridade: String(formulario.get("prioridade") ?? "media"),
  status: "fazer"
});
  salvarDados();
  desenharQuadro();
  fecharFormulario();
});

// Registra as ações dos botões e a troca de grupo.
elemento("abrir-formulario").addEventListener("click", abrirFormulario);
elemento("fechar-formulario").addEventListener("click", fecharFormulario);
elemento("cancelar-formulario").addEventListener("click", fecharFormulario);
elemento("seletor-grupo").addEventListener("change", (evento) => {
  grupoAtualId = evento.target.value;
  desenharQuadro();
});

// Desenha a tela inicial com o primeiro grupo e suas tarefas de exemplo.
desenharSeletorDeGrupos();
desenharQuadro();
