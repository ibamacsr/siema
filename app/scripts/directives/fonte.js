'use strict';

/**
 * @ngdoc directive
 * @name estatisticasApp.directive:fonte
 * @description
 * # fonte
 */
angular.module('estatisticasApp')
  .directive('fonte', function () {
    return {
      templateUrl: 'views/accordions/fonte.html',
      restrict: 'E',
      controller: function($scope){

        $scope.fonte.complementar = "";

        $scope.$on('carregar_fonte', function(event, data){
            var temp = data[0].fonte.replace(/[{}]/g,'').split(',');
            if (temp[0] != "") {
                angular.forEach($scope.fontes, function(val, key){
                    if (temp.indexOf(val.id) >= 0) {
                        val.value = true;
                    }
                });
                $scope.fonte.complementar = data[0].desc_outras_fontes;
            }

        });

        // $scope.evento.eventos = [
        //     {"name": "Derramamento de líquidos", "value":"false"},
        //     {"name": "Vazamento de gases", "value":"false"},
        //     {"name": "Lançamento de sólidos", "value":"false"},
        //     {"name": "Produtos químicos/embalagens abandonadas", "value":"false"},
        //     {"name": "Desastre Natural", "value":"false"},
        //     {"name": "Explosão/incêndio", "value":"false"},
        //     {"name": "Mortandade de peixes", "value":"false"},
        //     {"name": "Rompimento de barragem", "value":"false"},
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