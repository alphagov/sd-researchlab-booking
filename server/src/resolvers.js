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
      return { success: true, calendars: resLabs };
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
  }
};

export default resolvers;
