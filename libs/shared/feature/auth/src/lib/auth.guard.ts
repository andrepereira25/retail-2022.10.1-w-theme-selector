import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, UrlTree } from '@angular/router';
import { AuthService } from '@backbase/identity-auth';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'apps/retail-usa/src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad, CanActivateChild {
  constructor(private readonly authService: AuthService, private readonly oAuthService: OAuthService) {}

  canLoad(): Observable<boolean | UrlTree> {
    return this.redirectIfUnauthenticated();
  }

  canActivate(): Observable<boolean | UrlTree> {
    return this.redirectIfUnauthenticated();
  }

  canActivateChild(): Observable<boolean | UrlTree> {
    return this.redirectIfUnauthenticated();
  }

  /**
   * If user has an access token in storage they are logged in and may access page.
   * If not, treat them as logged out.
   */
  private redirectIfUnauthenticated(): Observable<boolean | UrlTree> {
    if (!environment.production) {
      return of(true);
    }
    return this.authService.isAuthenticated$.pipe(
      map((loggedIn) => {
        if (loggedIn) {
          return true;
        }

        this.oAuthService.initLoginFlow();
        return false;
      }),
    );
  }
}
