import { JWT } from 'google-auth-library';
import { RESTDataSource } from 'apollo-datasource-rest';
import * as googleAuth from 'google-oauth-jwt';
import axios from 'axios';
import path from 'path';

import * as keys from '../../keys/key-rlabs.json';

class GoogleResourcesAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `https://www.googleapis.com/admin/directory/v1/customer/${
      process.env.GOOGLE_CUSTOMER_ID
    }/resources`;
  }

  async getResourceCalendars() {
    const token = await this.getOauthToken();
    const res = await axios.get(`${this.baseURL}/calendars`, {
      headers: {
        Authorization: 'OAuth ' + token
      }
    });
    return res.data.items && res.data.items.length
      ? res.data.items.map((item) => this.resourceCalendarReducer(item))
      : [];
  }

  async getResourceBuildings() {
    const token = await this.getOauthToken();
    const res = await axios.get(`${this.baseURL}/buildings`, {
      headers: {
        Authorization: 'OAuth ' + token
      }
    });
    console.log(res.data);
    return res.data.buildings && res.data.buildings.length
      ? res.data.buildings.map((building) =>
          this.resourceBuildingReducer(building)
        )
      : [];
  }

  resourceBuildingReducer(building) {
    const {
      buildingId,
      buildingName,
      description,
      floorNames,
      coordinates
    } = building;
    return { buildingId, buildingName, description, floorNames, coordinates };
  }

  resourceCalendarReducer(item) {
    const {
      resourceId,
      resourceName,
      resourceType,
      resourceDescription,
      resourceEmail,
      resourceCategory,
      capacity,
      buildingId,
      floorName
    } = item;
    return {
      resourceId,
      resourceName,
      resourceType,
      resourceDescription,
      resourceEmail,
      resourceCategory,
      capacity,
      buildingId,
      floorName
    };
  }

  async getOauthToken() {
    return new Promise((resolve, reject) => {
      googleAuth.authenticate(
        {
          email: keys.client_email,
          keyFile: path.join(__dirname, '../../keys/rlabs.pem'),
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

export default GoogleResourcesAPI;
