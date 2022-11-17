import { test, expect, LoginState } from '@backbase/retail-e2e';
import { UserType } from '@backbase/retail-e2e';

test.describe('Accounts Details:', () => {
  test.use({ loginState: LoginState.loggedIn, testUserType: UserType.userWithSingleContext });
  test.describe.configure({ mode: 'parallel' });

  test('User can see My Accounts page header', async ({ myAccountsPage }) => {
    await expect(myAccountsPage.journeyUi).toBeVisible();
    await expect(myAccountsPage.pageTitleHeader).toHaveText('My Accounts');
  });

  test('User can see List of transactions', async ({ myAccountsPage }) => {
    await myAccountsPage.accountItem.nth(0).click();
    await myAccountsPage.transactionsListTab.click();
    await expect(myAccountsPage.transactionsList).toBeVisible();
    await expect(myAccountsPage.allTransactions).toHaveCount(10);
  });

  test('User can see Ach routing number in account details ', async ({ myAccountsPage }) => {
    await myAccountsPage.accountItem.nth(0).click();
    await myAccountsPage.accountDetailsTab.click();
    await expect(myAccountsPage.achRoutingNumberLabel).toBeVisible();
    await expect(myAccountsPage.achRoutingNumberLabel).toHaveText('ACH Routing Number');
    await expect(myAccountsPage.achRoutingNumber).toBeVisible();
  });
});
