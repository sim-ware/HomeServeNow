const orm = require("../orm");

module.exports = {
  createTradesperson: async (tradespersonDetails) => {
    orm.createOne("tradespeople", tradespersonDetails);
  },
};
