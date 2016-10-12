// analyticsView.spec.js


var AnalyticsView = require('./analyticsView.pageObject');

describe('GIVEN: Application Dashboard flow within app studio', function() {

    var analyticsView = new AnalyticsView();

    console.log("analyticsView.spec.js");

    // initial setup
    browser.get('/');
    analyticsView.login('admin', 'test');

    // TO DO: Delete all the brands (clean slate)

    describe('WHEN: Creating a new Phone app', function() {
        
        it('THEN: Clicking a "NEW APP +" Button should open a new modal', function() {
            analyticsView.newBrandBtn.click();
            analyticsView.uploadPNG();
            analyticsView.createNewBrand('Company X');
            analyticsView.newAppBtn.click();
            expect(analyticsView.showNewModal().isPresent()).toBeTruthy();
        });

        it('THEN: Should have the title "Create a New App" ', function() {
            expect(analyticsView.modalTitle.getText()).toBe('Create a New App');
        });

        it('THEN: Clicking on phone icon button appears selected', function() {
            analyticsView.newAppPhoneBtn.click();
            expect(analyticsView.newAppPhoneBtnFilter.isDisplayed()).toBeTruthy();
        });

        it('THEN: Create a new app called "App X - Phone" ', function() {
            analyticsView.createNewApp('App X - Phone');
            expect(analyticsView.getAppTextByClass('.title', 'App X - Phone')).toBe('App X - Phone');
        });

    });

    describe('WHEN: Editing an App', function() {

        it('THEN: Clicking "EDIT" button should open config page', function() {
            analyticsView.clickEditApp('App X - Phone');
            expect(analyticsView.editConfigTitle.getText()).toBe('App X - Phone');
        });

    });

    describe('WHEN: Creating a new Analytic configuration', function() {
        it('THEN: Clicking "NEW ANALYTIC" button should open modal', function() {
            analyticsView.analyticsTab.click();
            analyticsView.newAnalyticBtn.click();
            expect(analyticsView.showNewModal().isPresent()).toBeTruthy();
        });

        it('THEN: Should have the title "Add New Analytic"', function() {
            expect(analyticsView.modalTitle.getText()).toBe('Add New Analytic');
        });

        it('THEN: Create a new analytic called "Google Analytics" ', function() {
            analyticsView.analyticSpan.click();
            analyticsView.getAnalyticOption(0).click();
            analyticsView.createAppBrandBtn.click();
            expect(analyticsView.analyticItem.getText()).toBe('Google Analytics');
        });
    });

    describe('WHEN: Editing an Analytic configuration', function() {

        it('THEN: Clicking analytic item should show details', function() {
            analyticsView.analyticItem.click();
            expect(analyticsView.getAnalyticLabel(0)).toBe('Social');
        });

        it('THEN: Clicking analytic item should show details', function() {
            expect(analyticsView.getAnalyticLabel(1)).toBe('Exceptions');
        });

        it('THEN: Clicking analytic item should show "DELETE CONFIGURATION" button', function() {
            expect(analyticsView.deleteConfigurationBtn.isDisplayed()).toBeTruthy();
        });

    });

    // describe('WHEN: Editing a Page Event configuration', function() {
       
    //     it('THEN: Clicking "+" page resource Button should open a new modal', function() {
    //         analyticsView.addPageEventBtn.click();
    //         expect(analyticsView.showNewModal().isPresent()).toBeTruthy();
    //     });

    //     it('THEN: Should have the title "Add New Screens" ', function() {
    //         expect(analyticsView.modalTitle.getText()).toBe('Add New Screens');
    //     });

    //     it('THEN: Create a new screen should create new page event with Screen being "value1"', function() {
    //         analyticsView.setModalInput(0, 'value1');
    //         analyticsView.setModalInput(1, 'value2');
    //         analyticsView.createAppBrandBtn.click();
    //         expect(analyticsView.getAddedPageEvent(0)).toBe('value1');
    //     });

    //     it('THEN:  create new page event with Screen Name being "value2"', function() {
    //         expect(analyticsView.getAddedPageEvent(1)).toBe('value2');
    //     });

    //     it('THEN: Clicking edit page event icon button should open a new modal', function() {
    //         analyticsView.clickAddedPageEvent(1);
    //         expect(analyticsView.showNewModal().isPresent()).toBeTruthy();
    //     });

    //     it('THEN: Should have the title "Edit Screens"', function() {
    //         expect(analyticsView.modalTitle.getText()).toBe('Edit Screens');
    //     });

    //     it('THEN: Create a new screen should create new page event with Screen being "value3"', function() {
    //         analyticsView.setModalInput(0, 'value3');
    //         analyticsView.setModalInput(1, 'value4');
    //         analyticsView.editModalBtn.click();
    //         expect(analyticsView.getAddedPageEvent(0)).toBe('value3');
    //     });

    //     it('THEN: Create new page event with Screen Name being "value4"', function() {
    //         expect(analyticsView.getAddedPageEvent(1)).toBe('value4');
    //     });

    // });


    // describe('WHEN: Editing a Action Event configuration', function() {
       
    //     it('THEN: Clicking "+" page resource Button should open a new modal', function() {
    //         analyticsView.addActionEventBtn.click();
    //         expect(analyticsView.showNewModal().isPresent()).toBeTruthy();
    //     });

    //     it('THEN: Should have the title "Add New Events" ', function() {
    //         expect(analyticsView.modalTitle.getText()).toBe('Add New Events');
    //     });

    //     it('THEN: Create a new screen should create new action event with Screen being "value1"', function() {
    //         for(i=0; i < 5; i++){
    //             analyticsView.setModalInput(i, 'value' + (i + 1));
    //         }
    //         analyticsView.createAppBrandBtn.click();
    //         expect(analyticsView.getAddedActionEvent(0)).toBe('value1');
    //     });

    //     it('THEN:  created action event field should be "value2"', function() {
    //         expect(analyticsView.getAddedActionEventField(1, 0)).toBe(' value2');
    //     });

    //     it('THEN:  created action event field should be "value3"', function() {
    //         expect(analyticsView.getAddedActionEventField(1, 1)).toBe(' value3');
    //     });

    //     it('THEN:  created action event field should be "value4"', function() {
    //         expect(analyticsView.getAddedActionEventField(1, 2)).toBe(' value4');
    //     });

    //     it('THEN:  created action event field should be "value5"', function() {
    //         expect(analyticsView.getAddedActionEventField(1, 3)).toBe(' value5');
    //     });

    //     it('THEN: Clicking edit action event icon button should open a new modal', function() {
    //         analyticsView.clickAddedActionEvent(1);
    //         expect(analyticsView.showNewModal().isPresent()).toBeTruthy();
    //     });

    //     it('THEN: Should have the title "Edit Events"', function() {
    //         expect(analyticsView.modalTitle.getText()).toBe('Edit Events');
    //     });

    //     it('THEN: Create a new screen should create new action event with field being "value6"', function() {
    //         for(i=0; i < 5; i++){
    //             analyticsView.setModalInput(i, 'value' + (i + 6));
    //         }
    //         analyticsView.editModalBtn.click();
    //         expect(analyticsView.getAddedActionEvent(0)).toBe('value6');
    //     });

    //     it('THEN: Created action event field to be "value7"', function() {
    //         expect(analyticsView.getAddedActionEventField(1, 0)).toBe(' value7');
    //     });

    //     it('THEN: Created action event field to be "value8"', function() {
    //         expect(analyticsView.getAddedActionEventField(1, 1)).toBe(' value8');
    //     });

    //     it('THEN: Created action event field to be "value9"', function() {
    //         expect(analyticsView.getAddedActionEventField(1, 2)).toBe(' value9');
    //     });

    //     it('THEN: Created action event field to be "value10"', function() {
    //         expect(analyticsView.getAddedActionEventField(1, 3)).toBe(' value10');
    //     });

    // });

    describe('WHEN: Saving an Analytic configuration', function() {

        it('THEN: Clicking "Social" checkbox should be true', function() {
            analyticsView.socialCheckbox.click();
            expect(analyticsView.socialCheckbox.isSelected()).toBeTruthy();
        });

        it('THEN: Clicking "exceptionsCheckbox" checkbox should be true', function() {
            analyticsView.exceptionsCheckbox.click();
            expect(analyticsView.exceptionsCheckbox.isSelected()).toBeTruthy();
        });



        it('THEN: Click "SAVE SETTINGS" button should save data', function() {
            analyticsView.setTextComponentInput(0, 'value1');

            analyticsView.saveSettings();
            analyticsView.editConfigBackBtn.click();
            analyticsView.clickEditApp('App X - Phone');
            analyticsView.analyticsTab.click();
            expect(analyticsView.socialCheckbox.isSelected()).toBeTruthy();
        });

        it('THEN: Click "SAVE SETTINGS" button should save Exceptions Checkbox', function() {
            expect(analyticsView.exceptionsCheckbox.isSelected()).toBeTruthy();
        });

        it('THEN: Click "SAVE SETTINGS" button should save Tracking ID', function() {
            expect(analyticsView.getTextComponentInput(0)).toBe('value1');
        });

    });

    describe('WHEN: Deleting an Analytic configuration', function() {
        
        it('THEN: Click "DELETING CONFIGURATION" button should open modal', function() {
            analyticsView.deleteConfigurationBtn.click();
            expect(analyticsView.showNewModal().isPresent()).toBeTruthy();
        });
        
        it('THEN: Click "DELETING CONFIGURATION" button should open modal', function() {
            analyticsView.confirmationModalOKBtn.click();
            expect(analyticsView.allAnalyticItems.isPresent()).toBeFalsy();
        });

    });

    // Reset (optional)
    
    describe('WHEN: Deleting Brand', function() {

        it('THEN: Clicking back button should return to brand view', function(){
            analyticsView.editConfigBackBtn.click();
            expect(analyticsView.breadCrumbTitle.getText()).toBe('Application Dashboard');
        });

        it('THEN: Clicking the "DELETE" button should delete the brand', function() {
            analyticsView.clickDeleteIconBtn();
            analyticsView.confirmationModalOKBtn.click();
            expect(analyticsView.brandTitleSpan.isPresent()).toBeFalsy();
        });

    });

});
