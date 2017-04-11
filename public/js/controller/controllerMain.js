(function () {

    app.controller('controllerMain', function ($rootScope, $scope, $mdDialog, $mdToast, $interval, Api) {

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
            $scope.policyload = true;
            interval = $interval(pollApi, 1500);
        }

        function stopPolling() {
            $scope.polling = false;
            $interval.cancel(interval);
        }

        function pollApi() {
            Api.getCustomerData(customerID)
                .then(function (response) {
                    if (speak) {
                        var msg = new SpeechSynthesisUtterance('We have some data. Please have a look.');
                        msg.lang = 'en-US';
                        window.speechSynthesis.speak(msg);
                        speak = false;
                    }
                    // Set the data
                    $scope.customer = response.data.data;
                }, function errorCallback(response) {
                    if (showToast) {
                        $mdToast.showSimple("Error: No data.");
                        showToast = false;
                    }
                });

            Api.getInsuranceData()
                .then(function (response) {
                    $scope.insurances = response.data;
                }, function errorCallback(response) {
                    if (showToast) {
                        $mdToast.showSimple("Couldn't load insurance data.");
                        showToast = false;
                    }
                    $scope.insurances = null;
                });

            Api.getPolicy(customerID, 4)
                .then(function (response) {
                    $scope.policy = response.data.LGIPOL01OperationResponse.commarea.ca_policy_request;
                    $scope.policyCommon = response.data.LGIPOL01OperationResponse.commarea.ca_policy_request.ca_policy_common;
                    $scope.policyEndowment = response.data.LGIPOL01OperationResponse.commarea.ca_policy_request.ca_endowment;
                    $scope.policyload = false;
                }, function errorCallback(response) {
                    $scope.policyload = false;
                });
        }

        function addUser(lastname, birthyear, mobilephone, housename, birthmonth, postcode, email, housenumber, birthday, firstname) {
            Api.addUser(lastname, parseInt(birthyear), mobilephone, housename, parseInt(birthmonth), parseInt(1), postcode, email, parseInt(housenumber), parseInt(birthday), firstname)
                .then(function (response) {
                    $mdToast.showSimple("Added user successfully. Customer no.: " + response.data.data.customerNumber);
                }, function errorCallback(response) {
                    $mdToast.showSimple("Could not add user.");
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

        $scope.addData = function () {
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
                        customerID = $scope.customerID;
                        $rootScope.stopPolling();
                        pollApi();
                        var msg = new SpeechSynthesisUtterance('Search for customer with number. ' + $scope.customerID);
                        msg.lang = 'en-US';
                        window.speechSynthesis.speak(msg);
                        $mdToast.showSimple("Searching for customer with no: " + $scope.customerID);
                        $mdDialog.hide();
                    };
                }
            });
        };

        $rootScope.openUserAdd = function () {
            $mdDialog.show({
                templateUrl: 'templates/modal/addUser.html',
                clickOutsideToClose: true,
                openFrom: angular.element(document.querySelector('#fabUser')),
                closeTo: angular.element(document.querySelector('#fabUser')),
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