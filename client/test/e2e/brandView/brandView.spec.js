// brandView.spec.js


var BrandView = require('./brandView.pageObject');

describe('GIVEN: Application Dashboard flow within app studio', function() {

    var brandView = new BrandView();

    console.log("brandView.spec.js");

    // initial setup
    browser.get('/');
    brandView.login('admin', 'test');
    
    // TO DO: Delete all the brands (clean slate)

    describe('WHEN: Creating a new brand and cancelling ', function() {

        it('THEN: Click "SETUP A NEW BRAND" Button should open a new modal', function() {
            brandView.newBrandBtn.click();
            expect(brandView.showNewModal().isPresent()).toBeTruthy();
        });

        it('THEN: Should have the title "Set up a New Brand" ', function() {
            expect(brandView.modalTitle.getText()).toBe('Set up a New Brand');
        });

        it('THEN: Clicking "X" button should close the modal', function() {
            brandView.modalCloseBtn.click();
            expect(brandView.showNewModal().isPresent()).toBeFalsy();
        });

    });

    describe('WHEN: Creating a new brand', function() {

        it('THEN: Should upload PNG picture', function() {
            brandView.newBrandBtn.click();
            brandView.uploadPNG();
            expect(brandView.getUploadedPNG()).not.toEqual('images/placeholder.png');
        });

        it('THEN: Create a new brand called "Company A" ', function() {
            brandView.createNewBrand('Company A');
            expect(brandView.showBrand()).toEqual('Company A');
        });

    });
    
    describe('WHEN: Editing a new brand', function() {

        it('THEN: Edit "Company A" brand title to be "Company B"', function() {
            expect(brandView.editBrandTitle('Company B')).toEqual('Company B');
        });

        it('THEN: Hover over brand title shows brand buttons', function(){
            expect(brandView.getBrandIconBtns().isDisplayed()).toBeTruthy();
        });

        it('THEN: Upon hover, click edit icon button should open a new modal for editing', function() {
            brandView.clickEditIconBtn();
            expect(brandView.showNewModal().isPresent()).toBeTruthy();
        });

    });

    describe('WHEN: Deleting a new brand ', function() {

        it('THEN: Upon hover, click delete icon button should open a new modal', function() {
            brandView.clickDeleteIconBtn();
            expect(brandView.showNewModal().isPresent()).toBeTruthy();
        });

        it('THEN: Should have the title "Delete Brand" ', function() {
            expect(brandView.modalTitle.getText()).toBe('Delete Brand');
        });

        it('THEN: Clicking "X" button should close the modal', function() {
            brandView.modalCloseBtn.click();
            expect(brandView.showNewModal().isPresent()).toBeFalsy();
        });

        it('THEN: Clicking the "CANCEL" button should close the modal', function() {
            brandView.clickDeleteIconBtn();
            brandView.confirmationModalCloseBtn.click();
            expect(brandView.showNewModal().isPresent()).toBeFalsy();
        });

        it('THEN: Clicking the "DELETE" button should delete the brand', function() {
            brandView.clickDeleteIconBtn();
            brandView.confirmationModalOKBtn.click();
            expect(brandView.brandTitleSpan.isPresent()).toBeFalsy();
        });


    });

    describe('WHEN: Creating a new Phone app', function() {
        
        it('THEN: Clicking a "NEW APP +" Button should open a new modal', function() {
            brandView.newBrandBtn.click();
            brandView.uploadPNG();
            brandView.createNewBrand('Company X');
            brandView.newAppBtn.click();
            expect(brandView.showNewModal().isPresent()).toBeTruthy();
        });

        it('THEN: Should have the title "Create a New App" ', function() {
            expect(brandView.modalTitle.getText()).toBe('Create a New App');
        });

        it('THEN: Clicking on phone icon button appears selected', function() {
            brandView.newAppPhoneBtn.click();
            expect(brandView.newAppPhoneBtnFilter.isDisplayed()).toBeTruthy();
            // browser.wait(5000);
        });

        it('THEN: Create a new app called "App X - Phone" ', function() {
            brandView.createNewApp('App X - Phone');
            expect(brandView.getAppTextByClass('.title', 'App X - Phone')).toBe('App X - Phone');
        });

    });

    describe('WHEN: Creating a new Tablet app', function() {
        
        it('THEN: Clicking on Tablet icon button appears selected', function() {
            brandView.newAppBtn.click();
            brandView.newAppTabletBtn.click();
            expect(brandView.newAppTabletBtnFilter.isDisplayed()).toBeTruthy();
        });

        it('THEN: Create a new app called "App X - Tablet" ', function() {
            brandView.createNewApp('App X - Tablet');
            expect(brandView.getAppTextByClass('.title', 'App X - Tablet')).toBe('App X - Tablet');
        });

    });

    describe('WHEN: Creating a new TV app', function() {
        
        it('THEN: Clicking on TV icon button appears selected', function() {
            brandView.newAppBtn.click();
            brandView.newAppTVBtn.click();
            expect(brandView.newAppTVBtnFilter.isDisplayed()).toBeTruthy();
        });

        it('THEN: Create a new app called "App X - TV" ', function() {
            brandView.createNewApp('App X - TV');
            expect(brandView.getAppTextByClass('.title', 'App X - TV')).toBe('App X - TV');
        });

    });

    describe('WHEN: Editing an App', function() {

        it('THEN: Clicking "EDIT" button should open config page', function() {
            brandView.clickEditBrand('App X - Phone');
            expect(brandView.editConfigTitle.getText()).toBe('App X - Phone');
        });

    });

    describe('WHEN: Deleting an App', function() {
        
        it('THEN: Hover over App Card shows "x" delete button in top-right corner', function(){
            brandView.editConfigBackBtn.click();
            expect(brandView.getDeleteAppBtn().isDisplayed()).toBeTruthy();
        });

        it('THEN: Upon hover, clicking "X" button should open a new modal', function() {
            brandView.clickDeleteAppBtn();
            expect(brandView.showNewModal().isPresent()).toBeTruthy();
        });

        it('THEN: Should have the title "Delete App" ', function() {
            expect(brandView.modalTitle.getText()).toBe('Delete App');
        });

        it('THEN: Clicking the "CANCEL" button should close the modal', function() {
            brandView.confirmationModalCloseBtn.click();
            expect(brandView.showNewModal().isPresent()).toBeFalsy();
        });

        it('THEN: Clicking the "DELETE" button should delete the Phone App', function() {
            brandView.clickDeleteAppBtn();
            brandView.confirmationModalOKBtn.click();
            expect(brandView.appCardDeleted()).toBe('App X - Tablet');
        });


    });

    describe('WHEN: Transition to Media Gallery page', function() {

        it('THEN: Clicking "GALLERY" button should go to media gallery view', function() {
            brandView.newGalleryBtn.click();
            expect(brandView.breadCrumbTitle.getText()).toBe('Media Gallery');
        });

        it('THEN: Clicking back button should return to brand view', function(){
            brandView.galleryBackBtn.click();
            expect(brandView.breadCrumbTitle.getText()).toBe('Application Dashboard');
        });

    });

    // Reset (optional)
    
    describe('WHEN: Deleting Brand', function() {

        it('THEN: Clicking the "DELETE" button should delete the brand', function() {
            brandView.clickDeleteIconBtn();
            brandView.confirmationModalOKBtn.click();
            expect(brandView.brandTitleSpan.isPresent()).toBeFalsy();
        });



    });


});
