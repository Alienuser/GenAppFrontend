/*******************************************************************************
 * GenAppFrontend
 * Copyright (C) 2017 Lars Helmuth Probst - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * This file is part of the project GenAppFrontend.
 *
 * @version 1.0.0 Release
 * @author Lars Helmuth Probst (Alienuser)
 * @copyright 2017 Lars Helmuth Probst
 * @link http://www.Lars-Probst.de
 ******************************************************************************/

(function () {

    app.controller('controllerToolbar', function ($rootScope, $scope, $mdDialog) {

        $scope.openMenu = function ($mdMenu) {
            $mdMenu.open();
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
