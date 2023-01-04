let novoLembrete = document.querySelector('#novoLembrete');
let novoLembreteData = document.querySelector('#novoLembreteData');
let buttonCriar = document.querySelector('#buttonCriar');
let listaTarefas = document.querySelector('#listaTarefas');
let dl = document.querySelector('#testeNovo');
let dbLembretes = [];


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


function criarLembrete(lembrete) {
    dbLembretes.push(lembrete);
    localStorage.setItem('listaTarefas', JSON.stringify(dbLembretes));

    dbLembretes.sort((a, b) => new Date(a.data) - new Date(b.data));
    limparFilhos()
    for(let i = 0 ; i < dbLembretes.length ; i++) {
        let dl = tagDl(dbLembretes[i]);
        listaTarefas.appendChild(dl);
    }
    
    novoLembrete.value = '';
    novoLembreteData.value = '';

}

function gerarId() {
    return Math.floor(Math.random() * 3000);
}

function limparFilhos() {
    dl.innerText = ""
}

function tagDl(lembrete) {
    
    let date = new Date(lembrete.data);
    idDate = date.getTime();
    idDate = String(idDate);


    let dt = document.getElementById(idDate);

    if (dt == null) {
        // o elemento não existe
        dt = document.createElement('dt');
        dt.id = (idDate); 
        dt.textContent = lembrete.data;
        dl.appendChild(dt);
      }

    let dd = document.createElement('dd');
    dd.textContent = lembrete.nome;
    dd.id = lembrete.id;
    
    let btn = document.createElement('btn');
    btn.classList.add('btn-delete');
    btn.innerHTML = '<i class="fa fa-trash"></i>';
    btn.setAttribute('onclick', 'excluir('+lembrete.id+')');

    
    dt.appendChild(dd);
    dd.appendChild(btn);

    return dl;

}


function excluir(idLembrete) {
    let confirmacao = window.confirm('Tem certeza que deseja excluir o lembrete?');
    if(confirmacao) {
        let elemento = dbLembretes.find(item => item.id === idLembrete);
        dbLembretes.splice(dbLembretes.indexOf(elemento), 1);
        let dd = document.getElementById(''+ idLembrete + '');
        let dt = dd.parentNode;
        var regExp = /[a-zA-Z]/g;

        if(dd){
            dd.remove();
        }
        if(!regExp.test(dt.textContent)){ 
            dt.remove()
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
    } else if(localDate.getTime() > insertDate.getTime()) {
        alert('Insira uma data futura');
        return false;
    } else return true;
}