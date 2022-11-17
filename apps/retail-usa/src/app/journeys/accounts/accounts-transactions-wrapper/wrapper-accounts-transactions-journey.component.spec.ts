import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountsTransactionsJourneyWrapperComponent } from './wrapper-accounts-transactions-journey.component';
import '@angular/localize/init';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AccountsTransactionsJourneyWrapperComponent', () => {
  let component: AccountsTransactionsJourneyWrapperComponent;
  let fixture: ComponentFixture<AccountsTransactionsJourneyWrapperComponent>;
  let activatedRoute: ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [AccountsTransactionsJourneyWrapperComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    fixture = TestBed.createComponent(AccountsTransactionsJourneyWrapperComponent);
    component = fixture.componentInstance;
    activatedRoute = TestBed.inject(ActivatedRoute);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
