import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentsCommunicationService } from '@backbase/retail/feature/communication';

@Component({
  selector: 'bb-initiate-payment-journey-wrapper',
  template: `
    <div class="pb-1 pt-5">
      <h1 data-role="headings" class="pt-3 pb-4">{{ title }}</h1>
    </div>
    <div class="card card-body">
      <router-outlet></router-outlet>
    </div>
  `,
})
export class InitiatePaymentJourneyWrapperComponent implements OnInit {
  title!: string;

  constructor(private route: ActivatedRoute, private paymentsCommunicationService: PaymentsCommunicationService) {}

  ngOnInit(): void {
    if (this.paymentsCommunicationService.isEditMode) {
      this.title = this.route.snapshot.data.editModeTitle;
    } else {
      this.title = this.route.snapshot.data.modalTitle;
    }
  }
}
