
String.prototype.toCamel = function () {
	return this.replace(/(\-[a-z])/g, function ($1) { return $1.toUpperCase().replace('-', ''); });
};

String.prototype.toDash = function () {

	var str = this.replace(/([A-Z])/g, function ($1) { return "-" + $1.toLowerCase(); });

	return (str[0] == '-' ? str.substring(1) : str);
};

String.prototype.toUnderscore = function () {
	return this.replace(/([A-Z])/g, function ($1) { return "_" + $1.toLowerCase(); });
};

String.prototype.trim = function () {
	return this.replace(/^\s+|\s+$/g, "");
};

String.prototype.removeSpacesAndToLower = function () {
	return this.replace(/\s+/g, '-').toLowerCase();
}