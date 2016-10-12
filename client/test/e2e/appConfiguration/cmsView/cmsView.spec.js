// cmsView.spec.js


var CmsView = require('./cmsView.pageObject');

describe('GIVEN: Application Dashboard flow within app studio', function() {

    var cmsView = new CmsView();

    console.log("cmsView.spec.js");

    // initial setup
    browser.get('/');
    cmsView.login('admin', 'test');

    // TO DO: Delete all the brands (clean slate)

    describe('WHEN: Creating a new Phone app', function() {
        
        it('THEN: Clicking a "NEW APP +" Button should open a new modal', function() {
            cmsView.newBrandBtn.click();
            cmsView.uploadPNG();
            cmsView.createNewBrand('Company X');
            cmsView.newAppBtn.click();
            expect(cmsView.showNewModal().isPresent()).toBeTruthy();
        });

        it('THEN: Should have the title "Create a New App" ', function() {
            expect(cmsView.modalTitle.getText()).toBe('Create a New App');
        });

        it('THEN: Clicking on phone icon button appears selected', function() {
            cmsView.newAppPhoneBtn.click();
            expect(cmsView.newAppPhoneBtnFilter.isDisplayed()).toBeTruthy();
        });

        it('THEN: Create a new app called "App X - Phone" ', function() {
            cmsView.createNewApp('App X - Phone');
            expect(cmsView.getAppTextByClass('.title', 'App X - Phone')).toBe('App X - Phone');
        });

    });

    describe('WHEN: Editing an App', function() {

        it('THEN: Clicking "EDIT" button should open config page', function() {
            cmsView.clickEditApp('App X - Phone');
            expect(cmsView.editConfigTitle.getText()).toBe('App X - Phone');
        });

    });

    describe('WHEN: Creating a new CMS configuration', function() {
    
        it('THEN: Clicking "NEW CMS" button should open modal', function() {
            cmsView.cmsTab.click();
            cmsView.newCMSBtn.click();
            expect(cmsView.showNewModal().isPresent()).toBeTruthy();
        });

        it('THEN: Should have the title "Add New Cms"', function() {
            expect(cmsView.modalTitle.getText()).toBe('Add New Cms');
        });


        it('THEN: Create a new cms called "Mpx" ', function() {
            cmsView.cmsSpan.click();
            cmsView.getCmsOption(0).click();
            cmsView.createAppBrandBtn.click();
            expect(cmsView.cmsItem.getText()).toBe('Mpx');
        });

    });

    describe('WHEN: Saving a CMS configuration', function() {

        it('THEN: Clicking CMS item should show label "PID"', function() {
            cmsView.cmsItem.click();
            expect(cmsView.getCmsLabel(0)).toBe('PID');
        });

        it('THEN: Clicking CMS item should show label "Account ID"', function() {
            expect(cmsView.getCmsLabel(1)).toBe('Account ID');
        });

        it('THEN: Clicking CMS item should show label "test ID"', function() {
            expect(cmsView.getCmsLabel(2)).toBe('test ID');
        });

        it('THEN: Clicking "SAVE SETTINGS" button should save all the data', function() {
            cmsView.setTextComponentInput(0, 'value1');
            cmsView.setNumberComponentInput(0, "2");
            cmsView.setNumberComponentInput(1, "3");

            cmsView.saveSettingsBtn.click();
            cmsView.editConfigBackBtn.click();
            cmsView.clickEditApp('App X - Phone');
            cmsView.cmsTab.click();
            expect(cmsView.getTextComponentInput(0)).toBe('value1');
        });
        
    });

    describe('WHEN: Deleting a CMS configuration', function() {
        it('THEN: Click "DELETING CONFIGURATION" button should open modal', function() {
            cmsView.deleteConfigurationBtn.click();
            expect(cmsView.showNewModal().isPresent()).toBeTruthy();
        });
        
        it('THEN: Click "DELETING CONFIGURATION" button should open modal', function() {
            cmsView.confirmationModalOKBtn.click();
            expect(cmsView.cmsListItem.isPresent()).toBeFalsy();
        });
    });

    // Reset (optional)
    
    describe('WHEN: Deleting Brand', function() {

        it('THEN: Clicking back button should return to brand view', function(){
            cmsView.editConfigBackBtn.click();
            expect(cmsView.breadCrumbTitle.getText()).toBe('Application Dashboard');
        });

        it('THEN: Clicking the "DELETE" button should delete the brand', function() {
            cmsView.clickDeleteIconBtn();
            cmsView.confirmationModalOKBtn.click();
            expect(cmsView.brandTitleSpan.isPresent()).toBeFalsy();
        });

    });

});
