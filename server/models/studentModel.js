const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  phone_number: {
    type: Number,
    required: true,
  },
  section: {
    type: String,
  },
  year: {
    type: String,
  },
});
// static signup method

studentSchema.statics.signup = async function (userId, phone_number, section, year) {
  const user = await this.create({
    user: userId,
    phone_number,
    section,
    year,
  });

  return user;
};

module.exports = mongoose.model("Student", studentSchema);
