// authenticationView.pageObject.js

var path = require('path');
var fileToUploadPNG = '../../_testData/test-data.png',
    fileToUploadJPG = '../../_testData/test-data.jpg',
    absolutePathPNG = path.resolve(__dirname, fileToUploadPNG),
    absolutePathJPG = path.resolve(__dirname, fileToUploadJPG);



var ptor = browser.driver;

var EC = protractor.ExpectedConditions;
var button = element(by.css('.edit-title span'));
var isClickable = EC.elementToBeClickable(button);

var AuthenticationView = function() {

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

    // authentication
    this.authenticationTab = element(by.css('.complex-tab')).all(By.tagName('li')).get(1);
    this.providerSpan = element(by.css('.ui-select-container'));
    this.providerOption = element.all(by.css('.ui-select-choices-row-inner'));
    this.stagingTitle = element.all(by.css('.title'));
    this.hasOneTitle = element.all(by.css('.has-one-title'));
    this.objectEditorInput = element.all(by.css('.input-object-editor'));
    this.saveSettingsBtn = element(by.buttonText('SAVE SETTINGS'));

    // resource access codes
    this.addResourceBtn = element(by.css('.has-many-string-editor button'));
    this.addResourceModalInput = element.all(by.css('.text-component input')).get(0);
    this.createResourceBtn = element(by.buttonText('ADD'));
    this.resourceTable = element.all(by.css('.table-striped .edit-title'));

    this.resourceTitleSpan = element(by.css('.has-many-string-editor .edit-title span'));
    this.resourceTitleInput = element(by.css('.has-many-string-editor .edit-title input'));
    this.resourceTitleDiv = element(by.css('.has-many-string-editor'));

    this.deleteResourceBtn = element(by.css('.delete-button'));
    this.tableRow = element(by.css('table tbody tr'));

    this.getStagingTitle = function(n) {
        return this.stagingTitle.get(n).getText();
    };

    this.getHasOneTitle = function(n) {
        return this.hasOneTitle.get(n);
    };

    this.setObjectEditorInput = function(n) {
        this.objectEditorInput.get(n).clear();
        this.objectEditorInput.get(n).sendKeys('value' + (n+1));
    };

    this.getObjectEditorInput = function(n) {
        return this.objectEditorInput.get(n).getAttribute('value');
    };

    this.getProviderOption = function(n) {
        return this.providerOption.get(n);
    };

    this.saveSettings = function() {
        browser.executeScript('window.scrollTo(0,0);');
        this.saveSettingsBtn.click();
    };


    this.createNewResource = function(appName) {
        this.addResourceModalInput.sendKeys(appName);
        this.createResourceBtn.click();
    };

    this.getAddedResource = function(n){
        return this.resourceTable.get(n).getText();
    };

    this.editResourceTitle = function(newResourceTitle) {
        this.resourceTitleSpan.click();
        this.resourceTitleInput.clear();
        this.resourceTitleInput.sendKeys(newResourceTitle);
        this.resourceTitleDiv.click();
        return this.resourceTitleSpan.getText();
    };


    // Generic

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

    this.showVersion = function() {
        return this.versionTitleSpan.getText();
    };

    this.scrollToTop = function() {
        browser.executeScript('window.scrollTo(0,0);');
    };

};



module.exports = AuthenticationView;