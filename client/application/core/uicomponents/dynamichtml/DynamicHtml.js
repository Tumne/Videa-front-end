
var DynamicHtml = function ($compile) {
    return {
        restrict: 'A',
        replace: true,
        link: function (scope, ele, attrs) {
            scope.$watch(attrs.dynamichtml, function(html) {
                ele.html(html);
                $compile(ele.contents())(scope);
            });
        }
    };
};

module.exports = DynamicHtml;