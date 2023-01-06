Dado('Que o usuario queira criar uma tarefa') do
    @test = LembretePage.new
    @test.load
   
end
  
Quando('ele digitar os dados da tarefa de forma valida') do
    @test.criarTarefa(
        'Tarefa 1', 
        '12/22/2023')
end
  
Então('a tarefa sera criada com sucesso') do
    @test.validarTarefa(
        'Tarefa 1',
        '2023-12-22'
    )
end