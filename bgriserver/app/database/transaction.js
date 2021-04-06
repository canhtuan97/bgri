const mongoose = require("mongoose");
const transactionSchema = new mongoose.Schema({
  contract_id: String,
  tx: String,
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Transactions", transactionSchema);
