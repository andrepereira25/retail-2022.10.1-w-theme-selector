# Changelog

All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## Unreleased

### Changed

### Fixed

### Added

## [2022.10.1]

### Changed

- Bump `@backbase/retail-loans-journey-ang` to version `2.0.2`
- Change label header for Edit Payment - Internal transfer, M2M and P2P [KB-2123]
- Bump `@backbase/manage-pockets-journey-ang` - Fixed aria attributes not being bound to a value. [NVCTS-1281]
- `@backbase/cards-management-journey-ang` - Added misssing exports to the public exportable apis. [MAINT-18406]
- `@backbase/cards-management-journey-ang`- Fixed the issue with plain texts being focusable via tab key. [NVCTS-1553]
- `@backbase/pay-bills-journey-ang` - Fixed total payment visibility issue after deleting payee [GAR-420]
- `@backbase/manage-payees-journey-ang` - Fixed issue when user can not exit payee on edit page when clicking lose changes button [GAR-430]
- Add loan payments e2e tests [KB-2271]
- Bump `@backbase/retail-loans-journey-ang` to version `2.0.5` - Fix dispay amount options on create loan payment [CME-2504]
- Bump `@backbase/actions-retail-notification-preferences-journey-ang` to version `3.1.2`
- Bump `@backbase/notifications-ang` to version `2.1.3`

### Fixed

- Fixed 'Added a test case to add electronic payee and removed unused code'

### Added

- New app version display to the `bb-user-context-menu-widget` from environment variables [NOJIRA]

## [2022.10]

### Changed

- Bump Entitlements capabilities for release 2022.10
- Bump `@backbase/cards-management-journey-ang` - Implemented new journey configuration named `cardPinLength`. [NVCTS-1353]
- Bump Payments Journeys for release 2022.10 - contains bank timezone configuration for payment submit

## [2022.09]

### Changed

- Removed popup&sticky notifications [DLRN-4516]
- Changed configuration for engagement base path [DLRN-4543]
- Code refactored to remove duplication.
- `@backbase/accounts-transactions-journey-ang` - move http clients to peer dependencies
- Bump @backbase/connect-external-accounts-journey-ang (moved http clients to peer dependencies)
- Bump @backbase/manage-upcoming-and-historical-payments-journey-ang (Improved error handling, moved http clients to peer dependencies, other minor improvements)
- Bump @backbase/quick-transfer-journey-ang (moved http clients to peer dependencies)
- Remove `MessageCenter.ManageMessages.view` permission from permissions check
- Start using modelbank stg env instead of ret-latest.
- Bump @backbase/manage-bill-payments-journey-ang @backbase/manage-payees-journey-ang @backbase/pay-bills-journey-ang (moved http clients to peer dependencies)
- Remove payment forms duplicate titles, update loans payments
- Bump `@backbase/identity-self-service-journey-ang` (Address autocomplete [IDULS-352])
- Updated karma threshold to fix flaky unit test.
- Bump `@backbase/cards-management-journey-ang`. Fixed i18n repeated keys and removed `data-ang` dependency
- Rename Remote config release registration `provisioning-package` folder to `release-template`
- Update register-release action with the new path for creating the provisioning package
- E2E configuration will change as per the environment.
- Bump `@backbase/initiate-payment-journey-ang`, `@backbase/manage-payment-templates-journey-ang`, `@backbase/manage-payments-journey-ang` and `@backbase/stop-checks-journey-ang` versions (Fixes the date-picker timezone issue on edit flow)
- Changed test data for E2E tests
- Bump `@backbase/authorized-users-journey-ang` version (split create authorized user flow into routable/extendable views )
- Disable e2e on pipeline.
- Bump `@backbase/retail-loans-journey-ang`. Removed `@backbase/account-statement-business-widget-ang`, `@backbase/account-statement-store-ang` and updated `@backbase/account-statement-common-ang`.
- regex updated in pipeline for LTS release.
- Disable e2e in pipeline.
- Update `@backbase/identity-auth` to version `1.2.0`
- Enabled USA-only address autocomplete
- Angular update to v13.
- Bump `@backbase/places-journey-ang` - Angular v13 update + add full path to markerUrl assets.
- Bump `@backbase/account-statement-retail-journey-ang` version (changed journey name and added link to Manage Statements).
- Change menu link from "Download Statements" to "Account Statements"
- Deprecated `PUBSUB` and `SET_LOCALE` replaced with services compatible with `foundation-ang` v7
- Bump `@backbase/quick-transfer-journey-ang` - Angular v13 update + update assets handling.
- Bump `@backbase/remote-config-ang` to version `2.0.0`
- Bump `@backbase/actions-retail-notification-preferences-journey-ang` to version `4.0.1`
- Bump `@backbase/campaign-space-ang` to version `2.0.1`
- Bump `@backbase/messages-client-inbox-journey-ang` to version `3.0.2`
- Bump `@backbase/notifications-ang` to version `2.0.2`
- Set `engagements` as default value for api mode of notification preferences
- Bump `@backbase/places-journey-ang` for a small bugfix.
- Bump Entitlements capabilities (Angular 13)
- Bump `@backbase/accounts-transactions-journey-ang` to version `3.10.0`
- Bump `@backbase/manage-bill-payments-journey-ang`,`@backbase/manage-payees-journey-ang`,`@backbase/pay-bills-journey-ang` - Angular 13 update
- Bump `@backbase/retail-loans-journey-ang` to version `1.0.3` and `@backbase/initiate-loans-payment-journey` to version 2.0.1.
- Bump `@backbase/arrangement-manager-http-ang` to version `2.5.0`
- Bump `@backbase/cards-management-journey-ang` - Angular 13 update and i18n bugfixes
- Bump `@backbase/budget-journey-ang` - Angular 13
- Bump `@backbase/income-spending-analysis-journey-ang` - Angular 13, UI improvements and bugfixes
- Bump `@backbase/manage-pockets-journey-ang` - Angular 13
- Bump `@backbase/turnovers-journey-ang` - Angular 13
- Baas key made configurable.
- Bump `@backbase/accounts-transactions-journey-ang` to version `4.0.0`
- Bump `@backbase/retail-loans-journey-ang` to version `2.0.1`
- Patch ranges allowed for Backbase dependencies

### Fixed

- Stop calling `initLoginFlow` after `revokeTokenAndLogout`, to prevent unwanted side-effect of cancelling `/logout` page request.
- Added add/withdraw money and delete pocket scenario to pocket e2e tests
- Fixed `accounts-transactions-journey-ang` to read `apiKey` from an environment variable.
- Fixed 'User can edit existing budget' test
- Fixed 'Added a test case to add electronic payee and removed unused code'

### Added

- Added E2E tests for cards and budgets
- New Proxy configurations added for e2e tests
- End to end test cases for Accounts & Transactions.
- Extracting fixtures, configs, PO to retail-e2e lib.
- End to end test cases for Pockets based on new structure and stg modelbank.
- End to end test cases for Travel notice
- Loans Journey retaled basepaths to relevant modules.
- Changelog check + an automatic versioning.
- E2E tests for transfers and connected accounts.
- E2E tests for Bill Pay.
- Support for testing transaction signing in E2E tests
- E2E tests for Edit External A2A scheduled payments
- Add new journey "Manage Statements" `@backbase/manage-statements-journey-ang`.
- **Step Up** integrated via `@backbase/identity-auth/step-up` [IDWOJ-1241]
- **AuthEventsHandlerService** Added example version of how auth events could be handled [IDWOJ-1261]
- For `@backbase/manage-upcoming-and-historical-payments-journey-ang` updated route paths, title & version (added Historical payments tab into Activity tab)
- **AuthInterceptor** Updated implementation to align with recommendation from Identity. If an action is rejected with a 401 `invalid_token` error, attempt to refresh the user's token and replay the original request. Otherwise surface the original error. [IDWOJ-1259]
- **AuthGuard** Updated implementation to align with recommendation from Identity. If the user is not logged in, redirect them to the login flow. [IDWOJ-1260]
- E2E tests for `Places journey`.
- New app version display to the `bb-user-context-menu-widget` from environment variables [NOJIRA]
