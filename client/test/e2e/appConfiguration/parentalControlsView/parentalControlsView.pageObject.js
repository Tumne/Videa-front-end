// parentalControlsView.pageObject.js

var path = require('path');
var fileToUploadPNG = '../../_testData/test-data.png',
    fileToUploadJPG = '../../_testData/test-data.jpg',
    absolutePathPNG = path.resolve(__dirname, fileToUploadPNG),
    absolutePathJPG = path.resolve(__dirname, fileToUploadJPG);



var ptor = browser.driver;

var EC = protractor.ExpectedConditions;
var button = element(by.css('.edit-title span'));
var isClickable = EC.elementToBeClickable(button);

var ParentalControlsView = function() {

    // login
    this.username = element(by.model('username'));
    this.password = element(by.model('password'));
    this.submitBtn = element(by.id('submit'));
    this.appstudioBtn = element.all(by.repeater('menuItem in menuItems')).get(1);
    this.accountsDropdownBtn = element(by.id('accountDropMenu'));
    this.account = element(by.id('accountsList')).element(by.linkText('e2e'));

    // brand
    this.newBrandBtn = element(by.buttonText('SETUP A NEW BRAND'));
    this.newBrandLogo = element(by.css('.image-wrapper img'));
    this.newBrandTitle = element(by.id('newBrand-title'));
    this.createBrandBtn = element(by.id('createBrand'));
    this.brandTitleSpan = element(by.css('.edit-title span'));
    this.brandTitleInput = element(by.css('edit-title input'));
    this.brandTitleDiv = element(by.css('.brand-title'));

    // brand buttons
    this.brandIconBtns = element(by.id('brandIconBtns'));
    this.editIconBtn = element(by.id('editIconBtn'));
    this.deleteIconBtn = element(by.id('deleteIconBtn'));

    // modal
    this.modalOpen = element(by.css('.modal-open'));
    this.modalTitle = element(by.css('.modal-title'));
    this.modalCloseBtn = element(by.css('.modal-close'));

    // confirmation modal
    this.confirmationModalOKBtn = element(by.id('confirmationModalOK'));
    this.confirmationModalCloseBtn = element(by.id('confirmationModalClose'));

    // spinner component
    this.spinnerComponent = element(by.css('.spinner-component'));

    // breadcrumb title
    this.breadCrumbTitle = element(by.css('.breadcrumb-title'));

    // app
    this.newAppBtn = element(by.id('newAppBtn'));
    this.newAppTitle = element(by.id('app-title'));
    this.createAppBrandBtn = element(by.buttonText('CREATE'));
    this.appsByBrand = element.all(by.repeater('oneApp in vm.getAppsByBrand(brand)'));

    // phone app 
    this.newAppPhoneBtn = element(by.id('newAppPhone'));
    this.newAppPhoneBtnFilter = element(by.css('#newAppPhone .app-type-selected-filter'));

    // edit app
    this.editConfigBtn = element(by.css(''));
    this.editConfigTitle = element(by.css('edit-title span'));
    this.editConfigBackBtn = element(by.css('.config-editor-go-back'));

    // parentalControls
    this.parentalControlsTab = element(By.css('.complex-tab')).all(By.tagName('li')).get(5);
    this.descriptionTitle = element(By.css('.description'));

    this.enabledCheckbox = element.all(by.css('.checkbox-component .checkbox-wrapper input')).get(0);
    this.textComponentInput = element.all(by.css('.text-component input'));
    this.saveSettingsBtn = element(by.buttonText('SAVE SETTINGS'));

    this.setTextComponentInput = function(n, value){
        this.textComponentInput.get(n).sendKeys(value);
    };

    this.getTextComponentInput = function(n){
        return this.textComponentInput.get(n).getAttribute('value');
    };

    // version
    // this.versionTab = element(By.css('.complex-tab')).all(By.tagName('li')).get(0);
    // this.newVersionBtn = element(by.buttonText('CREATE A NEW VERSION'));
    // this.newVersionTitle = element(by.id('app-title'));
    
    // this.versionComponent = element(by.css('.version-component'));
    // this.versionContent = element.all(by.css('.version-content')).get(0);
    // this.versionTitleSpan = this.versionContent.all(by.css('.edit-title span')).get(0);
    // this.versionTitleInput = this.versionContent.all(by.css('input')).get(0);
    
    // this.otherVersionContent = element.all(by.css('.version-content')).get(1);
    // this.otherVersionTitleSpan = this.otherVersionContent.all(by.css('.edit-title span')).get(0);

    // this.publishComponent = element(by.css('.publish-component'));
    // this.publishTitleSpan = this.publishComponent.all(by.css('.edit-title span')).get(0);
    // this.publishTitleInput = this.publishComponent.all(by.css('.edit-title input')).get(0);

    // this.bundleComponent = element(by.css('.bundle-component'));
    // this.bundleTitleSpan = this.bundleComponent.all(by.css('.edit-title span')).get(0);
    // this.bundleTitleInput = this.bundleComponent.all(by.css('.edit-title input')).get(0);

    // this.duplicateVersionBtn = element.all(by.css('.duplicate-version')).get(0);
    // this.deleteVersionBtn = element.all(by.css('.delete-version')).get(0);
    // this.publishVersionBtn = element.all(by.css('.publish-version')).get(0);
    // this.republishVersionBtn = element.all(by.css('.republish-version')).get(0);

    // this.newBundleBtn = element(by.buttonText('CREATE A BUNDLE'));
    // this.updateBundleBtn = element(by.buttonText('UPDATE'));

    // this.versionItemOptions = element.all(by.css('label'));

    // this.editBundleBtn = element.all(by.css('.edit-bundle')).get(0);
    // this.deleteBundleBtn = element.all(by.css('.delete-bundle')).get(0);
    // this.publishBundleBtn = element.all(by.css('.publish-bundle')).get(0);
    // this.republishBundleBtn = element.all(by.css('.republish-bundle')).get(0);

    // this.bundleVersionListRow = element.all(by.css('.version-list-row'));


    this.login = function(username, password) {
        this.username.sendKeys(username);
        this.password.sendKeys(password);
        this.submitBtn.click();
        this.accountsDropdownBtn.click();
        this.account.click();
        this.appstudioBtn.click();
    };

    this.showNewModal = function() {
        return this.modalOpen;
    };

    this.uploadPNG = function() {
        $('input[type="file"]').sendKeys(absolutePathPNG);
    };

    this.getUploadedPNG = function() {
        return this.newBrandLogo.getAttribute('src');
    };

    this.uploadJPG = function() {
        $('input[type="file"]').sendKeys(absolutePathJPG);
    };

    this.getUploadedJPG = function() {
        return this.newBrandLogo.getAttribute('src');
    };

    this.createNewBrand = function(brandTitle) {
        this.newBrandTitle.sendKeys(brandTitle);
        this.createBrandBtn.click();
        browser.wait(protractor.until.elementIsNotVisible(this.spinnerComponent));
    };

    this.showBrand = function() {
        return this.brandTitleSpan.getText();
    };

    this.mouseHover = function(element) {
        ptor.actions().mouseMove(element).perform();
    };

    this.getBrandIconBtns = function() {
        this.mouseHover(this.brandTitleDiv);
        return this.brandIconBtns;
    };

    this.clickDeleteIconBtn = function() {
        this.mouseHover(this.brandTitleDiv);
        this.deleteIconBtn.click();
    };

    this.createNewApp = function(appName) {
        this.newAppTitle.sendKeys(appName);
        this.createAppBrandBtn.click();
    };

    this.getAppCard = function(element, text){
        return this.appsByBrand.filter(function(item) {
            return item.element(by.css(element)).getText().then(function(label) {
                return label === text;
            });
        });
    };

    this.getAppTextByClass = function(className, text) {
        var app = this.getAppCard(className, text);
        return app.get(0).element(by.css(className)).getText();
    };

    this.clickEditApp = function(text) {
        var app = this.getAppCard('.title', text);
        app.get(0).element(by.css('button')).click();
    };

    // this.createNewVersion = function(versionTitle) {
    //     this.newVersionTitle.sendKeys(versionTitle);
    //     this.createAppBrandBtn.click();
    //     browser.wait(protractor.until.elementIsNotVisible(this.spinnerComponent));
    // };

    this.showVersion = function() {
        return this.versionTitleSpan.getText();
    };

    // this.editVersionTitle = function(newVersionTitle) {
    //     this.versionTitleSpan.click();
    //     this.versionTitleInput.clear();
    //     this.versionTitleInput.sendKeys(newVersionTitle);
    //     this.versionContent.click();
    //     browser.wait(protractor.until.elementIsNotVisible(this.spinnerComponent));
    //     return this.versionTitleSpan.getText();
    // };

    // this.deleteVersion = function() {
    //     this.deleteVersionBtn.click();
    //     this.confirmationModalOKBtn.click();
    //     browser.wait(protractor.until.elementIsNotVisible(this.spinnerComponent));
    // };

    // this.publishVersion = function() {
    //     this.publishVersionBtn.click();
    //     this.confirmationModalOKBtn.click();
    //     browser.wait(protractor.until.elementIsNotVisible(this.spinnerComponent));
    // };

    // this.republishVersion = function() {
    //     this.republishVersionBtn.click();
    //     this.confirmationModalOKBtn.click();
    //     browser.wait(protractor.until.elementIsNotVisible(this.spinnerComponent));
    // };

    // this.publishOtherVersion = function() {
    //     this.publishVersionBtn.click();
    //     this.confirmationModalOKBtn.click();
    //     browser.wait(protractor.until.elementIsNotVisible(this.spinnerComponent));
    // };

    // this.getBundleVersionTitle = function(n) {
    //     return this.bundleVersionListRow.get(n).all(by.css('.name')).get(0).getText();
    // };

    // this.createNewBundle = function(bundleTitle) {
    //     this.newVersionTitle.sendKeys(bundleTitle);
    //     this.versionItemOptions.get(0).click();
    //     this.createAppBrandBtn.click();
    //     browser.wait(protractor.until.elementIsNotVisible(this.spinnerComponent));
    // };

    // this.editBundle = function(bundleTitle) {
    //     this.newVersionTitle.clear();
    //     this.newVersionTitle.sendKeys(bundleTitle);
    //     this.versionItemOptions.get(0).click();
    //     this.updateBundleBtn.click();
    //     browser.wait(protractor.until.elementIsNotVisible(this.spinnerComponent));
    // };

    // this.deleteBundle = function() {
    //     this.deleteBundleBtn.click();
    //     this.confirmationModalOKBtn.click();
    //     browser.wait(protractor.until.elementIsNotVisible(this.spinnerComponent));
    // };

};


module.exports = ParentalControlsView;