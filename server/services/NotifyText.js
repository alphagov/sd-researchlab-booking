import { NotifyClient } from 'notifications-node-client';

const notifyClient = new NotifyClient(process.env.NOTIFY_API_KEY);

const tempNumber = '07856248216';

export const sendMFACode = async (cellNumber, mfaCode) => {
  try {
    const sendText = await notifyClient.sendSms(
      process.env.NOTIFY_LOGIN_MFA_TEMPLATE_ID,
      tempNumber,
      {
        personalisation: {
          mfaCode
        },
        reference: 'test message'
      }
    );
    console.log(sendText.body);
    return sendText.body;
  } catch (error) {
    console.log(error.message);
    const errorMsg = { statusCode: error.statusCode, msg: error.message };
    return errorMsg;
  }
};
