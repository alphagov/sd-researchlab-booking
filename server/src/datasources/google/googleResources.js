import { RESTDataSource } from 'apollo-datasource-rest';
import * as googleAuth from 'google-oauth-jwt';
import axios from 'axios';
import path from 'path';
import moment from 'moment';

import * as keys from '../../keys/uxlabbt.json';

const tokens = new googleAuth.TokenCache();

const options = {
  email: keys.client_email,
  keyFile: path.join(__dirname, '../../keys/uxlabbt.pem'),
  delegationEmail: 'admin@digital.cabinet-office.gov.uk',
  scopes: [
    'https://www.googleapis.com/auth/admin.directory.resource.calendar',
    'https://www.googleapis.com/auth/calendar'
  ]
};

class GoogleResourcesAPI extends RESTDataSource {
  constructor() {
    super();
    this.resourceURL = `https://www.googleapis.com/admin/directory/v1/customer/${
      process.env.GOOGLE_CUSTOMER_ID
    }/resources`;
    this.calendarURL = `https://www.googleapis.com/calendar/v3`;
  }

  async getResourceCalendars() {
    try {
      const token = await this.getOauthToken(options);
      const res = await axios.get(`${this.resourceURL}/calendars`, {
        headers: {
          Authorization: 'OAuth ' + token
        }
      });
      return res.data.items && res.data.items.length
        ? res.data.items.map((item) => this.resourceCalendarReducer(item))
        : [];
    } catch (error) {
      console.log('Error:', error);
    }
  }

  async getResourceCalendarByType() {
    try {
      const token = await this.getOauthToken(options);
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
    } catch (error) {
      console.log('Error:', error);
    }
  }

  async getResourceBuildings() {
    try {
      const token = await this.getOauthToken(options);
      const res = await axios.get(`${this.resourceURL}/buildings`, {
        headers: {
          Authorization: 'OAuth ' + token
        }
      });
      return res.data.buildings && res.data.buildings.length
        ? res.data.buildings.map((building) =>
            this.resourceBuildingReducer(building)
          )
        : [];
    } catch (error) {
      console.log('Error:', error);
    }
  }

  async getResourceBuilding(buildingId) {
    try {
      const token = await this.getOauthToken(options);
      const res = await axios.get(
        `${this.resourceURL}/buildings/${buildingId}`,
        {
          headers: {
            Authorization: 'OAuth ' + token
          }
        }
      );
      return res.data ? this.resourceBuildingReducer(res.data) : {};
    } catch (error) {
      console.log('Error:', error);
    }
  }

  async getCalendarFreeBusyList(start, end, items) {
    const pBody = {
      timeMin: start,
      timeMax: end,
      items: items.map((l) => {
        return { id: l };
      })
    };
    try {
      const token = await this.getOauthToken(options);
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
    } catch (error) {
      console.log('Error:', error);
    }
  }

  async addCalendarEvent(event) {
    const {
      calendarId,
      start,
      end,
      attendees,
      title,
      description,
      creator,
      email
    } = event;
    const eventBody = {
      end: { dateTime: end },
      start: { dateTime: start },
      attendees: [
        {
          displayName: creator,
          email,
          additionalGuests: attendees,
          organizer: true,
          status: 'tentative'
        }
      ],
      summary: title,
      description,
      status: process.env.BOOKING_DEFAULT_STATUS
    };
    try {
      const token = await this.getOauthToken(options);
      const res = await axios({
        method: 'post',
        url: `${this.calendarURL}/calendars/${calendarId}/events`,
        headers: {
          Authorization: 'OAuth ' + token,
          'content-type': 'application/json'
        },
        params: { sendUpdates: process.env.BOOKING_SEND_UPDATES },
        data: eventBody
      });
      return this.calendarEventReducer(res.data);
    } catch (error) {
      console.log('Error:', error);
    }
  }

  calendarEventReducer(event) {
    const { id, status, summary, description, start, end, creator } = event;

    return {
      eventId: id,
      eventTitle: summary,
      eventDescription: description,
      eventStatus: status,
      eventStart: start.dateTime,
      eventEnd: end.dateTime,
      eventOwner: {
        displayName: creator.displayName,
        email: creator.email
      }
    };
  }

  calendarFreeBusyReducer(calendars) {
    const calArray = [];
    for (let x in calendars) {
      let tempObj = {};
      tempObj = {
        resourceId: x,
        busy: calendars[x].busy.map((b) => {
          return {
            title: 'busy',
            start: b.start,
            end: b.end
          };
        })
      };
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

  async getOauthToken(options = {}) {
    return new Promise((resolve, reject) => {
      tokens.get(options, (err, token) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(token);
        }
      });
    });
  }
}

export default GoogleResourcesAPI;
