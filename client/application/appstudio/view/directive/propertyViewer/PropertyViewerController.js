var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var PluginModelType = require('appstudio/plugin/PluginModelType');

var PropertyViewerController = function ($scope, screenService) {
	this._scope = $scope;
	this._hasOneAssociations = [];
	this.tabs = [];
	this.activeTab = null;
	this.ready = false;
    this.purpose = Purpose;

    this.screenMeta = [];

    for(var i in PluginModelType.EDIT.SCREEN){
      this.screenMeta.push(PluginModelType.EDIT.SCREEN[i]);
    }

    for(var i in PluginModelType.EDIT.SEARCHRESULTSCREEN){
      this.screenMeta.push(PluginModelType.EDIT.SEARCHRESULTSCREEN[i]);
    }    

    this.isScreen = false;
    this._screenService = screenService;
    
    //screen navigation
    this.hasScreenNavigation = false;
    this.screenNavigationField = null;
    this.names = ['playback'];
    this.ids = ['playback'];
    this.screenNavigationId = '';
    
    this.generalTab = {
        isActive: false,
        title: 'General',
        show: false
    };
  
	//switch components
	this._scope.$watch(function () {
		return this.model.id;
	}.bind(this), function (newComponent, oldComponent) {
		if (newComponent != oldComponent) {
            this.generalTab = {
                isActive: false,
                title: 'General',
                show: false
            };
			this.generateTabs();
		}
	}.bind(this));

  this.generateTabs();
  

};

PropertyViewerController.prototype.handleScreenSelection = function() {
    var _this = this;
    if (this.model._getField('onClickNavigation')) {
        this.hasScreenNavigation = true;
        this.screenNavigationField = this.model._getField('onClickNavigation');
        this._screenService.getScreens(_this.account,
                                       _this.config)
                                    .then(function (screens) {
            for(var i = 0; i < screens.length; i++){
                _this.names.push(screens[i].getFieldValue('name'));
                _this.ids.push(screens[i].getFieldValue('id'));
            }
            var id = _this.ids.indexOf(_this.screenNavigationField.value);
            _this.screenNavigationId =  _this.names[id];
        });
    }

};

PropertyViewerController.prototype.updateComboBoxValue = function (value, field){
    var id = this.names.indexOf(value);
    this._screenId = value;
    this.model.setFieldValue(this.screenNavigationField.getName(), this.ids[id]);
};

PropertyViewerController.prototype.generateTabs = function(){
	var title = '',
		association,
		getter,
		i,
        fields = [];

	this._hasOneAssociations = this.model.getHasOneAssociations();	
	this.tabs = [];
	this.activeTab = null;
    this.ready = false;
    this.isScreen = false;
    this.hasScreenNavigation = false;
    this.screenNavigationField = null;
    this.screenNavigationId = '';
    
    this.generalTab = {
        isActive: false,
        title: 'General',
        show: false  
    };
    
    if(this.screenMeta.indexOf(this.model.getFieldValue('_metadata')) > -1) {
        this.isScreen = true;
    }
    
	for(i = 0; i < this._hasOneAssociations.length; i++) {
		association = this._hasOneAssociations[i];
		title = Digi.String.capitalizeFirstLetter(association.getName());
		getter = 'get' + title;
		
		this.tabs.push({
			title: title,
			getter: getter,
			setter: 'set' + title,
			isActive: false
		});
	}
    
    fields = this.model.getFields();

    for (i = 0; i < fields.length; i++){
        if (this.ignore.indexOf(fields[i].getName()) < 0) {
            this.generalTab.show = true;
        }
    }
    
    this.ready = true;
	this.activeTab = (this.tabs.length > 0)?this.tabs[0]:null;
    
    if (this.tabs.length == 0 && this.generalTab.show){
        this.generalTab.isActive = true;
    }
    
    this.handleScreenSelection();
};
	
PropertyViewerController.prototype.switchTab = function(tab) {
	this.activeTab.isActive = false;
	this.activeTab = tab;
	this.activeTab.isActive = true;
    this.generalTab.isActive = false;
};      
	
PropertyViewerController.prototype.showTab = function(oneTab) {
	return this.activeTab && !this.isScreen && (this.activeTab.title == oneTab.title);
};   

PropertyViewerController.prototype.showGeneralTab = function () {
    this.generalTab.isActive = true;
    this.activeTab = false;
};

PropertyViewerController.prototype.calculateTabSize = function() {
  var numTab = this.tabs.length,
      tabSize;
  if (this.generalTab.show) {
     numTab++;
  }
  tabSize = (100/numTab);
  
  if (tabSize > 0){
      tabSize--;
  }
  return {
      width: tabSize + '%'
  }; 
};

module.exports = PropertyViewerController;