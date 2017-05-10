/*******************************************************************************
 * genapp-webui
 * Copyright (C) 2017 Lars Helmuth Probst - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * This file is part of the project genapp-webui.
 *
 * @version 1.0 Release
 * @author Lars Helmuth Probst (Alienuser)
 * @copyright 2017 Lars Helmuth Probst
 * @link http://www.Lars-Probst.de
 ******************************************************************************/

app.factory('Api', ['$http', 'api', function ($http, api) {

    var Api = {};

    Api.getCustomerData = function (uid) {
        return $http({
            method: 'GET',
            url: api.restAPI + 'service/customers/' + uid
        });
    };

    Api.getInsuranceData = function (uid) {
        return $http({
            method: 'GET',
            url: api.restAPI + 'service/customers/' + uid + '/insurance'
        });
    };

    // TODO Get info (customer -> policy) from DB2 REST
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

    Api.getClientValue = function (customerID) {
        return $http({
            method: 'GET',
            url: api.restAPI + ''
        });
    };

    return Api;
}]);