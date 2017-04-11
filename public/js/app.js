var app = angular.module('gaf', ['ngMaterial', 'ngRoute', 'cfp.hotkeys']);

// Define all constants.
app.constant('api', {
    restAPI: 'http://cap-sg-prd-1.integration.ibmcloud.com:18186/GenAppService/',
    restAPI2: 'https://cap-sg-prd-1.integration.ibmcloud.com:17257/GenAppService/'
});

// Define all the routes for the web app.
app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'templates/sites/main.html',
            controller: 'controllerMain'
        })
        .otherwise({
            redirectTo: '/'
        });
});

app.run(function ($rootScope, $location, hotkeys, $timeout, $mdSidenav) {

    // Toggle for menu navigation
    $rootScope.toggleMenu = function () {
        $mdSidenav('left').toggle();
    };

    $rootScope.$on("$routeChangeStart", function () {
        // Start the spinner when changing content
        $rootScope.spinnerMode = true;
    });

    $rootScope.openHome = function () {
        $location.path("");
    };

    // Add all hotkeys
    hotkeys.bindTo($rootScope)
        .add({
            combo: 's',
            description: 'Search for customer.',
            callback: function () {
                $rootScope.openSearch();
            }
        })
        .add({
            combo: 'a',
            description: 'Add a customer.',
            callback: function () {
                $rootScope.openUserAdd();
            }
        })
        .add({
            combo: 'p',
            description: 'Start/Stop polling.',
            callback: function () {
                $rootScope.togglePolling();
            }
        })
        .add({
            combo: '#',
            description: 'Open the settings.',
            callback: function () {
                $rootScope.settings();
            }
        })
        .add({
            combo: 'i',
            description: 'Open the about page.',
            callback: function () {
                $rootScope.about();
            }
        })
});
