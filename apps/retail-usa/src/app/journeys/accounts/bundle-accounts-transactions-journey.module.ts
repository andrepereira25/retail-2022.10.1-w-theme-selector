import { NgModule, Provider } from '@angular/core';
import {
  AccountAliasDisplayingLevel,
  AccountsCommunicationService,
  AccountsPaymentsCommunication,
  AccountsStateCommunicationService,
  AccountsTransactionsJourneyConfiguration,
  AccountsTransactionsJourneyConfigurationToken,
  AccountsTransactionsJourneyModule,
  ACCOUNTS_TRANSACTIONS_JOURNEY_ARRANGEMENT_MANAGER_BASE_PATH,
  ACCOUNTS_TRANSACTIONS_JOURNEY_CATEGORIES_MANAGEMENT_BASE_PATH,
  ACCOUNTS_TRANSACTIONS_JOURNEY_FINANCIAL_INSTITUTION_MANAGER_BASE_PATH,
  ACCOUNTS_TRANSACTIONS_JOURNEY_MESSAGES_BASE_PATH,
  ACCOUNTS_TRANSACTIONS_JOURNEY_TRANSACTIONS_BASE_PATH,
  ACCOUNTS_TRANSACTIONS_JOURNEY_PAYMENT_BATCH_BASE_PATH,
  ProductKindUri,
} from '@backbase/accounts-transactions-journey-ang';
import { PubSubService } from '@backbase/foundation-ang/web-sdk';
import {
  AccountsCommunicationService as AccountsCommunicationServiceImplementation,
  AccountsStateCommunicationService as AccountsStateCommunicationServiceImplementation,
  AccountsInitiatePaymentCommunication,
} from '@backbase/retail/feature/communication';
import {
  APP_ARRANGEMENT_MANAGER_BASE_PATH,
  APP_CATEGORIES_MANAGEMENT_BASE_PATH,
  APP_FINANCIAL_INSTITUTION_MANAGER_BASE_PATH,
  APP_MESSAGES_BASE_PATH,
  APP_TRANSACTIONS_BASE_PATH,
  APP_PAYMENT_BATCH_BASE_PATH,
} from '../../service-paths.module';
import { environment } from '../../../environments/environment';

const AccountsTransactionsConfigProvider: Provider = {
  provide: AccountsTransactionsJourneyConfigurationToken,
  useValue: {
    apiKey: environment.googleApiKey,
    showCheckImages: true,
    disputeTopicId: '',
    inquireTopicId: '',
    productKindsWithExternalDetailsPage: ProductKindUri.LOAN,
    accountAliasDisplayLevel: AccountAliasDisplayingLevel.USER,
  } as Partial<AccountsTransactionsJourneyConfiguration>,
};

@NgModule({
  imports: [AccountsTransactionsJourneyModule.forRoot()],
  providers: [
    AccountsTransactionsConfigProvider,
    { provide: AccountsPaymentsCommunication, useExisting: AccountsInitiatePaymentCommunication },
    { provide: AccountsCommunicationService, useExisting: AccountsCommunicationServiceImplementation },
    { provide: AccountsStateCommunicationService, useExisting: AccountsStateCommunicationServiceImplementation },
    PubSubService,
    {
      provide: ACCOUNTS_TRANSACTIONS_JOURNEY_ARRANGEMENT_MANAGER_BASE_PATH,
      useExisting: APP_ARRANGEMENT_MANAGER_BASE_PATH,
    },
    {
      provide: ACCOUNTS_TRANSACTIONS_JOURNEY_CATEGORIES_MANAGEMENT_BASE_PATH,
      useExisting: APP_CATEGORIES_MANAGEMENT_BASE_PATH,
    },
    {
      provide: ACCOUNTS_TRANSACTIONS_JOURNEY_FINANCIAL_INSTITUTION_MANAGER_BASE_PATH,
      useExisting: APP_FINANCIAL_INSTITUTION_MANAGER_BASE_PATH,
    },
    {
      provide: ACCOUNTS_TRANSACTIONS_JOURNEY_MESSAGES_BASE_PATH,
      useExisting: APP_MESSAGES_BASE_PATH,
    },
    {
      provide: ACCOUNTS_TRANSACTIONS_JOURNEY_TRANSACTIONS_BASE_PATH,
      useExisting: APP_TRANSACTIONS_BASE_PATH,
    },
    {
      provide: ACCOUNTS_TRANSACTIONS_JOURNEY_PAYMENT_BATCH_BASE_PATH,
      useExisting: APP_PAYMENT_BATCH_BASE_PATH,
    },
  ],
})
export class AccountsTransactionsJourneyBundleModule {}
