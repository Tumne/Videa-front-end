function previewTemplate(imageUrl, name) {
    var html = "<div id=\"newApp{{nameId}}\" class=\"app-type\" ng-click=\"vm.select()\" ng-class=\"{'app-type-selected' : vm.selected}\">" +
		"<img class=\"image\" src=\"{{imageReplacement}}\">" +
		"<div class=\"app-type-selected-filter\" ng-show=\"vm.selected\"></div>" +
		"<div ng-if=\"vm.isSelectable\" class=\"body text\">{{name}}</div>" +
		"</div>";
	return html.replace('{{imageReplacement}}', imageUrl)
               .replace('{{nameId}}', name)
		       .replace('{{name}}', name);
}
module.exports = previewTemplate;
//# sourceMappingURL=previewTemplate.html.js.map

