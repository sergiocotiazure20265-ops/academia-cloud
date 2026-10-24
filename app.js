const cursos = [
  {
    nome: "Fundamentos de Azure",
    categoria: "Cloud",
    cargaHoraria: 16,
    descricao: "Storage, recursos e publicação de aplicações."
  },
  {
    nome: "Docker na prática",
    categoria: "DevOps",
    cargaHoraria: 20,
    descricao: "Containers, imagens, redes e volumes."
  },
  {
    nome: "JavaScript para Web",
    categoria: "Frontend",
    cargaHoraria: 24,
    descricao: "Eventos, manipulação do DOM e integração com APIs."
  },
  {
    nome: "APIs com ASP.NET",
    categoria: "Backend",
    cargaHoraria: 32,
    descricao: "Criação de APIs REST utilizando C#."
  }
];

const campoBusca = document.querySelector("#busca");
const listaCursos = document.querySelector("#lista-cursos");
const resultado = document.querySelector("#resultado");

function normalizar(texto) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function renderizarCursos() {
  const termo = normalizar(campoBusca.value.trim());

  const filtrados = cursos.filter((curso) => {
    const texto = [
      curso.nome,
      curso.categoria,
      curso.descricao
    ].join(" ");

    return normalizar(texto).includes(termo);
  });

  listaCursos.replaceChildren();

  for (const curso of filtrados) {
    const card = document.createElement("article");
    card.className = "card";

    const categoria = document.createElement("span");
    categoria.className = "categoria";
    categoria.textContent = curso.categoria;

    const titulo = document.createElement("h3");
    titulo.textContent = curso.nome;

    const descricao = document.createElement("p");
    descricao.textContent = curso.descricao;

    const cargaHoraria = document.createElement("p");
    cargaHoraria.className = "muted";
    cargaHoraria.textContent = `${curso.cargaHoraria} horas`;

    card.append(categoria, titulo, descricao, cargaHoraria);
    listaCursos.append(card);
  }

  resultado.textContent = filtrados.length === 0
    ? "Nenhum curso encontrado."
    : `${filtrados.length} curso(s) encontrado(s).`;
}

campoBusca.addEventListener("input", renderizarCursos);

renderizarCursos();