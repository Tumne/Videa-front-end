var BaseAction = require('core/actions/BaseAction');
var Digi = require('core/Digi');

var SaveAction = function (label, functionCallback, context) {
	SaveAction.super_.apply(this, arguments);

	this.type = 'save';
};

Digi.inherits(SaveAction, BaseAction);

_.extend(SaveAction.prototype, {

})

module.exports = SaveAction;
