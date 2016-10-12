var IdFilter = function () {
    return function(items, expected){
        if (expected.length < 1){
          return items;
        }
        var found  = items.filter(function(oneItem){
            if (oneItem.getFieldValue('id') != expected){
                return true;
            }
            return false;
        });
        return found;
    };
}
module.exports = IdFilter;