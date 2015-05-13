'use strict';

/**
 * @ngdoc directive
 * @name estatisticasApp.directive:origem
 * @description
 * # origem
 */
angular.module('estatisticasApp')
  .directive('origem', function () {
    return {
      templateUrl: 'views/accordions/origem.html',
      restrict: 'E',
      controller: function($scope){

        $scope.origem.subPanel = $scope.oleo ? '(Itens I do Anexo II do Decreto nº 4.136 de 20 de fevereiro de 2002)' : "";

        $scope.origem.complementar = "";
        $scope.origem.semOrigem = false;
        $scope.origem.semOleoOrigem = false;



        $scope.$on('carregar_origem', function(event, data){

            $scope.origem.subPanel = $scope.oleo ? '(Itens I do Anexo II do Decreto nº 4.136 de 20 de fevereiro de 2002)' : "";

            var temp = data[0].origem.replace(/[{}]/g,'').split(',');
            if (temp[0] != "") {
                angular.forEach($scope.origens, function(val, key){
                    if (temp.indexOf(val.id) >= 0) {
                        val.value = true;
                    }
                });
                $scope.origem.complementar = data[0].des_complemento_tipo_localizaca;
            } else {
                $scope.origem.semOrigem = true;
            }

            if ($scope.oleo) {
                if ((data[0].des_navio != null) || (data[0].des_instalacao != null)) {
                    $scope.origem.navio = data[0].des_navio;
                    $scope.origem.instalacao = data[0].des_instalacao;
                } else {
                    $scope.origem.semOleoOrigem = true;
                }
            }

        });

        // $scope.$on('criar_origem', function(event, data){
        //     $scope.origem.complementar = "";
        //     $scope.origem.semOrigem = false;

        // });

        // angular.forEach($scope.origens, function (value, key) {

        //     console.log(value);
        //     var temp = variavel.replace(/[{}]/g,'').split(',')

        //     // if (value.id)
        //     // value.value = ''
        // });

        // $scope.origem.origens = [
        //     {"name": "Rodovia", "value":"false"},
        //     {"name": "Ferrovia", "value":"false"},
        //     {"name": "Terminal/portos/ancoradouros/etc", "value":"false"},
        //     {"name": "Embarcação", "value":"false"},
        //     {"name": "Refinaria", "value":"false"},
        //     {"name": "Plataforma", "value":"false"},
        //     {"name": "Indústria", "value":"false"},
        //     {"name": "Barragem", "value":"false"},
        //     {"name": "Armazenamento/depósito", "value":"false"},
        //     {"name": "Posto de combustível", "value":"false"},
        //     {"name": "Outro(s)", "value":"false"}
        // ];

        // $scope.localizacao.toggle = function() {
        //   if ($scope.localizacao.show == 'in') {
        //     $scope.localizacao.show = '';
        //     $scope.datas.show = '';
        //   } else {
        //     $scope.localizacao.show = 'in';
        //     $scope.datas.show = '';
        //   }

        //   // console.log($scope.localizacao.show);
        // };

        // $scope.loginIn = function(user, pass){
        //   // $cookies.user = {user: user, password: pass};
        //   RestApi.login({},{
        //       username: user,
        //       password: pass
        //     },function success(data, status){
        //       $scope.user = data.user;
        //       Auth.setUser(data.user);
        //       $location.path("/page2");
        //     },function error(data, status){
        //         console.log('!ERROR! ' + data);
        //     }
        //   );
        // }

      },
    };
  });
