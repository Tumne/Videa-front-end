function viewTemplate(imageUrl, title) {
    var html = "\n\t<div class=\"add-component\" ng-click=\"vm.selected()\">\n        <span>{{title}}</span>\n        <img src=\"/images/{{imageReplacement}}@2x.png\"/>\n    </div>\n\t";
    return html.replace('{{imageReplacement}}', imageUrl)
        .replace('{{title}}', title);
}
module.exports = viewTemplate;
//# sourceMappingURL=viewTemplate.html.js.map