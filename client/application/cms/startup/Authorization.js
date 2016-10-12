/**
 * Based on the suggestion of
 * http://stackoverflow.com/questions/22537311/angular-ui-router-login-authentication
 */
var Authorization = function($rootScope, $state, principal) {
    this._rootScope = $rootScope;
    this._state = $state;
    this._principal = principal;
    this._roles = {
        guest: "guest",
        user: "user",
        admin: "admin"
    };
};

_.extend(Authorization.prototype, {
    getRoles: function() {
        return this._roles;
    },
    authorize: function() {
        // try get only the allowed roles first. Otherwise try getting the except roles
        var anyRoles = [],
            exceptRoles = [],
            self = this;

        if (this._rootScope.toState.data && 
            this._rootScope.toState.data.permissions) {
            anyRoles = this._rootScope.toState.data.permissions.any;
            exceptRoles = this._rootScope.toState.data.permissions.except;
        }

        return this._principal.identity().then(function(identity) {
            var isAuthenticated = self._principal.isAuthenticated();

            if ((anyRoles && anyRoles.length > 0) ||
                (exceptRoles && exceptRoles.length > 0)) {

                if (isAuthenticated) {
                    var allowed = false;
                    if (anyRoles) {
                        allowed = self._principal.isInAnyRole(anyRoles) || 
                                  self._isGuestInRoles(anyRoles);
                    } else if (exceptRoles) {
                        allowed = !self._principal.isInAllRoles(exceptRoles);
                    }

                    if (!allowed) {
                        // user is signed in but not authorized for desired state
                        this._state.go('accessDenied');
                        console.log("// user is signed in but not authorized for desired state");
                    }
                }
                else {
                    self._validateGuestPermissions(anyRoles, exceptRoles);
                }
            }
        },  function (err) {
                console.log("AUTH ERROR: ", err);
                self._validateGuestPermissions(anyRoles, exceptRoles);
            }
        );
    },
    _isGuestInRoles: function (roles) {
        if (!roles || roles.length == 0) {
            return false;
        }
        for (var i = 0; i < roles.length; i++) {
            if (this._roles.guest == (roles[i])){
                return true;
            }
        }
        return false;
    },
    _validateGuestPermissions: function (anyRoles, exceptRoles) {
        var allowed = false;
        if (anyRoles) {
            allowed = this._isGuestInRoles(anyRoles);
        } else if (exceptRoles) {
            allowed = !this._isGuestInRoles(exceptRoles);
        }

        if (!allowed) {
            // user is not authenticated. stow the state they wanted before you
            // send them to the signin state, so you can return them when you're done
            this._rootScope.returnToState = this._rootScope.toState;
            this._rootScope.returnToStateParams = this._rootScope.toStateParams;

            // now, send them to the signin state so they can log in
            this._state.go('access.signin');
        }
    }            
});

module.exports = Authorization;
