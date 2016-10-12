var IView = require('core/plugin/IView');
var Implements = require('core/plugin/Implements');
var template = require('appstudio/plugin/view/component/viewTemplate.html');
var controller = require('appstudio/plugin/view/component/ViewController');
var CollectionView = function (){

};

Implements(CollectionView, IView);

CollectionView.prototype = {
    getName: function(){
        return 'collectionViewComponent';
    },
    getDefinition: function(){
        return {
            controller: ['$scope', controller],
            controllerAs: 'vm',
            replace: true,
            scope: false,
            template: template('collection-component', 'Collection')
        };        
    },
    getDirective : function() {
        return '<collection-view-component></collection-view-component>';
    }
};

module.exports = CollectionView;