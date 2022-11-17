import { NgModule } from '@angular/core';
import {
  MessagesClientInboxJourneyModule,
  MESSAGES_CLIENT_INBOX_JOURNEY_MESSAGES_BASE_PATH,
} from '@backbase/messages-client-inbox-journey-ang';
import { APP_MESSAGES_BASE_PATH } from '../../service-paths.module';

@NgModule({
  imports: [MessagesClientInboxJourneyModule.forRoot()],
  providers: [
    {
      provide: MESSAGES_CLIENT_INBOX_JOURNEY_MESSAGES_BASE_PATH,
      useExisting: APP_MESSAGES_BASE_PATH,
    },
  ],
})
export class MessagesClientInboxJourneyBundleModule {}
