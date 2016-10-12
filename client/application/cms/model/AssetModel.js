var AssetModel = function (params) {
	this.Name = params.asset.Name;
	this.FullName = params.asset.FullName;
	this.LastModified = params.asset.LastModified;
	this.IsDirectory = params.asset.IsDirectory;
	this.ContentType = params.asset.ContentType;
	this.Length = params.asset.Length;
	this.Uri = params.asset.Uri;
	this.Content = params.asset.Content;
	this.Container = params.container;
	this.Actions = this.getAssetActions();

	//if (params.inject) {
	//	this.assetService = params.inject.assetService,
	//}
};

_.extend(AssetModel.prototype , {

	getAssetActions: function() {

		var actions = {
			view: false,
			edit: false,
			open: false,
			preview: false,
			del: false
		};

		switch (this.ContentType)
		{
			case "Directory":
				actions.open = true;
				actions.del = true;
				break;
			default:
				actions.view = true;
				actions.edit = true;
				actions.preview = true;
				actions.del = true;
		}

		return actions;
	},

	isEditContentAllowed: function () {
		var res = false;
		switch (this.ContentType) {
			case "application/json":
				res = true;
				break;
		}

		return res;
	},

	getReadableFileSizeString: function () {
		var fileSizeInBytes = this.Length;
		var i = -1;
		var byteUnits = [' kB', ' MB', ' GB', ' TB', 'PB', 'EB', 'ZB', 'YB'];
		do {
			fileSizeInBytes = fileSizeInBytes / 1024;
			i++;
		} while (fileSizeInBytes > 1024);

		return Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i];
	},

	getIcon: function () {

		if (this.IsDirectory)
			return "folder";

		if (this.isImage())
			return "file-image-o";

		if (this.isText())
			return "file-text-o";

		if (this.isJson())
			return "file-code-o";

		var ext = this.getExtension().toLowerCase();
		var icon = "file-o";
		switch (this.ContentType) {
			case "zip":
			case "rar":
			case "7z":
				icon = "file-archive-o";
				break;
		}

		return icon;
	},

	getEditAssetUrl: function () {
		return '/assets/edit?id=' + encodeURIComponent(encodeURIComponent(this.FullName)) + '&container=' + encodeURIComponent(this.Container);
	},

	getViewAssetUrl: function () {
		return '/assets/view?id=' + encodeURIComponent(encodeURIComponent(this.FullName)) + '&container=' + encodeURIComponent(this.Container);
	},

	isImage: function () {
		return this.ContentType.indexOf("image") == 0;
	},

	isJson: function () {
		return this.ContentType.indexOf("/json") > 0;
	},

	isText: function () {
		return this.ContentType.indexOf("text") == 0;
	},

	getExtension: function () {
		return this.Name.substr(this.Name.lastIndexOf('.') + 1);
	}
});

module.exports = AssetModel;
