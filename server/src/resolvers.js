const resolvers = {
  Query: {
    getResourceCalendarList: async (_, args, { dataSources }) => {
      const resCals = await dataSources.resCalAPI.getResourceCalendars();
      return { success: true, calendars: resCals };
    },
    epicImageList: async (_, { date }, { dataSources }) => {
      const epicImages = await dataSources.nasaEpicAPI.getEpicList(date);
      return {
        success: true,
        results: epicImages
      };
    },
    testRes: async (_, { name }, { dataSources }) => {
      const res = await dataSources.nasaEpicAPI.testResolver(name);
      console.log(res);
      return res;
    }
  }
};

export default resolvers;
