var BaseAction = require('core/actions/BaseAction');
var Digi = require('core/Digi');

var DeleteAction = function (label, functionCallback, context) {
	DeleteAction.super_.apply(this, arguments);
	
	this.type = 'delete';
};

Digi.inherits(DeleteAction, BaseAction);

_.extend(DeleteAction.prototype, {
	
})

module.exports = DeleteAction;
