import { Page } from '@playwright/test';
import { ProductSelectorUI, ReviewTransfersCard } from '../../fragments';
import { BasePage } from '../base-page.po';

export class SendMoneyToMemberPage extends BasePage {
  readonly pageTitle = this.page.locator('h1');
  readonly journeyUI = this.page.locator('bb-initiate-payment-journey-wrapper');
  readonly fromAccountSelector = this.page.locator('bb-product-selector-ui').nth(0);
  readonly toAccountSelector = this.page.locator('[data-role="contact-selector-search-box"] button[ngbdropdowntoggle]');
  readonly toAccountItem = this.page.locator('bb-payord-contact-selector button[ngbdropdownitem]').first();
  readonly amountInput = this.page.locator('[data-role=bb-amount-input-ui]');
  readonly primaryButton = this.page.locator('button.btn-primary');
  readonly navSubMenuItem = this.mainNavigation.locator("li > [routerLink='/transfers/money-to-member']");
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
    await fromAccountSelector.selectProductWithIndex(1);
    await this.toAccountSelector.click();
    await this.toAccountItem.click();
    await this.amountInput.fill(transferAmount);
    if (dateString) {
      await this.dateField.fill(dateString);
    }
    await this.primaryButton.click();
    return new ReviewTransfersCard(this.page);
  }
}
