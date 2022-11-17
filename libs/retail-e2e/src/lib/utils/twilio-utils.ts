import Twilio from 'twilio';

export const getOtp = async (accountSid: string, authToken: string): Promise<string> => {
  const client = Twilio(accountSid, authToken);
  const response = await client.messages.list({ limit: 1 });
  if (!response?.length || !response[0].body) {
    return '';
  }
  return response[0].body.replace(/\D/g, '');
};
