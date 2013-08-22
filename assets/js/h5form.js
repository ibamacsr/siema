// Generated by CoffeeScript 1.6.3
(function() {
  $(document).ready(function() {
    var Marker, addSelection, bingKey, binghybrid, collapse, date, disabled, history, latlng, nroComunicado, seconds, value, _tipoDanoIdentificado, _tipoEvento, _tipoFonteInformacao, _tipoInstituicaoAtuando, _tipoLocalizacao;
    _tipoLocalizacao = null;
    _tipoEvento = null;
    _tipoDanoIdentificado = null;
    _tipoInstituicaoAtuando = null;
    _tipoFonteInformacao = null;
    history = [];
    collapse = 1;
    $('#addMeModal').on('hidden', function() {
      var btnBack;
      history = [];
      collapse = 1;
      btnBack = document.getElementById("modalBtnBack");
      btnBack.href = '#tab1';
      $("#modalBtnBack").tab('show');
      $("#modalBtnNext").prop('style', '');
      $("#submit").prop('style', 'display:none;');
      return $(".modal-footer").show();
    });
    if (!$("#comunicado").val()) {
      date = new Date();
      seconds = parseInt(date.getSeconds() + (date.getHours() * 60 * 60), 10);
      nroComunicado = "" + parseInt(date.getFullYear(), 10) + parseInt(date.getMonth() + 1, 10) + parseInt(date.getDate(), 10) + seconds;
      $("#comunicado").val(nroComunicado);
      $("#nroComunicado").html(nroComunicado);
    }
    $("#modalBtnBack").click(function(event) {
      var btnNext, tab;
      event.preventDefault();
      btnNext = document.getElementById("modalBtnNext");
      if (history.length > 0) {
        tab = history.pop();
        this.href = tab.tab;
        collapse = tab.collapse;
      }
      if (("#tab" + collapse) === "#tab2") {
        $(".modal-footer").hide();
      } else {
        $(".modal-footer").show();
      }
      if (("#tab" + collapse) === "#tab7") {
        $(btnNext).prop('style', '');
        $("#submit").prop('style', 'display:none;');
      }
      return $(this).tab('show');
    });
    $("#modalBtnNext").click(function(event) {
      var action, checkedUser, containerProgress, defaultHtml, hasOleo, i, isAcidOleo, isAtual, isOutros, isPubExt, isServIBAMA, progressAnimetion, progressBar, rest, textProgress, tipoForm;
      event.preventDefault();
      history.push({
        tab: "#tab" + collapse,
        collapse: collapse
      });
      this.href = "#tab" + ++collapse;
      if (("#tab" + collapse) === "#tab2") {
        progressBar = document.getElementById("authProgress");
        textProgress = document.getElementById("textProgress");
        containerProgress = document.getElementById("containerProgress");
        checkedUser = document.getElementById("checkedUser");
        tipoForm = document.getElementById("tipoForm");
        $(tipoForm).hide();
        i = 0;
        progressAnimetion = setInterval(function() {
          $(progressBar).width(i++ + "0%");
          if (i === 15) {
            $(containerProgress).hide();
            $(textProgress).hide();
            $(textProgress).html('Usuário registrado.');
            $(textProgress).fadeToggle();
            $(checkedUser).show();
            $(tipoForm).show();
            return clearInterval(progressAnimetion);
          }
        }, 100);
        $(".modal-footer").hide();
      } else {
        $(".modal-footer").show();
        if (("#tab" + collapse) === "#tab4") {
          isPubExt = document.getElementById("radioPubExt").checked;
          if (isPubExt) {
            collapse = 5;
            this.href = "#tab" + 5;
          }
        } else if (("#tab" + collapse) === "#tab8") {
          isAcidOleo = document.getElementById("optionsAcidenteOleo").checked;
          isOutros = document.getElementById("optionsAcidenteOutros").checked;
          isAtual = document.getElementById("optionsAtualizarAcidente").checked;
          hasOleo = document.getElementById("hasOleo");
          isServIBAMA = document.getElementById("isServIBAMA");
          if (isAtual) {
            rest = new H5.Rest({
              url: "../../../siema/rest_v2",
              table: "tipo_dano_identificado",
              fields: "id_tipo_dano_identificado, nome",
              order: "id_tipo_dano_identificado"
            });
          }
          hasOleo.checked = isAcidOleo;
        }
      }
      if (("#tab" + collapse) === "#tab8") {
        $("#submit").prop('style', '');
        $("#modalBtnNext").prop('style', 'display:none;');
        if (isAtual) {
          if ($("#inputRegistro").prop("value") !== "") {
            defaultHtml = document.getElementById("defaultHtml");
            if (defaultHtml.innerHTML === "") {
              defaultHtml.innerHTML = $("#formLoad").prop("action");
            }
            action = defaultHtml.innerHTML + "/" + $("#inputRegistro").prop("value");
            $("#formLoad").prop("action", action);
            $("#formLoad").submit();
          } else {
            $("#inputRegistro").focus();
          }
        } else {
          $("#formCreate").submit();
        }
      }
      return $(this).tab('show');
    });
    $("#tipoForm").click(function(event) {
      event.preventDefault();
      history.push({
        tab: "#tab2",
        collapse: collapse
      });
      this.href = "#tab7";
      collapse = 7;
      $(".modal-footer").show();
      return $(this).tab('show');
    });
    $("#denunciaAnonima").click(function(event) {
      event.preventDefault();
      history.push({
        tab: "#tab2",
        collapse: collapse
      });
      this.href = "#tab7";
      collapse = 7;
      $(".modal-footer").show();
      return $(this).tab('show');
    });
    $("#btnCadastrar").click(function(event) {
      event.preventDefault();
      history.push({
        tab: "#tab2",
        collapse: collapse
      });
      this.href = "#tab3";
      collapse = 3;
      $(".modal-footer").show();
      return $(this).tab('show');
    });
    bingKey = "AsyRHq25Hv8jQbrAIVSeZEifWbP6s1nq1RQfDeUf0ycdHogebEL7W2dxgFmPJc9h";
    binghybrid = new L.BingLayer(bingKey, {
      type: "AerialWithLabels",
      attribution: ""
    });
    $('#minimap').css("height", "205px");
    $('#minimap').css("width", "100%");
    $('#minimap').css("box-shadow", "0 0 0 1px rgba(0, 0, 0, 0.15)");
    $('#minimap').css("border-radius", "4px");
    Marker = new L.Marker([0, 0], {
      draggable: true
    });
    Marker.on("move", function(event) {
      $("#inputLat").prop("value", event.latlng.lat);
      $("#inputLng").prop("value", event.latlng.lng);
      $("#inputEPSG").prop("value", "4674");
      return $("#inputEPSG").prop("disabled", "disabled");
    });
    H5.Map.minimap = new L.Map("minimap", {
      center: new L.LatLng(-10.0, -58.0),
      zoom: 6,
      layers: [binghybrid],
      zoomControl: true
    });
    $("#inputLat, #inputLng").on('change', function() {
      var latlng;
      if ((($("#inputLat").prop("value")) !== "") && (($("#inputLng").prop("value")) !== "")) {
        if (H5.Map.minimap.hasLayer(Marker)) {
          latlng = new L.LatLng($("#inputLat").prop("value"), $("#inputLng").prop("value"));
          Marker.setLatLng(latlng).update();
        }
      }
      $("#inputEPSG").prop("value", "");
      return $("#inputEPSG").removeAttr("disabled");
    });
    H5.Map.minimap.on("click", function(event) {
      if (!H5.Map.minimap.hasLayer(Marker)) {
        H5.Map.minimap.addLayer(Marker);
      }
      Marker.setLatLng(event.latlng).update();
      $("#inputLat").prop("value", event.latlng.lat);
      $("#inputLng").prop("value", event.latlng.lng);
      $("#inputEPSG").prop("value", "4674");
      return $("#inputEPSG").prop("disabled", "disabled");
    });
    if ((($("#inputLat").prop("value")) !== "") && (($("#inputLng").prop("value")) !== "")) {
      latlng = new L.LatLng($("#inputLat").prop("value"), $("#inputLng").prop("value"));
      disabled = $("#inputEPSG").prop("disabled");
      value = $("#inputEPSG").prop("value");
      Marker.setLatLng(latlng).update();
      $("#inputEPSG").prop("disabled", disabled);
      $("#inputEPSG").prop("value", value);
      H5.Map.minimap.addLayer(Marker);
    }
    addSelection = function(idField, value) {
      var field;
      field = document.getElementById(idField);
      return field.innerHTML = value;
    };
    return $(function() {
      var labelOutros, rest, tipoDanoIdentificado, tipoEvento, tipoFonteInformacao, tipoInstituicaoAtuando, tipoLocalizacao, total;
      tipoLocalizacao = document.getElementById("tipoLocalizacao");
      rest = new H5.Rest({
        url: "../../../../siema/rest_v2",
        table: "tipo_localizacao",
        fields: "id_tipo_localizacao, des_tipo_localizacao",
        order: "id_tipo_localizacao"
      });
      total = rest.data.length;
      labelOutros = "";
      $.each(rest.data, function(key, value) {
        var input, label, span;
        input = document.createElement("input");
        input.id = "TL" + value.id_tipo_localizacao;
        input.name = "tipoLocalizacao[]";
        input.type = "checkbox";
        input.value = value.id_tipo_localizacao;
        if (($("#semOrigem").attr("checked")) != null) {
          input.disabled = "disabled";
        }
        $("span[data-id='postTL']").each(function() {
          if (this.innerHTML === input.value) {
            input.checked = "checked";
            $(this).remove();
            return addSelection('labelInputCompOrigem', value.des_tipo_localizacao);
          }
        });
        $(input).click(function() {
          if ($(this).is(":checked")) {
            return addSelection('labelInputCompOrigem', value.des_tipo_localizacao);
          }
        });
        span = document.createElement("span");
        span.innerHTML = value.des_tipo_localizacao;
        label = document.createElement("label");
        $(label).addClass("checkbox");
        $(label).append(input, span);
        if (value.des_tipo_localizacao !== "Outro(s)") {
          return $(tipoLocalizacao).append(label);
        } else {
          return labelOutros = label;
        }
      });
      $(tipoLocalizacao).append(labelOutros);
      _tipoLocalizacao = tipoLocalizacao;
      tipoEvento = document.getElementById("tipoEvento");
      rest = new H5.Rest({
        url: "../../../../siema/rest_v2",
        table: "tipo_evento",
        fields: "id_tipo_evento, nome",
        order: "id_tipo_evento"
      });
      total = rest.data.length;
      labelOutros = "";
      $.each(rest.data, function(key, value) {
        var input, label, span;
        input = document.createElement("input");
        input.id = "TE" + value.id_tipo_evento;
        input.name = "tipoEvento[]";
        input.type = "checkbox";
        input.value = value.id_tipo_evento;
        if (($("#semEvento").attr("checked")) != null) {
          input.disabled = "disabled";
        }
        $("span[data-id='postTE']").each(function() {
          if (this.innerHTML === input.value) {
            input.checked = "checked";
            return $(this).remove();
          }
        });
        $(input).click(function() {
          if ($(this).is(":checked")) {
            return addSelection('labelInputCompEvento', value.nome);
          }
        });
        span = document.createElement("span");
        span.innerHTML = value.nome;
        label = document.createElement("label");
        $(label).addClass("checkbox");
        $(label).append(input, span);
        if (value.nome !== "Outro(s)") {
          return $(tipoEvento).append(label);
        } else {
          return labelOutros = label;
        }
      });
      $(tipoEvento).append(labelOutros);
      _tipoEvento = tipoEvento;
      tipoDanoIdentificado = document.getElementById("tipoDanoIdentificado");
      rest = new H5.Rest({
        url: "../../../../siema/rest_v2",
        table: "tipo_dano_identificado",
        fields: "id_tipo_dano_identificado, nome",
        order: "id_tipo_dano_identificado"
      });
      total = rest.data.length;
      labelOutros = "";
      $.each(rest.data, function(key, value) {
        var input, label, span;
        input = document.createElement("input");
        input.id = "TDI" + value.id_tipo_dano_identificado;
        input.name = "tipoDanoIdentificado[]";
        input.type = "checkbox";
        input.value = value.id_tipo_dano_identificado;
        if (($("#semDanos").attr("checked")) != null) {
          input.disabled = "disabled";
        }
        $("span[data-id='postTDI']").each(function() {
          if (this.innerHTML === input.value) {
            input.checked = "checked";
            return $(this).remove();
          }
        });
        $(input).click(function() {
          if ($(this).is(":checked")) {
            return addSelection('labelInputCompDano', value.nome);
          }
        });
        span = document.createElement("span");
        span.innerHTML = value.nome;
        label = document.createElement("label");
        $(label).addClass("checkbox");
        $(label).append(input, span);
        if (value.nome !== "Outro(s)") {
          return $(tipoDanoIdentificado).append(label);
        } else {
          return labelOutros = label;
        }
      });
      $(tipoDanoIdentificado).append(labelOutros);
      _tipoDanoIdentificado = tipoDanoIdentificado;
      tipoInstituicaoAtuando = document.getElementById("tipoInstituicaoAtuando");
      rest = new H5.Rest({
        url: "../../../../siema/rest_v2",
        table: "instituicao_atuando_local",
        fields: "id_instituicao_atuando_local, nome",
        order: "id_instituicao_atuando_local"
      });
      total = rest.data.length;
      labelOutros = "";
      $.each(rest.data, function(key, value) {
        var input, label, span;
        input = document.createElement("input");
        input.id = "IAL" + value.id_instituicao_atuando_local;
        input.name = "instituicaoAtuandoLocal[]";
        input.type = "checkbox";
        input.value = value.id_instituicao_atuando_local;
        if (($("#semInstituicao").attr("checked")) != null) {
          input.disabled = "disabled";
        }
        $("span[data-id='postIAL']").each(function() {
          if (this.innerHTML === input.value) {
            input.checked = "checked";
            return $(this).remove();
          }
        });
        $(input).click(function() {
          if ($(this).is(":checked")) {
            return addSelection('labelInputCompInstituicao', value.nome);
          }
        });
        span = document.createElement("span");
        span.innerHTML = value.nome;
        label = document.createElement("label");
        $(label).addClass("checkbox");
        $(label).append(input, span);
        if (value.nome !== "Outra(s)") {
          return $(tipoInstituicaoAtuando).append(label);
        } else {
          return labelOutros = label;
        }
      });
      $(tipoInstituicaoAtuando).append(labelOutros);
      _tipoInstituicaoAtuando = tipoInstituicaoAtuando;
      tipoFonteInformacao = document.getElementById("tipoFonteInformacao");
      rest = new H5.Rest({
        url: "../../../../siema/rest_v2",
        table: "tipo_fonte_informacao",
        fields: "id_tipo_fonte_informacao, nome",
        order: "id_tipo_fonte_informacao"
      });
      total = rest.data.length;
      labelOutros = "";
      $.each(rest.data, function(key, value) {
        var input, label, span;
        input = document.createElement("input");
        input.id = "TFI" + value.id_tipo_fonte_informacao;
        input.name = "tipoFonteInformacao[]";
        input.type = "checkbox";
        input.value = value.id_tipo_fonte_informacao;
        $("span[data-id='postTFI']").each(function() {
          if (this.innerHTML === input.value) {
            input.checked = "checked";
            return $(this).remove();
          }
        });
        span = document.createElement("span");
        span.innerHTML = value.nome;
        label = document.createElement("label");
        $(label).addClass("checkbox");
        $(label).append(input, span);
        if (value.nome !== "Outra(s)") {
          return $(tipoFonteInformacao).append(label);
        } else {
          return labelOutros = label;
        }
      });
      $(tipoFonteInformacao).append(labelOutros);
      _tipoFonteInformacao = tipoFonteInformacao;
      $("#semLocalizacao").on('click', function() {
        if ($(this).is(":checked")) {
          $("#inputLat").attr("disabled", "disabled");
          $("#inputLng").attr("disabled", "disabled");
          $("#inputMunicipio").attr("disabled", "disabled");
          $("#inputUF").attr("disabled", "disabled");
          $("#inputEndereco").attr("disabled", "disabled");
          $("#btnAddToMap").attr("disabled", "disabled");
          return $("button[data-id='slctLicenca']").attr("disabled", "disabled");
        } else {
          $("#inputLat").removeAttr("disabled");
          $("#inputLng").removeAttr("disabled");
          $("#inputMunicipio").removeAttr("disabled");
          $("#inputUF").removeAttr("disabled");
          $("#inputEndereco").removeAttr("disabled");
          $("#btnAddToMap").removeAttr("disabled");
          return $("button[data-id='slctLicenca']").removeAttr("disabled");
        }
      });
      $("#semNavioInstalacao").on('click', function() {
        if ($(this).is(":checked")) {
          $("#inputNomeNavio").attr("disabled", "disabled");
          return $("#inputNomeInstalacao").attr("disabled", "disabled");
        } else {
          $("#inputNomeNavio").removeAttr("disabled");
          return $("#inputNomeInstalacao").removeAttr("disabled");
        }
      });
      $("#semDataObs").on('click', function() {
        if ($(this).is(":checked")) {
          $("#inputDataObs").attr("disabled", "disabled");
          $("#inputHoraObs").attr("disabled", "disabled");
          $("#PerObsMatu").attr("disabled", "disabled");
          $("#PerObsVesper").attr("disabled", "disabled");
          $("#PerObsNotu").attr("disabled", "disabled");
          return $("#PerObsMadru").attr("disabled", "disabled");
        } else {
          $("#inputDataObs").removeAttr("disabled");
          $("#inputHoraObs").removeAttr("disabled");
          $("#PerObsMatu").removeAttr("disabled");
          $("#PerObsVesper").removeAttr("disabled");
          $("#PerObsNotu").removeAttr("disabled");
          return $("#PerObsMadru").removeAttr("disabled");
        }
      });
      $("#semDataInic").on('click', function() {
        if ($(this).is(":checked")) {
          $("#inputDataInic").attr("disabled", "disabled");
          $("#inputHoraInic").attr("disabled", "disabled");
          $("#PerInicMatu").attr("disabled", "disabled");
          $("#PerInicVesper").attr("disabled", "disabled");
          $("#PerInicNotu").attr("disabled", "disabled");
          return $("#PerInicMadru").attr("disabled", "disabled");
        } else {
          $("#inputDataInic").removeAttr("disabled");
          $("#inputHoraInic").removeAttr("disabled");
          $("#PerInicMatu").removeAttr("disabled");
          $("#PerInicVesper").removeAttr("disabled");
          $("#PerInicNotu").removeAttr("disabled");
          return $("#PerInicMadru").removeAttr("disabled");
        }
      });
      $("#semOrigem").on('click', function() {
        if ($(this).is(":checked")) {
          $("input[name='tipoLocalizacao[]']").each(function() {
            return $(this).attr("disabled", "disabled");
          });
          $("#inputOrigemOutro").attr("disabled", "disabled");
          return $("#inputCompOrigem").attr("disabled", "disabled");
        } else {
          $("input[name='tipoLocalizacao[]']").each(function() {
            return $(this).removeAttr("disabled");
          });
          $("#inputOrigemOutro").removeAttr("disabled");
          return $("#inputCompOrigem").removeAttr("disabled");
        }
      });
      $("#semEvento").on('click', function() {
        if ($(this).is(":checked")) {
          $("input[name='tipoEvento[]']").each(function() {
            return $(this).attr("disabled", "disabled");
          });
          $("#inputEventoOutro").attr("disabled", "disabled");
          return $("#inputCompEvento").attr("disabled", "disabled");
        } else {
          $("input[name='tipoEvento[]']").each(function() {
            return $(this).removeAttr("disabled");
          });
          $("#inputEventoOutro").removeAttr("disabled");
          return $("#inputCompEvento").removeAttr("disabled");
        }
      });
      $("#semSubstancia").on('click', function() {
        if ($(this).is(":checked")) {
          $("#inputTipoSubstancia").attr("disabled", "disabled");
          return $("#inputValorEstimado").attr("disabled", "disabled");
        } else {
          $("#inputTipoSubstancia").removeAttr("disabled");
          return $("#inputValorEstimado").removeAttr("disabled");
        }
      });
      $("#semCausa").on('click', function() {
        if ($(this).is(":checked")) {
          return $("#inputCausaProvavel").attr("disabled", "disabled");
        } else {
          return $("#inputCausaProvavel").removeAttr("disabled");
        }
      });
      $("#semDanos").on('click', function() {
        if ($(this).is(":checked")) {
          $("input[name='tipoDanoIdentificado[]']").each(function() {
            return $(this).attr("disabled", "disabled");
          });
          $("#inputDanoOutro").attr("disabled", "disabled");
          $("#inputCompDano").attr("disabled", "disabled");
          return $("#inputDesDanos").attr("disabled", "disabled");
        } else {
          $("input[name='tipoDanoIdentificado[]']").each(function() {
            return $(this).removeAttr("disabled");
          });
          $("#inputDanoOutro").removeAttr("disabled");
          $("#inputCompDano").removeAttr("disabled");
          return $("#inputDesDanos").removeAttr("disabled");
        }
      });
      $("#semInstituicao").on('click', function() {
        if ($(this).is(":checked")) {
          $("input[name='instituicaoAtuandoLocal[]']").each(function() {
            return $(this).attr("disabled", "disabled");
          });
          $("#inputInstituicaoOutro").attr("disabled", "disabled");
          return $("#inputCompInstituicao").attr("disabled", "disabled");
        } else {
          $("input[name='instituicaoAtuandoLocal[]']").each(function() {
            return $(this).removeAttr("disabled");
          });
          $("#inputInstituicaoOutro").removeAttr("disabled");
          return $("#inputCompInstituicao").removeAttr("disabled");
        }
      });
      return $("#semResponsavel").on('click', function() {
        if ($(this).is(":checked")) {
          $("#inputResponsavel").attr("disabled", "disabled");
          $("#inputCPFCNPJ").attr("disabled", "disabled");
          return $("#slctLicenca").attr("disabled", "disabled");
        } else {
          $("#inputResponsavel").removeAttr("disabled");
          $("#inputCPFCNPJ").removeAttr("disabled");
          return $("#slctLicenca").removeAttr("disabled");
        }
      });
    });
  });

}).call(this);
