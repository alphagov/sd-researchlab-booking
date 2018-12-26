const resolvers = {
  Query: {
    getResourceCalendarList: async (_, args, { dataSources }) => {
      const resCals = await dataSources.googleResourcesAPI.getResourceCalendars();
      return { success: true, calendars: resCals };
    },
    getResourceBuildingList: async (_, args, { dataSources }) => {
      const resBuildings = await dataSources.googleResourcesAPI.getResourceBuildings();
      return { success: true, buildings: resBuildings };
    }
  }
};

export default resolvers;
