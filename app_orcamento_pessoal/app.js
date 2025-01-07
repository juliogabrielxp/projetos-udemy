
//1-Capturar os valores digitados pelo usuário.
function cadastrarDespesa() {

    let ano = document.querySelector('#ano')
    //Nem sempre o value em todos os elementos é o melhor jeito!
    let mes = document.querySelector('#mes').value 
    let dia = document.querySelector('#dia')
    let tipo = document.querySelector('#tipo')
    let descricao = document.querySelector('#descricao')
    let valor = document.querySelector('#valor')



    //3-Criar a instância do objeto DESPESA.
    let despesa = new Despesa(ano.value, mes, dia.value, tipo.value, descricao.value, valor.value)

    //11.1- Chama o método criado no objeto Despesa para validar os dados
    if(despesa.validarDados()) {
        //5-Grava no banco de dados
        bancoDados.gravar(despesa) 
        //8-chamar a classe  instânciada e usar o mètodo gravar.

        //12.1- Dialog de sucesso
        $('#modalRegistraDespesa').modal('show')
        let exampleModalLabel = document.querySelector('#exampleModalLabel')
        let modalConteudo = document.querySelector('#modalConteudo')
        let botaoVoltar = document.querySelector('#botaoVoltar')
        
       exampleModalLabel.innerHTML = "Registro inserido com sucesso"
       exampleModalLabel.classList.add('text-success')

        modalConteudo.innerHTML = "Despesa foi cadastrada com sucesso!"

        botaoVoltar.innerHTML = "Voltar"
        botaoVoltar.classList.add('btn-success')

        //Limpar campos após dailog de sucesso
        ano.value = ''
        mes = ''
        dia.value = '' 
        tipo.selectedIndex = 0 // Reseta para a primeira opção do <select>
        descricao.value = ''
        valor.value = '' 
    
    } else {
        //12-Diaolog de erro com Jquery
        $('#modalRegistraDespesa').modal('show')
        let exampleModalLabel = document.querySelector('#exampleModalLabel')
        let modalConteudo = document.querySelector('#modalConteudo')
        let botaoVoltar = document.querySelector('#botaoVoltar')
        
       exampleModalLabel.innerHTML = "Erro na gravação"
       exampleModalLabel.classList.add('text-danger')

        modalConteudo.innerHTML = "Existem campos obrigatórios que não foram preenchidos!"

        botaoVoltar.innerHTML = "Voltar e corrigir"
        botaoVoltar.classList.add('btn-danger')
    }

   
}




//2-Passo criar o objeto
class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    //11- Validação de dados
    validarDados() {
        for (let i in this) /*Vai percorrer cada elemento do objeto despesa, graças ao this*/ {
            //11.2- Lógica de cada elemento this no indice percorrido por for tiver algum desses testes retorna false.
            if(this[i] == undefined || this[i] == '' || this[i] == null) {
                return false
            }
        }
        return true //Se todos os dados estiverem preenchidos retorna true.
    }
}


//6-Criar a classe banco de dados
class BancoDados {
    //10-Lógica para atribuir um indice 
    constructor() {
        let id = localStorage.getItem('id') //Retorna o valor null

        if(id ===  null) { //Se o valor for null, ele recebe 0
            localStorage.setItem('id', 0) 
        } 
    }

    //9-Criar uma função getId

    getProximoId () {
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1
    }

    //4-Gravação dos dados em Local Storage
     gravar (d) {

    let id = this.getProximoId()
    //Acessa-se o localStorage, depois método setItem. Passamos o primeiro parâmetro de qual objeto queremos acessar, depois converte em JSON com JSON.stringify() com parâmetro que recebemos na função
    localStorage.setItem(id, JSON.stringify(d))

    localStorage.setItem('id', id) 
}

    //13-Cria um método para recuperar todos os registro
    recuperarTodosRegistros() {

        //14- Criar um array para colocar as despesas nele e trabalhar em cima do array
        let despesas = Array()

        let id = localStorage.getItem('id')
        //Recuperamos o número de id que tem em LocalStorage, depois usamos um for para percorrer e armazenar na variável despesa cada elemento. 
        for (let i = 1; i <= id; i++) {

            let despesa = JSON.parse(localStorage.getItem(i))

            //Lógica para verificar se existe a possibilidade de haver índices que foram pulados/removidos, neste caso nós vamos pular esses índices
            if(despesa === null) {
                continue
            }
            
            despesa.id = i
            //A cada interação iremos adicionar um elemento ao array
            despesas.push(despesa)
            
        }

        return despesas

    }

    //16.1-Método para pesquisar
    pesquisar(despesa) {

        //17.1-Cria um array
        let despesasFiltradas = Array()
        //17-Economizar código, usa-se o método recuperarTodosRegistros
        despesasFiltradas = this.recuperarTodosRegistros()

        //18-Filtrando dados:
        
        //18.1- Teste antes de aplicar o filtro
        if(despesa.ano != '') { 
            
            despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
        }

        if(despesa.mes != '') { 
            
            despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
        }

        
        if(despesa.dia != '') { 
            
            despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
        }

        
        if(despesa.tipo != '') { 
            
            despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
        }

        
        if(despesa.descricao != '') { 
            
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
        }

        
        if(despesa.valor != '') { 
            
            despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)
        }

        return despesasFiltradas
    }
    
    remover(id) {
        localStorage.removeItem(id)
    }

}

//7-Criar uma instância banco de dados
let bancoDados = new BancoDados()

//13.1-Recuperar os registros para consulta, vai ser executada sempre no ONLOAD no body consulta.html
function carregaListaDespesas(despesas = Array(), filtro = false) {

    if(despesas.length == 0 && filtro == false) {
        despesas = bancoDados.recuperarTodosRegistros()
    }

    //15-Selecionando o elemento tbody da tabela
    let listaDespesas = document.querySelector('#listaDespesas')
    listaDespesas.innerHTML = ''

    //15.1-Percorrer o array despesas, listando cada despesa de forma dinâmica
    despesas.forEach(function(d) {

        //Criando a linha(tr)
        let linha = listaDespesas.insertRow()

        //Criar as colunas (td)
        //Cria 4 colunas começando de 0 até 3
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`

        //15.2-Ajustar o tipo
        switch(parseInt(d.tipo)) {

            case 1: d.tipo =  'Alimentação'
                break
            
            case 2: d.tipo = 'Educação'
                break

            case 3: d.tipo = 'Lazer'
                break

            case 4: d.tipo = 'Saúde'
                break

            case 5: d.tipo = 'Transporte'
                break

        }

        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor

        //19-Criar botão de exclusão
        let btn = document.createElement('button')
        btn.className = 'btn btn-danger'
        btn.innerHTML = '<i class="fas fa-times"></>'
        btn.id = 'id_despesa_' + d.id
        btn.onclick = function() {
            
            //Remover despesa

            let id = this.id.replace('id_despesa_', '')
           
            bancoDados.remover(id)

            window.location.reload()
        }

        linha.insertCell(4).append(btn)
    })


}

//16-Função para pesquisar despesas
function pesquisarDespesas() {
    let ano = document.querySelector('#ano').value
    let mes = document.querySelector('#mes').value
    let dia = document.querySelector('#dia').value
    let tipo = document.querySelector('#tipo').value
    let descricao = document.querySelector('#descricao').value
    let valor = document.querySelector('#valor').value

    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)

    //16.2- Onde passamos o parâmetro despesa para o pesquisar( ) da classe bancoDados
    let despesas = bancoDados.pesquisar(despesa)

    this.carregaListaDespesas(despesas, true)

}