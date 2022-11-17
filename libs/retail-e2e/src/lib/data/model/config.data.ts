import { UserData } from './user.data';

export interface Config {
  baseUrl: string;
  baasKey: string;
  baasToken: string;
  twilio: {
    accountSid: string;
    authToken: string;
  };
  users: {
    userWithSingleContext: UserData;
    userWithMultipleContexts: UserData;
  };
}
