let novoLembrete = document.querySelector('#novoLembrete');
let novoLembreteData = document.querySelector('#novoLembreteData');
let buttonCriar = document.querySelector('#buttonCriar');
let listaTarefas = document.querySelector('#listaTarefas');
let dbLembretes = [];

// novoLembrete.addEventListener('keypress', (e)=>{

//     if(e.keyCode == 13) {
//         let lembrete = {
//             nome: novoLembrete,
//             data: novoLembreteData,
//             id: '',
//         }

//         criarLembrete(lembrete);

//     }
// });

buttonCriar.addEventListener('click', (e) => {
    let lembrete = {
        nome: novoLembrete.value,
        data: novoLembreteData.value,
        id: gerarId(),
    }

    if(validaNome(lembrete.nome) && validaData(lembrete.data)) {
        criarLembrete(lembrete);
    }
    
});


function gerarId() {
    return Math.floor(Math.random() * 3000);
}

function criarLembrete(lembrete) {
    dbLembretes.push(lembrete);
    localStorage.setItem('listaTarefas', JSON.stringify(dbLembretes));
    let li = tagLi(lembrete);
    listaTarefas.appendChild(li);
    novoLembrete.value = '';
    novoLembreteData.value = '';

}


function tagLi(lembrete) {

    let li = document.createElement('li');

    li.id = lembrete.id;

    let span = document.createElement('span');
    span.classList.add('textoTarefa');
    span.innerHTML = lembrete.nome;

    let date = document.createElement('date');
    date.classList.add('dataTarefa');
    date.innerHTML = lembrete.data;
    
    let div = document.createElement('div');

    let btn = document.createElement('btn');
    btn.classList.add('btn-delete');
    btn.innerHTML = '<i class="fa fa-trash"></i>';
    btn.setAttribute('onclick', 'excluir('+lembrete.id+')');

    div.appendChild(btn);
    
    li.appendChild(span);
    li.appendChild(date);
    li.appendChild(div);

    return li;

}

function excluir(idLembrete) {
    let confirmacao = window.confirm('Tem certeza que deseja excluir o lembrete?' + idLembrete);
    if(confirmacao){
        let li = document.getElementById(''+ idLembrete + '');
        if(li){
            listaTarefas.removeChild(li);
        }
    }
}


function validaNome(nomeLembrete){
    if(nomeLembrete.length < 1 || nomeLembrete == null ){
        alert('Preencha corretamente o nome da tarefa!');
        return false;
    } else return true;
}

function validaData(dataLembrete){
    console.log(dataLembrete);
    const localDate = new Date();
    const insertDate = new Date(dataLembrete);
    insertDate.setDate(insertDate.getDate() + 1);

    if(dataLembrete == "" || dataLembrete == null ) {
        alert('Preencha corretamente a data da tarefa!');
        return false;
    } else if(localDate.toLocaleDateString() > insertDate.toLocaleDateString()) {
        alert('Insira uma data futura');
        return false;
    } else return true;
}