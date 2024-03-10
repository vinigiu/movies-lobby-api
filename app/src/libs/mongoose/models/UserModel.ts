import mongoose, { Document, Schema } from "mongoose";
import bcrypt from 'bcrypt';

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true },
});

userSchema.pre("save", async function (next) {
  const user = this as IUser;

  if (!user.isModified("password")) {
    return next();
  }

  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    return next();
  } catch (error) {
    console.error("Bcrypt error:", error);
    return next(error as Error);
  }
});

const UserModel = mongoose.model<IUser>("User", userSchema);

export { UserModel, IUser};
