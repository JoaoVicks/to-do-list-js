// Elementos:
const btnAdd = document.querySelector('#iadicionar')
const inputTarefa = document.querySelector('#itarefa')
const inputPesquisar = document.querySelector('#ipesquisa')
const btnEraser = document.querySelector('#iereser')
const containerTarefasCompletas = document.querySelector('#tarefas-completas')
const containerTarefasIncompletas = document.querySelector('#tarefas-incompletas')
const btnsEditar = document.querySelectorAll('.editar')
const btnFinalizar = document.querySelectorAll('.finalizar')
const btnAlteracao = document.querySelector('#ibtn-alteracao')
const msgAlerta = document.querySelector('#alerta')
const constainerDark = document.querySelector('.container-geral')
const inputEditar = document.querySelector('#iInput-editar')
const selectFiltro = document.querySelector('#ifiltro')
let Armazanamentobtn
//-----------------------------
//Object array:


//---------Funções--------------
function criarTarefa(texto, situation =  false, save = false) {

    if (!texto) {
        return
    }
    const TemplateStr = `<div class="card">
    <p>${texto}</p>
    <div class="buttons-controle">
        <button class="finalizar"><i class="fa-solid fa-check"></i></button>
        <button class="editar"><i class="fa-solid fa-pencil"></i></button>
        <button class="delete"><i class="fa-solid fa-xmark"></i></button>

    </div>
</div>`

    const parse = new DOMParser()

    const templateHtml = parse.parseFromString(TemplateStr, 'text/html')
    const card = templateHtml.querySelector('.card')
    containerTarefasIncompletas.appendChild(card)
    if(situation){
    card.classList.add('completa')
    }
    if (save === false) {
        saveTodoLocalStorage({
            name: texto,
            situation
        })
    }


}


function checkTarefa(btnCheck) {
    const parentDiv = btnCheck.closest('div.card')
    parentDiv.classList.toggle('completa')
    const texto = parentDiv.querySelector('p').textContent
    const tarefas = getTodoLocal()

    tarefas.map((tarefa) => {
        if (tarefa.name === texto) {
            tarefa.situation = !tarefa.situation
            if (tarefa.situation === true) {
                containerTarefasCompletas.appendChild(parentDiv)
            }
            if (tarefa.situation === false) {
                containerTarefasIncompletas.appendChild(parentDiv)
            }
        }
        else return
    }
    )

    localStorage.setItem('tarefas', JSON.stringify(tarefas))

}

function editar(antigobtnEdit) {
    let valorDoInputEditar = inputEditar.value

    msgAlerta.classList.toggle('hiden')
    constainerDark.classList.toggle('ativo')

    const parentDiv = antigobtnEdit.closest('div.card')
    const textP = parentDiv.querySelector('p')
    
    const todos = getTodoLocal()

    todos.map((todo)=>{
        if(todo.name===textP.textContent){
            todo.name= valorDoInputEditar
            textP.innerText = valorDoInputEditar
            
        }
        
    })
    localStorage.setItem('tarefas', JSON.stringify(todos))

 
}
function pesquisar(search) {
    const todos = document.querySelectorAll('.card');
    const normalizacao = search.toLowerCase()
    todos.forEach((todo) => {
        todo.style.display = 'flex'
        let todoTitle = todo.querySelector('p').innerText.toLowerCase()
        if (!todoTitle.includes(normalizacao)) {
            todo.style.display = 'none'
        }

    })
}

function remover(btn) {
    const divCard = btn.closest('div.card')
    divCard.remove()
    const texto = divCard.querySelector('p').textContent
    const tarefas = getTodoLocal()

    const arrayAtualizado = tarefas.filter((tarefa) => tarefa.name !== texto)

    localStorage.setItem('tarefas', JSON.stringify(arrayAtualizado))
}

const filtrar = (value) => {
    const todos = document.querySelectorAll('.card');
    switch (value) {
        case 'todos':

            todos.forEach((todo) => todo.style.display = 'flex')
            break
        case 'feito':
            todos.forEach((todo) => todo.classList.contains('completa')
                ? (todo.style.display = 'flex')
                : (todo.style.display = 'none')
            )
            break
        case 'incompleto':
            todos.forEach((todo) => !todo.classList.contains('completa')
                ? (todo.style.display = 'flex')
                : (todo.style.display = 'none')
            )
            break
        default:
            break
    }
}

const loadTarefas = () => {
    const tarefas = getTodoLocal()
    tarefas.forEach((tarefa) => {
        criarTarefa(tarefa.name, tarefa.situation, true)
    })
}

//local-strorage----------------------
const getTodoLocal = () => {
    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || []
    return tarefas
}

const saveTodoLocalStorage = (tarefa) => {
    const tarefas = getTodoLocal();
    tarefas.push(tarefa);
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
}
//---------Eventos--------------

inputTarefa.addEventListener('keydown', (e) => {
    if (e.code === 'Enter') {
        const texto = inputTarefa.value
        criarTarefa(texto)
        inputTarefa.value = ''
        inputTarefa.focus()

    }

})
btnAdd.addEventListener('click', () => {
    criarTarefa()
    inputTarefa.value = ''
    inputTarefa.focus()
    console.log(tarefas)
})
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('finalizar')) {
        const btnAtivado = e.target
        checkTarefa(btnAtivado)
    }
    if (e.target.classList.contains('editar')) {

        msgAlerta.classList.toggle('hiden')
        constainerDark.classList.toggle('ativo')

        Armazanamentobtn = e.target
    }
    if (e.target.classList.contains('delete')) {
        const btnRemove = e.target
        remover(btnRemove)
    }
})

btnAlteracao.addEventListener('click', () => {
    editar(Armazanamentobtn)
    console.log(tarefas)
})

inputEditar.addEventListener('keydown', (e) => {
    if (e.code === 'Enter') {
        editar(Armazanamentobtn)
     
    }
})

inputPesquisar.addEventListener('input', (e) => {
    const search = e.target.value
    pesquisar(search)
})

btnEraser.addEventListener('click', () => {
    inputPesquisar.value = '';
})

selectFiltro.addEventListener('change', (e) => {
    const valueSelect = selectFiltro.value
    filtrar(valueSelect)
})
loadTarefas()