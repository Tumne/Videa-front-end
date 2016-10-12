// mediaGallery.spec.js


var MediaGallery = require('./mediaGallery.pageObject');

describe('GIVEN: Application Dashboard flow within app studio', function() {

    var mediaGallery = new MediaGallery();

    console.log("mediaGallery.spec.js");

    // initial setup
    browser.get('/');
    mediaGallery.login('admin', 'test');

    // TO DO: Delete all the brands (clean slate)

    describe('WHEN: Creating a new brand', function() {

        it('THEN: Should upload PNG picture', function() {
            mediaGallery.newBrandBtn.click();
            mediaGallery.uploadPNG();
            expect(mediaGallery.getUploadedPNG()).not.toEqual('images/placeholder.png');
        });

        it('THEN: Create a new brand called "Company A" ', function() {
            mediaGallery.createNewBrand('Company A');
            expect(mediaGallery.showBrand()).toEqual('Company A');
        });

    });

    describe('WHEN: Transition to Media Gallery page', function() {

        it('THEN: Clicking "GALLERY" button should go to media gallery view', function() {
            mediaGallery.galleryBtn.click();
            expect(mediaGallery.breadCrumbTitle.getText()).toBe('Media Gallery');
        });

    });


    describe('WHEN: Uploading a new gallery image', function() {

        it('THEN: Should upload PNG picture', function() {
            mediaGallery.newGalleryBtn.click();
            mediaGallery.uploadPNG();
            expect(mediaGallery.getUploadedPNG()).not.toEqual('images/placeholder.png');
        });

        it('THEN: Created gallery image should be present', function() {
            mediaGallery.createNewGallery('Gallery A');
            expect(mediaGallery.getGalleryImg()).not.toEqual('');
        });

        it('THEN: Created gallery name should be "Gallery A" ', function() {
            expect(mediaGallery.getGalleryName()).toEqual('Gallery A');
        });

        it('THEN: Created gallery info should be present', function() {
            expect(mediaGallery.getGalleryInfo()).not.toEqual('');
        });

        it('THEN: Created gallery date should be present', function() {
            expect(mediaGallery.getGalleryDate()).not.toEqual('');
        });

    });

    describe('WHEN: Replacing a gallery image', function() {

        it('THEN: Should upload PNG picture', function() {
            mediaGallery.replaceGalleryBtn.click();
            mediaGallery.uploadPNG();
            expect(mediaGallery.getUploadedPNG()).not.toEqual('images/placeholder.png');
        });

        it('THEN: Replaced gallery image should be present', function() {
            mediaGallery.replaceGallery('Gallery B');
            expect(mediaGallery.getGalleryImg()).not.toEqual('');
        });

        it('THEN: Replaced gallery name should be "Gallery B" ', function() {
            expect(mediaGallery.getGalleryName()).toEqual('Gallery B');
        });

        it('THEN: Replaced gallery info should be present', function() {
            expect(mediaGallery.getGalleryInfo()).not.toEqual('');
        });

        it('THEN: Replaced gallery date should be present', function() {
            expect(mediaGallery.getGalleryDate()).not.toEqual('');
        });

    });

    describe('WHEN: Rename a gallery image', function() {

        it('THEN: Renamed gallery name should be "Gallery C" ', function() {
            mediaGallery.renameGalleryBtn.click();
            mediaGallery.renameGallery('Gallery C');
            expect(mediaGallery.getGalleryName()).toEqual('Gallery C');
        });

        it('THEN: Renamed gallery info should be present', function() {
            expect(mediaGallery.getGalleryInfo()).not.toEqual('');
        });

        it('THEN: Renamed gallery date should be present', function() {
            expect(mediaGallery.getGalleryDate()).not.toEqual('');
        });

    });

    describe('WHEN: Deleting a gallery image', function() {
        it('THEN: Clicking the "DELETE" button should delete the brand', function() {
            mediaGallery.deleteGalleryBtn.click();
            mediaGallery.confirmationModalOKBtn.click();
            expect(mediaGallery.galleryName.isPresent()).toBeFalsy();
        });

    });

    // Reset (optional)
    
    describe('WHEN: Deleting Brand', function() {

        it('THEN: Clicking back button should return to brand view', function(){
            mediaGallery.galleryBackBtn.click();
            expect(mediaGallery.breadCrumbTitle.getText()).toBe('Application Dashboard');
        });

        it('THEN: Clicking the "DELETE" button should delete the brand', function() {
            mediaGallery.clickDeleteIconBtn();
            mediaGallery.confirmationModalOKBtn.click();
            expect(mediaGallery.brandTitleSpan.isPresent()).toBeFalsy();
        });

    });


});
