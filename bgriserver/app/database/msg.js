const mongoose = require("mongoose");
const msgSchema = new mongoose.Schema({
  user_id: String,
  user_id_lien_group: String,
  contract_id: String,
  type: String,
  status: Number,
  address_contract: String,
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Msgs", msgSchema);
