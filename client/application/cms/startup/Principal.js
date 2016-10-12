/**
 * Based on the suggestion of
 * http://stackoverflow.com/questions/22537311/angular-ui-router-login-authentication
 */
module.exports = function principal($q, $http, $log, $timeout) {
    var _serviceBase = '/api/v1',
        _resource = '/auth',
        _signout = '/signout',
        _identity = undefined,
        _permissions = undefined,
        _forgotPassword = '/forgotpassword/',
        _changePassword = '/change-password/',
        _security = '/security/',
        _guest = {
            firstName: "Guest",
            roles:["guest"]
        };

    return {

        isAuthenticated: function() {
            return angular.isDefined(_identity);
        },

        isInRole: function(role) {
            if (!_identity || !_identity.roles) return false;

            return _identity.roles.indexOf(role) != -1;
        },

        isInAnyRole: function(roles) {

            if (!_identity) return false;


            // check the special case of a user that haven't roles trying to acess a state that doesn't need roles
            if ((!_identity.roles || _identity.roles.length == 0) && (!roles || roles.length === 0)) return true;

            if (!roles) return false;

            for (var i = 0; i < roles.length; i++) {
                if (this.isInRole(roles[i])) return true;
            }

            return false;
        },

        isInAllRoles: function(roles) {
            if (!_identity) return false;

            // check the special case of a user that haven't roles trying to acess a state that doesn't need roles
            if ((!_identity.roles || _identity.roles.length == 0) && (!roles || roles.length == 0)) return true;

            if (!roles) return false;

            var counter = 0;
            for (var i = 0; i < roles.length; i++) {
                if (this.isInRole(roles[i])) counter++;
            }

            return roles.length === counter;
        },

        authenticate: function(signIn) {
            var deferred = $q.defer();
            _identity = undefined;
            
            console.log(signIn);

            // if we have new credentials, create a new login
            if (signIn) {
                var self = this;
                $http({
                    url: _serviceBase + _resource,
                    method: "POST",
                    data: signIn
                }).success(function (data, status, headers, config) {
                    _identity = data.identity;
                    console.log("IDENTITY",_identity);
                    deferred.resolve(_identity);
                }).error(function (err) {
                    deferred.reject(err);
                });
            } else {
                deferred.resolve(_identity);
            }
            return deferred.promise;
        },

        identity: function(force) {
            var deferred = $q.defer();

            // if we have new credentials, create a new login
            if (force) {
                _identity = undefined;
            }
            console.log(_serviceBase);
            // check and see if we have retrieved the identity data from the server. if we have, reuse it by immediately resolving
            if (angular.isDefined(_identity)) {
                deferred.resolve(_identity);
                //return deferred.promise;
            } else {
                var self = this;
                $http({
                    url: _serviceBase + _resource + "/identity",
                    method: "GET"
                }).success(function (data, status, headers, config) {
                    //self.authenticate(data.identity);
                    _identity = data.identity;
                    deferred.resolve(_identity);
                }).error(function (err) {
                    console.log(err);
                    //_identity = _guest;
                    deferred.resolve(_identity);
                });

                //return deferred.promise;
            }

            // sign out
            //this.authenticate(null);
            //deferred.resolve(_identity);
            return deferred.promise;
        },

        signOut: function(){
            var deferred = $q.defer();

            $http({
                url: _serviceBase + _signout,
                method: "POST"
            }).success(function (data, status, headers, config) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject(data);
            });
            return deferred.promise;
        },

        forgotPasswordRequest : function(email){
            var deferred = $q.defer();

            $http({
                url: _serviceBase + _forgotPassword + email,
                method: "POST"
            }).success(function (data, status, headers, config) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject(data);
            });
            return deferred.promise;
        },

        changePassword : function(token, password){
            var deferred = $q.defer();

            $http({
                url: _serviceBase + _changePassword + token,
                method: "PUT",
                data: password
            }).success(function (data, status, headers, config) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject(data);
            });
            return deferred.promise;
        },
        setPermissions : function(accountId){

            var deferred = $q.defer();
            $http({
                url: _serviceBase + _security + 'permissions',
                method: "GET",
                params: {'accountId' : accountId}
            }).success(function (data, status, headers, config) {
                if(data){

                    _identity.permissions = data;
                    _permissions = data;
                }
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject(data);
            });
            return deferred.promise;
        }
    };
};
