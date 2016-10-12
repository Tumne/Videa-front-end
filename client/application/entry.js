require('core');
require('cms');
require('appstudio');

var app = angular.module('app', [
        'ui.router',
       'ui.bootstrap',
       'ngSanitize',
       'color.picker',
       'rzModule',
       'ui.select',
       'ngStorage',
       'ngFileUpload',
       'ngAnimate',
       'ncy-angular-breadcrumb',
        'untemps.utToast',
        'ui.ace',
       'videa.templates',
       'core',
       'cms',
       'appstudio',
       'html5.sortable'
])
.config(['$stateProvider',
         '$urlRouterProvider',
         '$locationProvider',
         '$httpProvider',
         function ($stateProvider,
                   $urlRouterProvider,
                   $locationProvider,
                   $httpProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

    $locationProvider.hashPrefix('!');

    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};
    $httpProvider.defaults.headers.post['Accept'] = 'application/json, text/plain, */*';
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
    // $httpProvider.defaults.headers.post['Access-Control-Max-Age'] = '1728000';
    // $httpProvider.defaults.headers.common['Access-Control-Max-Age'] = '1728000';

    $httpProvider.interceptors.push(function ($q) {
       return {
          'request': function (config) {
              console.log(config);
              if(config.headers.Accept !== 'text/html'){
                config.url = 'http://localhost:3000' + config.url;
              }
              return config || $q.when(config);
          }
       };
    });

    $stateProvider.state('app', {
        url: '?a',
        templateUrl: 'cms/view/page/layout/main.html',
        controller: 'applicationController',
        ncyBreadcrumb: {
            label: 'Dashboard'
        },
        data: {
            permissions: {
                except: ['guest']
            }
        },
        resolve: {
            // is the user authorized
            authorize: ['authorization',
                function(authorization) {
                    return authorization.authorize();
                }],

            // get the active account
            account: ["$q", "$state", "accountService", "$stateParams", function ($q, $state, accountService, $stateParams) {

                var deferred = $q.defer();
                if (accountService.getActiveAccount()) {
                    deferred.resolve(accountService.getActiveAccount());
                } else {
                    accountService.getAccounts().then(function (result) {
                        var accounts = result.data,
                            activeAccount = null,
                            activeAccountId = $stateParams.a;
							
                        if (accounts && accounts.length > 0) {
							activeAccountId = $stateParams.a ||accounts[0].id;
							
                            accounts.forEach(function(a) {
                                if (a.id === activeAccountId) {
                                    activeAccount = a;
                                }
                            });
                        }

                        accountService.setActiveAccount(activeAccount);
                        deferred.resolve(accountService.getActiveAccount());
                    }, function (reason) {
                        //pageContext.showAlertDanger(reason);
                        if(reason.message && reason.message.indexOf("is not connected to any account") > -1){
                            deferred.resolve(undefined);
                        }
                        else {
                            deferred.reject(reason);
                        }
                    });
                }

                return deferred.promise;
            }]
        }
    })
    .state('app.home', {
        url: '/',
        templateUrl: 'cms/view/page/home/index.html',
        controller: 'homeController',
        ncyBreadcrumb: {
            label: 'Dashboard'
        }
    });
    
    $urlRouterProvider.otherwise('/access/signin');
}])
.run(['$rootScope', 
      '$state', 
      '$stateParams', 
      'authorization', 
      'principal', 
      'sharedProperties', 
      '$uibModalStack',
      function($rootScope, 
               $state, 
               $stateParams, 
               authorization, 
               principal, 
               sharedProperties, 
               $uibModalStack) {
        //gets JSON from server
        sharedProperties.loadProperties().then(function (result) {
        }, function (reason) {
            console.log(reason);
        });

        $rootScope.$on('$stateChangeStart', function(event, toState, toStateParams) {
            // track the state the user wants to go to; authorization service needs this
            $rootScope.toState = toState;
            $rootScope.toStateParams = toStateParams;
            // if the principal is resolved, do an authorization check immediately. otherwise,
            // it'll be done when the state it resolved.
            if (principal.isAuthenticated()) {
                authorization.authorize();
            }
            $uibModalStack.dismissAll();
        });
        }
]);
