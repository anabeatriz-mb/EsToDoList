// =============================================================
// EsToDoList - CRUD básico de tarefas
// =============================================================

// -------------------------------
// 1. Selecionar os elementos da página (Atualizado)
// -------------------------------
const campoNovaTarefa = document.getElementById('nova-tarefa-input');
const botaoAdicionar = document.getElementById('adicionar-tarefa-btn'); 
const listaTarefas = document.getElementById('lista-de-tarefas');
const campoPesquisa = document.getElementById('pesquisa-input');

// NOVOS ELEMENTOS DE FILTRO
const botoesFiltroContainer = document.getElementById('filter-buttons-container');
const botoesFiltro = document.querySelectorAll('#filter-buttons-container .filter-button'); 

// Variável para rastrear o filtro ativo (inicia com 'todas' que é o botão ativo no HTML)
let filtroAtual = 'todas'; 

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
    const texto = campoNovaTarefa.value.trim(); 

    if (texto === '') {
        alert('Digite uma tarefa antes de adicionar!');
        return;
    }

    const novaTarefa = {
        id: Date.now(), 
        texto: texto,
        concluida: false
    };

    tarefas.push(novaTarefa);
    salvarTarefas();

    // Reexibe as tarefas com o filtro e pesquisa atuais
    const tarefasFiltradas = aplicarFiltroEPesquisa();
    exibirTarefas(tarefasFiltradas);

    campoNovaTarefa.value = '';
}

// -------------------------------
// 5. Função para exibir as tarefas na tela (Atualizado com Checkbox e Destaque)
// -------------------------------
function exibirTarefas(listaParaMostrar) {
    listaTarefas.innerHTML = '';

    for (let tarefa of listaParaMostrar) {
        // Criar um elemento <li> para cada tarefa
        const item = document.createElement('li');
        // Classes do container <li>
        item.className = 'flex justify-between items-center p-3 border border-gray-300 hover:bg-gray-100 dark:bg-zinc-700 dark:hover:bg-zinc-500 rounded-lg shadow-sm transition duration-150 ease-in-out';
        
        // Container para o checkbox e o texto
        const content = document.createElement('div');
        content.className = 'flex items-center flex-grow min-w-0';

        // === NOVO: Checkbox para conclusão ===
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = tarefa.concluida;
        // Classes Tailwind para um checkbox customizado e rosa
        checkbox.className = 'form-checkbox h-5 w-5 text-pink-500 bg-zinc-200 dark:bg-zinc-600 border-gray-300 dark:border-zinc-500 rounded focus:ring-pink-500 dark:focus:ring-pink-400 cursor-pointer'; 
        
        checkbox.onclick = function(e) {
            e.stopPropagation(); // Impede o clique no item de lista
            alternarConclusao(tarefa.id);
        };
        content.appendChild(checkbox);

        // Criar um span para o texto da tarefa
        const textoTarefa = document.createElement('span');
        textoTarefa.textContent = tarefa.texto;
        textoTarefa.className = 'tarefa-texto ml-3 text-zinc-700 dark:text-lime-100 truncate'; 
        
        // Aplica classes de concluído
        if (tarefa.concluida) {
            textoTarefa.classList.add('line-through', 'text-gray-400', 'dark:text-gray-400');
            textoTarefa.classList.remove('text-zinc-700', 'dark:text-lime-100');
            item.classList.add('opacity-70', 'hover:opacity-100', 'dark:opacity-70', 'dark:hover:opacity-100');
        } else {
            textoTarefa.classList.remove('line-through', 'text-gray-400', 'dark:text-gray-400');
            textoTarefa.classList.add('text-zinc-700', 'dark:text-lime-100');
            item.classList.remove('opacity-70', 'hover:opacity-100', 'dark:opacity-70', 'dark:hover:opacity-100');
        }
        
        content.appendChild(textoTarefa);

        // Criar o container dos botões
        const botoes = document.createElement('div');
        botoes.className = 'flex space-x-1 sm:space-x-2 ml-4 flex-shrink-0'; 

        // === DESTAQUE NO BOTÃO EDITAR (LÁPIS) ===
        const botaoEditar = document.createElement('button');
        botaoEditar.textContent = '✏️';
        // NOVAS CLASSES TAILWIND para destacar
        botaoEditar.className = 'action-icon p-2 rounded-full hover:bg-yellow-200 dark:hover:bg-yellow-800 transition duration-150 text-xl leading-none'; 
        botaoEditar.onclick = function (e) {
            e.stopPropagation(); 
            editarTarefa(tarefa.id);
        };

        // === DESTAQUE NO BOTÃO EXCLUIR (LIXEIRA) ===
        const botaoExcluir = document.createElement('button');
        botaoExcluir.textContent = '🗑️';
        // NOVAS CLASSES TAILWIND para destacar
        botaoExcluir.className = 'action-icon p-2 rounded-full hover:bg-red-200 dark:hover:bg-red-800 transition duration-150 text-xl leading-none';
        botaoExcluir.onclick = function (e) {
            e.stopPropagation();
            excluirTarefa(tarefa.id);
        };

        // Montamos o elemento completo
        botoes.appendChild(botaoEditar);
        botoes.appendChild(botaoExcluir);
        item.appendChild(content); // Adiciona o container do checkbox e texto
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
            break; 
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
        return; 
    }

    tarefaParaEditar.texto = novaDescricao.trim();
    salvarTarefas();

    const tarefasFiltradas = aplicarFiltroEPesquisa();
    exibirTarefas(tarefasFiltradas);
}

// -------------------------------
// 8. Função para excluir uma tarefa
// -------------------------------
function excluirTarefa(id) {
    const confirmar = window.confirm('Tem certeza que deseja excluir esta tarefa?');

    if (confirmar) {
        tarefas = tarefas.filter(tarefa => tarefa.id !== id);
        salvarTarefas();

        const tarefasFiltradas = aplicarFiltroEPesquisa();
        exibirTarefas(tarefasFiltradas);
    }
}

// -------------------------------
// 9. Função de pesquisa
// -------------------------------
function pesquisarTarefas() {
    const tarefasFiltradas = aplicarFiltroEPesquisa();
    exibirTarefas(tarefasFiltradas);
}


// -------------------------------
// 10. Filtro e Pesquisa Centralizado
// -------------------------------
function aplicarFiltroEPesquisa() {
    const termo = campoPesquisa.value.toLowerCase();
    const tipo = filtroAtual; // USA O NOVO RASTREADOR DE FILTRO

    // 1. Aplica o filtro de status
    let filtradasPorStatus = tarefas;
    
    if (tipo === 'pendentes') {
        filtradasPorStatus = tarefas.filter(tarefa => !tarefa.concluida);
    } else if (tipo === 'concluidas') {
        filtradasPorStatus = tarefas.filter(tarefa => tarefa.concluida);
    }

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
// 11. Eventos (interações do usuário) - ATUALIZADO PARA BOTÕES
// -------------------------------
botaoAdicionar.addEventListener('click', adicionarTarefa);
campoPesquisa.addEventListener('input', pesquisarTarefas);

// NOVO: Eventos para os botões de filtro
botoesFiltro.forEach(button => {
    button.addEventListener('click', function() {
        // 1. Atualiza a variável de rastreamento
        filtroAtual = this.getAttribute('data-filter');

        // 2. Remove o estado ativo de todos os botões (para cores inativas)
        botoesFiltro.forEach(btn => {
            btn.classList.remove('bg-pink-500', 'hover:bg-pink-600', 'active-filter', 'text-white');
            btn.classList.add('bg-zinc-300', 'dark:bg-zinc-700', 'hover:bg-zinc-400', 'dark:hover:bg-zinc-500', 'text-zinc-700', 'dark:text-lime-100');
        });

        // 3. Adiciona o estado ativo ao botão clicado (para cor rosa)
        this.classList.add('bg-pink-500', 'hover:bg-pink-600', 'active-filter', 'text-white');
        this.classList.remove('bg-zinc-300', 'dark:bg-zinc-700', 'hover:bg-zinc-400', 'dark:hover:bg-zinc-500', 'text-zinc-700', 'dark:text-lime-100');

        // 4. Aplica o filtro
        filtrarTarefas();
    });
});

// -------------------------------
// 12. Permitir adicionar tarefa ao pressionar Enter
// -------------------------------
campoNovaTarefa.addEventListener('keydown', function (evento) {
    if (evento.key === 'Enter') {
        adicionarTarefa();
    }
});

// -------------------------------
// 13. Quando a página carregar, buscamos as tarefas salvas
// -------------------------------
window.onload = carregarTarefasSalvas;