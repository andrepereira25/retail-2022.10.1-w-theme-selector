import { Page } from '@playwright/test';
import { generateUniqueString } from '../../../utils';
import { ProductSelectorUI, ReviewTransfersCard } from '../../fragments';
import { BasePage } from '../base-page.po';

export class SendMoneyToSomeonePage extends BasePage {
  readonly pageTitle = this.page.locator('h1');
  readonly journeyUI = this.page.locator('bb-initiate-payment-journey-wrapper');
  readonly fromAccountSelector = this.page.locator('bb-product-selector-ui').nth(0);
  readonly toAccountNameField = this.page.locator(
    '[data-role="contact-selector-search-box"] #payord-contact-selector-search-box',
  );
  readonly toAccountNumberField = this.page
    .locator('bb-payord-text', { hasText: 'Mobile Number or Email Address' })
    .locator('[data-role="input"]');
  readonly amountInput = this.page.locator('[data-role=bb-amount-input-ui]');
  readonly primaryButton = this.page.locator('button.btn-primary');
  readonly navSubMenuItem = this.mainNavigation.locator("li > [routerLink='/transfers/money-to-someone']");
  readonly notificationMessage = this.page.locator('[data-role=notification-alert]');
  readonly dateField = this.page.locator('[data-role=input-date-single]').first();

  constructor(page: Page) {
    super(page);
  }

  async makeTransfer(transferAmount: string): Promise<ReviewTransfersCard> {
    return this.fillData(transferAmount);
  }

  async makeFutureDateTransfer(transferAmount: string, dateString: string): Promise<ReviewTransfersCard> {
    return this.fillData(transferAmount, dateString);
  }

  private async fillData(transferAmount: string, dateString?: string): Promise<ReviewTransfersCard> {
    const fromAccountSelector = new ProductSelectorUI(this.fromAccountSelector);
    await fromAccountSelector.selectProductWithIndex(2);
    await this.toAccountNameField.fill(`test${generateUniqueString()}`);
    await this.toAccountNumberField.fill('1234567890');
    await this.amountInput.fill(transferAmount);
    if (dateString) {
      await this.dateField.fill(dateString);
    }
    // journey has a debounce time thus adding a hard wait here - fix journey code to include throttle instead of debounce
    await this.page.waitForTimeout(2000);
    await this.primaryButton.click();
    return new ReviewTransfersCard(this.page);
  }
}
