// mediaGallery.pageObject.js

var path = require('path');
var fileToUploadPNG = '../_testData/test-data.png',
    fileToUploadJPG = '../_testData/test-data.jpg',
    absolutePathPNG = path.resolve(__dirname, fileToUploadPNG),
    absolutePathJPG = path.resolve(__dirname, fileToUploadJPG);



var ptor = browser.driver;

var EC = protractor.ExpectedConditions;
var button = element(by.css('.edit-title span'));
var isClickable = EC.elementToBeClickable(button);

var MediaGallery = function() {

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

    // media gallery view
    this.galleryBtn = element(by.id('newGalleryBtn'));
    this.galleryBackBtn = element(by.css('.media-gallery-go-back'));

    // gallery
    this.newGalleryBtn = element(by.buttonText('UPLOAD NEW'));
    this.createGalleryBtn = element(by.buttonText('UPLOAD'));
    this.galleryPreview = element(By.css('.media-gallery-row')).all(By.tagName('div')).get(0).element(By.css('img'));
    this.galleryName = element(By.css('.media-gallery-row')).all(By.tagName('div')).get(1);
    this.galleryInfo = element(By.css('.media-gallery-row')).all(By.tagName('div')).get(2);
    this.galleryDate = element(By.css('.media-gallery-row')).all(By.tagName('div')).get(3);

    // gallery buttons
    this.replaceGalleryBtn = element(by.buttonText('REPLACE'));
    this.renameGalleryBtn = element(by.buttonText('RENAME'));
    this.renameGalleryModalBtn = element(by.id('submitRename'));
    this.deleteGalleryBtn = element(by.id('deleteGalleryAsset'));

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

    this.createNewGallery = function(name) {
        this.newBrandTitle.sendKeys(name);
        this.createGalleryBtn.click();
        browser.wait(protractor.until.elementIsNotVisible(this.spinnerComponent));
    };

    this.replaceGallery = function(name) {
        this.newBrandTitle.clear();
        this.createNewGallery(name);
    };

    this.renameGallery = function(name) {
        this.newBrandTitle.clear();
        this.newBrandTitle.sendKeys(name);
        this.renameGalleryModalBtn.click();
        browser.wait(protractor.until.elementIsNotVisible(this.spinnerComponent));
    };

    this.getGalleryImg = function() {
        return this.galleryPreview.getAttribute('src');
    };

    this.getGalleryName = function() {
        return this.galleryName.getText();
    };

    this.getGalleryInfo = function() {
        return this.galleryInfo.getText();
    };

    this.getGalleryDate = function() {
        return this.galleryDate.getText();
    };

};


module.exports = MediaGallery;
