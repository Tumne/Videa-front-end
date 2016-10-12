// cmsView.pageObject.js

var path = require('path');
var fileToUploadPNG = '../../_testData/test-data.png',
    fileToUploadJPG = '../../_testData/test-data.jpg',
    absolutePathPNG = path.resolve(__dirname, fileToUploadPNG),
    absolutePathJPG = path.resolve(__dirname, fileToUploadJPG);



var ptor = browser.driver;

var EC = protractor.ExpectedConditions;
var button = element(by.css('.edit-title span'));
var isClickable = EC.elementToBeClickable(button);

var CmsView = function() {

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

    // cms
    this.cmsTab = element(By.css('.complex-tab')).all(By.tagName('li')).get(4);
    this.newCMSBtn = element(by.buttonText('NEW CMS'));
    this.cmsSpan = element(by.css('.ui-select-container'));
    this.cmsOption = element.all(by.css('.ui-select-choices-row-inner'));
    this.cmsItem = element.all(by.css('.item-list li span')).get(0);
    this.cmsLabels = element.all(by.css('.title'));
    this.cmsListItem = element(by.css('.item-list li'));

    this.textComponentInput = element.all(by.css('.text-component input'));
    this.numberComponentInput = element.all(by.css('.numberbox-component input'));
    this.saveSettingsBtn = element(by.buttonText('SAVE SETTINGS'));
    this.deleteConfigurationBtn = element(by.buttonText('DELETE CONFIGURATION'));

    this.getCmsOption = function(n) {
        return this.cmsOption.get(n);
    };

    this.getCmsLabel = function(n){
        return this.cmsLabels.get(n).getText();
    };

    this.setTextComponentInput = function(n, value){
        this.textComponentInput.get(n).sendKeys(value);
    };

    this.getTextComponentInput = function(n){
        return this.textComponentInput.get(n).getAttribute('value');
    };

    this.setNumberComponentInput = function(n, value){
        this.numberComponentInput.get(n).clear();
        this.numberComponentInput.get(n).sendKeys(value);
    };

    this.getNumberComponentInput = function(n){
        this.numberComponentInput.get(n).getAttribute('value');
    };

    
    // generic

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

};


module.exports = CmsView;