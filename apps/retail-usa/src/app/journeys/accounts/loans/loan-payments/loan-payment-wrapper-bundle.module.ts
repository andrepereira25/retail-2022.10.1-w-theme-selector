import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { INITIATE_LOANS_PAYMENT_JOURNEY_COMMUNICATOR } from '@backbase/initiate-loans-payment-journey';
import { LoanPaymentResolver, LoansStoreService } from '@backbase/loans-journey-ang';
import { RETAIL_LOANS_JOURNEY_LOANS_BASE_PATH } from '@backbase/retail-loans-journey-ang';
import { APP_LOANS_JOURNEY_BASE_PATH } from '../../../../service-paths.module';
import { LoansCommunicationService } from '@backbase/retail/feature/communication';
import { PERMISSIONS } from '../../../../auth/permissions';
import { LoanPaymentJourneyWrapperComponent } from './loan-payment-wrapper-component/loan-payment-wrapper.component';

const ROUTES = [
  {
    path: '',
    component: LoanPaymentJourneyWrapperComponent,
    children: [
      {
        path: 'loans-advance',
        loadChildren: () =>
          import('./new-loan-advance-bundle.module').then((m) => m.NewLoansAdvanceJourneyBundleModule),
        data: {
          pageTitle: $localize`:@@loan-payments.page-title.payments.loan-advance:Loan Payment`,
        },
      },
      {
        path: 'loans-payment',
        loadChildren: () =>
          import('./new-loan-payment-bundle.module').then((m) => m.NewLoansPaymentJourneyBundleModule),
        data: {
          pageTitle: $localize`:@@loan-payments.page-title.payments.loan-payment:Pay Loan`,
        },
      },
    ],
    resolve: {
      loan: LoanPaymentResolver,
    },
    data: {
      title: $localize`:@@retail-loan-payment.nav.item.title:Loan Payment - Loans - Retail Banking`,
      entitlements: PERMISSIONS.canViewLoans,
    },
  },
];

@NgModule({
  declarations: [LoanPaymentJourneyWrapperComponent],
  imports: [CommonModule, RouterModule.forChild(ROUTES)],
  providers: [
    {
      provide: INITIATE_LOANS_PAYMENT_JOURNEY_COMMUNICATOR,
      useExisting: LoansCommunicationService,
    },
    LoansStoreService,
    {
      provide: RETAIL_LOANS_JOURNEY_LOANS_BASE_PATH,
      useExisting: APP_LOANS_JOURNEY_BASE_PATH,
    },
  ],
})
export class LoanPaymentJourneyWrapperBundleModule {}
