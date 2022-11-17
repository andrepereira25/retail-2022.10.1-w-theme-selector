/*
 *
 * The content of this file can be edited freely, but to maintain upgradability
 * this file should not be renamed and should always export an array named
 * `mockProviders`.
 *
 *
 */
import { Provider } from '@angular/core';
import { ActionsMocksProvider } from '@backbase/actions-mocks-provider-ang';
import { TemplateRegistry } from '@backbase/foundation-ang/core';
import { createMocksInterceptor } from '@backbase/foundation-ang/data-http';

/**
 * Mock providers for Backbase services used when running the app in dev mode.
 */
export const mockProviders: Provider[] = [createMocksInterceptor(), ActionsMocksProvider, TemplateRegistry];
