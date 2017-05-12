/*******************************************************************************
 * GenAppFrontend
 * Copyright (C) 2017 Lars Helmuth Probst - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * This file is part of the project GenAppFrontend.
 *
 * @version 1.0.1 Release
 * @author Lars Helmuth Probst (Alienuser)
 * @copyright 2017 Lars Helmuth Probst
 * @link http://www.Lars-Probst.de
 ******************************************************************************/

(function () {

    app.controller('controllerSidenav', function ($rootScope, $scope, $location) {

        $scope.menuCustomerData = function () {
            $location.path("/");
            $rootScope.toggleMenu();
        };

    });
})();
