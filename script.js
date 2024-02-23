// Elementos:
const btnAdd = document.querySelector('#iadicionar')
const inputTarefa = document.querySelector('#itarefa')
const inputPesquisar = document.querySelector('#ipesquisa')
const btnSearch = document.querySelector('#isearch')
const containerTarefasCompletas = document.querySelector('#tarefas-completas')
const containerTarefasIncompletas = document.querySelector('#tarefas-incompletas')
const btnsEditar = document.querySelectorAll('.editar')
const btnFinalizar = document.querySelectorAll('.finalizar')
const btnAlteracao = document.querySelector('#ibtn-alteracao')
const msgAlerta = document.querySelector('#alerta')
const constainerDark = document.querySelector('.container-geral')
const inputEditar = document.querySelector('#iInput-editar')

let Armazanamentobtn
//-----------------------------
//Object array:
let tarefas = [

]

//---------Funções--------------
function criarTarefa() {
    const texto = inputTarefa.value
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
    const tarefa = {
        name: texto,
        situation: false
    }
    tarefas.push(tarefa)

}


function checkTarefa(btnCheck) {
    const parentDiv = btnCheck.closest('div.card')
    parentDiv.classList.toggle('completa')
    const textP = parentDiv.querySelector('p').textContent

    tarefas.forEach((tarefa) => {
        if (tarefa.name === textP) {
            tarefa.situation = !tarefa.situation
            if (tarefa.situation === true) {
                containerTarefasCompletas.appendChild(parentDiv)

            }
            else {
                containerTarefasIncompletas.appendChild(parentDiv)
            }
        }

    })
}
function editar(btnEdit) {
    let valorDoInputEditar = inputEditar.value

    msgAlerta.classList.toggle('hiden')
    constainerDark.classList.toggle('ativo')

    const parentDiv = btnEdit.closest('div.card')
    const textP = parentDiv.querySelector('p')

    tarefas.forEach((tarefa) => {
        if (tarefa.name === textP.textContent) {
            tarefa.name = valorDoInputEditar
            textP.innerText = valorDoInputEditar
        }

    })
}
function pesquisar() {
    const valorInputPesquisar = inputPesquisar.value.toLowerCase()
    const PCard = document.querySelectorAll('.card p')
   
    const Card = document.querySelectorAll('.card')
   
    if(valorInputPesquisar===""){
        Card.forEach((card)=>{
        card.style.display='flex';
        })
        return
    }

    let divCard;

    PCard.forEach((p) => {
        console.log(p)
        
        divCard =p.closest('div.card');
        if (p.textContent.toLowerCase() === valorInputPesquisar) {
            divCard.style.display= 'flex'
        }
        else{
            divCard.style.display= 'none'
        }
    })

}
function remove(btn){
 const divCard = btn.closest('div.card')

 const cardP= divCard.querySelector('p').textContent
 tarefas.forEach((tarefa,indice) => {
    console.log(indice)
    console.log(tarefa)
    

    if(tarefa.name=== cardP){
        tarefas.splice(indice)
    }
 });
}

//---------Eventos--------------

inputTarefa.addEventListener('keydown', (e) => {
    if (e.code === 'Enter') {
        criarTarefa()
        inputTarefa.value = ''
        inputTarefa.focus()
        console.log(tarefas)
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
    if(e.target.classList.contains('delete')){
    const btnRemove = e.target
    remove(btnRemove)
    }
})

btnAlteracao.addEventListener('click', () => {
    editar(Armazanamentobtn)
    console.log(tarefas)
})
inputEditar.addEventListener('keydown', (e) => {
    if (e.code === 'Enter') {
        editar(Armazanamentobtn)
        console.log(tarefas)
    }
})

inputPesquisar.addEventListener('input',()=>{
    pesquisar()
})

btnSearch.addEventListener('click',()=>{
    pesquisar()
})

