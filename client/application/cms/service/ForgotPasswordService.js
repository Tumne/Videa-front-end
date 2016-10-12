/**
 * Based on the suggestion of
 * http://stackoverflow.com/questions/22537311/angular-ui-router-login-authentication
 */
var ForgotPasswordService = function(httpService) {
    this._httpService = httpService;
    this._url = '/api/v1';
};

_.extend(ForgotPasswordService.prototype, {
    forgotPasswordRequest : function(email){
        return this._httpService.doPost(this._url + '/forgotpassword/' + email, {} );
    },
    changePassword : function(token, password){
        return this._httpService.doPut(this._url + '/change-password/' + token, password);
    },
    verifyToken : function(token){
        return this._httpService.doGet(this._url + '/change-password/' + token);        
    }    
});

module.exports = ForgotPasswordService;