// Generated by CoffeeScript 1.7.1
(function() {
  var consultarOcorrencias, exportCSV, exportPDF, generateConsultCSV, getContentExportConsult, getHeadersColumnsResults, setFilter;

  $(document).ready(function() {
    var roundNumber;
    $("#login").load("//" + document.location.host + document.location.pathname + "/index.php/login/login_window");
    $("#login").hide();
    $("#map").show();
    $('#addMeModal').modal({
      keyboard: false,
      backdrop: false,
      show: true
    });
    $("#addMeModal").draggable({
      handle: ".modal-header"
    });
    $('.selectpicker').selectpicker();
    $(".dropdown-menu input, .dropdown-menu label").click(function(e) {
      return e.stopPropagation();
    });
    $(".navbar a").on("click", function(event) {
      var where;
      $(".nav-collapse a").parent().removeClass("active");
      $(this).parent().addClass("active");
      if ($(this).prop("id") === "btn-map") {
        $("#dash").hide();
        $("#login").hide();
        $("#map").show();
        $("#consultas").hide();
        $("#manag").hide();
        if (H5.Data.changed) {
          if (H5.Data.state === "Todos") {
            where = "ano='" + H5.Data.selectedYear + "'";
          } else {
            where = "estado='" + H5.Data.state + "' AND ano='" + H5.Data.selectedYear + "'";
          }
          H5.Map.layer.alerta.setOptions({
            where: where
          });
          H5.Map.layer.clusters.setOptions({
            where: where
          });
          H5.Map.layer.alerta.redraw();
          H5.Map.layer.clusters.redraw();
          H5.Data.changed = false;
        }
      } else if ($(this).prop("id") === "btn-charts") {
        $("#login").hide();
        $("#map").hide();
        $("#dash").show();
        $("#consultas").hide();
        $("#manag").hide();
      } else if ($(this).prop("id") === "btn-login") {
        $("#dash").hide();
        $("#map").show();
        $("#login").show();
        $("#consultas").hide();
      } else if ($(this).prop("id") === "btn-consult") {
        $("#login").hide();
        $("#map").hide();
        $("#dash").hide();
        $("#consultas").show();
        $("#manag").hide();
      } else if ($(this).prop("id") === "btn-manag") {
        $("#login").hide();
        $("#map").hide();
        $("#dash").hide();
        $("#manag").show();
        $("#consultas").hide();
        $("#btn-manage2").click();
      }
      return $('.nav-collapse').collapse('hide');
    });
    String.prototype.toProperCase = function() {
      return this.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    };
    roundNumber = function(number, digits) {
      var multiple, rndedNum;
      multiple = Math.pow(10, digits);
      rndedNum = Math.round(number * multiple) / multiple;
      return rndedNum;
    };
    $("#dash").fadeOut(1);
    $("#consultas").hide();
    $(".loading").fadeOut(2000);
    $("#modalExport").modal({
      keyboard: false,
      backdrop: false,
      show: false
    });
    $("#modalExport").draggable({
      handle: ".modal-header"
    });
    $("#dateStart").datepicker({
      format: "dd/mm/yyyy",
      language: "pt-BR",
      autoclose: true,
      orientation: "auto right",
      clearBtn: true,
      startView: 1,
      endDate: "today"
    });
    $("#dateFinish").datepicker({
      format: "dd/mm/yyyy",
      language: "pt-BR",
      autoclose: true,
      orientation: "auto right",
      clearBtn: true,
      startView: 1,
      endDate: "today"
    });
    $("#chkAllDates").on("click", function(event) {
      if ($(this).is(":checked")) {
        $("#dateStart").attr("disabled", "disabled");
        return $("#dateFinish").attr("disabled", "disabled");
      } else {
        $("#dateStart").removeAttr("disabled", "disabled");
        return $("#dateFinish").removeAttr("disabled", "disabled");
      }
    });
    $("#dateStart").on("change", function(event) {
      return $("#chkAllDates").attr("unchecked", "unchecked");
    });
    $("#dateFinish").on("change", function(event) {
      return $("#chkAllDates").attr("unchecked", "unchecked");
    });
    $("#consultarDados").on("click", function(event) {
      return setFilter();
    });
    $("#chkOCeano").on("click", function(event) {
      if ($(this).is(":checked")) {
        return $("#divBaciaSedimentar").show();
      } else {
        return $("#divBaciaSedimentar").hide();
      }
    });
    return $("#divBaciaSedimentar").hide();
  });


  /*
  Descrição: Pesquisa ocorrências cadastradas conforme os parâmetros específicados.
  Função utilizada na guia de Consulta.
  Autor: Marcos Júnior Lopes.
  Data: 14/07/2014
   */

  consultarOcorrencias = function(tpProd, uf, origem, dtIni, dtFim, eOceano, baciaSedimentar) {
    var dataCadastrada, dataIncidente, diaSemana, headersTable, municipioUf, query, registroTemp, rest;
    registroTemp = new Array();
    query = "";
    query = " validado = 'S'";
    switch (tpProd) {
      case "0":
        query += " AND produtos_onu <> '{}'";
        break;
      case "1":
        query += " AND produtos_outro <> '{}'";
        break;
      default:
        query += "";
    }
    if (uf !== "") {
      if (query.length !== 0) {
        query += " AND ";
      }
      query += "uf='" + uf + "'";
    }
    if (origem !== "") {
      if (query.length !== 0) {
        query += " AND ";
      }
      query += " origem = '{" + origem + "}'";
    }
    if (dtIni !== "" && dtFim !== "") {
      if (query.length !== 0) {
        query += " AND ";
      }
      query += " (dt_ocorrencia >= '" + dtIni + "' AND " + "dt_ocorrencia <= '" + dtFim + "')";
    }
    if (eOceano) {
      if (query.length !== 0) {
        query += " AND ";
      }
      query += "bacia_sedimentar is not null";
    }
    if (baciaSedimentar !== "" && eOceano) {
      if (query.length !== 0) {
        query += " AND ";
      }
      query += "bacia_sedimentar='" + baciaSedimentar + "'";
    }
    H5.Data.restURL = "//" + document.location.host + document.location.pathname + "/rest";
    rest = new H5.Rest({
      url: H5.Data.restURL,
      table: "vw_ocorrencia_consulta",
      fields: "cast( id_ocorrencia AS text) AS id_ocorrencia, nro_ocorrencia, to_char(dt_registro,'DD/MM/YYYY') AS dt_registro, to_char(dt_ocorrencia,'DD/MM/YYYY') AS dt_ocorrencia, to_char(dt_primeira_obs,'DD/MM/YYYY') AS dt_primeira_obs, municipio, uf, array_to_string(origem,'; ') AS origem, array_to_string(tipo_evento,'; ') AS tipo_evento, array_to_string(tipos_danos_identificados,'; ') AS tipos_danos_identificados, array_to_string(institiuicoes_atuando_local,'; ') AS institiuicoes_atuando_local, array_to_string(tipos_fontes_informacoes,'; ') AS tipos_fontes_informacoes, dia_semana, dia_semana_primeira_obs, dia_semana_registro, periodo_ocorrencia, dt_ocorrencia_feriado, array_to_string(produtos_onu,'; ') AS produtos_onu, array_to_string(produtos_outro,'; ') AS produtos_outro, validado",
      parameters: query
    });
    console.log(query);
    dataIncidente = "";
    diaSemana = "";
    dataCadastrada = false;
    municipioUf = "";
    $.each(rest.data, function(index, dt) {
      var dataIncCadastrada, dataObsCadastrada;
      dataIncidente = "";
      diaSemana = "";
      dataCadastrada = false;
      municipioUf = "";
      dataIncCadastrada = !(dt.dt_ocorrencia === null || dt.dt_ocorrencia === "");
      dataObsCadastrada = !(dt.dt_primeira_obs === null || dt.dt_primeira_obs === "");
      if (dataIncCadastrada) {
        dataIncidente = dt.dt_ocorrencia;
        diaSemana = dt.dia_semana;
      } else if (dataObsCadastrada) {
        dataIncidente = dt.dt_primeira_obs;
        diaSemana = dt.dia_semana_primeira_obs;
      } else {
        dataIncidente = dt.dt_registro;
        diaSemana = dt.dia_semana_registro;
      }
      municipioUf = municipioUf.concat(dt.municipio, " - ", dt.uf);
      dataIncidente += " ";
      return registroTemp[registroTemp.length] = new Array(dt.nro_ocorrencia, dataIncidente, municipioUf, dt.origem, dt.tipo_evento, dt.produtos_onu, dt.produtos_outro, dt.tipos_danos_identificados, dt.institiuicoes_atuando_local, dt.tipos_fontes_informacoes, diaSemana, dt.periodo_ocorrencia, dt.dt_ocorrencia_feriado);
    });
    if (registroTemp.length > 0) {
      $("#optionsExport").show();
    } else {
      $("#optionsExport").hide();
    }
    headersTable = getHeadersColumnsResults();
    $('#resultsConsult').html('<table cellpadding="0" cellspacing="0" border="0"  id="resultTable"></table>');
    return $('#resultTable').dataTable({
      "dom": "T<'clear'>lfrtip",
      "data": registroTemp,
      "columns": headersTable,
      "oLanguage": {
        "sLengthMenu": "Mostrar _MENU_ registros por página",
        "sZeroRecords": "Nenhum registro encontrado",
        "sInfo": "Mostrando _END_ de _TOTAL_ registro(s)",
        "sInfoEmpty": "Mostrando 0 de 0 registros",
        "sInfoFiltered": "(filtrado de _MAX_ registros)",
        "sSearch": "Pesquisar: ",
        "oPaginate": {
          "sFirst": "Início",
          "sPrevious": "Anterior",
          "sNext": "Próximo",
          "sLast": "Último"
        }
      }
    });
  };

  setFilter = function() {
    var baciaSedimentar, dtFim, dtIni, eOceano, filterOrigem, filterTipo, filterUF;
    filterTipo = $("#tipoProd").val();
    filterUF = $("#dropConsultUF").val() === "Todos" ? "" : $("#dropConsultUF").val();
    filterOrigem = $("#originsConsultSlct").val() === "Todos" ? "" : $("#originsConsultSlct").val();
    if ($("#chkAllDates").is(":checked")) {
      dtIni = "";
      dtFim = "";
    } else {
      dtIni = $("#dateStart").val();
      dtFim = $("#dateFinish").val();
    }
    eOceano = $("#chkOCeano").is(":checked");
    baciaSedimentar = $("#baciaConsultSlct").val() === "Todos" ? "" : $("#baciaConsultSlct").val();
    return consultarOcorrencias(filterTipo, filterUF, filterOrigem, dtIni, dtFim, eOceano, baciaSedimentar);
  };

  $("#btnExport").on("click", function(event) {
    if ($("#tipoExport").val() === "0") {
      return exportCSV();
    } else {
      return exportPDF();
    }
  });

  $("#btnExportXls").on("click", function(event) {
    $("#tipoExport").val("0");
    return $("#modalExport").modal();
  });

  $("#btnExportPdf").on("click", function(event) {
    $("#tipoExport").val("1");
    return $("#modalExport").modal();
  });

  exportCSV = function() {
    var csv;
    csv = generateConsultCSV();
    return window.open("data:text/csv;charset:utf-8," + escape(csv));
  };

  exportPDF = function() {
    var OrigemSelect, UfSelect, arrayResults, datasPreenchidas, definationPdf, dtCadastro, qtdeReg, tpProdutoSelect;
    tpProdutoSelect = $("#tipoProd :selected").text();
    UfSelect = $("#dropConsultUF").val();
    OrigemSelect = $("#originsConsultSlct").val();
    qtdeReg = 0;
    datasPreenchidas = $("#dateStart").val() !== "" && $("#dateFinish").val() !== "";
    if ($("#chkAllDates").is(":checked") || !datasPreenchidas) {
      dtCadastro = "Todas";
    } else {
      dtCadastro = $("#dateStart").val() + " a " + $("#dateFinish").val();
    }
    arrayResults = getContentExportConsult();
    qtdeReg = arrayResults.length - 1;
    definationPdf = {
      pageSize: "A4",
      pageOrientation: "landscape",
      footer: function(currentPage, pageCount) {
        return {
          text: "Página " + currentPage.toString() + " de " + pageCount,
          margin: [0, 10, 40, 0],
          alignment: "right"
        };
      },
      content: [
        {
          text: "Relatório Sistema SIEMA",
          bold: true,
          fontSize: 18,
          margin: [0, 0, 0, 10]
        }, {
          text: [
            "Tipo de Produto: ", {
              text: tpProdutoSelect,
              bold: true
            }
          ]
        }, {
          text: [
            "Estado(UF): ", {
              text: UfSelect,
              bold: true
            }
          ]
        }, {
          text: [
            "Origem: ", {
              text: OrigemSelect,
              bold: true
            }
          ]
        }, {
          text: [
            "Data de Cadastro: ", {
              text: dtCadastro,
              bold: true
            }
          ],
          margin: [0, 0, 0, 10]
        }, {
          text: [
            {
              text: "Total de registro(s): " + qtdeReg,
              bold: true
            }
          ],
          margin: [0, 0, 0, 10]
        }, {
          table: {
            headerRows: 1,
            body: ""
          }
        }
      ],
      styles: {
        header: {
          bold: true
        }
      }
    };
    definationPdf.content[6].table.body = arrayResults;
    return pdfMake.createPdf(definationPdf).open();
  };

  generateConsultCSV = (function(_this) {
    return function() {
      var col, cont, line, row, str, table, value, _i, _j, _len, _len1;
      str = "";
      line = "";
      cont = 0;
      table = getContentExportConsult();
      for (_i = 0, _len = table.length; _i < _len; _i++) {
        row = table[_i];
        line = "";
        for (_j = 0, _len1 = row.length; _j < _len1; _j++) {
          col = row[_j];
          value = cont === 0 ? col.text : col;
          line += "\"" + value + "\",";
        }
        str += line + "\r\n";
        cont++;
      }
      return str;
    };
  })(this);

  getContentExportConsult = function() {
    var arrayColunasExport, arrayHeaders, arrayResults, arrayTemp;
    arrayTemp = new Array();
    arrayHeaders = new Array();
    arrayColunasExport = new Array();
    arrayResults = new Array();
    $("#divOpColunas input[type='checkbox']").each(function(index, checkbox) {
      if ($(this).is(":checked")) {
        arrayHeaders[arrayHeaders.length] = {
          text: $(this).val(),
          style: "header"
        };
        return arrayColunasExport[arrayColunasExport.length] = $(this).attr("id");
      }
    });
    if (arrayHeaders.length === 0) {
      $("#divOpColunas input[type='checkbox']").each(function(index, checkbox) {
        arrayHeaders[arrayHeaders.length] = {
          text: $(this).val(),
          style: "header"
        };
        return arrayColunasExport[arrayColunasExport.length] = $(this).attr("id");
      });
    }
    arrayResults[arrayResults.length] = arrayHeaders;
    $("#resultTable").DataTable().rows().data().each(function(row, index) {
      arrayTemp = [];
      $(row).each(function(indexCol, col) {
        if ($.inArray(indexCol.toString(), arrayColunasExport) !== -1) {
          if (col === null) {
            return arrayTemp[arrayTemp.length] = "";
          } else {
            return arrayTemp[arrayTemp.length] = typeof col !== "object" ? col : col.text;
          }
        }
      });
      return arrayResults[arrayResults.length] = arrayTemp;
    });
    return arrayResults;
  };

  getHeadersColumnsResults = function() {
    var columnsResultsConsulta;
    columnsResultsConsulta = new Array({
      "title": "Número de Registro"
    }, {
      "title": "Data do Incidente"
    }, {
      "title": "Município/UF"
    }, {
      "title": "Origem"
    }, {
      "title": "Tipo de Evento"
    }, {
      "title": "Produtos ONU"
    }, {
      "title": "Outros Produtos"
    }, {
      "title": "Ocorrências/Ambientes Atingidos"
    }, {
      "title": "Inst. Atuando no Local"
    }, {
      "title": "Fontes de Informação"
    }, {
      "title": "Dia da Semana"
    }, {
      "title": "Período"
    }, {
      "title": "Feriado"
    });
    return columnsResultsConsulta;
  };

}).call(this);
