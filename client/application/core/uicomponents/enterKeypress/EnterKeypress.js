
var EnterKeypress = function () {
    return {
        link: function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if(event.which === 13) {
                    scope.$apply(function (){
                        scope.$eval(attrs.enterKeypress);
                    });

                    event.preventDefault();
                }
            });
        }
    };
};

module.exports = EnterKeypress;
