'use strict';

/**
 * @ngdoc function
 * @name estatisticasApp.controller:AcidenteCtrl
 * @description
 * # AcidenteCtrl
 * Controller of the estatisticasApp
 */
angular.module('estatisticasApp')
  .controller('AcidenteCtrl', function ($scope, RestApi, $routeParams, $location, Upload, $http) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.accordions = ['localizacao',
                         'mapa',
                         'datas',
                         'origem',
                         'evento',
                         'produtos',
                         'detalhes',
                         'ambiente',
                         'empresa',
                         'instituicao',
                         'acoes',
                         'gerais',
                         'comunicante',
                         'fonte'];

    angular.forEach($scope.accordions, function(obj) {
      $scope[obj] = {};
      $scope[obj].subPanel = "";
    });

    $scope.carregaParametros = function() {

      if ($routeParams.id) {
        $scope.nro_ocorrencia = $routeParams.id;
      }

      if ($routeParams.acao && ($routeParams.acao == 'carregar')) {
        $scope.acao = 'carregar';
      } else {
        $scope.acao = 'criar';
        if ($routeParams.oleo && ($routeParams.oleo == 'true')) {
          $scope.oleo = true;
        } else {
          $scope.oleo = false;
        }
      }

      if ($routeParams.usuario) {
        $scope.usuario = $routeParams.usuario;
        $scope.email = $routeParams.email;
      } else {
        $scope.usuario = null;
      }

      if ($routeParams.validador) {
        $scope.validador = {};
        $scope.validador.ativado = $routeParams.validador;
        $scope.validador.validado = false;
      }

      if ($routeParams.comunicante) {
        $scope.tipo_comunicante = $routeParams.comunicante;
      }

    };

    $scope.carregaParametros();

    // $scope.nro_ocorrencia = '201531732431';
    // $scope.nro_ocorrencia = '201491928814';
    // $scope.nro_ocorrencia = '201492328850';
    // $scope.nro_ocorrencia = '201491939644';
    // $scope.nro_ocorrencia = '201492528839';
    // $scope.nro_ocorrencia = '201491936043';
    // $scope.nro_ocorrencia = '201492436012';
    // $scope.nro_ocorrencia = '201491950448';
    // $scope.nro_ocorrencia = '2014121639650';

    $scope.rests = 0;

    RestApi.query({query: 'ufs'},
      function success(data, status){
        $scope.ufs = [];
        angular.forEach(data, function(value, key){
          $scope.ufs.push({'name' : value.sigla, 'value': value.id_uf});
        });
        $scope.rests++;
        $scope.$broadcast('carregar_occur', $scope.rests);
      }
    );


    RestApi.query({query: 'bacias'},
      function success(data, status){
        $scope.bacias = [];
        angular.forEach(data, function(value, key){
          $scope.bacias.push({'name' : value.nome, 'value': value.id_bacia_sedimentar});
        });
        $scope.rests++;
        $scope.$broadcast('carregar_occur', $scope.rests);
      }
    );

    RestApi.query({query: 'origens'},
      function success(data, status){
        $scope.origens = [];
        angular.forEach(data, function(value, key){
          $scope.origens.push({'name' : value.des_tipo_localizacao, 'id': value.id_tipo_localizacao, 'value': false});
        });
        $scope.rests++;
        $scope.$broadcast('carregar_occur', $scope.rests);
      }
    );

    RestApi.query({query: 'eventos'},
      function success(data, status){
        $scope.eventos = [];
        angular.forEach(data, function(value, key){
          $scope.eventos.push({'name' : value.nome, 'id': value.id_tipo_evento, 'value': false});
        });
        $scope.rests++;
        $scope.$broadcast('carregar_occur', $scope.rests);
      }
    );

    RestApi.query({query: 'ambientes'},
      function success(data, status){
        $scope.ambientes = [];
        angular.forEach(data, function(value, key){
          $scope.ambientes.push({'name' : value.nome, 'id': value.id_tipo_dano_identificado, 'value': false});
        });
        $scope.rests++;
        $scope.$broadcast('carregar_occur', $scope.rests);
      }
    );

    RestApi.query({query: 'instituicoes'},
      function success(data, status){
        $scope.instituicoes = [];
        angular.forEach(data, function(value, key){
          $scope.instituicoes.push({'name' : value.nome, 'id': value.id_instituicao_atuando_local, 'value': false});
        });
        $scope.rests++;
        $scope.$broadcast('carregar_occur', $scope.rests);
      }
    );

    RestApi.query({query: 'fontes'},
      function success(data, status){
        $scope.fontes = [];
        angular.forEach(data, function(value, key){
          $scope.fontes.push({'name' : value.nome, 'id': value.id_tipo_fonte_informacao, 'value': false});
        });
        $scope.rests++;
        $scope.$broadcast('carregar_occur', $scope.rests);
      }
    );

    RestApi.query({query: 'produtos_onu'},
      function success(data, status){
        $scope.produtos_onu = [];
        angular.forEach(data, function(value, key){
          var field = value.nome + " - "+ value.num_onu + " - " + value.classe_risco;
          $scope.produtos_onu.push({'field' : field , 'id': value.id});
        });
        $scope.rests++;
        $scope.$broadcast('carregar_occur', $scope.rests);
      }
    );

    RestApi.query({query: 'produtos_outros'},
      function success(data, status){
        if(data) {
          $scope.produtos_outros = [];
          angular.forEach(data, function(value, key){
            $scope.produtos_outros.push({'field' : value.nome , 'id': value.id});
          });
        }
        $scope.rests++;
        $scope.$broadcast('carregar_occur', $scope.rests);
      }
    );


    $scope.licencas = [
      {name: 'Licen'+String.fromCharCode(231)+'a ambiental federal', value: '1'},
      {name: 'Licen'+String.fromCharCode(231)+'a ambiental estadual', value: '2'},
      {name: 'Licen'+String.fromCharCode(231)+'a ambiental municipal', value: '3'},
    ];

    $scope.unidades =  [
      {name: 'Metro C' + String.fromCharCode(250) + 'bico (m3)', value: 'm3'},
      {name: 'Litro (L)', value: 'L'},
      {name: 'Tonelada (T)', value: 'T'},
      {name: 'Quilograma (Kg)', value: 'Kg'},
    ];

    $scope.$on('carregar_occur', function(event, data){
      if ($scope.acao == 'carregar' && (data == 9)) {
        RestApi.query({query: 'carregar_ocorrencia', ocorrencia:$scope.nro_ocorrencia},
          function success(data, status){
            if(!data[0]){
              $scope.nro_ocorrencia = '';
              alert('Ocorrência não encontrada em nossos registros');
            } else{
              $scope.oleo = data[0].ocorrencia_oleo == 'S' ? true : false;
              if ($scope.validador) {
                $scope.validador.validado = data[0].validado == 'S' ? true : false;
              }

              $scope.$broadcast('carregar_localizacao', data);
              $scope.$broadcast('carregar_datas', data);
              $scope.$broadcast('carregar_origem', data);
              $scope.$broadcast('carregar_evento', data);
              $scope.$broadcast('carregar_produtos', data);
              $scope.$broadcast('carregar_detalhes', data);
              $scope.$broadcast('carregar_ambientes', data);
              $scope.$broadcast('carregar_empresa', data);
              $scope.$broadcast('carregar_instituicao', data);
              $scope.$broadcast('carregar_acoes', data);
              $scope.$broadcast('carregar_gerais', data);
              $scope.$broadcast('carregar_comunicante', data);
              // $scope.$broadcast('carregar_arquivos', ret);
              $scope.$broadcast('carregar_fonte', data);
            }
            // $scope.$apply();
          }
        );
      } else if ($scope.acao == 'deletar') {
        RestApi.query({query: 'deletar_ocorrencia'},
          function success(data, status){

          }
        );
      }
    });

    $scope.submit = function() {

      if ($scope.acao == 'criar') {

        var ocorrencia = {};

        ocorrencia.nro_ocorrencia = $scope.nro_ocorrencia;
        ocorrencia.oleo = $scope.oleo;
        ocorrencia.tipo_comunicante = $scope.tipo_comunicante;

        ocorrencia.acoes = $scope.acoes;
        ocorrencia.ambiente = $scope.ambiente;
        ocorrencia.ambiente.ambientes = [];
        angular.forEach($scope.ambientes, function(val, key){
          if(val.value)
            ocorrencia.ambiente.ambientes.push(val.id);
        });
        ocorrencia.arquivo = $scope.arquivo;
        ocorrencia.comunicante = $scope.comunicante;
        ocorrencia.datas = $scope.datas;
        ocorrencia.detalhes = $scope.detalhes;
        ocorrencia.empresa = $scope.empresa;
        ocorrencia.evento = $scope.evento;
        ocorrencia.evento.eventos = [];
        angular.forEach($scope.eventos, function(val, key){
          if(val.value)
            ocorrencia.evento.eventos.push(val.id);
        });
        ocorrencia.gerais = $scope.gerais;
        ocorrencia.instituicao = $scope.instituicao;
        ocorrencia.instituicao.instituicoes = [];
        angular.forEach($scope.instituicoes, function(val, key){
          if(val.value)
            ocorrencia.instituicao.instituicoes.push(val.id);
        });
        ocorrencia.localizacao = $scope.localizacao;
        ocorrencia.acidente = $scope.mapa.acidente.toGeoJSON();
        ocorrencia.origem = $scope.origem;
        ocorrencia.origem.origens = [];
        angular.forEach($scope.origens, function(val, key){
          if(val.value)
            ocorrencia.origem.origens.push(val.id);
        });
        ocorrencia.produtos = $scope.produtos;

        if($scope.usuario) {
          ocorrencia.fonte = $scope.fonte;
          ocorrencia.fonte.fontes = [];
          angular.forEach($scope.fontes, function(val, key){
            if(val.value)
              ocorrencia.fonte.fontes.push(val.id);
          });
        }


        var error = [];
        if(!ocorrencia.localizacao.lat)
          error.push('1. Preencha o campo de Latitude');
        if(!ocorrencia.localizacao.lng)
          error.push('1. Preencha o campo de Longitude');
        if(!ocorrencia.localizacao.uf)
          error.push('1. Preencha o campo UF');
        if(!ocorrencia.localizacao.municipio)
          error.push('1. Preencha o campo Municipio');
        if(!ocorrencia.localizacao.endereco)
          error.push('1. Preencha o campo de Endereço');

        if(!ocorrencia.datas.semIncidente){
          occur = ocorrencia.datas;
          if(!occur.diaIncidente)
            error.push('2. Preencha o campo "Data do Incidente"')
          if(!occur.horaIncidente)
            error.push('2. Preencha o campo "Hora do Incidente!');
          if(!occur.incPeriodo)
            error.push('2. Preencha o campo "Período do Incidente"');
        }

        if(!ocorrencia.datas.semObservacao){
          occur = ocorrencia.datas;
          if(!occur.diaObservacao)
            error.push('2. Preencha o campo "Data de Observação"');
          if(!occur.horaObservacao)
            error.push('2. Preencha o campo "Hora de Observacão"');
          if(!occur.obsPeriodo)
            error.push('2. Preencha o campo "Período de Observacão"');
        }

        if(!ocorrencia.origem.semOrigem){
          if(!ocorrencia.origem.origens[0]){
            error.push('3. Preencha o campo de Origem do acidente');
          }
        }

        if(!ocorrencia.evento.semEvento){
          if(!ocorrencia.evento.eventos[0]){
            error.push('4. Preencha o campo tipo de evento');
          }
        }

        if(!ocorrencia.produtos.semProduto && !ocorrencia.produtos.naoClassificado && !ocorrencia.produtos.naoAplica && !ocorrencia.produtos.naoEspecificado){
          if($scope.oleo){
            if(ocorrencia.produtos.semCondicoes){
              if(!ocorrencia.produtos.semProduto)
                var validate = true;
            }
            else{
            if(!ocorrencia.produtos.produtos_onu[0] && !ocorrencia.produtos.produtos_outros[0])
              error.push('5. Preencha o campo "Tipos de Produtos"');
            }
          }
        }

        if(!ocorrencia.detalhes.semDetalhe){
          if(!ocorrencia.detalhes.causa || ocorrencia.detalhes.causa == ''){
            error.push('6. Preencha o campo "Detalhes do Acidente"');
          }
        }

        if(!ocorrencia.ambiente.semAmbientes){
          if(!ocorrencia.ambiente.ambientes[0]){
            error.push('7. Preencha o campo de ambientes atingidos');
          }
        }

        if(!ocorrencia.empresa.semEmpresa){
          if(!ocorrencia.empresa.nome || ocorrencia.empresa.nome==''){
            error.push('8. Preencha o Campo Nome em Identificação da Empresa/Responsável');
          }
        }

        if(!ocorrencia.instituicao.semInstituicao){
          if(!ocorrencia.instituicao.instituicoes[0]){
            error.push('9. Preencha o campo de instituicao/empresa atuando no local');
          }
        }

        if(!ocorrencia.acoes.semAcoes){
          var occur = ocorrencia.acoes;
          if(occur.plano == '' && occur.planoIndividual == false){
            if(occur.outrasProvidencias){
              if(occur.outrasProvidenciasText == undefined || occur.outrasProvidenciasText == ''){
                error.push('10. O campo "Outras providencias a saber" deve ser preenchido');
              }
            }
            else
              error.push('10. Preencha acões iniciais');
          }
        }

        $scope.error = error;
        var string_ocorrencia = JSON.stringify(ocorrencia);

        // string_ocorrencia = '{"nro_ocorrencia":"201551554000","oleo":false,"localizacao":{"subPanel":"","oceano":true,"lat":"-15","lng":"-45","uf":"7","municipio":"5300108","bacia":"15","endereco":"endereço-localizacao"},"acidente":{"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":[-45,-15]}},"datas":{"subPanel":"","obsSemana":4,"semObservacao":false,"incSemana":3,"semIncidente":false,"diaObservacao":"06/05/2015","horaObservacao":"11:11","obsPeriodo":"M","diaIncidente":"05/05/2015","horaIncidente":"14:14","incPeriodo":"V","feriado":true},"origem":{"subPanel":"","complementar":"complementar-origem","semOrigem":false,"semOleoOrigem":false,"origens":["2","4","7"]},"evento":{"subPanel":"","complementar":"complementar-evento","semeventos":false,"eventos":["1","4","5"]},"produtos":{"subPanel":"","novo_onu":true,"produtos_onu":[{"id":"2636","qtd":"14","uni":"m3","field":"1, 1, 1, 2-TETRAFLUORETANO  - 3159     - 2.2","$$hashKey":"object:127"}],"novo_nao_onu":true,"produtos_outros":[{"id":"48","qtd":"14","uni":"m3","field":"café","$$hashKey":"object:144"}],"substanciaOnu":"","quantidadeOnu":"","unidadeOnu":"","substanciaOutro":"","quantidadeOutro":"","unidadeOutro":"","naoClassificado":true,"naoEspecificado":true,"naoAplica":true},"detalhes":{"subPanel":"","semDetalhe":false,"causa":"causa-detalhes"},"ambiente":{"subPanel":"","complementar":"complementar-ambientes","semAmbientes":false,"ambientes":["1","7","9"]},"empresa":{"subPanel":"","nome":"nome-responsavel","cadastro":"88888888888888888888","licencaAmbiental":"2","semEmpresa":false},"instituicao":{"subPanel":"","semInstituicao":false,"complementar":"complementar-instituição","instituicoes":["2","4","5"],"responsavel":"nome-instituicao","telefone":"(99) 99999-9999"},"acoes":{"subPanel":"","plano":"S","planoIndividual":true,"outrasProvidencias":true,"semAcoes":false,"outrasProvidenciasText":"outras providencias-ações"},"gerais":{"subPanel":"","text":"outras-gerais"},"comunicante":{"subPanel":"","nome":"nomecomunicante","empresa":"instituicaoempresacomunicante","funcao":"cargofuncaocomunicante","telefone":"12121212","email":"emailcomunicante"},"fonte":{"subPanel":"","complementar":"complementar-fonte","fontes":["2","3"]}}';

        // console.log(string_ocorrencia);

        if (!$scope.error[0]) {
          RestApi.query({query: 'criar_ocorrencia', 'formulario': string_ocorrencia},
            function success(data, status){
              $scope.upload($scope.files);
              if(data[0]) {
                // alert('Formulário gravado com sucesso');
                $scope.recarregarSistema();
              } else {
                alert('Erro interno de banco. Por favor, procurar o administrador do sistema.');
              }
            }
          );
        }

      } else if ($scope.acao == 'carregar'){
        console.log($scope.acao);

        var formulario = {};

        formulario.nro_ocorrencia = $scope.nro_ocorrencia;
        formulario.oleo = $scope.oleo;
        formulario.tipo_comunicante = $scope.tipo_comunicante;
        if ($scope.validador) {
          formulario.validador = {};
          formulario.validador.validado = $scope.validador.validado;
        }

        formulario.localizacao = $scope.localizacao;
        formulario.acidente = $scope.mapa.acidente.toGeoJSON();
        formulario.datas = $scope.datas;
        formulario.origem = $scope.origem;
        formulario.origem.origens = [];
        angular.forEach($scope.origens, function(val, key){
          if(val.value)
            formulario.origem.origens.push(val.id);
        });

        formulario.evento = $scope.evento;
        formulario.evento.eventos = [];
        angular.forEach($scope.eventos, function(val, key){
          if(val.value)
            formulario.evento.eventos.push(val.id);
        });

        formulario.produtos = $scope.produtos;
        formulario.detalhes = $scope.detalhes;
        formulario.ambiente = $scope.ambiente;
        formulario.ambiente.ambientes = [];
        angular.forEach($scope.ambientes, function(val, key){
          if(val.value)
            formulario.ambiente.ambientes.push(val.id);
        });

        formulario.empresa = $scope.empresa;
        formulario.instituicao = $scope.instituicao;
        formulario.instituicao.instituicoes = [];
        angular.forEach($scope.instituicoes, function(val, key){
          if(val.value)
            formulario.instituicao.instituicoes.push(val.id);
        });

        formulario.acoes = $scope.acoes;
        formulario.gerais = $scope.gerais;
        formulario.comunicante = $scope.comunicante;
        if($scope.usuario) {
          formulario.fonte = $scope.fonte;
          formulario.fonte.fontes = [];
          angular.forEach($scope.fontes, function(val, key){
            if(val.value)
              formulario.fonte.fontes.push(val.id);
          });
        }

        formulario.arquivo = $scope.arquivo;

        var error = [];
        if(!formulario.localizacao.lat)
          error.push('1. Preencha o campo de Latitude');
        if(!formulario.localizacao.lng)
          error.push('1. Preencha o campo de Longitude');
        if(!formulario.localizacao.uf)
          error.push('1. Preencha o campo UF');
        if(!formulario.localizacao.municipio)
          error.push('1. Preencha o campo Municipio');
        if(!formulario.localizacao.endereco)
          error.push('1. Preencha o campo de Endereço');

        if(!formulario.datas.semIncidente){
          occur = formulario.datas;
          if(!occur.diaIncidente)
            error.push('2. Preencha o campo "Data do Incidente"')
          if(!occur.horaIncidente)
            error.push('2. Preencha o campo "Hora do Incidente!');
          if(!occur.incPeriodo)
            error.push('2. Preencha o campo "Período do Incidente"');
        }

        if(!formulario.datas.semObservacao){
          occur = formulario.datas;
          if(!occur.diaObservacao)
            error.push('2. Preencha o campo "Data de Observação"');
          if(!occur.horaObservacao)
            error.push('2. Preencha o campo "Hora de Observacão"');
          if(!occur.obsPeriodo)
            error.push('2. Preencha o campo "Período de Observacão"');
        }

        if(!formulario.origem.semOrigem){
          if(!formulario.origem.origens[0]){
            error.push('3. Preencha o campo de Origem do acidente');
          }
        }

        if(!formulario.evento.semEvento){
          if(!formulario.evento.eventos[0]){
            error.push('4. Preencha o campo tipo de evento');
          }
        }

        if(!formulario.produtos.semProduto && !formulario.produtos.naoClassificado && !formulario.produtos.naoAplica && !formulario.produtos.naoEspecificado){
          if($scope.oleo){
            if(formulario.produtos.semCondicoes){
              if(!formulario.produtos.semProduto)
                var validate = true;
            }
            else{
            if(!formulario.produtos.produtos_onu[0] && !formulario.produtos.produtos_outros[0])
              error.push('5. Preencha o campo "Tipos de Produtos"');
            }
          }
        }

        if(!formulario.detalhes.semDetalhe){
          if(!formulario.detalhes.causa || formulario.detalhes.causa == ''){
            error.push('6. Preencha o campo "Detalhes do Acidente"');
          }
        }

        if(!formulario.ambiente.semAmbientes){
          if(!formulario.ambiente.ambientes[0]){
            error.push('7. Preencha o campo de ambientes atingidos');
          }
        }

        if(!formulario.empresa.semEmpresa){
          if(!formulario.empresa.nome || formulario.empresa.nome==''){
            error.push('8. Preencha o Campo Nome em Identificação da Empresa/Responsável');
          }
        }

        if(!formulario.instituicao.semInstituicao){
          if(!formulario.instituicao.instituicoes[0]){
            error.push('9. Preencha o campo de instituicao/empresa atuando no local');
          }
        }

        if(!formulario.acoes.semAcoes){
          var occur = formulario.acoes;
          if(occur.plano == '' && occur.planoIndividual == false){
            if(occur.outrasProvidencias){
              if(occur.outrasProvidenciasText == undefined || occur.outrasProvidenciasText == ''){
                error.push('10. O campo "Outras providencias a saber" deve ser preenchido');
              }
            }
            else
              error.push('10. Preencha acões iniciais');
          }
        }

        $scope.error = error;
        var string_formulario = JSON.stringify(formulario);

        if (!$scope.error[0]) {
          RestApi.query({query: 'atualizar_ocorrencia', 'formulario': string_formulario},
            function success(data, status){
              $scope.upload($scope.files);
              if(data[0]) {
                // alert('Formulário atualizado com sucesso');
                $scope.recarregarSistema();
              } else {
                alert('Erro interno de banco. Por favor, procurar o administrador do sistema.');
              }
            }
          );
        }
      }
    };

    $scope.close = function() {
      $window.close();
    }

    $scope.recarregarSistema = function() {
      // $location.url = "#/html?id=" + nro_ocorrencia;

      $location.url("/html?id=" + $scope.nro_ocorrencia);
    };


  });
