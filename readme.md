# EsToDoList


## 📝 Sobre o Projeto

O **EsToDoList** é uma aplicação simples e eficiente de lista de tarefas (To-Do List), desenvolvida com o objetivo principal de praticar os fundamentos do desenvolvimento front-end moderno.

Este projeto foca na aplicação de conceitos de **Clean Code** e na manipulação dinâmica do DOM com JavaScript puro. A persistência dos dados é garantida pelo `localStorage` do navegador, e o design responsivo é facilitado pelo framework Tailwind CSS.

É uma prova de conceito de um CRUD (Create, Read, Update, Delete) básico e funcional no lado do cliente.

## ✨ Funcionalidades

O **EsToDoList** oferece uma experiência completa para o gerenciamento de tarefas:

* **Adicionar Tarefa:** Insira novas tarefas de forma rápida através do campo de input e botão `+` (ou pressionando Enter).
* **Excluir Tarefa:** Remova tarefas permanentemente da lista com um botão de exclusão (`🗑️`).
* **Marcar como Concluída:** Alterne o status de uma tarefa (ativa/concluída) com um clique no texto da tarefa.
* **Pesquisar:** Filtre a lista em tempo real digitando termos no campo de pesquisa.
* **Filtrar por Status:** Use o seletor para visualizar apenas tarefas **Ativas**, **Concluídas** ou **Todas**.
* **Persistência de Dados:** Todas as tarefas são salvas automaticamente no `localStorage` do navegador, mantendo seus dados intactos após o recarregamento da página.

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído utilizando um *stack* focado na velocidade e na eficiência do front-end puro:

| Tecnologia | Categoria | Nota de Uso |
| :--- | :--- | :--- |
| **HTML5** | Estrutura | Semântica e acessível. |
| **JavaScript (ES6+)** | Lógica / Interatividade | Responsável por toda a lógica de CRUD, manipulação do DOM e persistência com `localStorage`. |
| **Tailwind CSS** | Estilização / Layout | Utilizado como framework de utilidade para um design moderno, responsivo e de fácil manutenção. |

## 🚀 Como Usar

O projeto foi configurado para ser executado diretamente no navegador, sem a necessidade de *build* ou servidores backend complexos.

1.  **Clone o Repositório:** (Se estiver em um repositório, inclua o comando de clone).
2.  **Abra o Arquivo:** Simplesmente abra o arquivo `index.html` (ou o seu arquivo principal) no seu navegador preferido.
3.  **Desenvolva:** O navegador carregará automaticamente o Tailwind CSS via CDN e o seu `script.js` local.
    * *Nota:* Para projetos mais complexos, o Tailwind recomenda a instalação via CLI ou PostCSS para otimização e customização, mas para fins práticos, o CDN é ideal para o desenvolvimento.