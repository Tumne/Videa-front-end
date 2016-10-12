"use strict";

var AppConfigurationDirective = require('cms/view/directive/home/AppConfigurationWidget/AppConfigurationDirective');
var BindUnsafeHtmlDirective = require('cms/view/directive/directives/BindUnsafeHtmlDirective');
var BucketDirective = require('cms/view/directive/buckets/BucketDirective');
var CastMemberDirectives = require('cms/view/directive/directives/CastMemberDirectives');
var ContentLibraryDirective = require('cms/view/directive/home/ContentLibraryWidget/ContentLibraryDirective');
var ContentListDirective = require('cms/view/directive/contentLists/ContentListDirective');
var ContentNodeAvailabilityDirective = require('cms/view/directive/contentNode/ContentNodeAvailabilityDirective');
var ContentNodeBucketDirective = require('cms/view/directive/contentNode/ContentNodeBucketDirective');
var ContentNodeDirective = require('cms/view/directive/contentNode/ContentNodeDirective');
var ContentNodeWorkflowDirective = require('cms/view/directive/contentNode/ContentNodeWorkflowDirective');
var ContentTextAttributeDirective = require('cms/view/directive/directives/ContentTextAttributeDirective');
var ContentTypeDirective = require('cms/view/directive/contentType/ContentTypeDirective');
var ContentTypeFieldDirective = require('cms/view/directive/contentField/contentType/ContentTypeFieldDirective');
var ContentTypesDirective = require('cms/view/directive/home/ContentTypesWidget/ContentTypesDirective');
var DatetimeContentFieldDirective = require('cms/view/directive/contentField/contentNode/DatetimeContentFieldDirective');
var DesignationFieldDirective = require('cms/view/directive/contentField/contentNode/DesignationFieldDirective');
var DropdownContentFieldDirective = require('cms/view/directive/contentField/contentNode/DropdownContentFieldDirective');
var EditAccountDirective = require('cms/view/directive/account/EditAccountDirective');
var EditMemberDirective = require('cms/view/directive/members/EditMemberDirective');
var EditUserDirective = require('cms/view/directive/user/EditUserDirective');
var ImageContentFieldDirective = require('cms/view/directive/contentField/contentNode/ImageContentFieldDirective');
var IntegerContentFieldDirective = require('cms/view/directive/contentField/contentNode/IntegerContentFieldDirective');
var MaturityRatingDirective = require('cms/view/directive/directives/MaturityRatingDirective');
var NgEnterKeyDown = require('cms/view/directive/directives/ngEnterkeydown');
var RatingContentFieldDirective = require('cms/view/directive/contentField/contentNode/RatingContentFieldDirective');
var ReferenceContentFieldDirective = require('cms/view/directive/contentField/contentNode/ReferenceContentFieldDirective');
var ReferenceContentNodeDirective =  require('cms/view/directive/contentLists/ReferenceContentNodeDirective');
var SearchSuggestionsInputDirective = require('cms/view/directive/directives/SearchSuggestionsInputDirective');
var SignUpRequestsStateDirective = require('cms/view/directive/signUp/SignUpRequestsStateDirective');
var TextAreaContentFieldDirective = require('cms/view/directive/contentField/contentNode/TextAreaContentFieldDirective');
var TextContentFieldDirective = require('cms/view/directive/contentField/contentNode/TextContentFieldDirective');
var UrlContentFieldDirective = require('cms/view/directive/contentField/contentNode/UrlContentFieldDirective');
var VideaContentHeaderDirective = require('cms/view/directive/layout/VideaContentHeaderDirective');
var VideaContentListDirective =require('cms/view/directive/layout/VideaContentListDirective');

angular.module('cms.directives', []).run(function(){})
	.directive('appConfigurationWidgetDirective', AppConfigurationDirective)
	.directive('bindUnsafeHtml', BindUnsafeHtmlDirective)
	.directive('bucketDirective', BucketDirective)
	.directive('castMemberSplit', CastMemberDirectives)
	.directive('contentLibraryWidgetDirective', ContentLibraryDirective)
	.directive('contentListDirective', ContentListDirective)
	.directive('contentnodeAvailabilityDirective', ContentNodeAvailabilityDirective)
	.directive('contentNodeBucketDirective', ContentNodeBucketDirective)
	.directive('contentnodeDirective', ContentNodeDirective)
	.directive('contentnodeWorkflowDirective', ContentNodeWorkflowDirective)
	.directive('contentTextAttributeDirective', ContentTextAttributeDirective)
	.directive('contenttypeDirective', ContentTypeDirective)
	.directive('contentTypeFieldDirective', ContentTypeFieldDirective)
	.directive('contentTypesWidgetDirective', ContentTypesDirective)
	.directive("datetimeContentFieldDirective", DatetimeContentFieldDirective)
	.directive('designationFieldDirective', DesignationFieldDirective)
	.directive('dropdownContentFieldDirective', DropdownContentFieldDirective)
	.directive('editAccountDirective', EditAccountDirective)
	.directive('editMemberDirective', EditMemberDirective)
	.directive('editUserDirective', EditUserDirective)
	.directive('imageContentFieldDirective', ImageContentFieldDirective)
	.directive('integerContentFieldDirective', IntegerContentFieldDirective)
	.directive('maturityRating', MaturityRatingDirective)
	.directive('ngEnterkeydown', NgEnterKeyDown)
	.directive('ratingContentFieldDirective', RatingContentFieldDirective)
	.directive('referenceContentFieldDirective', ReferenceContentFieldDirective)
	.directive('referenceContentNodeDirective', ReferenceContentNodeDirective)
	.directive('searchSuggestionsInputDirective', SearchSuggestionsInputDirective)
	.directive('signUpRequestsStateDirective', SignUpRequestsStateDirective)
	.directive('textAreaContentFieldDirective', TextAreaContentFieldDirective)
	.directive('textContentFieldDirective', TextContentFieldDirective)
	.directive('urlContentFieldDirective', UrlContentFieldDirective)
	.directive('videaContentHeader', VideaContentHeaderDirective)
	.directive('videaContentList', VideaContentListDirective);
