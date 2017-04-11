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
            $scope.polling = true;
            interval = $interval(pollApi, 1500);
        }

        function stopPolling() {
            $scope.polling = false;
            $interval.cancel(interval);
        }

        function pollApi() {
            $scope.polling = true;
            Api.getCustomerData(customerID)
                .then(function (response) {
                    if (speak) {
                        var msg = new SpeechSynthesisUtterance('We have some data. Please have a look.');
                        msg.lang = 'en-US';
                        window.speechSynthesis.speak(msg);
                        speak = false;
                    }
                    // Set the data
                    var data = response.data.data;
                    $scope.firstname = data.firstName;
                    $scope.lastname = data.houseName;
                    $scope.birthday = data.birthDay + "." + data.birthMonth + "." + data.birthYear;
                    $scope.customerno = data.customerNumber;
                    $scope.email = data.emailAddress;
                    $scope.address = data.postCode;
                    $scope.mobilePhone = data.mobilePhone;
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

            for (var i = 0; i < 10; i++) {
                $scope.policyload = true;
                Api.getPolicy(customerID, i)
                    .then(function (response) {
                        $scope.policy = response.data.LGIPOL01OperationResponse.commarea.ca_policy_request;
                        $scope.policyCommon = response.data.LGIPOL01OperationResponse.commarea.ca_policy_request.ca_policy_common;
                        $scope.policyEndowment = response.data.LGIPOL01OperationResponse.commarea.ca_policy_request.ca_endowment;
                    }, function errorCallback(response) {
                        $scope.policyload = false;
                    });
            }
        }

        function addUser(lastname, birthyear, mobilephone, housename, birthmonth, postcode, email, housenumber, birthday, firstname) {
            Api.addUser(lastname, parseInt(birthyear), mobilephone, housename, parseInt(birthmonth), parseInt(1), postcode, email, parseInt(housenumber), parseInt(birthday), firstname)
                .then(function (response) {
                    $mdToast.showSimple("Added user successfully. Customer no.: " + response.data.data.customerNumber);
                    console.log(response);
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
                })
        }

        $scope.addData = function () {
            $mdDialog.show({
                templateUrl: 'templates/modal/addData.html',
                clickOutsideToClose: true,
                openFrom: angular.element(document.querySelector('#addData')),
                closeTo: angular.element(document.querySelector('#addData')),
                controller: function ($scope) {
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
                    $scope.add = function () {
                        addUser($scope.lastname, $scope.birthyear, $scope.mobilephone, $scope.housename, $scope.birthmonth, $scope.postcode, $scope.email, $scope.housenumber, $scope.birthday, $scope.firstname);
                        $mdDialog.hide();
                    };
                }
            });
        };
    });
})();