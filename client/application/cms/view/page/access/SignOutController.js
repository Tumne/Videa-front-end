"use strict";

var SignOutController = function ($window, principal, $state) {
	$window.location.href = '/signout';
	principal.signOut().then(function(){
		$state.go('access.signin');
	});
};

module.exports = ['$window', 'principal', '$state', SignOutController];
