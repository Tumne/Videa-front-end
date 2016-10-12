var ToastService = function(utToast) {
    this._utToast = utToast;
};

ToastService.prototype.success = function(message){
    this._utToast.append('success', message, 1000);
};

ToastService.prototype.error = function(message){
	this._utToast.append('error', message, 1000);
};

module.exports = ToastService;
