const orm = require("../orm");

module.exports = {
  createTradesperson: async (tradespersonDetails) => {
    orm.createOne("tradespeople", tradespersonDetails);
  },

  getAvailableJobsById: async (id) => {
    const result = [];
    const allJobs = await orm.getAll("jobs");
    // const tradesPerson = await orm.getOne("tradespeople", id);
    const jobsfilteredByTrade = allJobs.filter((job) => {
      console.log(job.description);
    });

    allJobs.forEach((job) => {
      job.nearbyTradespeopleIds.forEach((tradespersonId) => {
        if (tradespersonId.toString() === id) {
          result.push(job);
        }
      });
    });
    return result;
  },
};
