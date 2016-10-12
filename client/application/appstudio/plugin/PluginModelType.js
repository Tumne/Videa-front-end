module.exports = {
    APPSTUDIO: {
        SCREEN: 'schema.appstudio.Screen'
    },
	EDIT: {
		FEED: 'schema.appstudio.Feed',
		COLOR: 'schema.Color',
        FONT: 'schema.appstudio.Font',
        SEEALLLABEL: 'schema.appstudio.component.data.SeeAllLabel',
        CAROUSELCONTROL: 'schema.appstudio.component.carousel.CarouselControls',
        LISTVIEWCONTROL: 'schema.appstudio.component.list.ListViewControls',
        CUSTOMDATA: 'schema.common.CustomData',
        COLLECTIONVIEWCONTROL: 'schema.appstudio.component.collection.CollectionsViewControls',
        COMPONENTCONTROL: 'schema.appstudio.component.ComponentControls',
        SECTIONCONTROL: 'schema.appstudio.uiconfig.navigation.SectionControls',
        TITLESECTION: 'schema.appstudio.uiconfig.navigation.SectionTitle',
        LISTENER: 'schema.event.Listener',
        GRIDVIEWDATA: 'schema.appstudio.component.grid.GridViewData',
        COLLECTIONVIEWDATA: 'schema.appstudio.component.collection.CollectionsViewData',
        DATAVIEWDATA: 'schema.appstudio.component.data.DataViewData',
        SECONDARYMENU: 'schema.appstudio.uiconfig.navigation.SecondaryMenu',
        SECONDARYMENUSUBIMAGE: 'schema.appstudio.uiconfig.navigation.SecondaryMenuSubImage',
        ACTION: {
            AUTHENTICATE: 'schema.event.AuthenticateAction',
            PLAYBACK: 'schema.event.PlaybackAction',
            NAVIGATE: 'schema.event.NavigationAction',
            REMOVEOFFLINE: 'schema.event.RemoveOfflineAction',
            SAVEOFFLINE: 'schema.event.SaveOfflineAction',
            SAVEUID: 'schema.event.SaveUIDAction',
            REMOVEUID: 'schema.event.RemoveUIDAction'
        },
        APPNAVIGATION: {
			NAVIGATION: {
				GENERIC:'schema.appstudio.uiconfig.navigation.Navigation',
				MOBILE: 'schema.appstudio.mobile.uiconfig.navigation.MobileNavigation',
				TABLET: 'schema.appstudio.tablet.uiconfig.navigation.TabletNavigation',
				TV:'schema.appstudio.tv.uiconfig.navigation.TVNavigation'
			},
            SECTION: 'schema.appstudio.uiconfig.navigation.Section',
        },
        ADS: {
         ADS: 'schema.appstudio.Ads',
         MOBILE: 'schema.appstudio.mobile.ads.MobileAds',
         TABLET: 'schema.appstudio.tablet.ads.TabletAds',
         TV: 'schema.appstudio.tv.ads.TVAds'
        },
        AUTHENTICATION: {
            MOBILE: 'schema.appstudio.mobile.authentication.MobileAuthentication',
            TABLET: 'schema.appstudio.tablet.authentication.TabletAuthentication',
            TV: 'schema.appstudio.tv.authentication.TVAuthentication',
            ADOBE: 'schema.appstudio.auth.AdobeProvider',
            AKAMAI: {
                PROVIDER: 'schema.appstudio.auth.AkamaiProvider',
                REDIRECT: 'schema.appstudio.auth.akamai.Redirect',
                TARGET: 'schema.appstudio.auth.akamai.redirect.Target'
            }
        },
		PARENTAL_CONTROL: {
			MOBILE: 'schema.appstudio.mobile.parentalControl.MobileParentalControl',
			TABLET: 'schema.appstudio.tablet.parentalControl.TabletParentalControl',
			TV: 'schema.appstudio.tv.parentalControl.TvParentalControl'
		},
        ANALYTICS: {
            PAGE: 'schema.appstudio.analytics.google.Page',
            EVENTFIELD: 'schema.appstudio.analytics.google.EventField',
            MOBILE: {
                GOOGLE: 'schema.appstudio.mobile.analytics.MobileGoogleAnalytics'
            },
            TABLET: {
                GOOGLE: 'schema.appstudio.tablet.analytics.TabletGoogleAnalytics'
            },
            TV: {
                GOOGLE: 'schema.appstudio.tv.analytics.TvGoogleAnalytics'
            }
        },
        CMS: {
            MOBILE: {
                MPX: 'schema.appstudio.mobile.cms.MobileMpx',
                VIDEA: 'schema.appstudio.mobile.cms.MobileVideaCms',
            },
            TABLET: {
                MPX: 'schema.appstudio.tablet.cms.TabletMpx',
                VIDEA: 'schema.appstudio.tablet.cms.TabletVideaCms',
            },
            TV: {
                MPX: 'schema.appstudio.tv.cms.TvMpx',
                VIDEA: 'schema.appstudio.tv.cms.TvVideaCms',
            }                      
        },
        UICONFIG: {
            CONFIG: 'schema.appstudio.UIConfig'
        },
        THEME: {
            MOBILE: 'schema.appstudio.mobile.theme.MobileTheme',
            TABLET: 'schema.appstudio.tablet.theme.TabletTheme',
            TV: 'schema.appstudio.tv.theme.TvTheme',
            ASSETS: 'schema.appstudio.theme.Assets',
            GALLERYIMAGE: 'schema.appstudio.theme.assets.GalleryImage',
            COLORGALLERYIMAGE: 'schema.appstudio.theme.assets.ColorGalleryImage',
            COLORS: 'schema.appstudio.theme.Colors',
            FONTS: 'schema.appstudio.theme.Fonts',
            THEMEFONTS: 'schema.appstudio.theme.ThemeFont',
        },
        SCREEN: {
            MOBILE: 'schema.appstudio.mobile.screen.MobileScreen',
            TABLET: 'schema.appstudio.tablet.screen.TabletScreen',
            TV: 'schema.appstudio.tv.screen.TvScreen',
            ADVANCE: 'schema.appstudio.AdvanceScreen'
        },
        SEARCHRESULTSCREEN: {
            MOBILE: 'schema.appstudio.mobile.screen.MobileSearchResultScreen',
            TABLET: 'schema.appstudio.tablet.screen.TabletSearchResultScreen',
            TV: 'schema.appstudio.tv.screen.TVSearchResultScreen'
        },
        BUNDLE: {
            MOBILE: 'schema.appstudio.mobile.uiconfig.BundleMobileUIConfig',
            TABLET: 'schema.appstudio.tablet.uiconfig.BundleTabletUIConfig',
            TV: 'schema.appstudio.tv.uiconfig.BundleTVUIConfig'
        },
        UISETTINGS: 'schema.appstudio.UISettings',
        SEARCHSETTINGS: 'schema.appstudio.SearchSettings'
	},
    PREVIEW: {
        COMPONENT: {
            CAROUSEL: 'schema.appstudio.component.carousel.Carousel',
            LISTVIEW: 'schema.appstudio.component.list.ListView',
            GRIDVIEW: 'schema.appstudio.component.grid.GridView',
            SWIMLANE: 'schema.appstudio.component.swimlane.Swimlane',
            IMAGE: 'schema.appstudio.component.Image',
            LABEL: 'schema.appstudio.component.field.Label',
            COLLECTIONVIEW: 'schema.appstudio.component.collection.CollectionsView'

        },
        APPTYPE: {
            MOBILE: 'schema.appstudio.mobile.MobileAppConfig',
            TABLET: 'schema.appstudio.tablet.TabletAppConfig',
            TV: 'schema.appstudio.tv.TVAppConfig'
        },
        UICONFIG: {
            MOBILE: 'schema.appstudio.mobile.uiconfig.MobileUIConfig',
            TABLET: 'schema.appstudio.tablet.uiconfig.TabletUIConfig',
            TV: 'schema.appstudio.tv.uiconfig.TVUIConfig'
        },        
        SCREEN: {
            BLANK: {
                MOBILE: 'schema.appstudio.mobile.screen.MobileScreen',
                TABLET: 'schema.appstudio.tablet.screen.TabletScreen',
                TV: 'schema.appstudio.tv.screen.TvScreen'
            },
            ADVANCE: 'schema.appstudio.AdvanceScreen'
        }
    },
    VIEW: {
        COMPONENT: {
            CAROUSEL: 'schema.appstudio.component.carousel.Carousel',
            LISTVIEW: 'schema.appstudio.component.list.ListView',
            GRIDVIEW: 'schema.appstudio.component.grid.GridView',
            SWIMLANE: 'schema.appstudio.component.swimlane.Swimlane',
            IMAGE: 'schema.appstudio.component.Image',
            LABEL: 'schema.appstudio.component.field.Label',
            COLLECTIONVIEW: 'schema.appstudio.component.collection.CollectionsView'
        },
        APPNAVIGATION: {
			SECTION: 'schema.appstudio.uiconfig.navigation.Section',
            TYPE: {
                VERTICAL: 'schema.common.navigation.VerticalMenu',
                DRAWER: 'schema.common.navigation.DrawerMenu',
                TOP: 'schema.common.navigation.TopMenu'
            }
        },
        UICONFIG: {
            MOBILE: 'schema.appstudio.mobile.uiconfig.MobileUIConfig',
            TABLET: 'schema.appstudio.tablet.uiconfig.TabletUIConfig',
            TV: 'schema.appstudio.tv.uiconfig.TVUIConfig',
            UICONFIG: 'schema.appstudio.UIConfig'
        },
        BUNDLE: {
            MOBILE: 'schema.appstudio.mobile.uiconfig.BundleMobileUIConfig',
            TABLET: 'schema.appstudio.tablet.uiconfig.BundleTabletUIConfig',
            TV: 'schema.appstudio.tv.uiconfig.BundleTVUIConfig'
        },
        ANALYTICS: {
            EVENTFIELD: 'schema.appstudio.analytics.google.EventField'
        },
        EVENT: {
          SELECT: 'schema.event.SelectEvent',
          LONGSELECT: 'schema.event.LongSelectEvent'
        },    
        ACTION: {
            SIGNIN: 'schema.event.SigninAction',
            SIGNOUT: 'schema.event.SignoutAction',
            PLAYBACK: 'schema.event.PlaybackAction',
            NAVIGATE: 'schema.event.NavigationAction',
            REMOVEOFFLINE: 'schema.event.RemoveOfflineAction',
            SAVEOFFLINE: 'schema.event.SaveOfflineAction',
            SAVEUID: 'schema.event.SaveUIDAction',
            REMOVEUID: 'schema.event.RemoveUIDAction'
        }    
    },
    CREATE: {
        APP: 'schema.appstudio.App',
        LISTENER: 'schema.event.Listener',
        UICONFIG: {
         MOBILE: 'schema.appstudio.mobile.uiconfig.MobileUIConfig',
         TABLET: 'schema.appstudio.tablet.uiconfig.TabletUIConfig',
         TV: 'schema.appstudio.tv.uiconfig.TVUIConfig',
         UICONFIG: 'schema.appstudio.UIConfig'
        },
        BUNDLE: {
         MOBILE: 'schema.appstudio.mobile.uiconfig.BundleMobileUIConfig',
         TABLET: 'schema.appstudio.tablet.uiconfig.BundleTabletUIConfig',
         TV: 'schema.appstudio.tv.uiconfig.BundleTVUIConfig'
        },        
        SCREEN: {
            BLANK: {
                MOBILE: 'schema.appstudio.mobile.screen.MobileScreen',
                TABLET: 'schema.appstudio.tablet.screen.TabletScreen',
                TV: 'schema.appstudio.tv.screen.TvScreen'
            },
            ADVANCE: 'schema.appstudio.AdvanceScreen'
        },
        ANALYTICS: {
            PAGE: 'schema.appstudio.analytics.google.Page'
        }        
    }
};
