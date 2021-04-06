const mongoose = require("mongoose");
const householdSchema = new mongoose.Schema({
  user_id: String,
  parent_group_id: String,
  contract_id: String,
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Households", householdSchema);