const orm = require("../orm");
const distance = require("../distance");

module.exports = {
  createJob: async (jobDetails) => {
    const allTradespeople = await orm.getAll("tradespeople");
    const nearbyTradespeopleIds = allTradespeople
      .map((tradesPerson) => {
        const distanceFromJob = distance.distanceBetweenCoordinates(
          jobDetails.location[0],
          jobDetails.location[1],
          tradesPerson.location.coordinates[0],
          tradesPerson.location.coordinates[1]
        );
        return {
          id: tradesPerson._id,
          distanceFromJob,
        };
      })
      .sort((a, b) => (a.distanceFromJob > b.distanceFromJob ? 1 : -1))
      .slice(0, 5)
      .map((tradesPerson) => tradesPerson.id);

    const job = {
      description: jobDetails.description,
      location: jobDetails.location,
      nearbyTradespeopleIds,
    };

    orm.createOne("job", job);
    return job;
  },
};
