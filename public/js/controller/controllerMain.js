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

    app.controller('controllerMain', function ($rootScope, $scope, $mdDialog, $mdToast, $interval, $timeout, Api) {

        // Define some variables
        var interval;
        var speak = true;
        var showToast = true;
        var customerID = 1;

        // Disable spinner when page is loaded
        $rootScope.spinnerMode = false;

        $rootScope.togglePolling = function () {
            if ($scope.polling) {
                stopPolling();
            } else {
                startPolling();
            }
        };

        $scope.startPolling = function () {
            startPolling();
        };

        $rootScope.stopPolling = function () {
            stopPolling();
        };

        function startPolling() {
            // Indicator for loading
            $scope.polling = true;
            $scope.loadUser = true;
            $scope.loadPolicy = true;
            $scope.loadInsurance = true;
            $scope.loadClientvalue = true;
            interval = $interval(pollApi, 1500);
        }

        function stopPolling() {
            $scope.polling = false;
            $scope.loadUser = false;
            $scope.loadPolicy = false;
            $scope.loadInsurance = false;
            $scope.loadClientvalue = false;
            $interval.cancel(interval);
        }

        function pollApi() {
            Api.getCustomerData(customerID)
                .then(function (response) {
                    // Check if we should speak
                    if (speak) {
                        // Get tge right speak function
                        var speech, SpeechSynthesisUtterance = window.webkitSpeechSynthesisUtterance ||
                            window.mozSpeechSynthesisUtterance ||
                            window.msSpeechSynthesisUtterance ||
                            window.oSpeechSynthesisUtterance ||
                            window.SpeechSynthesisUtterance;
                        if (SpeechSynthesisUtterance !== undefined) {
                            speech = new SpeechSynthesisUtterance();
                            speech.text = 'We have some data. Please have a look.';
                            speech.lang = "en-US";
                            speechSynthesis.speak(speech);
                        }
                        speak = false;
                    }

                    // Set the data
                    $scope.customer = response.data.customer;
                    $scope.loadUser = false;
                }, function errorCallback(response) {
                    if (showToast) {
                        $mdToast.showSimple("Error: Couldn't load data.");
                        showToast = false;
                    }
                    $scope.loadUser = false;
                });

            Api.getPolicy(customerID, 4)
                .then(function (response) {
                    $scope.policy = response.data.LGIPOL01OperationResponse.commarea.ca_policy_request;
                    $scope.policyCommon = response.data.LGIPOL01OperationResponse.commarea.ca_policy_request.ca_policy_common;
                    $scope.policyEndowment = response.data.LGIPOL01OperationResponse.commarea.ca_policy_request.ca_endowment;
                    $scope.loadInsurance = false;
                }, function errorCallback(response) {
                    $scope.policy = "";
                    $scope.policyCommon = "";
                    $scope.policyEndowment = "";
                    $scope.loadInsurance = false;
                });

            Api.getInsuranceData(customerID)
                .then(function (response) {
                    $scope.insurances = response.data.insurance;
                    $scope.loadPolicy = false;
                }, function errorCallback(response) {
                    if (showToast) {
                        $mdToast.showSimple("Couldn't load insurance data.");
                        showToast = false;
                    }
                    $scope.insurances = null;
                    $scope.loadPolicy = false;
                });

            Api.getClientValue(customer)
                .then(function (response) {
                    $scope.clientvalue = 65;
                    $scope.loadClientvalue = false;
                }, function errorCallback(response) {
                    $scope.clientvalue = 65;
                    $scope.loadClientvalue = false;
                });
        }

        function addUser(lastname, birthyear, mobilephone, housename, birthmonth, postcode, email, housenumber, birthday, firstname) {
            Api.addUser(lastname, parseInt(birthyear), mobilephone, housename, parseInt(birthmonth), parseInt(1), postcode, email, parseInt(housenumber), parseInt(birthday), firstname)
                .then(function (response) {
                    $mdToast.showSimple("Customer successfully added. Customer no.: " + response.data.customerNumber);
                }, function errorCallback(response) {
                    $mdToast.showSimple("Could not add customer.");
                });
        }

        function addData(text) {
            Api.addInsuranceData(text)
                .then(function (response) {
                    $mdToast.showSimple("Data successfully added.");
                    pollApi();
                }, function errorCallback(response) {
                    $mdToast.showSimple("Could not add data.");
                });
        }

        $scope.openAddData = function () {
            $mdDialog.show({
                templateUrl: 'templates/modal/addData.html',
                clickOutsideToClose: true,
                openFrom: angular.element(document.querySelector('#addData')),
                closeTo: angular.element(document.querySelector('#addData')),
                controller: function ($scope) {
                    $scope.cancel = function () {
                        $mdDialog.hide();
                    };

                    $scope.add = function () {
                        addData($scope.title);
                        $mdDialog.hide();
                    };
                }
            });
        };

        $rootScope.openSearch = function () {
            $mdDialog.show({
                templateUrl: 'templates/modal/search.html',
                clickOutsideToClose: true,
                openFrom: angular.element(document.querySelector('#fabSearch')),
                closeTo: angular.element(document.querySelector('#fabSearch')),
                controller: function ($scope) {
                    $scope.cancel = function () {
                        $mdDialog.hide();
                    };

                    $scope.search = function () {
                        $mdDialog.hide();
                        customerID = $scope.customerID;
                        $rootScope.stopPolling();
                        startPolling();
                        var msg = new SpeechSynthesisUtterance('Search for customer with number. ' + $scope.customerID);
                        msg.lang = 'en-US';
                        window.speechSynthesis.speak(msg);
                        $mdToast.showSimple("Searching for customer with no: " + $scope.customerID);
                    };
                }
            });
        };

        $rootScope.openAddCustomer = function () {
            $mdDialog.show({
                templateUrl: 'templates/modal/addCustomer.html',
                clickOutsideToClose: true,
                openFrom: angular.element(document.querySelector('#fabCustomer')),
                closeTo: angular.element(document.querySelector('#fabCustomer')),
                controller: function ($scope) {
                    $scope.cancel = function () {
                        $mdDialog.hide();
                    };

                    $scope.add = function () {
                        addUser($scope.lastname, $scope.birthyear, $scope.mobilephone, $scope.housename, $scope.birthmonth, $scope.postcode, $scope.email, $scope.housenumber, $scope.birthday, $scope.firstname);
                        $mdDialog.hide();
                    };
                }
            });
        };

    });
})();