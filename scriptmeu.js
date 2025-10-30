// =============================================================
//  EsToDoList - CRUD básico de tarefas
//  Autor: Assistente de Desenvolvimento Sênior (Adaptado)
//  Objetivo: Adaptar e aplicar padrões de Clean Code no projeto
// =============================================================

// -------------------------------
// 1. Selecionar os elementos da página
//     *IDs adaptados para o [MEU_HTML_INDIVIDUAL]*
// -------------------------------
const campoNovaTarefa = document.getElementById('nova-tarefa-input');
// O ID do botão é 'adicionar-tarefa-btn' no seu HTML
const botaoAdicionar = document.getElementById('adicionar-tarefa-btn'); 
const listaTarefas = document.getElementById('lista-de-tarefas');
const campoPesquisa = document.getElementById('pesquisa-input');
const seletorFiltro = document.getElementById('filtro-select');

// Array principal que armazenará todas as tarefas
let tarefas = [];

// -------------------------------
// 2. Carregar tarefas salvas no navegador (localStorage)
// -------------------------------
function carregarTarefasSalvas() {
    const tarefasSalvas = localStorage.getItem('tarefas');
    if (tarefasSalvas) {
        tarefas = JSON.parse(tarefasSalvas); // converte o texto salvo em array
        exibirTarefas(tarefas);
    }
}

// -------------------------------
// 3. Salvar as tarefas no navegador
// -------------------------------
function salvarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

// -------------------------------
// 4. Função para adicionar uma nova tarefa
// -------------------------------
function adicionarTarefa() {
    const texto = campoNovaTarefa.value.trim(); // remove espaços extras

    if (texto === '') {
        alert('Digite uma tarefa antes de adicionar!');
        return;
    }

    // Criamos um objeto representando a tarefa
    const novaTarefa = {
        id: Date.now(), // cria um número único com base no tempo atual
        texto: texto,
        concluida: false
    };

    // Adicionamos ao array e salvamos
    tarefas.push(novaTarefa);
    salvarTarefas();

    // Atualizamos a lista exibida
    // Filtramos as tarefas antes de exibir para manter a consistência com o filtro atual
    const tarefasFiltradas = aplicarFiltroEPesquisa();
    exibirTarefas(tarefasFiltradas);

    // Limpamos o campo de texto
    campoNovaTarefa.value = '';
}

// -------------------------------
// 5. Função para exibir as tarefas na tela
// -------------------------------
// -------------------------------
// 5. Função para exibir as tarefas na tela
// -------------------------------
function exibirTarefas(listaParaMostrar) {
    // Limpamos a lista antes de mostrar novamente
    listaTarefas.innerHTML = '';

    for (let tarefa of listaParaMostrar) {
        // Criar um elemento <li> para cada tarefa
        const item = document.createElement('li');
        // Classes do container <li>
        item.className = 'flex justify-between items-center p-3 border border-gray-300 hover:bg-gray-100 dark:bg-zinc-700 dark:hover:bg-zinc-500 rounded-lg shadow-sm cursor-pointer transition duration-150 ease-in-out';
        item.onclick = function() { 
            alternarConclusao(tarefa.id);
        };

        // Criar um span para o texto da tarefa
        const textoTarefa = document.createElement('span');
        textoTarefa.textContent = tarefa.texto;
        // Classes base do texto
        textoTarefa.className = 'tarefa-texto flex-grow text-zinc-700 dark:text-lime-100'; 
        
        // === MUDANÇA AQUI: Aplicando classes Tailwind para concluído ===
        if (tarefa.concluida) {
            // 1. Risca o texto
            textoTarefa.classList.add('line-through'); 
            // 2. Diminui a cor e a opacidade (para simular a inatividade)
            textoTarefa.classList.remove('text-zinc-700', 'dark:text-lime-100');
            textoTarefa.classList.add('text-gray-400', 'dark:text-gray-400');
            // 3. Opcional: Escurece um pouco o background do item para distinção
            item.classList.add('opacity-70', 'hover:opacity-100', 'dark:opacity-70', 'dark:hover:opacity-100');
        } else {
            // Garante que as classes de concluído sejam removidas
            textoTarefa.classList.remove('line-through', 'text-gray-400', 'dark:text-gray-400');
            textoTarefa.classList.add('text-zinc-700', 'dark:text-lime-100');
            item.classList.remove('opacity-70', 'hover:opacity-100', 'dark:opacity-70', 'dark:hover:opacity-100');
        }
        // ===============================================================

        // Criar o container dos botões (sem alterações)
        const botoes = document.createElement('div');
        botoes.className = 'flex space-x-2';

        const botaoEditar = document.createElement('button');
        botaoEditar.textContent = '✏️';
        botaoEditar.className = 'ml-2 p-1 text-yellow-600 hover:text-yellow-400 transition';
        botaoEditar.onclick = function (e) {
            e.stopPropagation(); 
            editarTarefa(tarefa.id);
        };

        const botaoExcluir = document.createElement('button');
        botaoExcluir.textContent = '🗑️';
        botaoExcluir.className = 'p-1 text-red-600 hover:text-red-400 transition';
        botaoExcluir.onclick = function (e) {
            e.stopPropagation();
            excluirTarefa(tarefa.id);
        };

        // Montamos o elemento completo
        botoes.appendChild(botaoEditar);
        botoes.appendChild(botaoExcluir);
        item.appendChild(textoTarefa);
        item.appendChild(botoes);
        listaTarefas.appendChild(item);
    }
}

// -------------------------------
// 6. Função para alternar entre concluída e ativa
// -------------------------------
function alternarConclusao(id) {
    for (let tarefa of tarefas) {
        if (tarefa.id === id) {
            tarefa.concluida = !tarefa.concluida;
            break; // Otimização: para o loop assim que encontrar
        }
    }
    salvarTarefas();
    // Mantemos o filtro e pesquisa ao alternar
    const tarefasFiltradas = aplicarFiltroEPesquisa();
    exibirTarefas(tarefasFiltradas);
}

// -------------------------------
// 7. Função para editar o texto de uma tarefa
// -------------------------------
function editarTarefa(id) {
    const tarefaParaEditar = tarefas.find(t => t.id === id);

    if (!tarefaParaEditar) return;

    const novaDescricao = prompt('Edite a tarefa:', tarefaParaEditar.texto);

    if (novaDescricao === null || novaDescricao.trim() === '') {
        return; // se cancelar ou deixar em branco, não faz nada
    }

    // Aplica a alteração no objeto e salva
    tarefaParaEditar.texto = novaDescricao.trim();
    salvarTarefas();

    // Reexibe mantendo o filtro e pesquisa
    const tarefasFiltradas = aplicarFiltroEPesquisa();
    exibirTarefas(tarefasFiltradas);
}

// -------------------------------
// 8. Função para excluir uma tarefa
// -------------------------------
function excluirTarefa(id) {
    const confirmar = window.confirm('Tem certeza que deseja excluir esta tarefa?');

    if (confirmar) {
        // Novo array sem a tarefa excluída
        tarefas = tarefas.filter(tarefa => tarefa.id !== id);
        salvarTarefas();

        // Reexibe mantendo o filtro e pesquisa
        const tarefasFiltradas = aplicarFiltroEPesquisa();
        exibirTarefas(tarefasFiltradas);
    }
}

// -------------------------------
// 9. Função de pesquisa
// -------------------------------
function pesquisarTarefas() {
    // Simplesmente chama a função principal de filtro/pesquisa e reexibe
    const tarefasFiltradas = aplicarFiltroEPesquisa();
    exibirTarefas(tarefasFiltradas);
}


// -------------------------------
// 10. Filtro e Pesquisa Centralizado (Padrão: Combinação de filtros)
// -------------------------------
function aplicarFiltroEPesquisa() {
    const termo = campoPesquisa.value.toLowerCase();
    const tipo = seletorFiltro.value; // 'todas', 'pendentes', 'concluidas' (Adaptado do seu HTML)

    // 1. Aplica o filtro de status
    let filtradasPorStatus = tarefas;
    
    if (tipo === 'pendentes') {
        filtradasPorStatus = tarefas.filter(tarefa => !tarefa.concluida);
    } else if (tipo === 'concluidas') {
        filtradasPorStatus = tarefas.filter(tarefa => tarefa.concluida);
    }
    // Se 'todas', mantemos o array tarefas original

    // 2. Aplica a pesquisa sobre o resultado do filtro de status
    const filtradasFinais = filtradasPorStatus.filter(tarefa => {
        return tarefa.texto.toLowerCase().includes(termo);
    });

    return filtradasFinais;
}

function filtrarTarefas() {
    // Simplesmente chama a função principal de filtro/pesquisa e reexibe
    const tarefasFiltradas = aplicarFiltroEPesquisa();
    exibirTarefas(tarefasFiltradas);
}


// -------------------------------
// 11. Eventos (interações do usuário)
// -------------------------------
botaoAdicionar.addEventListener('click', adicionarTarefa);
campoPesquisa.addEventListener('input', pesquisarTarefas);
seletorFiltro.addEventListener('change', filtrarTarefas);

// -------------------------------
// 12. Permitir adicionar tarefa ao pressionar Enter
// -------------------------------
campoNovaTarefa.addEventListener('keydown', function (evento) {
    // Verifica se a tecla pressionada foi "Enter"
    if (evento.key === 'Enter') {
        adicionarTarefa();
    }
});

// -------------------------------
// 13. Quando a página carregar, buscamos as tarefas salvas
// -------------------------------
window.onload = carregarTarefasSalvas;