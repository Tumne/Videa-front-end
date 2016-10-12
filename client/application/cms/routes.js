module.exports = [
	{
		stateName: 'access',
		url: '/access',
		templateUrl: 'cms/view/page/layout/access.html'
	},
	{
		stateName: 'access.signUp',
		url: '/signUp',
		templateUrl: 'cms/view/page/signUp/signUp.html',
		controller: 'signUpController'
	}, {
		stateName: 'access.signUpReq',
		url: '/signUp',
		templateUrl: 'cms/view/page/signUp/signUpReq.html',
		controller: 'signUpController'
	}, {
		stateName: 'access.signin',
		url: '/signin',
		templateUrl: 'cms/view/page/access/signin.html',
		controller: 'signInController'
	}, {
		stateName: 'access.forgotPassword',
		url: '/forgotpassword',
		templateUrl: 'cms/view/page/forgotPassword/forgotPassword.html',
		controller: 'forgotPasswordController'
	}, {
		stateName: 'access.forgotPasswordReq',
		url: '/forgotpassword',
		templateUrl: 'cms/view/page/forgotPassword/forgotPasswordConfirmRequest.html',
		controller: 'forgotPasswordController'
	}, {
		stateName: 'access.changePassword',
		url: '/changepassword/?t',
		templateUrl: 'cms/view/page/forgotPassword/changePassword.html',
		controller: 'changePasswordController'
	}, {
		stateName: 'access.denied',
		url: '/denied',
		templateUrl: 'cms/view/page/access/denied.html',
		controller: 'deniedController'
	}, {
		stateName: 'access.signout',
		url: '/signout',
		templateUrl: 'cms/view/page/access/signOut.html',
		controller: 'signOutController'
	},
	{
		stateName: 'access.termsOfUse',
		url: '/terms',
		templateUrl: 'cms/view/page/access/terms.html'
	},
	{
		stateName: 'access.privacyPolicy',
		url: '/privacy',
		templateUrl: 'cms/view/page/access/privacy.html'
	},
	{
		stateName: 'app.buckets',
		url: '/buckets/list?id&page',
		reloadOnSearch: false,
		templateUrl: 'cms/view/page/buckets/listBuckets.html',
		controller: 'bucketsController',
		ncyBreadcrumb: {
			label: 'Catalogs'
		}
	}, {
		stateName: 'app.contentListList',
		url: '/contentLists/list?id&page',
		reloadOnSearch: false,
		templateUrl: 'cms/view/page/contentLists/listContentLists.html',
		controller: 'contentListsController',
		ncyBreadcrumb: {
			label: 'Collections'
		}
	}, {
		stateName: 'app.users',
		url: '/users/list?id&page',
		reloadOnSearch: false,
		templateUrl: 'cms/view/page/user/listUsers.html',
		controller: 'usersController',
		ncyBreadcrumb: {
			label: 'User list'
		},
		data: {
			permissions: {
				any: ['admin']
			}
		}
	}, {
		stateName: 'app.members',
		url: '/members/list?id&page',
		reloadOnSearch: false,
		templateUrl: 'cms/view/page/members/listMembers.html',
		controller: 'membersController',
		ncyBreadcrumb: {
			label: 'Account user list'
		}
	}, {
		stateName: 'app.accounts',
		url: '/accounts/list?id&page',
		reloadOnSearch: false,
		templateUrl: 'cms/view/page/account/listAccounts.html',
		controller: 'accountsController',
		ncyBreadcrumb: {
			label: 'Accounts list'
		},
		data: {
			permissions: {
				any: ['admin']
			}
		}
	}, {
		stateName: 'app.signUpRequests',
		url: '/signuprequests/list?id&page',
		reloadOnSearch: false,
		templateUrl: 'cms/view/page/signUp/listSignUpRequests.html',
		controller: 'signUpRequestsController',
		ncyBreadcrumb: {
			label: 'Sign Up Requests'
		},
		data: {
			permissions: {
				any: ['admin']
			}
		}
	}, {
		stateName: 'app.useradd',
		url: '/user/add',
		templateUrl: 'cms/view/page/user/editUser.html',
		controller: 'userController',
		ncyBreadcrumb: {
			label: 'Add user'
		},
		data: {
			permissions: {
				except: ['guest']
			}
		}
	}, {
		stateName: 'app.useredit',
		url: '/user/edit/:id',
		templateUrl: 'cms/view/page/user/editUser.html',
		controller: 'userController',
		ncyBreadcrumb: {
			label: 'Edit user'
		},
		data: {
			permissions: {
				except: ['guest']
			}
		}
	}, {
		stateName: 'app.contentedit',
		url: '/content/:action/:id',
		templateUrl: 'cms/view/page/contentNode/contentNodeEdit.html',
		controller: 'contentNodeEditController',
		ncyBreadcrumb: {
			label: 'Edit Content'
		},
		data: {
			permissions: {
				except: ['guest']
			}
		}
	}, {
		stateName: 'app.contentlist',
		url: '/content/list?id&q&type&workflow',
		reloadOnSearch: false,
		templateUrl: 'cms/view/page/contentNode/listContentNode.html',
		controller: 'contentNodeListController',
		ncyBreadcrumb: {
			label: 'Collection'
		},
		data: {
			permissions: {
				except: ['guest']
			}
		}
	}, {
		stateName: 'app.contenttypes',
		url: '/content/types?id&page',
		reloadOnSearch: false,
		templateUrl: 'cms/view/page/contentType/listContentType.html',
		controller: 'contentTypeListController',
		ncyBreadcrumb: {
			label: 'Content types'
		},
		data: {
			permissions: {
				except: ['guest']
			}
		}
	}, {
		stateName: 'app.userprofile',
		url: '/userprofile',
		templateUrl: 'cms/legacy/userprofile/editUserProfile.html',
		controller: 'userProfileEditController',
		ncyBreadcrumb: {
			label: 'User profile'
		},
		data: {
			permissions: {
				except: ['guest']
			}
		}
	}, {
		stateName: 'app.supportUser',
		url: '/support',
		reloadOnSearch: false,
		templateUrl: 'cms/view/page/support/userSupport.html',
		ncyBreadcrumb: {
			label: 'Support'
		}
	}];
