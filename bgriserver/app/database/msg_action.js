const mongoose = require("mongoose");
const msgActionSchema = new mongoose.Schema({
  user_id: String,
  user_id_household: String,
  status: Number,
  address_contract: String,
  key_action: String,
  data: Object,
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Msg_action", msgActionSchema);
