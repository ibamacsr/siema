H5.Data.restURL = "http://" + document.domain + "/siema/rest"

H5.DB.ocorrencia = {}
H5.DB.ocorrencia.table = "ocorrencia"

# PRODES CONSOLIDADO {{{
H5.DB.ocorrencia.data =
  init: ->
    @ocorrencia = {}

  populate: (nro_ocorrencia, des_ocorrencia, dt_ocorrencia, validado, legado) ->
    self = @ocorrencia
    self[nro_ocorrencia] = {}
    self[nro_ocorrencia].nro_ocorrencia = nro_ocorrencia
    self[nro_ocorrencia].des_ocorrencia = des_ocorrencia
    self[nro_ocorrencia].dt_ocorrencia = dt_ocorrencia
    self[nro_ocorrencia].validado = validado
    self[nro_ocorrencia].legado = legado

rest = new H5.Rest (
  url: H5.Data.restURL
  table: H5.DB.ocorrencia.table
  # parameters: "data_cadastro > '2013-01-01'"
  fields: "nro_ocorrencia, des_ocorrencia, dt_ocorrencia, validado, legado"
  order: "validado ASC, dt_ocorrencia ASC"
)

H5.DB.ocorrencia.data.init()
for i, properties of rest.data
  H5.DB.ocorrencia.data.populate(
    properties.nro_ocorrencia, properties.des_ocorrencia, properties.dt_ocorrencia, properties.validado, properties.legado
  )


$("#btn_manage1").addClass("active")
$(".nav-sidebar a").on "click", (event) ->
  # clean all selection
  $(@).each ->
    $(".nav-sidebar a").parent().removeClass("active")
  # mark selected option
  $(@).parent().addClass("active")

  if $(@).prop("id") is "btn-manage1"
    $("#manage1").show()
    $("#manage2").hide()
    $("#manage3").hide()
    $("#manage4").hide()
  else if $(@).prop("id") is "btn-manage2"
    $("#manage1").hide()
    $("#manage2").show()
    $("#manage3").hide()
    $("#manage4").hide()
  else if $(@).prop("id") is "btn-manage3"
    $("#manage1").hide()
    $("#manage2").hide()
    $("#manage3").show()
    $("#manage4").hide()
  else if $(@).prop("id") is "btn-manage4"
    $("#manage1").hide()
    $("#manage2").hide()
    $("#manage3").hide()
    $("#manage4").show()


# drawTable = ->
# html = '<div class="table-responsive">'
# html = ''
# html = '<table class="table table-striped">'
# html += '  <thead>'
# html += '    <tr>'
# html += '      <th>Número da Ocorrência</th>'
# html += '      <th>Descrição da Ocorrência</th>'
# html += '      <th>Validado</th>'
# html += '      <th>Editar</th>'
# html += '      <th>Excluir</th>'
# html += '    </tr>'
# html += '  </thead>'
# html += '  <tbody id="fbody">'
# for key, reg of H5.DB.ocorrencia.data.ocorrencia
#   if not reg.legado
#     html += '    <tr>'
#     html += '      <td>' + reg.nro_ocorrencia + '</td>'
#     html += '      <td>' + reg.des_ocorrencia + '</td>'
#     html += if reg.validado is 'S' then '      <td><span style="color:#0088CC;"><i class="icon-thumbs-up icon-white"></i></span></td>' else '      <td><span style="color:#D80000;"><i class="icon-thumbs-down icon-white"></i></span></td>'
#     html += '      <td><a data-toggle="modal" class="editOcorrencia" data-ocorrencia="' + reg.nro_ocorrencia + '"href="#editMeModal"><i class="icon-edit icon-white"></i></a></td>'
#     html += '      <td><a class="removeOcorrencia" data-ocorrencia="' + reg.nro_ocorrencia + '"href="#"><i class="icon-trash icon-white"></i></a></td>'
#     html += '    </tr>'

# html += '  </tbody>'
# html += '</table>'
# # html += '          </div>'
# $("#table-ocorrencia").html(html)

html = ''
html = '<table class="table table-striped">'
html += '  <thead>'
html += '    <tr>'
html += '      <th>Número da Ocorrência</th>'
html += '      <th>Descrição da Ocorrência</th>'
html += '      <th>Validado</th>'
html += '      <th>Editar</th>'
html += '      <th>Excluir</th>'
html += '    </tr>'
html += '  </thead>'
html += '  <tbody id="fbody" class="fbody">'
for key, reg of H5.DB.ocorrencia.data.ocorrencia
  if not reg.legado and reg.validado is 'N'
    html += '    <tr>'
    html += '      <td>' + reg.nro_ocorrencia + '</td>'
    html += '      <td>' + reg.des_ocorrencia + '</td>'
    html += if reg.validado is 'S' then '      <td><span style="color:#0088CC;"><i class="icon-thumbs-up icon-white"></i></span></td>' else '      <td><span style="color:#D80000;"><i class="icon-thumbs-down icon-white"></i></span></td>'
    html += '      <td><a data-toggle="modal" class="editOcorrencia" data-ocorrencia="' + reg.nro_ocorrencia + '"href="#editMeModal"><i class="icon-edit icon-white"></i></a></td>'
    html += '      <td><a class="removeOcorrencia" data-ocorrencia="' + reg.nro_ocorrencia + '"href="#"><i class="icon-trash icon-white"></i></a></td>'
    html += '    </tr>'

html += '  </tbody>'
html += '</table>'
# html += '          </div>'
$("#tableNaoValidado").html(html)

# drawTable()

html = ''
html = '<table class="table table-striped">'
html += '  <thead>'
html += '    <tr>'
html += '      <th>Número da Ocorrência</th>'
html += '      <th>Descrição da Ocorrência</th>'
html += '      <th>Validado</th>'
html += '      <th>Editar</th>'
html += '      <th>Excluir</th>'
html += '    </tr>'
html += '  </thead>'
html += '  <tbody id="fbody" class="fbody">'
for key, reg of H5.DB.ocorrencia.data.ocorrencia
  if not reg.legado and reg.validado is 'S'
    html += '    <tr>'
    html += '      <td>' + reg.nro_ocorrencia + '</td>'
    html += '      <td>' + reg.des_ocorrencia + '</td>'
    html += if reg.validado is 'S' then '      <td><span style="color:#0088CC;"><i class="icon-thumbs-up icon-white"></i></span></td>' else '      <td><span style="color:#D80000;"><i class="icon-thumbs-down icon-white"></i></span></td>'
    html += '      <td><a data-toggle="modal" class="editOcorrencia" data-ocorrencia="' + reg.nro_ocorrencia + '"href="#editMeModal"><i class="icon-edit icon-white"></i></a></td>'
    html += '      <td><a class="removeOcorrencia" data-ocorrencia="' + reg.nro_ocorrencia + '"href="#"><i class="icon-trash icon-white"></i></a></td>'
    html += '    </tr>'

html += '  </tbody>'
html += '</table>'
# html += '          </div>'
$("#tableValidado").html(html)


# Filter table rows
$("#searchInput").keyup ->
    # split the current value of searchInput
    data = @value.split(" ")
    # create a jquery object of the rows
    jo = $(".fbody").find("tr")
    if (@value == "")
        jo.show()
        return

    # hide all the rows
    jo.hide()

    # Recusively filter the jquery object to get results.
    jo.filter((i, v) ->
        $t = $(this)
        for element, index in data
        # for (d = 0; d < data.length; ++d) {
            if $t.is(":contains('" + data[index] + "')")
                return true
        # }
        return false
    )
    # show the rows that match.
    .show()
.focus ->
    @value = ""
    # $(this).css({
    #     "color": "black"
    # })
    $(this).unbind('focus')
# .css({
#     "color": "#C0C0C0"
# });



# Modal to edit records
$('#editMeModal').modal(
  keyboard: false
  backdrop: false
  show: false
)

$("#editMeModal").draggable(
  handle: ".modal-header"
)

# Event to create the modal
$("a.editOcorrencia").on "click", (event) ->
  nroOcorrencia = $(this).attr("data-ocorrencia")
  $("#nroOcorrenciaLoadAdmin").val(nroOcorrencia)
  $("#formLoadAdmin").submit()

# Event to remove records
$("a.removeOcorrencia").on "click", (event) ->

      event.preventDefault()

      # Asks for the user permition to alter the database
      if(confirm "Você deseja excluir essa linha do banco de dados?" )
        # If the deleting row is the last row of the table, stores the previous one as last row
        # if @_lastRow is tableRow
        #   if @_table.rows.length > 2
        #     @_lastRow = @_table.rows.item(@_table.rows.length-2)
        #   else
        #     @_lastRow = null

        # where = ""

        # # Gets the key of the row to be deleted and creates the query for the deletion
        # $.each tableRow.children, (key,cell) =>
        #   span = cell.children[0]
        #   if $(span).attr("data-field") is @options.uniqueField.field
        #     where = @options.uniqueField.field + "%3D" + span.innerHTML

        # table = ''

        # if @options.primaryTable?
        #   table = @options.primaryTable
        # else
        #   table =  @options.table

        nroOcorrencia = $(this).attr("data-ocorrencia")

        # Send the request for the deletion
        rest = new H5.Rest (
          url: H5.Data.restURL
          functionName: "f_deleteOcorrencia"
          parameters: nroOcorrencia
          # parameters: "nro_ocorrencia%3D" + nroOcorrencia
          restService: "ws_functioncall.php"
        )

        if rest.data.length is 1 then $(this).closest('tr').remove()

        # rest = new window.parent.H5.Rest (
        #   url: window.parent.H5.Data.restURL
        #   table: "tmp_ocorrencia_produto"
        #   parameters: "nro_ocorrencia%3D" + nroOcorrencia
        #   restService: "ws_deletequery.php"
        # )

      else
        alert "Operação cancelada"

  #makes mangage area invisible after loading
$("#manag").hide()


$("#searchCPF").mask("99999999999")


$("#searchPerson").on "click", ()->
  console.log "search for persons info"
  $.ajax (
    url: window.location.href.replace("#","") + "index.php/Auth/search_user"
    dataType: 'json'
    type: 'get'
    data:
      'cpf': $("#searchCPF").val()
    success: (data) ->
      $("#inputNome").val(data.Nome)
      $("#inputEmail").val(data.Desc_Email)
      $("#inputEmail").val(data.Desc_Email)
      $("#inputTelefone").val(data.Telefone)


    error: (data,status)->
      $("#inputNome").val("")
      $("#inputEmail").val("")
      $("#inputEmail").val("")
      $("#inputTelefone").val("")
      console.log('CPF não encontrado!')
  )
  # $("#sel_pessoa").submit()


$("#storePerson").on "click", ()->

  console.log "send form to save"
  $.ajax (
    url: window.location.href.replace("#","") + "index.php/Auth/create_intern_user"
    dataType: 'json'
    type: 'get'
    data:
      'id_perfil': document.getElementById('selectPerfil').selectedIndex
      'cpf': $('#searchCPF').val()
      'nome': $('#inputNome').val()
    success: (data) ->
      console.log "Enviado para o servidor!"
    error: (data,status)->
      $("#inputNome").val("")
      $("#inputEmail").val("")
      $("#inputEmail").val("")
      $("#inputTelefone").val("")
      console.log 'CPF não encontrado!'
  )
# }}}