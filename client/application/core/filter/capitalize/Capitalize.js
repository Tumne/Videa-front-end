
module.exports = function() {
    return function(input, scope) {
        if (input != null && typeof input === 'string' ){
            return input.substring(0,1).toUpperCase() + input.substring(1);
        }
        return input;
    }
}