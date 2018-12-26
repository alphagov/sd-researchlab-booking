import { JWT } from 'google-auth-library';
// import { RESTDataSource } from 'apollo-datasource-rest';
import * as googleAuth from 'google-oauth-jwt';
import axios from 'axios';

import * as keys from '../../keys/key-rlabs.json';

class ResourceCalendarAPI {
  constructor() {
    this.googleURL = `https://www.googleapis.com/admin/directory/v1/customer/${
      process.env.GOOGLE_CUSTOMER_ID
    }/resources/calendars`;
  }

  async getResourceCalendars() {
    const res = await axios.get(url, {
      headers: {
        Authorization: 'OAuth ' + (await this.getOauthToken()),
        'content-type': 'application/json'
      }
    });
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

  async getOauthToken() {
    return new Promise((resolve, reject) => {
      googleAuth.authenticate(
        {
          email: keys.client_email,
          keyFile: '../../keys/rlabs.pem',
          delegationEmail: 'adrian@intellidroid.eu',
          scopes: [
            'https://www.googleapis.com/auth/admin.directory.resource.calendar'
          ]
        },
        (err, token) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            resolve(token);
          }
        }
      );
    });
  }
}

export default ResourceCalendarAPI;
