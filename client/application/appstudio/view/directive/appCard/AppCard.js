var Purpose = require('core/plugin/Purpose');
var Digi = require('core/Digi');

var AppCard = function () {
	return {
		controller: function (modelFactory) {
			
			var vm = this;

			this._modelFactory = modelFactory;
			this.appType = this.model.getConfiguration().getFieldValue('_metadata');
			this.purpose = Purpose;

			this.status = 'LIVE';
			this.statusFlag = true;
			this.dataReady = false;
			this.activeUIConfig = this.activeConfig;

			if (!Digi.isDefined(this.activeUIConfig)) {
				this.status = 'OFFLINE';
				this.statusFlag = false;
				
				var association = this.model.getConfiguration().getAssociation('uiConfig');
				var schema = association.getOneOf()[0];

				this._modelFactory.create(schema.$ref).then(function (model) {
					vm.activeUIConfig = model;
					vm.dataReady = true;
				});
			} else {
				this.dataReady = true;
			}

			this.uiConfigViewCardOptions = {
				prefer: 1
			}

			if (this.version == '-') {
				this.status = 'OFFLINE';
				this.statusFlag = false;
			}

			this.delete = function () {
				this.deleteapp();
			};
		},
		replace: true,
		controllerAs: 'vm',
		bindToController: {
			'title': '=',
			'subtitle': '=',
			'activeConfig': '=',
			'lastmodified': '=',
			'edit': '&',
			'model': '=',
			'editapp': '&',
			'deleteapp': '&'
		},
		scope: {},
		templateUrl: 'appstudio/view/directive/appCard/appCard.html'
	};
};

module.exports = AppCard;
