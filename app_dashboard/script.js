$(document).ready(() => {
	
  $('#documentacao').on('click', () => {
    $('#pagina').load('documentacao.html')
  })

  $('#suporte').on('click', () => {
    $('#pagina').load('suporte.html')
  })

  $('#dashboard').on('click', () => {
    $('#pagina').load('dashboard.html')
  })

  $('#competencia').on('change', e => {

    let competencia = $(e.target).val()

    //Método, url, dados, sucesso, erro
    $.ajax({
        type : 'GET',
        url : 'app.php',
        data : `competencia=${competencia}`, // -> Sintaxe x-www-form-urlencoded
        dataType : 'json',
        success : dados => { 
            $('#numeroVendas').html(dados.numeroVendas)
            $('#totalVendas').html(dados.totalVendas)
            $('#totalAtivos').html(dados.totalAtivos)
            $('#totalInativos').html(dados.totalInativos)
         },
        error : erro => { console.log(erro)}
    })
  })
})