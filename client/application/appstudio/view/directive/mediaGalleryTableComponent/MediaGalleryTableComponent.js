var Digi = require('core/Digi');
var BaseTableComponent = require('core/uicomponents/tableComponent/baseTableComponent/BaseTableComponent');

var MediaGalleryTableComponent = function () {
	MediaGalleryTableComponent.super_.apply(this, []);
};

Digi.inherits(MediaGalleryTableComponent, BaseTableComponent);

_.extend(MediaGalleryTableComponent.prototype, {
	_getTableClass: function() {
		return "media-gallery-table"
	},
	_buildHeadingsRow: function () {
		return [
			'<tr>',
				'<td>',
					'preview',
				'</td>',
				'<td>',
					'name',
				'</td>',
				'<td>',
					'info',
				'</td>',
				'<td>',
					'uploaded',
				'</td>',
				'<td class="last-column">',
					'actions',
				'</td>',
			'</tr>'
		].join('');
	},
	_buildRows: function () {
		return [
			'<tr ng-repeat="model in vm.models">',
				'<td>',
					'<span class="image-container">'+ this._getImageCellLayout("model.getFieldValue('url')") + '</span>',
				'</td>',
				'<td>',
					'{{model.getFieldValue("name")}}',
				'</td>',
				'<td>',
					'{{model.getFieldValue("bytes")}} B',
				'</td>',
				'<td>',
					'{{model.getFieldValue("modifiedDate") | date : format : "MMM.d,yyyy"}}',
				'</td>',
				'<td class="last-column">',
					this._getActionCellLayout(),
				'</td>',
			'</tr>'
		].join('');
	},
});

module.exports = MediaGalleryTableComponent;
