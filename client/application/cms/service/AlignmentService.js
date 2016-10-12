var AlignmentService = function() {
    this.defaultWith = '450px';
    this.isShowingRightCol = false;
};

_.extend(AlignmentService.prototype, {
    showRightCol: function (init) {
        //if (isShowingRightCol) {
        //	return;
        //}
        //isShowingRightCol = true;
        //var initVal = init || false;
        //var rightCurWidth = jQuery('#rightCol').width();

        //if (jQuery(window).width() > (rightCurWidth * 2) && (jQuery('#rightCol').is(":hidden") || initVal)) {

        //	var leftCurWidth = jQuery('#leftCol').width();
        //	var paddings = 25;
        //	jQuery('#leftCol').width(parseInt(leftCurWidth) - parseInt(rightCurWidth) - parseInt(paddings));
        //}
    },
    hideRightCol: function () {
        //isShowingRightCol = false;
        //jQuery('#leftCol').width('calc(100% - 20px)');
    },
    setRightColDefaultWidth: function (width) {
        //isShowingRightCol = false;
        ////if (width) {
        ////	defaultWith = width;
        ////}
        //jQuery('#rightCol').width(defaultWith);
    },
    setRightColFullWidth: function () {
        //isShowingRightCol = false;
        //jQuery('#rightCol').width('100%');
    },
    showTab: function (t) {
        $('#tab' + t).tab('show');
    }                                           
});

module.exports = AlignmentService;