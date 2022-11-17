import { BrowserContext, Page } from '@playwright/test';
import { Config } from '../data/model';

export const augmentPageWithBaasHeader = async (page: Page, config: Config): Promise<Page> => {
  await page.route('**/*', async (route) => {
    const headers = await route.request().allHeaders();
    headers[config.baasKey] = config.baasToken;
    await route.continue({ headers: headers });
  });
  return page;
};

export const getLocalStorageItem = async (key: string, context: BrowserContext): Promise<string> => {
  const localStorage = (await context.storageState()).origins[0].localStorage;

  const localStorageKeyValue = localStorage.find((nameValuePair) => nameValuePair.name === key);
  if (!localStorageKeyValue) {
    throw new Error(`Could not find an element in localstorage with key ${key}`);
  }
  return localStorageKeyValue.value;
};
