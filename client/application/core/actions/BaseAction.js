
var BaseAction = function(label, functionCallback, context) {
	
	this.type = 'generic';
	this.label = label;
	this.functionCallback = functionCallback;
	this.context = context;
	
};

_.extend(BaseAction.prototype, {
	performAction: function() {
		this.functionCallback.apply(this.context, arguments);
	}
})

module.exports = BaseAction;
