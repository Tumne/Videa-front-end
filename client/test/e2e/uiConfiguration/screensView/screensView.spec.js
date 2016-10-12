// screensView.spec.js


var ScreensView = require('./screensView.pageObject');

describe('GIVEN: Application Dashboard flow within app studio', function() {

    var screensView = new ScreensView();

    console.log("screensView.spec.js");

    // initial setup
    browser.get('/');
    screensView.login('admin', 'test');

    // TO DO: Delete all the brands (clean slate)

    describe('WHEN: Creating a new Phone app', function() {
        
        it('THEN: Clicking a "NEW APP +" Button should open a new modal', function() {
            screensView.newBrandBtn.click();
            screensView.uploadPNG();
            screensView.createNewBrand('Company X');
            screensView.newAppBtn.click();
            expect(screensView.showNewModal().isPresent()).toBeTruthy();
        });

        it('THEN: Should have the title "Create a New App" ', function() {
            expect(screensView.modalTitle.getText()).toBe('Create a New App');
        });

        it('THEN: Clicking on phone icon button appears selected', function() {
            screensView.newAppPhoneBtn.click();
            expect(screensView.newAppPhoneBtnFilter.isDisplayed()).toBeTruthy();
        });

        it('THEN: Create a new app called "App X - Phone" ', function() {
            screensView.createNewApp('App X - Phone');
            expect(screensView.getAppTextByClass('.title', 'App X - Phone')).toBe('App X - Phone');
        });

    });

    describe('WHEN: Editing an App', function() {

        it('THEN: Clicking "EDIT" button should open config page', function() {
            screensView.clickEditApp('App X - Phone');
            expect(screensView.editConfigTitle.getText()).toBe('App X - Phone');
        });

    });

    // describe('WHEN: Saving an ad', function() {

    //     it('THEN: Clicking "Enabled" checkbox should be true', function() {
    //         adsView.adsTab.click();
    //         adsView.enabledCheckbox.click();
    //         adsView.setTextComponentInput(0, 'value1');
    //         adsView.setTextComponentInput(1, 'value2');
    //         expect(adsView.enabledCheckbox.isSelected()).toBeTruthy();
    //     });

    //     it('THEN: Clicking "SAVE SETTINGS" button should save all the data', function() {
    //         adsView.saveSettingsBtn.click();
    //         adsView.editConfigBackBtn.click();
    //         adsView.clickEditApp('App X - Phone');
    //         adsView.adsTab.click();
    //         expect(adsView.enabledCheckbox.isSelected()).toBeTruthy();
    //     });

    //     it('THEN: Clicking "SAVE SETTINGS" button should save "type" input', function() {
    //         expect(adsView.getTextComponentInput(0)).toBe('value1');
    //     });

    //     it('THEN: Clicking "SAVE SETTINGS" button should save "Ad Tag Url" input', function() {
    //         expect(adsView.getTextComponentInput(1)).toBe('value2');
    //     });
        
    // });

    // Reset (optional)
    
    describe('WHEN: Deleting Brand', function() {

        it('THEN: Clicking back button should return to brand view', function(){
            screensView.editConfigBackBtn.click();
            expect(screensView.breadCrumbTitle.getText()).toBe('Application Dashboard');
        });

        it('THEN: Clicking the "DELETE" button should delete the brand', function() {
            screensView.clickDeleteIconBtn();
            screensView.confirmationModalOKBtn.click();
            expect(screensView.brandTitleSpan.isPresent()).toBeFalsy();
        });

    });

});
