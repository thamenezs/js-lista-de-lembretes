let novoLembrete = document.querySelector('#novoLembrete');
let novoLembreteData = document.querySelector('#novoLembreteData');
let buttonCriar = document.querySelector('#buttonCriar');
let listaTarefas = document.querySelector('#listaTarefas');

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

    criarLembrete(lembrete);

})

function gerarId() {
    return Math.floor(Math.random() * 3000);
}

function criarLembrete(lembrete) {
    let li = tagLi(lembrete);
    listaTarefas.appendChild(li);
    novoLembrete.value = '';
    novoLembreteData.value = '';


}

function tagLi(lembrete) {

    let li = document.createElement('li');

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
