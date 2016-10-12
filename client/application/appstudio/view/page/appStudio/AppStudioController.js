
var Digi = require('core/Digi');
var AppStudioController = function (account,
                                    brandDataService,
                                    appService,
                                    appTypeService,
									uiConfigurationService,
                                    blankModalService,
                                    confirmationModalService,
                                    $scope) {
    this.accountId = account.id;
    this._scope = $scope;

    this.VIEWS = {
        BRAND: 1,
        MEDIAGALLERY: 2,
        CONFIGMANAGEMENT: 3, //TODO: Deprecated
        CONFIGEDITOR: 4, //TODO: Deprecated
		APP_CONFIGURATION_EDITOR: 5,
		UI_CONFIGURATION_EDITOR: 6
    };

    this.history = [];
    this.current = null;

    this.navigateToView = function (view, parameters) {
        var container = {
            view: view,
            parameters: parameters
        };
        this.history.push(container);
        this.current = container;
    };

    this.goBack = function () {
        if (this.history.length > 1) {
            this.history.pop();
            this.current = this.history[this.history.length - 1];
        }
    };

    this._scope.$on('mediagallery-management-view-event', function (event, args) {
        this.navigateToView(this.VIEWS.MEDIAGALLERY, {
            brandChosen: args.brandModel
        });
    }.bind(this));

    this._scope.$on('config-management-view-event', function (event, args) {
        this.navigateToView(this.VIEWS.APP_CONFIGURATION_EDITOR, {
			brandId: args.brandModel.getId(),
            brandChosen: args.brandModel,
            appChosen: args.appModel
        });
    }.bind(this));
	
    this._scope.$on('config-editor-nav-event', function (event, args) {
        this.navigateToView(this.VIEWS.UI_CONFIGURATION_EDITOR, {
            chosenVersionModel: args.versionModel,
            appChosen: args.appId
        });
        console.log('Navigating To Config Editor: ', args);
    }.bind(this));

    this.navigateToView(this.VIEWS.BRAND, {});
};

module.exports = AppStudioController;
