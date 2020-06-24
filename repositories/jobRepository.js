const orm = require("../orm");

function distance(lat1, lon1, lat2, lon2, unit) {
  if (lat1 == lat2 && lon1 == lon2) {
    return 0;
  } else {
    var radlat1 = (Math.PI * lat1) / 180;
    var radlat2 = (Math.PI * lat2) / 180;
    var theta = lon1 - lon2;
    var radtheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit == "K") {
      dist = dist * 1.609344;
    }
    if (unit == "N") {
      dist = dist * 0.8684;
    }
    return dist;
  }
}

module.exports = {
  createJob: async (jobDetails) => {
    const allTradespeople = await orm.getAll("tradespeople");
    const tradespeopleByDistance = allTradespeople.map((tradesPerson) => {
      const { _id, name } = tradesPerson;
      const distanceFromJob = distance(
        jobDetails.location[0],
        jobDetails.location[1],
        tradesPerson.location.coordinates[0],
        tradesPerson.location.coordinates[1]
      );
      return {
        _id,
        name,
        distanceFromJob,
      };
    });
    const sorted = tradespeopleByDistance.sort((a, b) =>
      a.distance > b.distance ? 1 : -1
    );
    console.log("sorted", sorted);
  },
};
