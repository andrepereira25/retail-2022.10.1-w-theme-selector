import { NgModule } from '@angular/core';
import { IdentityManagementServiceMocksProvider } from '@backbase/data-ang/user';
import {
  INITIATE_PAYMENT_CONFIG,
  INITIATE_PAYMENT_JOURNEY_COMMUNICATOR,
  InitiatePaymentJourneyModule,
  INTERNAL_TRANSFER,
  PayordOmniPaymentConfigProvider,
} from '@backbase/initiate-payment-journey-ang';
import { ReviewScreens } from '@backbase/initiate-payment-journey-ang';
import { PaymentsCommunicationService } from '@backbase/retail/feature/communication';
import { initiatePaymentProviders } from './initiate-payment-providers.util';

@NgModule({
  imports: [InitiatePaymentJourneyModule.forRoot()],
  providers: [
    PayordOmniPaymentConfigProvider,
    IdentityManagementServiceMocksProvider,
    ...initiatePaymentProviders,
    {
      provide: INITIATE_PAYMENT_CONFIG,
      useValue: {
        paymentTypes: [INTERNAL_TRANSFER],
        businessFunctions: [INTERNAL_TRANSFER.businessFunction],
        options: {
          enablePaymentTemplateSelector: false,
          enableSavePaymentAsTemplate: false,
          reviewScreenType: ReviewScreens.ADAPTED,
          isModalView: false,
          header: () => '',
        },
      },
    },
    {
      provide: INITIATE_PAYMENT_JOURNEY_COMMUNICATOR,
      useExisting: PaymentsCommunicationService,
    },
  ],
})
export class InternalTransferJourneyBundleModule {}
