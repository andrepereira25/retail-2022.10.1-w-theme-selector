import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LayoutService } from '@backbase/ui-ang/layout';
import { RetailLayoutComponent } from './retail-layout.component';
import { Title } from '@angular/platform-browser';
import '@angular/localize/init';
import { MediaQueryService } from '@backbase/ui-ang/media-query-lib';
import { CssVariablesService } from '@backbase/ui-ang/css-variables-lib';
import { ActivatedRoute, Router, RouterEvent } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DateTimeProvider, OAuthLogger, OAuthService, UrlHelperService } from 'angular-oauth2-oidc';
import { SharedUserContextService, UserContextConfigurationToken } from '@backbase/shared/feature/user-context';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RetailLayoutComponent', () => {
  let retailLayoutComponent: ComponentFixture<RetailLayoutComponent>;
  let router: Router;
  const routerEvent$ = new BehaviorSubject<RouterEvent>(null);
  let activatedRoute: ActivatedRoute;
  let title: Title;
  let component;
  let oAuthService;
  let sharedUserContextService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RetailLayoutComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            outlet: 'primary',
            firstChild: {
              snapshot: {
                data: {},
              },
              outlet: 'primary',
            } as ActivatedRoute,
            snapshot: {
              data: {
                title: 'test',
              },
            },
          },
        },
        LayoutService,
        Title,
        OAuthService,
        MediaQueryService,
        CssVariablesService,
        UrlHelperService,
        OAuthLogger,
        DateTimeProvider,
        SharedUserContextService,
        { provide: UserContextConfigurationToken, useValue: 'test' },
      ],
    }).compileComponents();

    retailLayoutComponent = TestBed.createComponent(RetailLayoutComponent);
    component = retailLayoutComponent.debugElement.componentInstance;

    router = TestBed.inject(Router);
    (<any>router).events = routerEvent$.asObservable();
    retailLayoutComponent.detectChanges();

    activatedRoute = TestBed.inject(ActivatedRoute);
    (<any>router).events = routerEvent$.asObservable();

    title = TestBed.inject(Title);
    oAuthService = TestBed.inject(OAuthService);
    sharedUserContextService = TestBed.inject(SharedUserContextService);
  });

  it('should be created', () => {
    expect(retailLayoutComponent).toBeTruthy();
  });

  it('routeData should not empty', () => {
    component.ngOnInit();
    expect(component.routeData$).toBeTruthy();
  });

  it('displayNotificationSettingsButton should set correctly', () => {
    component.displayNotificationSettingsButton = true;
    retailLayoutComponent.detectChanges();

    expect(component.displayNotificationSettingsButton).toEqual(true);
  });
});
