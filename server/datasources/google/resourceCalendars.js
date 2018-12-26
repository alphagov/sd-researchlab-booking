import { JWT } from 'google-auth-library';
import { RESTDataSource } from 'apollo-datasource-rest';

import * as keys from '../../keys/key-rlabs.json';

class ResourceCalendarAPI extends RESTDataSource {
  constructor() {
    super();
    this.googleURL = `https://www.googleapis.com/admin/directory/v1/customer/${
      process.env.GOOGLE_CUSTOMER_ID
    }/resources/calendars`;
    this.client = new JWT(keys.client_email, null, keys.private_key, [
      'https://www.googleapis.com/auth/admin.directory.resource.calendar.readonly'
    ]);
  }

  async getResourceCalendars() {
    const res = await this.client.request({ url: this.googleURL });
    console.log(res.data);
    return res.data.items && res.data.items.length
      ? res.data.items.map((item) => this.resourceReducer(item))
      : [];
  }

  resourceReducer(item) {
    const {
      resourceId,
      resourceName,
      resourceType,
      resourceDescription,
      resourceEmail,
      resourceCategory
    } = item;
    return {
      resourceId,
      resourceName,
      resourceType,
      resourceDescription,
      resourceEmail,
      resourceCategory
    };
  }
}

export default ResourceCalendarAPI;
