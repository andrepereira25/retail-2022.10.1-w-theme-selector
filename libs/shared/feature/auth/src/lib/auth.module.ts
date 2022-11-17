import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, LOCALE_ID, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EntitlementsModule } from '@backbase/foundation-ang/entitlements';
import { IdentityAuthModule } from '@backbase/identity-auth';
import { ImpersonationModule, ImpersonationService } from '@backbase/identity-auth/impersonation';
import { AlertModule } from '@backbase/ui-ang/alert';
import { ButtonModule } from '@backbase/ui-ang/button';
import { HeaderModule } from '@backbase/ui-ang/header';
import { ModalModule } from '@backbase/ui-ang/modal';
import {
  AuthConfig,
  OAuthEvent,
  OAuthModule,
  OAuthModuleConfig,
  OAuthService,
  OAuthStorage,
} from 'angular-oauth2-oidc';
import { environment } from 'apps/retail-usa/src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { AuthEventsHandlerService } from './auth-events-handler.service';
import { AuthInterceptor } from './auth.interceptor';
import { CustomSessionTimeoutComponent } from './custom-session-timeout/session-timeout.component';
import { StepUpAuthenticationComponent } from './step-up-authentication/step-up-authentication.component';

/**
 * This is a temporary workaround for capabilities that has download functionality working only via cookies
 * TODO: remove it as soon as capabilities work with auth header
 */
const cookiePaths = [
  '/api/account-statement/client-api/v2/account/statements/download',
  '/api/transaction-manager/client-api/v2/transactions/export',
  '/api/loan/client-api/v1/loans',
];

@NgModule({
  declarations: [CustomSessionTimeoutComponent, StepUpAuthenticationComponent],
  imports: [
    CommonModule,
    FormsModule,
    EntitlementsModule,
    AlertModule,
    ButtonModule,
    HeaderModule,
    ModalModule,
    OAuthModule.forRoot(),
    IdentityAuthModule,
    ImpersonationModule,
  ],
  exports: [CustomSessionTimeoutComponent, StepUpAuthenticationComponent],
})
export class AuthModule {
  constructor(@Optional() @SkipSelf() targetModule: AuthModule) {
    if (targetModule) {
      throw new Error(
        `${targetModule.constructor.name} has already been loaded. Import this module in the AppModule only.`,
      );
    }
  }

  static forRoot(apiRoot: string, authConfig: (baseUrl: string) => AuthConfig): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
        },
        {
          provide: AuthConfig,
          useFactory: authConfig,
          deps: [[new Optional(), LOCALE_ID]],
        },
        { provide: OAuthStorage, useFactory: () => localStorage },
        {
          provide: APP_INITIALIZER,
          multi: true,
          deps: [OAuthService, CookieService, ImpersonationService, AuthEventsHandlerService],
          useFactory:
            (oAuthService: OAuthService, cookieService: CookieService, impersonationService: ImpersonationService) =>
            async () => {
              // todo: delete when files download works without cookies
              oAuthService.events.subscribe((authEvent: OAuthEvent) => {
                if (authEvent.type === 'token_received' || authEvent.type === 'token_refreshed') {
                  cookiePaths.forEach((path) =>
                    cookieService.set('Authorization', oAuthService.getAccessToken(), { path }),
                  );
                }
              });

              await impersonationService.checkImpersonationStatus();
              if (environment.production) {
                await oAuthService.loadDiscoveryDocumentAndTryLogin();
              }
            },
        },
        {
          provide: OAuthModuleConfig,
          useValue: {
            resourceServer: {
              allowedUrls: [apiRoot],
              sendAccessToken: true,
            },
          },
        },
      ],
    };
  }
}
