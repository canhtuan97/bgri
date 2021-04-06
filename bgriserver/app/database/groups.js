const mongoose = require("mongoose");
const groupSchema = new mongoose.Schema({
  user_id: String,
  name_group: String,
  parent_id: String,
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Groups", groupSchema);
