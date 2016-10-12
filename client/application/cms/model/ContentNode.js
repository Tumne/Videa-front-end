module.exports = function contentnodeModel($q, contentTypeService, Contenttype) {
	var titleFieldNames = ['name', 'title'];
	var imageFieldNames = ['images'];

	function Contentnode() {

		var _this = this;

		this.getEditUrl = function (id) {
			if (!this.id) {
				return;
			}
			return "/content/edit/" + this.id;
		}

		this.getViewUrl = function (id) {
			if (!this.id) {
				return;
			}
			return "/content/view/" + this.id;
		}

		this.getFieldByName = function (name) {
			return this.values[name];
		}


		this.tryGetFieldByNames = function (names) {
			var len = names.length;
			for (var i = 0; i < len; i++) {
				var field = this.getFieldByName(names[i]);
				if (field) {
					return field;
				}
			}
		}

		this.tryGetFieldTypeByNames = function (names) {
			var len = names.length;
			for (var i = 0; i < len; i++) {
				var field = this.getFieldByName(names[i]);
				if (field) {
					return names[i];
				}
			}
		}


		this.tryGetTitleFieldType = function () {
			return this.tryGetFieldTypeByNames(titleFieldNames);
		}

		this.tryGetImageField = function () {
			return this.tryGetFieldByNames(imageFieldNames);
		}

		this.tryGetTitleField = function () {
			return this.tryGetFieldByNames(titleFieldNames);
		}

		this.tryGetFieldData = function (field) {

			return this.values[field];
		}

		this.setupFieldDirectives = function (editMode, fieldVar, dataVar, expandedVar, onupdate) {

			editMode = editMode || "view";
			fieldVar = fieldVar || "field";
			dataVar = dataVar || "data";
			expandedVar = expandedVar || "expanded";

			var onupdateFunc = "";
			if (onupdate) {
				onupdateFunc = 'onupdate="' + onupdate + '(contentId, field, value)"';
			}

			var groups = this.type.fieldGroups;

			function compare(a, b) {
				if (a.orderIndex < b.orderIndex) {
					return -1;
				}
				if (a.orderIndex > b.orderIndex) {
					return 1;
				}
				return 0;
			}

			if (groups) {
				for (var g = 0; g < groups.length; g++) {
					var fields = groups[g].fields;
					if (fields) {
						fields.sort(compare);

						for (var f = 0; f < fields.length; f++) {
							var fieldType = fields[f].fieldType;

							if(fieldType ===  'URL'){
								fieldType = 'url';
							}

							fields[f].directive = "<" + ( fieldType + 'ContentFieldDirective').toDash() + ' expanded="' + expandedVar + '" ' + onupdateFunc + ' contentid="\'' + this.id + '\'" field="' + fieldVar + '" value="' + dataVar + '.values[' + fieldVar + '.id]" edit="\'' + editMode + '\'" />';
						}						
					}
				}
			}
		};

		this.loadStructure = function () {
			var _this = this;

			var deferred = $q.defer();
			contentTypeService.get(_this.contentTypeId)
				.then(function (result) {
						
						_this.type = Contenttype.apiResponseTransformer(result);
						_this.type.loadStructure().then(function(result) {
								deferred.resolve(_this);
							},
							function (reason) {
								deferred.reject(reason);
							}
						);
					},
					function (reason) {
						deferred.reject(reason);
					}
				);

			return deferred.promise;
		}

		this.isStructureLoaded = function () {
			return this.type !== undefined && this.type !== null && this.type.isStructureLoaded();
		};
	}


	Contentnode.build = function (data) {
		var contentnode = new Contentnode();
		angular.extend(contentnode, data);

		return contentnode;
	}

	Contentnode.apiResponseTransformer = function (responseData) {
		if (angular.isArray(responseData)) {
			return responseData
				.map(Contentnode.build)
				.filter(Boolean);
		}
		return Contentnode.build(responseData);
	};

	return Contentnode;
};
