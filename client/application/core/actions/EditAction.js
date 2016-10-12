var BaseAction = require('core/actions/BaseAction');
var Digi = require('core/Digi');

var EditAction = function (label, functionCallback, context) {
	EditAction.super_.apply(this, arguments);

	this.type = 'edit';
};

Digi.inherits(EditAction, BaseAction);

_.extend(EditAction.prototype, {

})

module.exports = EditAction;
