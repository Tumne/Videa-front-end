module.exports = function ($window, 
                           $localStorage, 
                           $scope, 
                           $state, 
                           $timeout, 
                           pageContext, 
                           mediaService, 
                           systemService, 
                           accountService) {
    // add 'ie' classes to html
    var isIE = !!navigator.userAgent.match(/MSIE/i);
    isIE && angular.element($window.document.body).addClass('ie');
    isSmartDevice($window) && angular.element($window.document.body).addClass('smart');

    function isSmartDevice($window) {
        // Adapted from http://www.detectmobilebrowsers.com
        var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
        // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
        return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
    }

    function initialize() {

        $scope.page = pageContext;
        $scope.userPermissions = undefined;
		$scope.hasAccount = accountService.getActiveAccount() !== null;
		
        // config
        $scope.app = {
            name: 'Videa',
            version: '1.0.0',
            // for chart colors
            color: {
                primary: '#7266ba',
                info: '#23b7e5',
                success: '#27c24c',
                warning: '#fad733',
                danger: '#f05050',
                light: '#e8eff0',
                dark: '#3a3f51',
                black: '#1c2b36'
            },
            settings: {
                themeID: 1,
                navbarHeaderColor: 'bg-black',
                navbarCollapseColor: 'bg-white-only',
                asideColor: 'bg-black',
                headerFixed: true,
                asideFixed: false,
                asideFolded: false,
                asideDock: false,
                container: false
            }
        };

        $scope.getVideaLogoUrl = function ()
        {
            return mediaService.getImageUrl('logo/videa_hub_logo_white_small.png');
        };

        systemService.getVersion().then(function(result){
            $scope.app.version = result.label;
        });


        // save settings to local storage
        if (angular.isDefined($localStorage.settings)) {
            $scope.app.settings = $localStorage.settings;
        } else {
            $localStorage.settings = $scope.app.settings;
        }
        $scope.$watch('app.settings', function () {
            if ($scope.app.settings.asideDock && $scope.app.settings.asideFixed) {
                // aside dock and fixed must set the header fixed.
                $scope.app.settings.headerFixed = true;
            }
            // save to local storage
            $localStorage.settings = $scope.app.settings;
        }, true);
        
        $scope.items = ['learn Sortable', 'use gn-sortable', 'Enjoy'];

        $scope.menuItems = [
				{
					title: "Dashboard",
					url: "app.home",
					cssClass: "fa fa-dashboard fa-fw",
					icon :"/images/dashboard.png",
					permission : { name: "contentNodes", action: "view" }
				},
                {
                    title: "App Studio",
                    url: "app.appStudio.brandView",
                    cssClass: "fa fa-qrcode fa-fw",
                    icon :"/images/app-studio.png",
                    permission : { name: "appStudio", action: "view"}
                },
				{
					title: "Content",
					//		url: "app.contentlist",
					cssClass: "fa fa-qrcode fa-fw",
					icon :"/images/content-hub.png",
					dropItems: [
						{
							title: "Catalogs",
							url: "app.buckets",
							cssClass: "fa fa-qrcode fa-fw",
							permission : { name: "buckets", action: "view" }
						},
						{
							title: "Content Library",
							url: "app.contentlist",
							cssClass: "fa fa-qrcode fa-fw",
							permission : { name: "contentNodes", action: "view" }
						},
						{
							title: "Content Types",
							url: "app.contenttypes",
							cssClass: "fa fa-qrcode fa-fw",
							permission : { name: "contentTypes", action: "view" }
						},
						{
							title: "Collections",
							url: "app.contentListList",
							cssClass: "fa fa-qrcode fa-fw",
							permission : { name: "contentLists", action: "view" }
						}
					]
				},
				{
					title : "Support",
					url: "app.supportUser",
					cssClass: "fa fa-qrcode fa-fw",
					icon :"/images/accounts.png",
					permission : { name: "support", action: "view" }
				},
				{
					separator : true
				},
				{
					title: "Accounts",
					cssClass: "fa fa-users fa-fw",
					icon :"/images/accounts.png",
					dropItems : [
						{
							title: "Members",
							url: "app.members",
							cssClass: "fa fa-users fa-fw",
							permission : { name: "members", action: "view" }
						}
					]
				},
				{
					title: "Admin",
					cssClass: "fa fa-users fa-fw",
					icon :"/images/accounts.png",
					dropItems : [
						{
							title: "Accounts",
							url: "app.accounts",
							cssClass: "fa fa-users fa-fw",
							icon :"/images/accounts.png",
							permission : { name: "accountsAdmins", action: "view" }
						},
						{
							title: "Sign Up Requests",
							url: "app.signUpRequests",
							cssClass: "fa fa-users fa-fw",
							permission : { name: "signUps", action: "view" }
						},
						{
							title: "Users",
							url: "app.users",
							cssClass: "fa fa-users fa-fw",
							permission : { name: "users", action: "view" }
						}
					]
				}
			];

        $scope.expandMenuItem = function(menuItem){
			menuItem.expanded = !menuItem.expanded;
			for (var i=0; i < $scope.menuItems.length; i++) {
				if ($scope.menuItems[i] !== menuItem) {
					$scope.menuItems[i].expanded = false;
				}
			}
        };

        $scope.changeMenu = function(menuItem){
            $state.go(menuItem);
        };
        
        getUserPermissions();
    }

    function checkMenuItemsVisibility(){

        for(var j = 0; j < $scope.menuItems.length; j++) {
            var item = $scope.menuItems[j];

            if (item.dropItems && item.dropItems.length > 0) {
                for (var i = 0; i < item.dropItems.length; i++) {
                    var itemChild = item.dropItems[i];
                    checkPermissionHelper(itemChild);
                    if (itemChild.visible) {
                        item.visible = true;
                    }
                }
            }
            else {
                checkPermissionHelper(item);
            }
        }
    }

    function checkPermissionHelper (item) {
        if (item.permission) {
            item.visible = ($scope.userPermissions.hasOwnProperty(item.permission.name) &&
            ($scope.userPermissions[item.permission.name].indexOf(item.permission.action) > -1));
        }
        else {
            item.visible = false;
        }
    }

    $scope.$watch(function () {
        return accountService.getActiveAccount();
    }, function (account) {
        $timeout(initialize, 0);
    }, true);

    function getUserPermissions(){
        accountService.getActiveAccountPermissions().then(function(permissions){
            $scope.userPermissions = permissions;
            checkMenuItemsVisibility();
        });
    }

    initialize();
};
