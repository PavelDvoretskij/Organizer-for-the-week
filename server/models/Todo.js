import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  date: {
    type: String,
    require: true,
    unique: true,
  },
  todos: [
    {
      type: Object,
      require: true,
    },
  ],
});

export default mongoose.model("Todo", TodoSchema);
