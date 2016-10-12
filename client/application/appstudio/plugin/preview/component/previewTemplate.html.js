function previewTemplate(imageUrl, title) {
    var html = "\n\t<div class=\"component\" ng-class=\"{active: vm.active}\" ng-click=\"vm.selected()\">\n\t\t<img class=\"component-preview\" src=\"{{imageReplacement}}\"/>\n\t\t\t<div class=\"description-wrapper\" ng-if=\"vm.active\">\n\t\t\t\t<span class=\"reorder-component\"  ng-click=\"vm.up()\">/\\&nbsp;</span><span class=\"reorder-component\" ng-click=\"vm.down()\">\\/</span><span class=\"title\">{{title}}</span>\n                <span class=\"close-component\" ng-click=\"vm.remove()\">X</span>\n\t\t\t\t<div class=\"clearfix\"></div>\n\t\t\t</div>\n\t</div>\n\t";
    return html.replace('{{imageReplacement}}', imageUrl)
        .replace('{{title}}', title);
}
module.exports = previewTemplate;
//# sourceMappingURL=previewTemplate.html.js.map