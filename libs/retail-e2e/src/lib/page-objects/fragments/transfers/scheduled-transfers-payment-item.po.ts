import { Locator } from '@playwright/test';

export class ScheduledTransfersPaymentItem {
  readonly counterPartyAccount = this.root
    .locator('[data-role="upcoming-payment-item-counterparty-name"]')
    .textContent();
  readonly fromAccount = this.root.locator('div.bb-subtitle bb-ellipsis-ui').textContent();
  readonly editButton = this.root.locator('[data-role^="upcoming-payment-item-edit-button"]');

  constructor(private root: Locator) {}
}
