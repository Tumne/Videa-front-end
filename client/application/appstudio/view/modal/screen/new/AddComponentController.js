var Purpose = require('core/plugin/Purpose');
var AddComponentController = function ($modalInstance, customModalOption, 
                        $controller, modelFactory, $q) {
    angular.extend(this, $controller('blankModalController', {
        $uibModalInstance: $modalInstance,
        customModalOption: customModalOption
    }));
    this.availableComponents = this.modalOptions.components;
    this._modelFactory = modelFactory;
    this._q = $q;
    this.ready = false;
    this.list = [];
    this.componentList = [];
    this.purpose = Purpose;
    this.form = {
      component: ''
    };
    var _this = this;
    
    for(var i = 0; i < this.availableComponents.length; i++){
            this.list.push(this._modelFactory.create(_this.availableComponents[i]).then(
                function (component) {
                    _this.componentList.push(component);
                })
            );
    }
    
    this._q.all(this.list).then(function(){
		_this.ready = true;
	});	 
    
    this.options = {
        selected: this.picked.bind(this)
    }
};
AddComponentController.prototype.picked = function(meta){
    this.modalOptions.onSubmit(meta);
}
AddComponentController.prototype.changed = function(item, model){
  console.log(this.form);
    this.modalOptions.onSubmit(this.form);
};


AddComponentController.prototype.close = function(){
  this.modalOptions.onCancel();
};


module.exports = AddComponentController;
