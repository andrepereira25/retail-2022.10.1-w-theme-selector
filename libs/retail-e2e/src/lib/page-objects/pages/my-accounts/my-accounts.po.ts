import { Page } from '@playwright/test';
import { BasePage } from '../base-page.po';

export class MyAccountsPage extends BasePage {
  journeyUi = this.page.locator('bb-accounts-list');
  productItem = this.page.locator('.bb-product-kind__item');
  transactionsList = this.page.locator('bb-transactions-list-widget');
  allTransactions = this.page.locator('bb-transactions-list-item');
  manageAccountBtn = this.page.locator('.btn-link', { hasText: 'Manage Accounts' });
  accountItem = this.page.locator('.bb-product-kind-ui__item');
  transactionsListTab = this.page.locator('.bb-tab-container__tabs > a').nth(0);
  accountDetailsTab = this.page.locator('.bb-tab-container__tabs > a').nth(1);
  achRoutingNumberLabel = this.page.locator('[data-role=account-info-property-bankBranchCode-label] span');
  achRoutingNumber = this.page.locator('[data-role=account-info-property-bankBranchCode-value]');
  billPay = this.page.locator('a[id="bb-menu-header-button-transfers"]');

  constructor(page: Page) {
    super(page);
  }
}
