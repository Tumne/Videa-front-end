// authenticationView.spec.js


var AuthenticationView = require('./authenticationView.pageObject');

describe('GIVEN: Application Dashboard flow within app studio', function() {

    var authenticationView = new AuthenticationView();

    console.log("authenticationView.spec.js");

    // initial setup
    browser.get('/');
    authenticationView.login('admin', 'test');

    // TO DO: Delete all the brands (clean slate)

    describe('WHEN: Creating a new Phone app', function() {
        
        it('THEN: Clicking a "NEW APP +" Button should open a new modal', function() {
            authenticationView.newBrandBtn.click();
            authenticationView.uploadPNG();
            authenticationView.createNewBrand('Company X');
            authenticationView.newAppBtn.click();
            expect(authenticationView.showNewModal().isPresent()).toBeTruthy();
        });

        it('THEN: Should have the title "Create a New App" ', function() {
            expect(authenticationView.modalTitle.getText()).toBe('Create a New App');
        });

        it('THEN: Clicking on phone icon button appears selected', function() {
            authenticationView.newAppPhoneBtn.click();
            expect(authenticationView.newAppPhoneBtnFilter.isDisplayed()).toBeTruthy();
        });

        it('THEN: Create a new app called "App X - Phone" should create new app', function() {
            authenticationView.createNewApp('App X - Phone');
            expect(authenticationView.getAppTextByClass('.title', 'App X - Phone')).toBe('App X - Phone');
        });

    });

    describe('WHEN: Editing an App', function() {

        it('THEN: Clicking "EDIT" button should open config page', function() {
            authenticationView.clickEditApp('App X - Phone');
            expect(authenticationView.editConfigTitle.getText()).toBe('App X - Phone');
        });

    });

    describe('WHEN: Create a new Akamai Provider', function() {

        it('THEN: Clicking "Authentication" tab should transition to Provider setup view', function() {
            authenticationView.authenticationTab.click();
            expect(authenticationView.getStagingTitle(0)).toBe('Provider');
        });

        it('THEN: Clicking "Select your Provider" selectbox should display dropDown', function() {
            authenticationView.providerSpan.click();
            expect(authenticationView.getProviderOption(0).getText()).toBe('Akamai');
        });

        it('THEN: Clicking "Akamai" should show as selected', function() {
            authenticationView.getProviderOption(0).click();
            expect(authenticationView.providerSpan.getText()).toBe('Akamai');
        });

        it('THEN: "Akamai IDP" input exists', function() {
            expect(authenticationView.getStagingTitle(1)).toBe('Akamai IDP');
        });

        it('THEN: "iOS" input exists', function() {
            expect(authenticationView.getStagingTitle(2)).toBe('iOS');
        });

        it('THEN: "Android" input exists', function() {
            expect(authenticationView.getStagingTitle(3)).toBe('Android');
        });

        it('THEN: "Web" input exists', function() {
            expect(authenticationView.getStagingTitle(4)).toBe('Web');
        });

        it('THEN: "name" input exists', function() {
            expect(authenticationView.getStagingTitle(5)).toBe('name');
        });

        it('THEN: "target" input exists', function() {
            expect(authenticationView.getStagingTitle(6)).toBe('target');
        });

        it('THEN: "name" input exists', function() {
            expect(authenticationView.getStagingTitle(7)).toBe('name');
        });

        it('THEN: "target" input exists', function() {
            expect(authenticationView.getStagingTitle(8)).toBe('target');
        });

        it('THEN: "name" input exists', function() {
            expect(authenticationView.getStagingTitle(9)).toBe('name');
        });

        it('THEN: "target" input exists', function() {
            expect(authenticationView.getStagingTitle(10)).toBe('target');
        });

        it('THEN: "Resource Access Codes" input exists', function() {
            expect(authenticationView.getStagingTitle(11)).toBe('Resource Access Codes');
        });

        it('THEN: Input data into textfields, click "SAVE SETTINGS" button should save data', function() {
            for( i=0; i < 10; i++){
                authenticationView.setObjectEditorInput(i);
            }
            authenticationView.saveSettings();
            authenticationView.editConfigBackBtn.click();
            authenticationView.clickEditApp('App X - Phone');
            authenticationView.authenticationTab.click();
            
            for( i=0; i < 10; i++){
                expect(authenticationView.getObjectEditorInput(i)).toBe('value' + (i+1));
            }

        });

    });

    describe('WHEN: Creating a Resource Access Code', function() {
        
        it('THEN: Clicking a "+" Button should open a new modal', function() {
            authenticationView.addResourceBtn.click();
            expect(authenticationView.showNewModal().isPresent()).toBeTruthy();
        });

        it('THEN: Should have the title "Add New Resource Access Codes" ', function() {
            expect(authenticationView.modalTitle.getText()).toBe('Add New Resource Access Codes');
        });

        it('THEN: Create a new app called "Resource A" should create new resource', function() {
            authenticationView.createNewResource('Resource A');
            expect(authenticationView.getAddedResource(0)).toBe('Resource A');
        });

    });

    describe('WHEN: Editing a Resource Access Code', function() {
        
        it('THEN: Edit "Resource A" resource title to be "Resource B"', function() {
            expect(authenticationView.editResourceTitle('Resource B')).toEqual('Resource B');
        });

    });

    describe('WHEN: Deleting a Resource Access Code', function() {
        
        it('THEN: Click delete resource icon button should not display the resource', function() {
            authenticationView.deleteResourceBtn.click();
            expect(authenticationView.tableRow.isPresent()).toBeFalsy();
        });
        
    });

    // Reset (optional)
    
    describe('WHEN: Deleting Brand', function() {

        it('THEN: Clicking back button should return to brand view', function(){
            authenticationView.scrollToTop();
            authenticationView.editConfigBackBtn.click();
            expect(authenticationView.breadCrumbTitle.getText()).toBe('Application Dashboard');
        });

        it('THEN: Clicking the "DELETE" button should delete the brand', function() {
            authenticationView.clickDeleteIconBtn();
            authenticationView.confirmationModalOKBtn.click();
            expect(authenticationView.brandTitleSpan.isPresent()).toBeFalsy();
        });

    });

});
