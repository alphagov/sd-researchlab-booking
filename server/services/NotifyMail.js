import { NotifyClient } from 'notifications-node-client';

const notifyClient = new NotifyClient(process.env.NOTIFY_API_KEY);

const regTemplateId = 'a153e965-1862-497f-8596-6a19c038979b';
// process.env.NOTIFY_REG_TEMPLATE_ID;
// tmp email
const tempEmail = 'adrian.durran@digital.cabinet-office.gov.uk';

export const sendRegMail = async (firstName, lastName, email, hashLink) => {
  try {
    const regMail = await notifyClient.sendEmail(regTemplateId, tempEmail, {
      personalisation: {
        firstName,
        lastName,
        hashLink
      },
      reference: 'test mails'
    });
    return regMail;
  } catch (error) {
    console.log(error);
    return error;
  }
};
