var CreateScreenController = function ($modalInstance, customModalOption, $controller, $scope) {
    angular.extend(this, $controller('blankModalController', {
        $uibModalInstance: $modalInstance,
        customModalOption: customModalOption
    }));
    var vm = this;
    this.nextClicked = false;
    this.screenOption = null;

    this.form = {
      name: '',
      schema: ''
    };

    this.errorMapping = {};
    //this.showList = true;
    this.showForm = true;
    this.screenTypes = this.modalOptions.screenTypes;

    console.log(this.screenTypes);
};

CreateScreenController.prototype.selectScreenOption = function(value){
  this.screenOption = value;
  this.form.schema = this.screenTypes[value].$ref;
};

CreateScreenController.prototype.submit = function(){
    // this.modalOptions.onSubmit(this.form);
    if(!this.nextClicked){
      this.nextClicked = true;
    } else {
      this.modalOptions.onSubmit(this.form);
    }
};


CreateScreenController.prototype.close = function(){
  this.modalOptions.onCancel();
};


module.exports = CreateScreenController;
