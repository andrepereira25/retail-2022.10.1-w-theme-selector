import { PERMISSIONS, canViewManageNotificationsForEngagements } from './permissions';
import { environment } from '../../environments/environment';

describe('Entitlements', () => {
  it('should have engagements service as default in notification preference', () => {
    expect(environment.notificationPreferencesApiMode).toEqual('engagements');
    expect(PERMISSIONS.canViewManageNotifications).toEqual(canViewManageNotificationsForEngagements);
  });
});
