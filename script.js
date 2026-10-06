const input = document.getElementById("novaTarefa");
const botaoAdicionar = document.getElementById("adicionar");
const lista = document.getElementById("lista");
const aviso = document.getElementById("aviso");

function adicionarTarefa() {
  const texto = input.value.trim();

  if (texto === "") {
    aviso.textContent = "Digite uma tarefa antes de adicionar.";
    return;
  }

  aviso.textContent = "";

  const item = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = texto;

  const botaoConcluir = document.createElement("button");
  botaoConcluir.textContent = "✓";
  botaoConcluir.addEventListener("click", () => {
    item.classList.toggle("concluida");
  });

  const botaoEditar = document.createElement("button");
  botaoEditar.textContent = "✎";
  botaoEditar.className = "btn-editar";
  botaoEditar.addEventListener("click", () => {
    if (!span.isContentEditable) {
      span.dataset.textoAnterior = span.textContent;
    }
    editarTarefa(span, botaoEditar);
  });

  const botaoExcluir = document.createElement("button");
  botaoExcluir.textContent = "✕";
  botaoExcluir.addEventListener("click", () => {
    item.remove();
  });

  item.appendChild(span);
  item.appendChild(botaoConcluir);
  item.appendChild(botaoEditar);
  item.appendChild(botaoExcluir);
  lista.appendChild(item);

  input.value = "";
  input.focus();
}

function editarTarefa(span, botaoEditar) {
  const editando = span.isContentEditable;

  if (!editando) {
    span.contentEditable = "true";
    span.focus();
    posicionarCursorNoFinal(span);
    botaoEditar.textContent = "💾";
  } else {
    const novoTexto = span.textContent.trim();

    if (novoTexto === "") {
      span.textContent = span.dataset.textoAnterior || "Tarefa";
    }

    span.contentEditable = "false";
    botaoEditar.textContent = "✎";
  }
}

function posicionarCursorNoFinal(elemento) {
  const intervalo = document.createRange();
  intervalo.selectNodeContents(elemento);
  intervalo.collapse(false);
  const selecao = window.getSelection();
  selecao.removeAllRanges();
  selecao.addRange(intervalo);
}

botaoAdicionar.addEventListener("click", adicionarTarefa);

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") adicionarTarefa();
});
