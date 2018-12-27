import { RESTDataSource } from 'apollo-datasource-rest';
import * as googleAuth from 'google-oauth-jwt';
import axios from 'axios';
import path from 'path';
import moment from 'moment';

import * as keys from '../../keys/key-rlabs.json';

class GoogleResourcesAPI extends RESTDataSource {
  constructor() {
    super();
    this.resourceURL = `https://www.googleapis.com/admin/directory/v1/customer/${
      process.env.GOOGLE_CUSTOMER_ID
    }/resources`;
    this.calendarURL = `https://www.googleapis.com/calendar/v3`;
    this.gToken = this.getOauthToken();
  }

  async getResourceCalendars() {
    const token = await this.gToken;
    const res = await axios.get(`${this.resourceURL}/calendars`, {
      headers: {
        Authorization: 'OAuth ' + token
      }
    });
    return res.data.items && res.data.items.length
      ? res.data.items.map((item) => this.resourceCalendarReducer(item))
      : [];
  }

  async getResourceCalendarByType() {
    const token = await this.gToken;
    const res = await axios.get(`${this.resourceURL}/calendars`, {
      headers: {
        Authorization: 'OAuth ' + token
      }
    });
    return res.data.items && res.data.items.length
      ? res.data.items
          .filter((item) => item.resourceType === process.env.RESOURCE_TYPE)
          .map((item) => this.resourceCalendarReducer(item))
      : [];
  }

  async getResourceBuildings() {
    const token = await this.gToken;
    const res = await axios.get(`${this.resourceURL}/buildings`, {
      headers: {
        Authorization: 'OAuth ' + token
      }
    });
    // console.log(res.data);
    return res.data.buildings && res.data.buildings.length
      ? res.data.buildings.map((building) =>
          this.resourceBuildingReducer(building)
        )
      : [];
  }

  async getResourceBuilding(buildingId) {
    const token = await this.gToken;
    const res = await axios.get(`${this.resourceURL}/buildings/${buildingId}`, {
      headers: {
        Authorization: 'OAuth ' + token
      }
    });
    return res.data ? this.resourceBuildingReducer(res.data) : {};
  }

  async getCalendarFreeBusyList(start, end, items) {
    const pBody = {
      timeMin: start,
      timeMax: end,
      items: items.map((l) => {
        return { id: l };
      })
    };
    const token = await this.gToken;
    const resFreeBusy = await axios({
      method: 'post',
      data: pBody,
      url: `${this.calendarURL}/freeBusy`,
      headers: {
        Authorization: 'OAuth ' + token,
        'content-type': 'application/json'
      }
    });

    return this.calendarFreeBusyReducer(resFreeBusy.data.calendars);
  }

  calendarFreeBusyReducer(calendars) {
    const calArray = [];
    for (let x in calendars) {
      let tempObj = {};
      tempObj = { resourceId: x, busy: calendars[x].busy };
      calArray.push(tempObj);
    }
    return calArray;
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
            'https://www.googleapis.com/auth/admin.directory.resource.calendar',
            'https://www.googleapis.com/auth/calendar'
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
