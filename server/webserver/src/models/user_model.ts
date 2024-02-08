import mongoose from "mongoose";

export interface IUser {
  email: string;
  password: string;
  _id?: string;
  refreshTokens?: string[];
  firstName?: string;
  secondName?: string;
  imgUrl?: string;
}

const userSchema = new mongoose.Schema<IUser>({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  refreshTokens: {
    type: [String],
    required: false,
  },
  firstName: {
    type: String,
    required: false,
  },
  secondName: {
    type: String,
    required: false,
  },
  imgUrl: {
    type: String,
    required: false,
  },
});

export default mongoose.model<IUser>("User", userSchema);