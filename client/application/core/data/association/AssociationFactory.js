

var HasMany = require('core/data/association/HasMany');
var HasOne = require('core/data/association/HasOne');

var AssociationFactory = {
    createAssociation: function (config) {

        switch (config.type.toUpperCase()) {

            case "HASMANY":
                return new HasMany(config);

            case "HASONE":
                return new HasOne(config);
        }

    }
};

module.exports = AssociationFactory;

