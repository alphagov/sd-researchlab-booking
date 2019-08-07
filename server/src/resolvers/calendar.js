import { startOfDay, endOfDay, addMonths } from 'date-fns';
import Events from '../models/Events';

const calendarResolvers = {
  Query: {
    getResourceCalendarList: async (_, args, { dataSources }) => {
      const resCals = await dataSources.googleResourcesAPI.getResourceCalendarByType();
      // console.log(resCals);
      const orderedCals = resCals.sort((a, b) =>
        a.resourceName.localeCompare(b.resourceName)
      );
      return { success: true, calendars: orderedCals };
    },
    getResourceBuildingList: async (_, args, { dataSources }) => {
      const resBuildings = await dataSources.googleResourcesAPI.getResourceBuildings();
      return { success: true, buildings: resBuildings };
    },
    getResourceBuilding: async (parent, { buildingId }, { dataSources }) => {
      const resBuilding = await dataSources.googleResourcesAPI.getResourceBuilding(
        buildingId
      );
      return resBuilding;
    },

    getResourceResearchLab: async (_, args, { dataSources }) => {
      const resLabs = await dataSources.googleResourcesAPI.getResourceCalendarByType();
      const orderedLabs = resLabs.sort((a, b) =>
        a.resourceName.localeCompare(b.resourceName)
      );
      return { success: true, labs: orderedLabs };
    },
    getCalendarFreeBusyList: async (
      _,
      { start, end, items },
      { dataSources }
    ) => {
      const resFreeBusy = await dataSources.googleResourcesAPI.getCalendarFreeBusyList(
        start,
        end,
        items
      );
      // console.log(resFreeBusy);
      return {
        success: true,
        calendars: resFreeBusy
      };
    },
    getBookedEventsUser: async (_, args, { dataSources, userContext }) => {
      const { user } = userContext;

      if (!user) {
        return {
          success: false,
          reason: userContext.error.name,
          events: []
        };
      }

      try {
        //  get all the events for the user
        const userEvents = await Events.find({ userId: user });
        // console.log('[user events]', userEvents);

        const userEventList = userEvents.map((userEvent) => {
          return {
            eventId: userEvent.eventId,
            calendarId: userEvent.calendarId
          };
        });

        const listLength = userEventList.length;

        if (listLength === 0) {
          return {
            success: true,
            reason: '',
            events: []
          };
        }

        // loop through the userEventList and push the result into an array of events
        let eventList = [];
        for (let i = 0; i < listLength; i++) {
          // get all the events out of google api
          let uEvents = await dataSources.googleResourcesAPI.getResourceCalendarEvents(
            userEventList[i]
          );
          eventList.push(uEvents);
        }

        return {
          success: true,
          reason: '',
          events: eventList
        };
      } catch (error) {
        return {
          success: false,
          reason: error.message,
          events: []
        };
      }
    }
  },
  Mutation: {
    addResearchLabEvent: async (_, args, { dataSources, userContext }) => {
      const { user, error } = userContext;

      // console.log(user);

      if (!user) {
        return {
          success: false,
          reason: error.name,
          event: {}
        };
      }

      try {
        const addEvent = await dataSources.googleResourcesAPI.addCalendarEvent(
          args
        );
        // console.log('add event', addEvent);
        // once added to the event add to the db
        const { eventId, calendarId } = addEvent;
        await Events.create({
          userId: user,
          eventId,
          calendarId
        });

        return { success: true, reason: '', event: addEvent };
      } catch (error) {
        return {
          success: false,
          reason: error.message,
          event: {}
        };
      }
    }
  },
  ResourceCalendar: {
    building: async (parent, args, { dataSources }) => {
      const building_id = parent.buildingId;
      if (building_id) {
        const resBuilding = await dataSources.googleResourcesAPI.getResourceBuilding(
          building_id
        );
        return resBuilding;
      }
    }
  },
  ResearchLab: {
    building: async (parent, args, { dataSources }) => {
      const building_id = parent.buildingId;
      if (building_id) {
        const resBuilding = await dataSources.googleResourcesAPI.getResourceBuilding(
          building_id
        );
        return resBuilding;
      }
    },
    freeBusy: async (parent, args, { dataSources }) => {
      // return default 2 months (max you can do with google calendar api)
      const calId = parent.resourceEmail;
      if (calId) {
        // get the current day, time
        const startDate = startOfDay(Date.now());
        // just get until the end of the next month...this way we can always display 2
        // months worth of data.
        // reason we do this is because Google Cal API will only pull 2 months worth of data
        const endDate = addMonths(endOfDay(startDate), 1);
        const resFreeBusy = await dataSources.googleResourcesAPI.getCalendarFreeBusyList(
          startDate,
          endDate,
          [calId]
        );
        return resFreeBusy[0].busy;
      }
    }
  }
};

export default calendarResolvers;
