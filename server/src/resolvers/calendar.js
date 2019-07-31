import { startOfDay, endOfDay, addMonths } from 'date-fns';

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
    }
  },
  Mutation: {
    addResearchLabEvent: async (_, args, { dataSources }) => {
      const addEvent = await dataSources.googleResourcesAPI.addCalendarEvent(
        args
      );
      // console.log(addEvent);
      return { success: true, event: addEvent };
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