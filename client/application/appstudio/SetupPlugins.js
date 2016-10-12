
var NavigationTypeViewPlugin = require('appstudio/plugin/view/navigationType/NavigationTypeViewPlugin');

var CarouselPreviewPlugin = require('appstudio/plugin/preview/component/carousel/CarouselPreviewPlugin');
var ListViewPreviewPlugin = require('appstudio/plugin/preview/component/listView/ListViewPreviewPlugin');
var GridViewPreviewPlugin = require('appstudio/plugin/preview/component/gridView/GridViewPreviewPlugin');
var SwimLanePreviewPlugin = require('appstudio/plugin/preview/component/swimLane/SwimLanePreviewPlugin');
var ImagePreviewPlugin = require('appstudio/plugin/preview/component/image/ImagePreviewPlugin');
var LabelPreviewPlugin = require('appstudio/plugin/preview/component/label/LabelPreviewPlugin');
var CollectionViewPreviewPlugin = require('appstudio/plugin/preview/component/collectionView/CollectionViewPreviewPlugin');

var MobilePreviewPlugin = require('appstudio/plugin/preview/appType/mobile/MobilePreviewPlugin');
var TabletPreviewPlugin = require('appstudio/plugin/preview/appType/tablet/TabletPreviewPlugin');
var TVPreviewPlugin = require('appstudio/plugin/preview/appType/tv/TVPreviewPlugin');

var MobileUiConfigPreviewPlugin = require('appstudio/plugin/preview/uiConfig/mobile/MobileUiConfigPreviewPlugin');
var TabletUiConfigPreviewPlugin = require('appstudio/plugin/preview/uiConfig/tablet/TabletUiConfigPreviewPlugin');
var TVUiConfigPreviewPlugin = require('appstudio/plugin/preview/uiConfig/tv/TVUiConfigPreviewPlugin');

var CarouselViewPlugin = require('appstudio/plugin/view/component/carousel/CarouselViewPlugin');
var ListViewViewPlugin = require('appstudio/plugin/view/component/listview/ListViewViewPlugin');
var GridViewViewPlugin = require('appstudio/plugin/view/component/gridview/GridViewViewPlugin');
var SwimlaneViewPlugin = require('appstudio/plugin/view/component/swimlane/SwimlaneViewPlugin');
var ImageViewPlugin = require('appstudio/plugin/view/component/image/ImageViewPlugin');
var LabelViewPlugin = require('appstudio/plugin/view/component/label/LabelViewPlugin');
var CollectionViewPlugin = require('appstudio/plugin/view/component/collectionView/CollectionViewPlugin');

var MobileVersionViewPlugin = require('appstudio/plugin/view/version/mobile/MobileVersionViewPlugin');
var TabletVersionViewPlugin = require('appstudio/plugin/view/version/tablet/TabletVersionViewPlugin');
var TvVersionViewPlugin = require('appstudio/plugin/view/version/tv/TvVersionViewPlugin');

var MobileBundleViewPlugin = require('appstudio/plugin/view/bundle/mobile/MobileBundleViewPlugin');
var TabletBundleViewPlugin = require('appstudio/plugin/view/bundle/tablet/TabletBundleViewPlugin');
var TvBundleViewPlugin = require('appstudio/plugin/view/bundle/tv/TvBundleViewPlugin');

var FeedEditPlugin = require('appstudio/plugin/edit/feed/FeedEditPlugin');
var SectionControlEditPlugin = require('appstudio/plugin/edit/sectionControl/SectionControlEditPlugin');

var GoogleAnalyticEventFieldViewPlugin = require('appstudio/plugin/view/analytics/eventField/GoogleAnalyticEventFieldViewPlugin');
var GoogleAnalyticPageCreatePlugin = require('appstudio/plugin/create/analytics/googleAnalytic/page/GoogleAnalyticPageCreatePlugin');
var GoogleAnalyticPageEditPlugin = require('appstudio/plugin/edit/analytics/googleAnalytic/page/GoogleAnalyticPageEditPlugin');

var GenericAppNavigationEditorPlugin = require('appstudio/plugin/edit/appNavigation/view/generic/GenericAppNavigationEditorPlugin');
var MobileAppNavigationEditorPlugin = require('appstudio/plugin/edit/appNavigation/view/mobile/MobileAppNavigationEditorPlugin');
var TabletAppNavigationEditorPlugin = require('appstudio/plugin/edit/appNavigation/view/tablet/TabletAppNavigationEditorPlugin');
var TVAppNavigationEditorPlugin = require('appstudio/plugin/edit/appNavigation/view/tv/TVAppNavigationEditorPlugin');

var ColorCardEditPlugin = require('appstudio/plugin/edit/colorCard/ColorCardEditPlugin');
var ColorFieldEditPlugin = require('appstudio/plugin/edit/colorField/ColorFieldEditPlugin');
var ColorFontEditPlugin = require('appstudio/plugin/edit/colorFont/ColorFontEditPlugin');
var FontEditPlugin = require('appstudio/plugin/edit/font/FontEditPlugin');

var MobileAuthenticationEditPlugin = require('appstudio/plugin/edit/authentication/mobile/MobileAuthenticationEditPlugin');
var TabletAuthenticationEditPlugin = require('appstudio/plugin/edit/authentication/tablet/TabletAuthenticationEditPlugin');
var TvAuthenticationEditPlugin = require('appstudio/plugin/edit/authentication/tv/TvAuthenticationEditPlugin');

var MobileThemeEditPlugin = require('appstudio/plugin/edit/theme/mobile/MobileThemeEditPlugin');
var TabletThemeEditPlugin = require('appstudio/plugin/edit/theme/tablet/TabletThemeEditPlugin');
var TVThemeEditPlugin = require('appstudio/plugin/edit/theme/tv/TvThemeEditPlugin');

var AssetsEditPlugin = require('appstudio/plugin/edit/theme/assets/AssetsEditPlugin');
var ColorGalleryImagePlugin = require('appstudio/plugin/edit/theme/assets/colorGalleryImage/ColorGalleryImagePlugin');
var GalleryImagePlugin = require('appstudio/plugin/edit/theme/assets/galleryImage/GalleryImagePlugin');

var ColorsEditPlugin = require('appstudio/plugin/edit/theme/colors/ColorsEditPlugin');
var FontsEditPlugin = require('appstudio/plugin/edit/theme/fonts/FontsEditPlugin');
var ThemeFontEditPlugin = require('appstudio/plugin/edit/theme/fonts/themeFont/ThemeFontEditPlugin');


var MobileScreenEditPlugin = require('appstudio/plugin/edit/screen/mobile/MobileScreenEditPlugin');
var TabletScreenEditPlugin = require('appstudio/plugin/edit/screen/tablet/TabletScreenEditPlugin');
var TVScreenEditPlugin = require('appstudio/plugin/edit/screen/tv/TvScreenEditPlugin');
var MobileSearchResultScreenEditPlugin = require('appstudio/plugin/edit/searchResultScreen/mobile/MobileSearchResultScreenEditPlugin');
var TabletSearchResultScreenEditPlugin = require('appstudio/plugin/edit/searchResultScreen/tablet/TabletSearchResultScreenEditPlugin');
var TVSearchResultScreenEditPlugin = require('appstudio/plugin/edit/searchResultScreen/tv/TVSearchResultScreenEditPlugin');
var AdvanceScreenEditPlugin = require('appstudio/plugin/edit/screen/advance/AdvanceScreenEditPlugin');

var MobileAdsEditPlugin = require('appstudio/plugin/edit/ads/mobile/MobileAdsEditPlugin');
var TabletAdsEditPlugin = require('appstudio/plugin/edit/ads/tablet/TabletAdsEditPlugin');
var TvAdsEditPlugin = require('appstudio/plugin/edit/ads/tv/TvAdsEditPlugin');

var MobileBundleEditPlugin = require('appstudio/plugin/edit/bundle/mobile/MobileBundleEditPlugin');
var TabletBundleEditPlugin = require('appstudio/plugin/edit/bundle/tablet/TabletBundleEditPlugin');
var TvBundleEditPlugin = require('appstudio/plugin/edit/bundle/tv/TvBundleEditPlugin');

var SeeAllLabelEditPlugin = require('appstudio/plugin/edit/seeAllLabel/SeeAllLabelEditPlugin');
var NavigationActionEditPlugin = require('appstudio/plugin/edit/listener/action/navigation/NavigationActionEditPlugin');
var TitleSectionEditPlugin = require('appstudio/plugin/edit/titleSection/TitleSectionEditPlugin');

var AppCreatePlugin = require('appstudio/plugin/create/app/AppCreatePlugin');
var MobileVersionCreatePlugin = require('appstudio/plugin/create/version/mobile/MobileVersionCreatePlugin');
var TabletVersionCreatePlugin = require('appstudio/plugin/create/version/tablet/TabletVersionCreatePlugin');
var TvVersionCreatePlugin = require('appstudio/plugin/create/version/tv/TvVersionCreatePlugin');

var MobileBundleCreatePlugin = require('appstudio/plugin/create/bundle/mobile/MobileBundleCreatePlugin');
var TabletBundleCreatePlugin = require('appstudio/plugin/create/bundle/tablet/TabletBundleCreatePlugin');
var TvBundleCreatePlugin = require('appstudio/plugin/create/bundle/tv/TvBundleCreatePlugin');
var ListenerCreatePlugin = require('appstudio/plugin/create/listener/ListenerCreatePlugin');

var AppCardMobileVersionViewPlugin = require('appstudio/plugin/view/version/appCardVersion/mobile/AppCardMobileVersionViewPlugin');
var AppCardTabletVersionViewPlugin = require('appstudio/plugin/view/version/appCardVersion/tablet/AppCardTabletVersionViewPlugin');
var AppCardTVVersionViewPlugin = require('appstudio/plugin/view/version/appCardVersion/tv/AppCardTVVersionViewPlugin');

var AppCardMobileBundleViewPlugin = require('appstudio/plugin/view/bundle/appCardBundle/mobile/AppCardMobileBundleViewPlugin');
var AppCardTabletBundleViewPlugin = require('appstudio/plugin/view/bundle/appCardBundle/tablet/AppCardTabletBundleViewPlugin');
var AppCardTVBundleViewPlugin = require('appstudio/plugin/view/bundle/appCardBundle/tv/AppCardTVBundleViewPlugin');

var ListenerSelectEventViewPlugin = require('appstudio/plugin/view/listener/event/select/ListenerSelectEventViewPlugin');
var ListenerLongSelectEventViewPlugin = require('appstudio/plugin/view/listener/event/longSelect/ListenerLongSelectEventViewPlugin');
var ListenerSigninActionViewPlugin = require('appstudio/plugin/view/listener/action/signin/ListenerSigninActionViewPlugin');
var ListenerSignoutActionViewPlugin = require('appstudio/plugin/view/listener/action/signout/ListenerSignoutActionViewPlugin');
var ListenerNavigateActionViewPlugin = require('appstudio/plugin/view/listener/action/navigate/ListenerNavigateActionViewPlugin');
var ListenerPlaybackActionViewPlugin = require('appstudio/plugin/view/listener/action/playback/ListenerPlaybackActionViewPlugin');
var ListenerRemoveOfflineActionViewPlugin = require('appstudio/plugin/view/listener/action/removeOffline/ListenerRemoveOfflineActionViewPlugin');
var ListenerRemoveUIDActionViewPlugin = require('appstudio/plugin/view/listener/action/removeUID/ListenerRemoveUIDActionViewPlugin');
var ListenerSaveOfflineActionViewPlugin = require('appstudio/plugin/view/listener/action/saveOffline/ListenerSaveOfflineActionViewPlugin');
var ListenerSaveUIDActionViewPlugin = require('appstudio/plugin/view/listener/action/saveUID/ListenerSaveUIDActionViewPlugin');

var CustomDataEditPlugin = require('appstudio/plugin/edit/customData/CustomDataEditPlugin');
var ComponentControlEditPlugin = require('appstudio/plugin/edit/componentControl/ComponentControlEditPlugin');
var ListenerEditPlugin = require('appstudio/plugin/edit/listener/ListenerEditPlugin');
var UISettingsEditPlugin = require('appstudio/plugin/edit/uiSettings/UISettingsEditPlugin');
var SearchSettingsEditPlugin = require('appstudio/plugin/edit/searchSettings/SearchSettingsEditPlugin');
var GridViewDataEditPlugin = require('appstudio/plugin/edit/gridViewData/GridViewDataEditPlugin');
var CollectionViewDataEditPlugin = require('appstudio/plugin/edit/collectionViewData/CollectionViewDataEditPlugin');
var DataViewDataEditPlugin = require('appstudio/plugin/edit/dataViewData/DataViewDataEditPlugin');

var SecondaryMenuEditPlugin = require('appstudio/plugin/edit/secondaryMenu/SecondaryMenuEditPlugin');

var SetupPluginArchitecture = function(viewRegistry){
    this._viewRegistry = viewRegistry;
    
    //preview
    var carouselPreviewPlugin = new CarouselPreviewPlugin();
    var listViewPreviewPlugin = new ListViewPreviewPlugin();
    var gridViewPreviewPlugin = new GridViewPreviewPlugin();
    var swimLanePreviewPlugin = new SwimLanePreviewPlugin();
    var imagePreviewPlugin = new ImagePreviewPlugin();
    var labelPreviewPlugin = new LabelPreviewPlugin();
    var collectionViewPreviewPlugin = new CollectionViewPreviewPlugin();
    var mobilePreviewPlugin = new MobilePreviewPlugin();
    var tabletPreviewPlugin = new TabletPreviewPlugin();
    var tvPreviewPlugin = new TVPreviewPlugin();
    var mobileUiConfigPreviewPlugin = new MobileUiConfigPreviewPlugin();
    var tabletUiConfigPreviewPlugin = new TabletUiConfigPreviewPlugin();
    var tvUiConfigPreviewPlugin = new TVUiConfigPreviewPlugin();
    
    //edit
    var feedEditPlugin = new FeedEditPlugin();
    var colorCardEditPlugin = new ColorCardEditPlugin();
    var colorFieldEditPlugin = new ColorFieldEditPlugin();
    var colorFontEditPlugin = new ColorFontEditPlugin();

    var fontEditPlugin = new FontEditPlugin();
    
    var mobileAuthenticationEditPlugin = new MobileAuthenticationEditPlugin();
    var tabletAuthenticationEditPlugin = new TabletAuthenticationEditPlugin();
    var tvAuthenticationEditPlugin = new TvAuthenticationEditPlugin();
    
    var mobileThemeEditPlugin = new MobileThemeEditPlugin();
    var tabletThemeEditPlugin = new TabletThemeEditPlugin();
    var tvThemeEditPlugin = new TVThemeEditPlugin();
    
    var assetsEditPlugin = new AssetsEditPlugin();
    var colorGalleryImagePlugin = new ColorGalleryImagePlugin();
    var galleryImagePlugin = new GalleryImagePlugin();
    var colorsEditPlugin = new ColorsEditPlugin();
    var fontsEditPlugin = new FontsEditPlugin();
    var themeFontEditPlugin = new ThemeFontEditPlugin();

    var mobileScreenEditPlugin = new MobileScreenEditPlugin();
    var tabletScreenEditPlugin = new TabletScreenEditPlugin();
    var tvScreenEditPlugin = new TVScreenEditPlugin();    
    
    var mobileSearchResultScreenEditPlugin = new MobileSearchResultScreenEditPlugin();
    var tabletSearchResultScreenEditPlugin = new TabletSearchResultScreenEditPlugin();
    var tvSearchResultScreenEditPlugin = new TVSearchResultScreenEditPlugin();
        
    var advanceScreenEditPlugin = new AdvanceScreenEditPlugin();

    var mobileAdsEditPlugin = new MobileAdsEditPlugin();
    var tabletAdsEditPlugin = new TabletAdsEditPlugin();
    var tvAdsEditPlugin = new TvAdsEditPlugin();
    
    var mobileBundleEditPlugin = new MobileBundleEditPlugin();
    var tabletBundleEditPlugin = new TabletBundleEditPlugin();
    var tvBundleEditPlugin = new TvBundleEditPlugin();   
    
    var seeAllLabelEditPlugin = new SeeAllLabelEditPlugin();
    var customDataEditPlugin = new CustomDataEditPlugin();
    var componentControlEditPlugin = new ComponentControlEditPlugin();
    var listenerEditPlugin = new ListenerEditPlugin();
    var navigationActionEditPlugin = new NavigationActionEditPlugin();
    
    var googleAnalyticPageEditPlugin = new GoogleAnalyticPageEditPlugin();
    var sectionControlEditPlugin = new SectionControlEditPlugin();
    var titleSectionEditPlugin = new TitleSectionEditPlugin();
    var uISettingsEditPlugin = new UISettingsEditPlugin();
    var searchSettingsEditPlugin = new SearchSettingsEditPlugin();
    var gridViewDataEditPlugin = new GridViewDataEditPlugin();
    var collectionViewDataEditPlugin = new CollectionViewDataEditPlugin();
    var dataViewDataEditPlugin = new DataViewDataEditPlugin();
    var secondaryMenuEditPlugin = new SecondaryMenuEditPlugin();
    
    //view
    var carouselViewPlugin = new CarouselViewPlugin();
    var listViewViewPlugin = new ListViewViewPlugin();
    var gridViewViewPlugin = new GridViewViewPlugin();
    var swimlaneViewPlugin = new SwimlaneViewPlugin();
    var imageViewPlugin = new ImageViewPlugin();
    var labelViewPlugin = new LabelViewPlugin();
    var collectionViewPlugin = new CollectionViewPlugin();
    var mobileVersionViewPlugin = new MobileVersionViewPlugin();
    var tabletVersionViewPlugin = new TabletVersionViewPlugin();
    var tvVersionViewPlugin = new TvVersionViewPlugin();
    var mobileBundleViewPlugin = new MobileBundleViewPlugin();
    var tabletBundleViewPlugin = new TabletBundleViewPlugin();
    var tvBundleViewPlugin = new TvBundleViewPlugin();
    var googleAnalyticEventFieldViewPlugin = new GoogleAnalyticEventFieldViewPlugin();
    
    var listenerSelectEventViewPlugin = new ListenerSelectEventViewPlugin();
    var listenerLongSelectEventViewPlugin = new ListenerLongSelectEventViewPlugin();
    
    var listenerSigninActionViewPlugin = new ListenerSigninActionViewPlugin();
    var listenerSignoutActionViewPlugin = new ListenerSignoutActionViewPlugin();
    var listenerNavigateActionViewPlugin = new ListenerNavigateActionViewPlugin();
    var listenerPlaybackActionViewPlugin = new ListenerPlaybackActionViewPlugin();
    var listenerRemoveOfflineActionViewPlugin = new ListenerRemoveOfflineActionViewPlugin();
    var listenerRemoveUIDActionViewPlugin = new ListenerRemoveUIDActionViewPlugin();
    var listenerSaveOfflineActionViewPlugin = new ListenerSaveOfflineActionViewPlugin();
    var listenerSaveUIDActionViewPlugin = new ListenerSaveUIDActionViewPlugin();
    
    //create
    var appCreatePlugin = new AppCreatePlugin();
    var mobileVersionCreatePlugin = new MobileVersionCreatePlugin();
    var tabletVersionCreatePlugin = new TabletVersionCreatePlugin();
    var tvVersionCreatePlugin = new TvVersionCreatePlugin();
    
    var mobileBundleCreatePlugin = new MobileBundleCreatePlugin();
    var tabletBundleCreatePlugin = new TabletBundleCreatePlugin();
    var tvBundleCreatePlugin = new TvBundleCreatePlugin();    
    var listenerCreatePlugin = new ListenerCreatePlugin();
    
    var googleAnalyticPageCreatePlugin = new GoogleAnalyticPageCreatePlugin();
    //preview
    viewRegistry.register(carouselPreviewPlugin);
    viewRegistry.register(listViewPreviewPlugin);
    viewRegistry.register(gridViewPreviewPlugin);
    viewRegistry.register(swimLanePreviewPlugin);
    viewRegistry.register(imagePreviewPlugin);
    viewRegistry.register(labelPreviewPlugin);
    viewRegistry.register(collectionViewPreviewPlugin);
    viewRegistry.register(mobilePreviewPlugin);
    viewRegistry.register(tabletPreviewPlugin);
    viewRegistry.register(tvPreviewPlugin);
    viewRegistry.register(mobileUiConfigPreviewPlugin);
    viewRegistry.register(tabletUiConfigPreviewPlugin);
    viewRegistry.register(tvUiConfigPreviewPlugin);
    
    //edit
    viewRegistry.register(feedEditPlugin);
    viewRegistry.register(colorFieldEditPlugin);
    viewRegistry.register(colorCardEditPlugin);
    viewRegistry.register(colorFontEditPlugin);
    viewRegistry.register(fontEditPlugin);
    
    viewRegistry.register(mobileAuthenticationEditPlugin);
    viewRegistry.register(tabletAuthenticationEditPlugin);
    viewRegistry.register(tvAuthenticationEditPlugin);
    
    viewRegistry.register(mobileThemeEditPlugin);
    viewRegistry.register(tabletThemeEditPlugin);
    viewRegistry.register(tvThemeEditPlugin);
    
    viewRegistry.register(assetsEditPlugin);
    viewRegistry.register(colorGalleryImagePlugin);
    viewRegistry.register(galleryImagePlugin);
    viewRegistry.register(colorsEditPlugin);
    viewRegistry.register(fontsEditPlugin);
    viewRegistry.register(themeFontEditPlugin);

    viewRegistry.register(mobileScreenEditPlugin);
    viewRegistry.register(tabletScreenEditPlugin);
    viewRegistry.register(tvScreenEditPlugin);

    viewRegistry.register(mobileSearchResultScreenEditPlugin);
    viewRegistry.register(tabletSearchResultScreenEditPlugin);
    viewRegistry.register(tvSearchResultScreenEditPlugin);
    
    viewRegistry.register(advanceScreenEditPlugin);
    
    viewRegistry.register(mobileAdsEditPlugin);
    viewRegistry.register(tabletAdsEditPlugin);
    viewRegistry.register(tvAdsEditPlugin);
    
    viewRegistry.register(mobileBundleEditPlugin);
    viewRegistry.register(tabletBundleEditPlugin);
    viewRegistry.register(tvBundleEditPlugin);
    viewRegistry.register(seeAllLabelEditPlugin);
    viewRegistry.register(customDataEditPlugin);
    viewRegistry.register(componentControlEditPlugin);
    viewRegistry.register(listenerEditPlugin);   
    viewRegistry.register(navigationActionEditPlugin);    

    viewRegistry.register(googleAnalyticPageEditPlugin);
    viewRegistry.register(sectionControlEditPlugin);
    viewRegistry.register(titleSectionEditPlugin);
    viewRegistry.register(uISettingsEditPlugin);
    viewRegistry.register(searchSettingsEditPlugin);
    viewRegistry.register(gridViewDataEditPlugin);
    viewRegistry.register(dataViewDataEditPlugin);
    viewRegistry.register(collectionViewDataEditPlugin);
    viewRegistry.register(secondaryMenuEditPlugin);
    
    viewRegistry.register(new MobileAppNavigationEditorPlugin());
    viewRegistry.register(new TabletAppNavigationEditorPlugin);
    viewRegistry.register(new TVAppNavigationEditorPlugin());
    viewRegistry.register(new GenericAppNavigationEditorPlugin());

    //Navigation View
    viewRegistry.register(new NavigationTypeViewPlugin.VerticalNavigationTypeViewPlugin());
    viewRegistry.register(new NavigationTypeViewPlugin.DrawerNavigationTypeViewPlugin());
    viewRegistry.register(new NavigationTypeViewPlugin.TopNavigationTypeViewPlugin());
    
    //view
    viewRegistry.register(carouselViewPlugin);
    viewRegistry.register(listViewViewPlugin);
    viewRegistry.register(gridViewViewPlugin);
    viewRegistry.register(swimlaneViewPlugin);
    viewRegistry.register(imageViewPlugin);
    viewRegistry.register(labelViewPlugin);
    viewRegistry.register(collectionViewPlugin);
    
    viewRegistry.register(mobileVersionViewPlugin);
    viewRegistry.register(tabletVersionViewPlugin);
    viewRegistry.register(tvVersionViewPlugin);
    
    viewRegistry.register(mobileBundleViewPlugin);
    viewRegistry.register(tabletBundleViewPlugin);
    viewRegistry.register(tvBundleViewPlugin);    
    viewRegistry.register(googleAnalyticEventFieldViewPlugin);
    
    viewRegistry.register(listenerSelectEventViewPlugin);
    viewRegistry.register(listenerLongSelectEventViewPlugin);
    
    viewRegistry.register(listenerSigninActionViewPlugin);
    viewRegistry.register(listenerSignoutActionViewPlugin);
    viewRegistry.register(listenerNavigateActionViewPlugin);
    viewRegistry.register(listenerPlaybackActionViewPlugin);
    viewRegistry.register(listenerRemoveOfflineActionViewPlugin);
    viewRegistry.register(listenerRemoveUIDActionViewPlugin);
    viewRegistry.register(listenerSaveOfflineActionViewPlugin);
    viewRegistry.register(listenerSaveUIDActionViewPlugin);
    
    //create
    viewRegistry.register(appCreatePlugin);
    viewRegistry.register(mobileVersionCreatePlugin);
    viewRegistry.register(tabletVersionCreatePlugin);
    viewRegistry.register(tvVersionCreatePlugin);
    
    viewRegistry.register(mobileBundleCreatePlugin);
    viewRegistry.register(tabletBundleCreatePlugin);
    viewRegistry.register(tvBundleCreatePlugin);
	viewRegistry.register(listenerCreatePlugin);
    viewRegistry.register(googleAnalyticPageCreatePlugin);
    
	//AppCard version information - Prefer 1
	viewRegistry.register(new AppCardMobileVersionViewPlugin());
	viewRegistry.register(new AppCardTabletVersionViewPlugin());
	viewRegistry.register(new AppCardTVVersionViewPlugin());
	
	viewRegistry.register(new AppCardMobileBundleViewPlugin());
	viewRegistry.register(new AppCardTabletBundleViewPlugin());
	viewRegistry.register(new AppCardTVBundleViewPlugin());
};

module.exports = SetupPluginArchitecture;
