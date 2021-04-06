const mongoose = require("mongoose");
const contractSchema = new mongoose.Schema({
  name: String,
  user_id: String,
  parent_id: String,
  address_contract: String,
  data: String,
  data_info: String,
  abi: String,
  status: String,
  description: String,
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Contracts", contractSchema);
