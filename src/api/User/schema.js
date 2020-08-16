import mongoose, { Schema } from "mongoose";

const schema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
});

const User = mongoose.model("User", schema);

export default User;
