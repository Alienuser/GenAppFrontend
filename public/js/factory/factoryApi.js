app.factory('Api', ['$http', 'api', function ($http, api) {

    var Api = {};

    Api.getCustomerData = function (id) {
        return $http({
            method: 'GET',
            url: api.restAPI + 'service/customers/' + id
        });
    };

    Api.getInsuranceData = function () {
        return $http({
            method: 'GET',
            url: api.restAPI + 'service/customers/insurance'
        });
    };

    Api.getPolicy = function (uid, pid) {
        return $http({
            method: 'GET',
            url: api.restAPI2 + 'service/customer/' + uid + '/policy/' + pid
        });
    };

    Api.addInsuranceData = function (value) {
        return $http({
            method: 'POST',
            url: api.restAPI + 'service/customer/insurance',
            data: {
                text: value
            }
        });
    };

    Api.addUser = function (lastName, birthYear, mobilePhone, houseName, birthMonth, customerNumber, postCode, emailAddress, houseNumber, birthDay, firstName) {
        return $http({
            method: 'POST',
            url: api.restAPI + 'service/customers/',
            data: {
                firstName: firstName,
                lastName: lastName,
                customerNumber: customerNumber,
                birthYear: birthYear,
                birthMonth: birthMonth,
                birthDay: birthDay,
                houseName: houseName,
                houseNumber: houseNumber,
                postCode: postCode,
                mobilePhone: mobilePhone,
                emailAddress: emailAddress
            }
        });
    };

    return Api;
}]);