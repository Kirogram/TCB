import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {FullMenuComponent} from './menu/full-menu/full-menu.component';
import {RouterModule} from '@angular/router';
import {StoreListComponent} from './pages/store-list/store-list.component';
import {AppRoutingModule} from './app-routing.module';
import {MainPageComponent} from './main-page/main-page.component';
import {HttpClientModule} from '@angular/common/http';
import {COMPOSITION_BUFFER_MODE, FormsModule} from '@angular/forms';
import {InsertReviewsComponent} from './pages/insert-reviews/insert-reviews.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DetailReviewsComponent} from './pages/detail-reviews/detail-reviews.component';
import {DetailShopComponent} from './pages/detail-shop/detail-shop.component';
import {BottomDescComponent} from './pages/bottom-desc/bottom-desc.component';
import {CleanTypeComponent} from './pages/clean-type/clean-type.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {ReviewListComponent} from './pages/review-list/review-list.component';
import {CostRequestComponent} from './pages/cost-request/cost-request.component';
import {HomeCleaningComponent} from './pages/cost-request/home-cleaning/home-cleaning.component';
import {NormalCleaningComponent} from './pages/cost-request/normal-cleaning/normal-cleaning.component';
import {ProductCleaningComponent} from './pages/cost-request/product-cleaning/product-cleaning.component';
import {BuildingCleaningComponent} from './pages/cost-request/building-cleaning/building-cleaning.component';
import {ProductReviewListComponent} from './pages/product-review-list/product-review-list.component';
import {QaComponent} from './pages/qa/qa.component';
import {EventListComponent} from './pages/event-list/event-list.component';
import {UserLoginComponent} from './pages/user-login/user-login.component';
import {DetailProductReviewComponent} from './pages/detail-product-review/detail-product-review.component';
import {ShopPriceComponent} from './pages/shop-price/shop-price.component';
import {ModalDefaultComponent} from './modal/modal-default/modal-default.component';
import {PopupLoginComponent} from './popup/popup-login/popup-login.component';
import {ChoicePopupComponent} from './popup/choice-popup/choice-popup.component';
import {ToastComponent} from './modal/toast/toast.component';
import {OrderSuccComponent} from './pages/cost-request/order-succ/order-succ.component';
import {DetailEventComponent} from './pages/detail-event/detail-event.component';
import {UserMainComponent} from './pages/user-main/user-main.component';
import {AfterListComponent} from './pages/after-list/after-list.component';
import {PrivacyComponent} from './default/privacy/privacy.component';
import {DetailAfterComponent} from './pages/detail-after/detail-after.component';
import {DetailNoticeComponent} from './pages/detail-notice/detail-notice.component';
import {JoinPartnerComponent} from './pages/join-partner/join-partner.component';
import {SideMenuComponent} from './pages/side-menu/side-menu.component';
import {CookieListComponent} from './pages/cookie-list/cookie-list.component';
import {AutoChoiceComponent} from './pages/auto-choice/auto-choice.component';
import {CookieService} from 'ngx-cookie-service';
import {ShopOrderListComponent} from './pages/shop-order-list/shop-order-list.component';
import {ShopDetailInfoComponent} from './pages/shop-detail-info/shop-detail-info.component';
import {PopupShopComponent} from './popup/popup-shop/popup-shop.component';
import {PopupAfterComponent} from './popup/popup-after/popup-after.component';
import {AdHeaderComponent} from './pages/ad-header/ad-header.component';
import {AngularMyDatePickerModule} from 'angular-mydatepicker';
import {ModalAddComponent} from './modal/modal-add/modal-add.component';
import {PopupPriceLoginComponent} from './popup/popup-price-login/popup-price-login.component';
import {UserSignComponent} from './pages/user-sign/user-sign.component';
import {ModalShopComponent} from './modal/modal-shop/modal-shop.component';
import {ModalOrderComponent} from './modal/modal-order/modal-order.component';
import {CleaningMenuComponent} from './main-page/cleaning-menu/cleaning-menu.component';
import {MainMenuComponent} from './main-page/main-menu/main-menu.component';
import {LiveListComponent} from './main-page/live-list/live-list.component';
import {MainReviewComponent} from './main-page/main-review/main-review.component';
import {UseInfomationComponent} from './main-page/use-infomation/use-infomation.component';
import {UserReviewComponent} from './main-page/user-review/user-review.component';
import {MainShopInfoComponent} from './main-page/main-shop-info/main-shop-info.component';
import {MainPotComponent} from './main-page/main-pot/main-pot.component';
import {MainBottomDescComponent} from './main-page/main-bottom-desc/main-bottom-desc.component';
import {MainQaComponent} from './main-page/main-qa/main-qa.component';
import {MainJoinComponent} from './main-page/main-join/main-join.component';
import {EugeneComponent} from './pages/eugene/eugene.component';
import {EugeneReservationComponent} from './pages/eugene/eugene-reservation/eugene-reservation.component';
import {EugeneUserComponent} from './pages/eugene-user/eugene-user.component';
import {PartnerMainComponent} from './pages/partner-main/partner-main.component';
import {CareSurveyComponent} from './pages/care-survey/care-survey.component';
import {PartnerStatusComponent} from './pages/partner-status/partner-status.component';
import {MainHeaderComponent} from './main-page/main-header/main-header.component';

import ko from '@angular/common/locales/ko';
import {HashLocationStrategy, LocationStrategy, registerLocaleData} from '@angular/common';
import {ModalChoiceComponent} from './modal/modal-choice/modal-choice.component';
import {CouponPopupComponent} from './popup/coupon-popup/coupon-popup.component';
import {CouponModalComponent} from './modal/coupon-modal/coupon-modal.component';
import {IntersectionObserverModule} from '@ng-web-apis/intersection-observer';
import {DetailEditorComponent} from './pages/detail-editor/detail-editor.component';
import {PopupInterviewComponent} from './popup/popup-interview/popup-interview.component';
import {GtagModule} from 'angular-gtag';
import { PartnerInfoComponent } from './pages/partner-info/partner-info.component';
import { PartnerDescComponent } from './pages/partner-desc/partner-desc.component';

registerLocaleData(ko);

@NgModule({
  declarations: [
    AppComponent,
    ModalDefaultComponent,
    PopupLoginComponent,
    ToastComponent,
    PrivacyComponent,
    FullMenuComponent,
    StoreListComponent,
    MainPageComponent,
    InsertReviewsComponent,
    DetailReviewsComponent,
    DetailShopComponent,
    BottomDescComponent,
    CleanTypeComponent,
    ReviewListComponent,
    CostRequestComponent,
    HomeCleaningComponent,
    NormalCleaningComponent,
    ProductCleaningComponent,
    BuildingCleaningComponent,
    ProductReviewListComponent,
    QaComponent,
    EventListComponent,
    UserLoginComponent,
    DetailProductReviewComponent,
    ShopPriceComponent,
    ChoicePopupComponent,
    OrderSuccComponent,
    DetailEventComponent,
    UserMainComponent,
    AfterListComponent,
    DetailAfterComponent,
    DetailNoticeComponent,
    JoinPartnerComponent,
    SideMenuComponent,
    CookieListComponent,
    AutoChoiceComponent,
    ShopOrderListComponent,
    ShopDetailInfoComponent,
    PopupShopComponent,
    PopupAfterComponent,
    AdHeaderComponent,
    ModalAddComponent,
    PopupPriceLoginComponent,
    UserSignComponent,
    ModalShopComponent,
    ModalOrderComponent,
    CleaningMenuComponent,
    MainMenuComponent,
    LiveListComponent,
    MainReviewComponent,
    UseInfomationComponent,
    UserReviewComponent,
    MainShopInfoComponent,
    MainPotComponent,
    MainBottomDescComponent,
    MainQaComponent,
    MainJoinComponent,
    EugeneComponent,
    EugeneReservationComponent,
    EugeneUserComponent,
    PartnerMainComponent,
    CareSurveyComponent,
    PartnerStatusComponent,
    MainHeaderComponent,
    ModalChoiceComponent,
    CouponPopupComponent,
    CouponModalComponent,
    DetailEditorComponent,
    PopupInterviewComponent,
    PartnerInfoComponent,
    PartnerDescComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    InfiniteScrollModule,
    AngularMyDatePickerModule,
    IntersectionObserverModule,
    GtagModule.forRoot({ trackingId: 'G-156WTYVEHD', trackPageviews: true })
  ],
  entryComponents: [
    ModalDefaultComponent,
    ModalAddComponent,
    ModalShopComponent,
    ModalOrderComponent,
    ModalChoiceComponent,
    CouponModalComponent,
    PopupLoginComponent,
    PopupPriceLoginComponent,
    CouponPopupComponent,
    ToastComponent,
    PrivacyComponent,
    EugeneReservationComponent
  ],
  providers: [
    HttpClientModule,
    InfiniteScrollModule,
    CookieService,
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {
      provide: COMPOSITION_BUFFER_MODE,
      useValue: false
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule {

}
