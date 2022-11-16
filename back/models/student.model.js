const mongoose = require("mongoose");

const StudentSchema = mongoose.Schema(
  {
    name: String,
    age: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Student", StudentSchema);
