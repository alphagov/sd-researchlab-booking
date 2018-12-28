import moment from 'moment';

const resolvers = {
  Query: {
    getResourceCalendarList: async (_, args, { dataSources }) => {
      const resCals = await dataSources.googleResourcesAPI.getResourceCalendars();
      return { success: true, calendars: resCals };
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
      return { success: true, labs: resLabs };
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
        const resFreeBusy = await dataSources.googleResourcesAPI.getCalendarFreeBusyList(
          moment(Date.now()),
          moment(Date.now()).add(2, 'months'),
          [calId]
        );
        return resFreeBusy[0].busy;
      }
    }
  }
};

export default resolvers;
