var Authorization = require('cms/startup/Authorization');
var Principal = require('cms/startup/Principal');
var SharedProperties = require('cms/startup/SharedProperties');
angular.module('cms.startup', [])
.factory('principal', ['$q', '$http', '$log', '$timeout', Principal])
.service('authorization', ['$rootScope', '$state', 'principal', Authorization])
.service('sharedProperties', ['$q', '$timeout', SharedProperties ]);