import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StoreListComponent} from './pages/store-list/store-list.component';
import {MainPageComponent} from './main-page/main-page.component';
import {InsertReviewsComponent} from './pages/insert-reviews/insert-reviews.component';
import {DetailReviewsComponent} from './pages/detail-reviews/detail-reviews.component';
import {DetailShopComponent} from './pages/detail-shop/detail-shop.component';
import {CleanTypeComponent} from './pages/clean-type/clean-type.component';
import {ReviewListComponent} from './pages/review-list/review-list.component';
import {CostRequestComponent} from './pages/cost-request/cost-request.component';
import {HomeCleaningComponent} from './pages/cost-request/home-cleaning/home-cleaning.component';
import {NormalCleaningComponent} from './pages/cost-request/normal-cleaning/normal-cleaning.component';
import {ProductCleaningComponent} from './pages/cost-request/product-cleaning/product-cleaning.component';
import {BuildingCleaningComponent} from './pages/cost-request/building-cleaning/building-cleaning.component';
import {ProductReviewListComponent} from './pages/product-review-list/product-review-list.component';
import {DetailProductReviewComponent} from './pages/detail-product-review/detail-product-review.component';
import {QaComponent} from './pages/qa/qa.component';
import {EventListComponent} from './pages/event-list/event-list.component';
import {UserLoginComponent} from './pages/user-login/user-login.component';
import {ShopPriceComponent} from './pages/shop-price/shop-price.component';
import {OrderSuccComponent} from './pages/cost-request/order-succ/order-succ.component';
import {DetailEventComponent} from './pages/detail-event/detail-event.component';
import {UserMainComponent} from './pages/user-main/user-main.component';
import {AfterListComponent} from './pages/after-list/after-list.component';
import {PrivacyComponent} from './default/privacy/privacy.component';
import {DetailAfterComponent} from './pages/detail-after/detail-after.component';
import {DetailNoticeComponent} from './pages/detail-notice/detail-notice.component';
import {JoinPartnerComponent} from './pages/join-partner/join-partner.component';
import {CookieListComponent} from './pages/cookie-list/cookie-list.component';
import {ShopOrderListComponent} from './pages/shop-order-list/shop-order-list.component';
import {UserSignComponent} from './pages/user-sign/user-sign.component';
import {EugeneComponent} from './pages/eugene/eugene.component';
import {EugeneUserComponent} from './pages/eugene-user/eugene-user.component';
import {PartnerMainComponent} from './pages/partner-main/partner-main.component';
import {CareSurveyComponent} from './pages/care-survey/care-survey.component';
import {PartnerStatusComponent} from './pages/partner-status/partner-status.component';
import {MainHeaderComponent} from './main-page/main-header/main-header.component';
import {DetailEditorComponent} from './pages/detail-editor/detail-editor.component';
import {PartnerInfoComponent} from './pages/partner-info/partner-info.component';
import {PartnerDescComponent} from './pages/partner-desc/partner-desc.component';

const routes: Routes = [
  {path: '', redirectTo: 'mainPage', pathMatch: 'full'},
  {path: 'storeList', component: StoreListComponent},
  {path: 'mainPage', component: MainPageComponent},
  {path: 'insertReviews', component: InsertReviewsComponent},
  {path: 'detailReviews', component: DetailReviewsComponent},
  {path: 'detailShop', component: DetailShopComponent},
  {path: 'cleanType', component: CleanTypeComponent},
  {path: 'reviewList', component: ReviewListComponent},
  {path: 'costRequest', component: CostRequestComponent},
  {path: 'homeCleaning', component: HomeCleaningComponent},
  {path: 'normalCleaning', component: NormalCleaningComponent},
  {path: 'productCleaning', component: ProductCleaningComponent},
  {path: 'buildingCleaning', component: BuildingCleaningComponent},
  {path: 'productReviewList', component: ProductReviewListComponent},
  {path: 'detailProductReview', component: DetailProductReviewComponent},
  {path: 'qa', component: QaComponent},
  {path: 'eventList', component: EventListComponent},
  {path: 'login', component: UserLoginComponent},
  {path: 'shopPrice', component: ShopPriceComponent},
  {path: 'orderSucc', component: OrderSuccComponent},
  {path: 'detailEvent', component: DetailEventComponent},
  {path: 'userMain', component: UserMainComponent},
  {path: 'afterList', component: AfterListComponent},
  {path: 'privacy', component: PrivacyComponent},
  {path: 'detailAfter', component: DetailAfterComponent},
  {path: 'detailNotice', component: DetailNoticeComponent},
  {path: 'joinPartner', component: JoinPartnerComponent},
  {path: 'cookieList', component: CookieListComponent},
  {path: 'shopOrderList', component: ShopOrderListComponent},
  {path: 'userSign', component: UserSignComponent},
  {path: 'eugeneInfo', component: EugeneComponent},
  {path: 'eugeneUser', component: EugeneUserComponent},
  {path: 'partnerMain', component: PartnerMainComponent},
  {path: 'careSurvey', component: CareSurveyComponent},
  {path: 'partnerStatus', component: PartnerStatusComponent},
  {path: 'mainHeader', component: MainHeaderComponent},
  {path: 'detailEditor', component: DetailEditorComponent},
  {path: 'partnerInfo', component: PartnerInfoComponent},
  {path: 'partnerDesc', component: PartnerDescComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true, scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule],
})
export class AppRoutingModule {

  constructor() {
  }

}
