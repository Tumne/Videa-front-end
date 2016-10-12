// parentalControlsView.spec.js


var ParentalControlsView = require('./parentalControlsView.pageObject');

describe('GIVEN: Application Dashboard flow within app studio', function() {

    var parentalControlsView = new ParentalControlsView();

    console.log("parentalControlsView.spec.js");

    // initial setup
    browser.get('/');
    parentalControlsView.login('admin', 'test');

    // TO DO: Delete all the brands (clean slate)

    describe('WHEN: Creating a new Phone app', function() {
        
        it('THEN: Clicking a "NEW APP +" Button should open a new modal', function() {
            parentalControlsView.newBrandBtn.click();
            parentalControlsView.uploadPNG();
            parentalControlsView.createNewBrand('Company X');
            parentalControlsView.newAppBtn.click();
            expect(parentalControlsView.showNewModal().isPresent()).toBeTruthy();
        });

        it('THEN: Should have the title "Create a New App" ', function() {
            expect(parentalControlsView.modalTitle.getText()).toBe('Create a New App');
        });

        it('THEN: Clicking on phone icon button appears selected', function() {
            parentalControlsView.newAppPhoneBtn.click();
            expect(parentalControlsView.newAppPhoneBtnFilter.isDisplayed()).toBeTruthy();
        });

        it('THEN: Create a new app called "App X - Phone" ', function() {
            parentalControlsView.createNewApp('App X - Phone');
            expect(parentalControlsView.getAppTextByClass('.title', 'App X - Phone')).toBe('App X - Phone');
        });

    });

    describe('WHEN: Editing an App', function() {

        it('THEN: Clicking "EDIT" button should open config page', function() {
            parentalControlsView.clickEditApp('App X - Phone');
            expect(parentalControlsView.editConfigTitle.getText()).toBe('App X - Phone');
        });

    });



    describe('WHEN: Saving an ad', function() {

        it('THEN: Clicking "Enabled" checkbox should be true', function() {
            parentalControlsView.parentalControlsTab.click();
            parentalControlsView.enabledCheckbox.click();
            parentalControlsView.setTextComponentInput(0, 'value1');
            // parentalControlsView.setTextComponentInput(1, 'value2');
            expect(parentalControlsView.enabledCheckbox.isSelected()).toBeTruthy();
        });

        it('THEN: Clicking "SAVE SETTINGS" button should save all the data', function() {
            parentalControlsView.saveSettingsBtn.click();
            parentalControlsView.editConfigBackBtn.click();
            parentalControlsView.clickEditApp('App X - Phone');
            parentalControlsView.parentalControlsTab.click();
            expect(parentalControlsView.enabledCheckbox.isSelected()).toBeTruthy();
        });

        it('THEN: Clicking "SAVE SETTINGS" button should save "type" input', function() {
            expect(parentalControlsView.getTextComponentInput(0)).toBe('value1');
        });
        
    });

    // Reset (optional)
    
    describe('WHEN: Deleting Brand', function() {

        it('THEN: Clicking back button should return to brand view', function(){
            parentalControlsView.editConfigBackBtn.click();
            expect(parentalControlsView.breadCrumbTitle.getText()).toBe('Application Dashboard');
        });

        it('THEN: Clicking the "DELETE" button should delete the brand', function() {
            parentalControlsView.clickDeleteIconBtn();
            parentalControlsView.confirmationModalOKBtn.click();
            expect(parentalControlsView.brandTitleSpan.isPresent()).toBeFalsy();
        });

    });

});
