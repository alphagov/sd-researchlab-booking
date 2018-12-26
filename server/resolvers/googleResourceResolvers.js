const googleResourceResolvers = {
  Query: {
    getResourceCalendarList: async (root, args, { dataSources }) => {
      const cals = await dataSources.resourceCalendarAPI.getResourceCalendars();
      return { success: true, calendars: cals };
    }
  }
};

export default googleResourceResolvers;
