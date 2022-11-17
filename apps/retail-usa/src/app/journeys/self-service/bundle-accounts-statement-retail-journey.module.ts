import { NgModule } from '@angular/core';
import {
  ACCOUNT_STATEMENT_RETAIL_JOURNEY_ACCOUNT_STATEMENT_BASE_PATH,
  ACCOUNT_STATEMENT_RETAIL_JOURNEY_ARRANGEMENT_MANAGER_BASE_PATH,
  ACCOUNT_STATEMENT_RETAIL_JOURNEY_CONFIGURATION_TOKEN,
  AccountStatementRetailJourneyConfiguration,
  AccountStatementRetailJourneyModule,
} from '@backbase/account-statement-retail-journey-ang';
import { APP_ACCOUNT_STATEMENT_BASE_PATH, APP_ARRANGEMENT_MANAGER_BASE_PATH } from '../../service-paths.module';

@NgModule({
  imports: [AccountStatementRetailJourneyModule.forRoot()],
  providers: [
    {
      provide: ACCOUNT_STATEMENT_RETAIL_JOURNEY_CONFIGURATION_TOKEN,
      useValue: {
        showManageStatementsNavigation: true,
        manageStatementsNavigationUrl: '/self-service/manage-statements',
      } as Partial<AccountStatementRetailJourneyConfiguration>,
    },
    {
      provide: ACCOUNT_STATEMENT_RETAIL_JOURNEY_ACCOUNT_STATEMENT_BASE_PATH,
      useExisting: APP_ACCOUNT_STATEMENT_BASE_PATH,
    },
    {
      provide: ACCOUNT_STATEMENT_RETAIL_JOURNEY_ARRANGEMENT_MANAGER_BASE_PATH,
      useExisting: APP_ARRANGEMENT_MANAGER_BASE_PATH,
    },
  ],
})
export class AccountStatementRetailJourneyBundleModule {}
