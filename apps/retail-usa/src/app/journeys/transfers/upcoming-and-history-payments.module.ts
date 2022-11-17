import { NgModule } from '@angular/core';
import {
  ManageUpcomingAndHistoricalPaymentsCommunicationService,
  ManageUpcomingAndHistoricalPaymentsJourneyModule,
  MANAGE_UPCOMING_AND_HISTORICAL_PAYMENTS_JOURNEY_PAYMENT_ORDER_BASE_PATH,
} from '@backbase/manage-upcoming-and-historical-payments-journey-ang';
import { PaymentsCommunicationService } from '@backbase/retail/feature/communication';
import { APP_PAYMENT_ORDER_BASE_PATH } from '../../service-paths.module';

@NgModule({
  imports: [ManageUpcomingAndHistoricalPaymentsJourneyModule.forRoot()],
  providers: [
    {
      provide: ManageUpcomingAndHistoricalPaymentsCommunicationService,
      useExisting: PaymentsCommunicationService,
    },
    {
      provide: MANAGE_UPCOMING_AND_HISTORICAL_PAYMENTS_JOURNEY_PAYMENT_ORDER_BASE_PATH,
      useExisting: APP_PAYMENT_ORDER_BASE_PATH,
    },
  ],
})
export class ManageUpcomingAndHistoricalPaymentsJourneyBundleModule {}
