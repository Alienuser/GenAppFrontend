(function () {

    app.controller('controllerSidenav', function ($rootScope, $scope, $location) {

        $scope.menuCustomerData = function () {
            $location.path("/");
            $rootScope.toggleMenu();
        };

    });
})();
