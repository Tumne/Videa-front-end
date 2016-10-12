"use strict";

module.exports =  function ($q, contentTypeService) {
    function Contenttype() {

        var _this = this;
        this.id = null;

        this.getEditUrl = function (id) {
            if (!this.id) {
                return;
            }
            return "/content/edit/" + this.id;
        };

        this.setupFieldDirectives = function (editMode, fieldVar, dataVar, expandedVar, onupdate) {

            editMode = editMode || "view";
            fieldVar = fieldVar || "field";
            dataVar = dataVar || "data";
            expandedVar = expandedVar || "expanded";

            var onupdateFunc = "";
            if (onupdate)
                onupdateFunc = 'onupdate="' + onupdate + '(contentId, field, value)"';

            var groups = this.fieldGroups;

            if (groups) {
                for (var g = 0; g < groups.length; g++) {
                    var fields = groups[g].fields;

                    if (fields) {

                        fields.sort(function compare(a, b) {
                            if (a.orderIndex < b.orderIndex)
                                return -1;
                            if (a.orderIndex > b.orderIndex)
                                return 1;
                            return 0;
                        });

                        for (var f = 0; f < fields.length; f++) {

                            //	fields[f].Directive = "<" + (fields[f].FieldType + 'Directive').toDash() + ' expanded="' + expandedVar + '" ' + onupdateFunc + ' contentid="\'' + this.Id + '\'" field="' + fieldVar + '" value="' + fields[f].FieldType + '" edit="\'' + editMode + '\'" preventsave="PreventSave" />';
                            fields[f].directive = "<content-type-field-directive" + ' expanded="' + expandedVar + '" ' + onupdateFunc + ' contentid="\'' + this.id + '\'" field="' + fieldVar + '" value="' + fields[f].fieldType + '" edit="\'' + editMode + '\'" preventsave="PreventSave" />';

                        }
                    }
                }
            }
        }

        this.loadStructure = function () {
            var _this = this;

            var deferred = $q.defer();
            contentTypeService.getFields(_this.id)
                .then(function (result) {

                    var groups = _this.fieldGroups;
					
                    if (groups) {
                        for (var g = 0; g < groups.length; g++) {
                            var fieldIds = groups[g].fieldIds;
                            if (fieldIds) {
								
                                var fields = [];
                                for (var f = 0; f < fieldIds.length; f++) {
                                    var field = result.filter(function(e){ return e.id == fieldIds[f]; });
                                    if (field.length == 1) {
                                        fields.push(field[0]);
                                    }
                                }
                                groups[g].fields = fields;
                            }
                        }
                    }

                    deferred.resolve(_this);
                },
                function (reason) {
                    deferred.reject(reason);
                }
            );

            return deferred.promise;
        }

        this.isStructureLoaded = function () {
            return this.fieldGroups && (this.fieldGroups.length === 0 || this.fieldGroups[0].fields !== undefined);
        };
    }

    Contenttype.build = function (data) {
        var contenttype = new Contenttype();
		
        angular.extend(contenttype, data);

        return contenttype;
    }

    Contenttype.apiResponseTransformer = function (responseData) {
        if (angular.isArray(responseData)) {
            return responseData
                .map(Contenttype.build)
                .filter(Boolean);
        }
        return Contenttype.build(responseData);
    };

    return Contenttype;
}
