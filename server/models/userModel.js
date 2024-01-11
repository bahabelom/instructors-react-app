const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: false,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});
// static signup method
userSchema.statics.signup = async function (
  name,
  email,
  password,
  role,
) {
  if (!email || !password) {
    throw Error("All Fields of a user Must be field ");
  }
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email Already In Use");
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({
    name,
    email,
    password: hash,
    role,
  });
  return user;
};
// static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All Fields Must be field");
  }
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorect email ");
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorect password ");
  }
  return user;
};

userSchema.statics.getUser = async function ({role}) {
  
  try {
    const user = await this.find({ role: role });
    return user;
  } catch (error) {
    throw new Error('Error fetching user:', error);
  }
};

userSchema.statics.getUserByEmail = async function (email) {
  
  try {
    const userbyemail = await this.find({ email: email });
    return userbyemail;
  } catch (error) {
    throw new Error('Error fetching user:', error);
  }
};

module.exports = mongoose.model("User", userSchema);
