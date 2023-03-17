import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: { type: "String", required: true },
    age: { type: "number" },
    phounNumber: { type: "number" },
    password: { type: "string", required: true },
    acsesstoken: { type: "string" },
  },
  { timestamps: true }
);

export default model("User", userSchema);
