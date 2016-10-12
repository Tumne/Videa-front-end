

var Validations = function() {
    this._emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
};

_.extend(Validations.prototype, {

    presence: function(value) {
        return !!value || value === 0 || value === false;
    },

    /**
     * Returns true if the length of the value passed in is between min and max.
     * @param config config.min, config.max
     * @param value
     * @returns {boolean}
     */
    length: function(config, value) {
        if (value === undefined || value === null) {
            return false;
        }

        var length = value.length,
            min = config.min,
            max = config.max;


        if ((min && length < min) || (max && length > max)) {
            return false;
        }

        return true;
    },

    email: function(config, email) {
        return this._emailRegex.test(email);
    }
});