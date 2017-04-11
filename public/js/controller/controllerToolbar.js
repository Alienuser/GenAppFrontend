(function () {

    app.controller('controllerToolbar', function ($rootScope, $scope, $mdDialog) {

        $scope.openMenu = function ($mdMenu, ev) {
            originatorEv = ev;
            $mdMenu.open(ev);
        };

        $rootScope.settings = function () {
            $mdDialog.show({
                controller: function ($scope) {
                    $scope.sgw = localStorage.getItem("urlSGW");

                    $scope.save = function () {
                        localStorage.setItem("urlSGW", $scope.sgw);
                        $mdDialog.hide();
                    };

                    $scope.close = function () {
                        $mdDialog.hide();
                    };
                },
                templateUrl: 'templates/modal/settings.html',
                locals: {},
                openFrom: angular.element(document.querySelector('#toolbarMenu')),
                closeTo: angular.element(document.querySelector('#toolbarMenu'))
            });
        };

        $rootScope.about = function () {
            $mdDialog.show({
                controller: function ($scope) {
                    $scope.close = function () {
                        $mdDialog.hide();
                    };
                },
                templateUrl: 'templates/modal/about.html',
                locals: {},
                openFrom: angular.element(document.querySelector('#toolbarMenu')),
                closeTo: angular.element(document.querySelector('#toolbarMenu'))
            });
        };
    });
})();
