import mongoose, { Schema } from "mongoose";

const schema = new Schema({
  data: {
    type: Object,
    required: true,
  },
});

const Contract = mongoose.model("Contract", schema);

export default Contract;
