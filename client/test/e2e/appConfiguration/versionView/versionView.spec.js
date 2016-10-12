// versionView.spec.js



var VersionView = require('./versionView.pageObject');

describe('GIVEN: Application Dashboard flow within app studio', function() {

    var versionView = new VersionView();

    console.log("versionView.spec.js");

    // initial setup
    browser.get('/');
    versionView.login('admin', 'test');

    // TO DO: Delete all the brands (clean slate)

    describe('WHEN: Creating a new Phone app', function() {
        
        it('THEN: Clicking a "NEW APP +" Button should open a new modal', function() {
            versionView.newBrandBtn.click();
            versionView.uploadPNG();
            versionView.createNewBrand('Company X');
            versionView.newAppBtn.click();
            expect(versionView.showNewModal().isPresent()).toBeTruthy();
        });

        it('THEN: Should have the title "Create a New App" ', function() {
            expect(versionView.modalTitle.getText()).toBe('Create a New App');
        });

        it('THEN: Clicking on phone icon button appears selected', function() {
            versionView.newAppPhoneBtn.click();
            expect(versionView.newAppPhoneBtnFilter.isDisplayed()).toBeTruthy();
            // browser.wait(5000);
        });

        it('THEN: Create a new app called "App X - Phone" ', function() {
            versionView.createNewApp('App X - Phone');
            expect(versionView.getAppTextByClass('.title', 'App X - Phone')).toBe('App X - Phone');
        });

    });

    describe('WHEN: Editing an App', function() {

        it('THEN: Clicking "EDIT" button should open config page', function() {
            versionView.clickEditBrand('App X - Phone');
            expect(versionView.editConfigTitle.getText()).toBe('App X - Phone');
        });

    });

    describe('WHEN: Create a new Version', function() {

        it('THEN: Clicking "CREATE A NEW VERSION" button should open a new modal', function() {
            versionView.versionTab.click();
            versionView.newVersionBtn.click();
            expect(versionView.modalTitle.getText()).toBe('Create New Version');
        });

        it('THEN: Clicking "CREATE" button in modal should create a new version', function() {
            versionView.createNewVersion('Version A');
            expect(versionView.showVersion()).toBe('Version A');
        });

    });

    describe('WHEN: Editing a Version', function() {

        it('THEN:  Edit "Version A" brand title to be "Version B"', function() {
            expect(versionView.editVersionTitle('Version B')).toBe('Version B');
        });

    });


    describe('WHEN: Deleting a new Version', function() {

        it('THEN: Clicking duplicate icon button should delete a version', function() {
            versionView.deleteVersion();
            expect(versionView.versionComponent.isPresent()).toBeFalsy();
        });

    });


    describe('WHEN: Create a duplicate Version', function() {


        it('THEN: Clicking "CREATE" button in modal should create a new version', function() {
            versionView.newVersionBtn.click();
            versionView.createNewVersion('Version C');
            expect(versionView.showVersion()).toBe('Version C');
        });

        it('THEN: Clicking duplicate icon button should create a new version copy', function() {
            versionView.duplicateVersionBtn.click();
            versionView.confirmationModalOKBtn.click();
            expect(versionView.showVersion()).toBe('Version C Copy');
        });

    });

    describe('WHEN: Publishing a Version', function() {

        it('THEN: Clicking publish icon button should publish a version', function() {
            versionView.publishVersion();
            expect(versionView.versionTitleSpan.getText()).toBe('Version C Copy');
        });
            
    });

    describe('WHEN: Republishing a Version', function() {

        it('THEN: Clicking publish icon button should publish a version', function() {
            versionView.republishVersion();
            expect(versionView.publishTitleSpan.getText()).toBe('Version C Copy');
        });
        
        it('THEN:  Edit "Version C Copy" brand title to be "Version D"', function() {
            expect(versionView.editVersionTitle('Version D')).toBe('Version D');
        });

    });

    describe('WHEN: Publishing "OTHER VERSION"', function() {

        it('THEN:  Clicking "Version C" publish icon button should publish that version', function() {
            versionView.publishOtherVersion();
            expect(versionView.versionTitleSpan.getText()).toBe('Version C');
        });

        it('THEN: Under OTHER VERSIONS title there should be "Version D" ', function() {
            expect(versionView.otherVersionTitleSpan.getText()).toBe('Version D');
        });

    });


    describe('WHEN: Create a Bundle', function() {

        it('THEN: Clicking "CREATE A BUNDLE" button should open a new modal', function() {
            versionView.newBundleBtn.click();
            expect(versionView.modalTitle.getText()).toBe('Create New Bundle');
        });

        it('THEN: Clicking "CREATE" button in modal should create a new bundled version', function() {
            versionView.createNewBundle('Bundle A');
            expect(versionView.bundleTitleSpan.getText()).toBe('Bundle A');
        });

    });

    describe('WHEN: Edit a Bundle', function() {

        it('THEN: Clicking "CREATE A NEW VERSION" button should open a new modal', function() {
            versionView.versionTab.click();
            versionView.newVersionBtn.click();
            expect(versionView.modalTitle.getText()).toBe('Create New Version');
        });

        it('THEN: Clicking "CREATE" button in modal should create a new version', function() {
            versionView.createNewVersion('Version E');
            expect(versionView.otherVersionTitleSpan.getText()).toBe('Version E');
        });

        it('THEN: Clicking bundle edit icon button should open a new modal', function() {
            versionView.editBundleBtn.click();
            expect(versionView.modalTitle.getText()).toBe('Edit Bundle');
        });

        it('THEN: Clicking "UPDATE" button in modal should update a new bundled version', function() {
            versionView.editBundle('Bundle B');
            expect(versionView.bundleTitleSpan.getText()).toBe('Bundle B');
        });

        it('THEN: Bundled should contain "Version D"', function() {
            expect(versionView.getBundleVersionTitle(0)).toBe('Version D');
        });

        it('THEN: Bundled should contain "Version E"', function() {
            expect(versionView.getBundleVersionTitle(1)).toBe('Version E');
        });


    });

    describe('WHEN: Publishing a Bundle', function() {

        it('THEN: Clicking bundle publish icon button should publish that bundle', function() {
            versionView.publishBundleBtn.click();
            versionView.confirmationModalOKBtn.click();
            expect(versionView.bundleTitleSpan.getText()).toBe('Bundle B');
        });

        it('THEN: Click OTHER VERSIONS publish icon button should publish that version', function() {
            versionView.publishVersion();
            expect(versionView.versionTitleSpan.getText()).toBe('Version C');
        });

    });

    describe('WHEN: Unbundle a Bundle', function() {

        it('THEN: Clicking unbundle icon button should destroy bundle', function() {
            versionView.deleteBundle();
            expect(versionView.bundleComponent.isPresent()).toBeFalsy();
        });

    });

    // Reset (optional)
    
    describe('WHEN: Deleting Brand', function() {

        it('THEN: Clicking back button should return to brand view', function(){
            versionView.editConfigBackBtn.click();
            expect(versionView.breadCrumbTitle.getText()).toBe('Application Dashboard');
        });

        it('THEN: Clicking the "DELETE" button should delete the brand', function() {
            versionView.clickDeleteIconBtn();
            versionView.confirmationModalOKBtn.click();
            expect(versionView.brandTitleSpan.isPresent()).toBeFalsy();
        });

    });

});
