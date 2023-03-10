class LembretePage < SitePrism::Page
    set_url ''
    element :campoTarefa, :id, "novoLembrete"
    element :campoData, :id, "novoLembreteData"
    element :botaoCriar, :button, "buttonCriar"
    element :tarefaData, :xpath, "//dt[.]"
    element :tarefa, :xpath, "//dd[.]"


    def criarTarefa(lembrete, data)
        campoTarefa.set (lembrete)
        campoData.set (data)
        botaoCriar.click
    end

    def validarTarefa(nomeLembrete, dataLembrete)
        expect(tarefa.text).to eql(nomeLembrete)
        expect(tarefaData.text).to eql(dataLembrete)
    end
end 
