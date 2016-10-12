module.exports = function(target, source) {
    angular.extend(target.prototype, source);
};